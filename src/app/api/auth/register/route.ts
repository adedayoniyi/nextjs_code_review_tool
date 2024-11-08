import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user_model";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    const { fullName, developerRole, email, password } = await request.json();

    await connectDB();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "Email already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const newUser = new User({
            fullName,
            developerRole,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
        });

        await newUser.save();

        // Send OTP email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            },
        });

        await transporter.sendMail({
            from: `"Code Review Tool" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: "An error occurred" },
            { status: 500 }
        );
    }
}

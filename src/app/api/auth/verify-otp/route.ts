import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user_model";

export async function POST(request: Request) {
    const { email, otp } = await request.json();

    await connectDB();

    try {
        const user = await User.findOne({ email }).select("+otp +otpExpires");

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 400 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json(
                { success: false, error: "User already verified" },
                { status: 400 }
            );
        }

        if (user.otp !== otp) {
            return NextResponse.json(
                { success: false, error: "Invalid OTP" },
                { status: 400 }
            );
        }

        if (user.otpExpires && user.otpExpires < new Date()) {
            return NextResponse.json(
                { success: false, error: "OTP expired" },
                { status: 400 }
            );
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: "An error occurred" },
            { status: 500 }
        );
    }
}

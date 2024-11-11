import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CodeSnippet from "@/models/CodeSnippet";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

interface Params {
    params: {
        id: string;
    };
}

export async function GET(request: Request, { params }: Params) {
    await connectDB();

    const { id } = params;

    try {
        const comments = await Comment.find({ codeSnippet: id })
            .populate("author", "fullName")
            .sort({ createdAt: 1 });

        return NextResponse.json(comments);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request, { params }: Params) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { content, lineNumber } = await request.json();

    if (!content || typeof lineNumber !== "number") {
        return NextResponse.json(
            { error: "Content and line number are required" },
            { status: 400 }
        );
    }

    try {
        const newComment = new Comment({
            content,
            lineNumber,
            author: session.user.id,
            codeSnippet: id,
        });

        await newComment.save();

        //   Optionally, update the snippet's comments array
        await CodeSnippet.findByIdAndUpdate(id, {
            $push: { comments: newComment._id },
        });

        return NextResponse.json({ success: true, comment: newComment });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to add comment" },
            { status: 500 }
        );
    }
}


// src/app/api/snippets/[id]/like/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CodeSnippet, { CodeSnippetDocument } from "@/models/CodeSnippet"; // Ensure proper import
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose"; // Import mongoose to use ObjectId

interface Params {
    params: {
        id: string;
    };
}

export async function POST(request: Request, { params }: Params) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const userId = session.user.id;

    // Validate userId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    try {
        // Fetch the snippet and ensure it's typed correctly
        const snippet = await CodeSnippet.findById(id) as CodeSnippetDocument | null;

        if (!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }

        // Ensure likes is populated and typed correctly
        // Convert userId to string for comparison
        const hasLiked = snippet.likes.some((likeId: mongoose.Types.ObjectId) => likeId.toString() === userId);

        if (hasLiked) {
            // Unlike the snippet
            snippet.likes = snippet.likes.filter((likeId: mongoose.Types.ObjectId) => likeId.toString() !== userId);
        } else {
            // Like the snippet
            snippet.likes.push(new mongoose.Types.ObjectId(userId));
        }

        await snippet.save();

        return NextResponse.json({ success: true, hasLiked: !hasLiked, likesCount: snippet.likes.length });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to process like action" }, { status: 500 });
    }
}

// src/app/api/snippets/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CodeSnippet from "@/models/CodeSnippet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongoose";

export async function GET() {
    await connectDB();

    try {
        const snippets = await CodeSnippet.find()
            .populate("author", "fullName")
            .sort({ createdAt: -1 });

        const formattedSnippets = snippets.map((snippet) => ({
            id: snippet._id.toString(),
            code: snippet.code,
            language: snippet.language,
            title: snippet.title,
            description: snippet.description,
            likes: (snippet.likes || []).map((likeId: ObjectId) => likeId.toString()),
            author: {
                name: snippet.author.fullName,
                avatar: null,
            },
        }));

        return NextResponse.json(formattedSnippets);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch code snippets" },
            { status: 500 }
        );
    }
}


export async function POST(request: Request) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { title, code, language, description } = await request.json();

    if (!title || !code || !language) {
        return NextResponse.json(
            { error: "Title, code, and language are required" },
            { status: 400 }
        );
    }

    try {
        const newSnippet = new CodeSnippet({
            title,
            code,
            language,
            description,
            author: session.user.id,
        });

        await newSnippet.save();

        return NextResponse.json({ success: true, snippet: newSnippet });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to upload code snippet" },
            { status: 500 }
        );
    }
}

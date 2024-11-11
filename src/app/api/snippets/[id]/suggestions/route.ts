import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Suggestion from "@/models/Suggestion";
import CodeSnippet from "@/models/CodeSnippet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Params {
    params: {
        id: string;
    };
}

// GET: Fetch suggestions for a specific code snippet
export async function GET(request: Request, { params }: Params) {
    await connectDB();

    const { id } = params;

    try {
        const suggestions = await Suggestion.find({ codeSnippet: id })
            .populate("author", "fullName")
            .sort({ createdAt: 1 });

        return NextResponse.json(suggestions);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch suggestions" },
            { status: 500 }
        );
    }
}

// POST: Add a new suggestion to a code snippet
export async function POST(request: Request, { params }: Params) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { content } = await request.json();

    if (!content) {
        return NextResponse.json(
            { error: "Content is required" },
            { status: 400 }
        );
    }

    try {
        const newSuggestion = new Suggestion({
            content,
            author: session.user.id,
            codeSnippet: id,
        });

        await newSuggestion.save();

        // Optionally, update the snippet's suggestions array
        await CodeSnippet.findByIdAndUpdate(id, {
            $push: { suggestions: newSuggestion._id },
        });

        return NextResponse.json({ success: true, suggestion: newSuggestion });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to submit suggestion" },
            { status: 500 }
        );
    }
}


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Suggestion from "@/models/Suggestion";
import CodeSnippet from "@/models/CodeSnippet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Params {
    params: {
        id: string;
        suggestionId: string;
    };
}

// PATCH: Approve or reject a suggestion
export async function PATCH(request: Request, { params }: Params) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, suggestionId } = params;
    const { action } = await request.json(); // action: "approve" or "reject"

    if (!action || !["approve", "reject"].includes(action)) {
        return NextResponse.json(
            { error: "Invalid action" },
            { status: 400 }
        );
    }

    try {
        // Find the code snippet
        const snippet = await CodeSnippet.findById(id);

        if (!snippet) {
            return NextResponse.json(
                { error: "Snippet not found" },
                { status: 404 }
            );
        }

        // Check if the current user is the author of the snippet
        if (snippet.author.toString() !== session.user.id) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        const suggestion = await Suggestion.findById(suggestionId);

        if (!suggestion) {
            return NextResponse.json(
                { error: "Suggestion not found" },
                { status: 404 }
            );
        }

        if (action === "approve") {
            // Update the code snippet with the suggested content
            snippet.code = suggestion.content;
            await snippet.save();

            // Optionally, remove the suggestion
            await suggestion.remove();

            return NextResponse.json({ success: true, message: "Suggestion approved" });
        } else if (action === "reject") {
            // Remove the suggestion
            await suggestion.remove();

            return NextResponse.json({ success: true, message: "Suggestion rejected" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to process suggestion" },
            { status: 500 }
        );
    }
}

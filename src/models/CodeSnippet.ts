// src/models/CodeSnippet.ts


import mongoose, { Schema, model, Document } from "mongoose";

export interface CodeSnippetDocument extends Document {
    title: string;
    code: string;
    language: string;
    description?: string;
    author: mongoose.Types.ObjectId;
    comments: mongoose.Types.ObjectId[]; // Reference to Comment documents
    suggestions: mongoose.Types.ObjectId[]; // Reference to Suggestion documents
    likes: mongoose.Types.ObjectId[]; // Reference to User documents who liked the snippet
    createdAt: Date;
    updatedAt: Date;
}

const CodeSnippetSchema = new Schema<CodeSnippetDocument>(
    {
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        suggestions: [{ type: Schema.Types.ObjectId, ref: "Suggestion" }],
        likes: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], default: [] }, // Added default value
    },
    {
        timestamps: true,
    }
);

const CodeSnippet =
    mongoose.models.CodeSnippet ||
    model<CodeSnippetDocument>("CodeSnippet", CodeSnippetSchema);

export default CodeSnippet;

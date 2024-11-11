import mongoose, { Schema, model, Document } from "mongoose";

export interface CommentDocument extends Document {
    content: string;
    lineNumber: number;
    author: mongoose.Types.ObjectId;
    codeSnippet: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<CommentDocument>(
    {
        content: {
            type: String,
            required: true,
        },
        lineNumber: {
            type: Number,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        codeSnippet: {
            type: Schema.Types.ObjectId,
            ref: "CodeSnippet",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Comment =
    mongoose.models.Comment || model<CommentDocument>("Comment", CommentSchema);

export default Comment;

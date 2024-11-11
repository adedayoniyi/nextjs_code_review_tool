import mongoose, { Schema, model, Document } from "mongoose";

export interface SuggestionDocument extends Document {
    content: string;
    author: mongoose.Types.ObjectId;
    codeSnippet: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const SuggestionSchema = new Schema<SuggestionDocument>(
    {
        content: {
            type: String,
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

const Suggestion =
    mongoose.models.Suggestion ||
    model<SuggestionDocument>("Suggestion", SuggestionSchema);

export default Suggestion;

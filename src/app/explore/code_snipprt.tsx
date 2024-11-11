"use client";

import React, { useState, useEffect } from "react";
import {
    FaRegCommentDots,
    FaThumbsUp,
    FaLightbulb,
    FaCheck,
    FaTimes,
    FaCommentDots,
} from "react-icons/fa";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Comment {
    _id: string;
    content: string;
    lineNumber: number;
    author: {
        fullName: string;
    };
}

interface Suggestion {
    _id: string;
    content: string;
    author: {
        fullName: string;
    };
}

interface CodeSnippetProps {
    id: string;
    code: string;
    language: string;
    title: string;
    description?: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
    id,
    code,
    language,
    title,
    description,
    author,
}) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedLine, setSelectedLine] = useState<number | null>(null);
    const [commentContent, setCommentContent] = useState("");
    const [showSuggestionModal, setShowSuggestionModal] = useState(false);
    const [suggestionContent, setSuggestionContent] = useState("");
    const [expandedSuggestions, setExpandedSuggestions] = useState<boolean>(false);
    const { data: session } = useSession();

    useEffect(() => {
        // Fetch comments and suggestions for this snippet
        const fetchData = async () => {
            try {
                const [commentsRes, suggestionsRes] = await Promise.all([
                    axios.get(`/api/snippets/${id}/comments`),
                    axios.get(`/api/snippets/${id}/suggestions`),
                ]);

                setComments(commentsRes.data);
                setSuggestions(suggestionsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleLineClick = (lineNumber: number) => {
        if (!session) {
            alert("Please login to add comments.");
            return;
        }
        setSelectedLine(lineNumber);
    };

    const handleCommentSubmit = async () => {
        if (!commentContent.trim()) return;

        try {
            const res = await axios.post(`/api/snippets/${id}/comments`, {
                content: commentContent,
                lineNumber: selectedLine,
            });

            if (res.data.success) {
                setComments([...comments, res.data.comment]);
                setCommentContent("");
                setSelectedLine(null);
            } else {
                // Handle error
                alert(res.data.error || "Failed to add comment");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleSuggestionSubmit = async () => {
        if (!suggestionContent.trim()) return;

        try {
            const res = await axios.post(`/api/snippets/${id}/suggestions`, {
                content: suggestionContent,
            });

            if (res.data.success) {
                setSuggestions([...suggestions, res.data.suggestion]);
                setSuggestionContent("");
                setShowSuggestionModal(false);
            } else {
                // Handle error
                alert(res.data.error || "Failed to submit suggestion");
            }
        } catch (error) {
            console.error("Error submitting suggestion:", error);
        }
    };

    const handleSuggestionAction = async (
        suggestionId: string,
        action: "approve" | "reject"
    ) => {
        try {
            const res = await axios.patch(
                `/api/snippets/${id}/suggestions/${suggestionId}`,
                { action }
            );

            if (res.data.success) {
                // Remove the suggestion from the list
                setSuggestions(suggestions.filter((s) => s._id !== suggestionId));

                // If approved, update the code (if action was 'approve')
                if (action === "approve") {
                    // For simplicity, we'll refetch the code snippet data
                    // In a real implementation, you might update the code state directly
                    window.location.reload();
                }
            } else {
                // Handle error
                alert(res.data.error || "Failed to process suggestion");
            }
        } catch (error) {
            console.error("Error processing suggestion:", error);
        }
    };

    // Create a map of line numbers to comments for quick access
    const commentsMap: { [key: number]: Comment[] } = comments.reduce(
        (acc, comment) => {
            if (!acc[comment.lineNumber]) {
                acc[comment.lineNumber] = [];
            }
            acc[comment.lineNumber].push(comment);
            return acc;
        },
        {} as { [key: number]: Comment[] }
    );

    // Split the code into lines
    const codeLines = code.split("\n");

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 relative">
            {/* Navbar can be positioned here or at a higher level */}
            <div className="flex items-center mb-4">
                {author.avatar ? (
                    <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-10 h-10 rounded-full"
                    />
                ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                        {author.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="ml-3">
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                    <p className="text-gray-400 text-sm">
                        By {author.name} • Language: {language}
                    </p>
                </div>
            </div>
            {description && <p className="mt-4 text-gray-300">{description}</p>}
            <div className="code-container overflow-auto mt-4 bg-gray-900 p-4 rounded relative">
                {/* Overlay for line numbers and comment icons */}
                <div className="absolute inset-0 pointer-events-none">
                    {codeLines.map((line, index) => {
                        const lineNumber = index + 1;
                        const hasComments = commentsMap[lineNumber]?.length > 0;

                        return (
                            <div
                                key={index}
                                className="absolute left-0 top-0"
                                style={{ top: index * 24, height: 24 }}
                            >
                                <button
                                    onClick={() => handleLineClick(lineNumber)}
                                    className={`absolute -left-8 top-0 h-full w-8 flex items-center justify-center text-xs cursor-pointer ${hasComments
                                            ? "text-indigo-500"
                                            : "text-gray-500 hover:bg-gray-700"
                                        } group`}
                                    title={hasComments ? "View comments" : "Add a comment"}
                                >
                                    {/* Show comment icon on hover */}
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {hasComments ? <FaCommentDots /> : lineNumber}
                                    </span>
                                    {/* Always show line number when no comments */}
                                    {!hasComments && (
                                        <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                            {lineNumber}
                                        </span>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <SyntaxHighlighter
                    language={language}
                    style={darcula}
                    showLineNumbers
                    wrapLines
                    lineProps={(lineNumber) => {
                        const isSelected = selectedLine === lineNumber;
                        return {
                            style: {
                                backgroundColor: isSelected ? "#44475a" : undefined,
                                position: "relative",
                            },
                        };
                    }}
                    customStyle={{
                        margin: 0,
                        padding: "0 1rem",
                        background: "none",
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
            {/* Display comments for the selected line */}
            {selectedLine && (
                <div className="mt-4">
                    {session ? (
                        <>
                            <p className="text-gray-300">
                                Commenting on line {selectedLine}
                            </p>
                            <textarea
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                className="w-full p-2 bg-gray-700 rounded mt-2"
                                placeholder="Add your comment..."
                            />
                            <div className="flex items-center space-x-2 mt-2">
                                <button
                                    onClick={handleCommentSubmit}
                                    className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedLine(null);
                                        setCommentContent("");
                                    }}
                                    className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-red-500">
                            Please <Link href="/login">login</Link> to add comments.
                        </p>
                    )}
                </div>
            )}
            {/* Action Buttons */}
            <div className="flex items-center mt-4 space-x-4">
                <button className="text-gray-400 hover:text-white flex items-center">
                    <FaThumbsUp className="mr-1" /> Like
                </button>
                <button
                    className="text-gray-400 hover:text-white flex items-center"
                    onClick={() => setShowSuggestionModal(true)}
                >
                    <FaLightbulb className="mr-1" /> Suggest Changes
                </button>
                {suggestions.length > 0 && (
                    <button
                        className="text-gray-400 hover:text-white flex items-center"
                        onClick={() => setExpandedSuggestions(!expandedSuggestions)}
                    >
                        <FaRegCommentDots className="mr-1" /> {suggestions.length} Suggestion
                        {suggestions.length > 1 ? "s" : ""}
                    </button>
                )}
            </div>
            {/* Suggestions Section */}
            {expandedSuggestions && (
                <div className="mt-4 bg-gray-900 p-4 rounded">
                    <h3 className="text-lg font-semibold text-white mb-2">Suggestions</h3>
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion._id}
                            className="p-3 bg-gray-800 rounded mb-2"
                        >
                            <p className="text-gray-200 mb-2">
                                <strong>{suggestion.author.fullName}:</strong>
                            </p>
                            <pre className="bg-gray-700 p-2 rounded text-gray-100 whitespace-pre-wrap">
                                {suggestion.content}
                            </pre>
                            {/* Only the snippet author can approve or reject suggestions */}
                            {session?.user?.id === author.id && (
                                <div className="flex items-center space-x-2 mt-2">
                                    <button
                                        onClick={() =>
                                            handleSuggestionAction(suggestion._id, "approve")
                                        }
                                        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition flex items-center"
                                    >
                                        <FaCheck className="mr-1" /> Approve
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSuggestionAction(suggestion._id, "reject")
                                        }
                                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition flex items-center"
                                    >
                                        <FaTimes className="mr-1" /> Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {/* Suggestion Modal */}
            {showSuggestionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-11/12 max-w-md">
                        <h2 className="text-xl font-bold mb-4">Suggest Changes</h2>
                        {session ? (
                            <>
                                <textarea
                                    value={suggestionContent}
                                    onChange={(e) => setSuggestionContent(e.target.value)}
                                    className="w-full p-2 bg-gray-700 rounded"
                                    rows={10}
                                    placeholder="Enter your suggested code..."
                                />
                                <div className="flex items-center space-x-2 mt-4">
                                    <button
                                        onClick={handleSuggestionSubmit}
                                        className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowSuggestionModal(false);
                                            setSuggestionContent("");
                                        }}
                                        className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-red-500">
                                Please <Link href="/login">login</Link> to suggest changes.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeSnippet;

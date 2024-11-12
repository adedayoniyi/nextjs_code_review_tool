"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import ExploreNavBar from "@/components/ExploreNavbar";
import Editor from "@monaco-editor/react"; // Importing Monaco Editor

const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    // Add more languages as needed
];

const UploadPage: React.FC = () => {
    const { status } = useSession();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [code, setCode] = useState<string>(""); // State to hold code input
    const [language, setLanguage] = useState<string>("javascript"); // Default language

    // Redirect unauthenticated users to login page
    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        // const code = formData.get("code") as string; // Removed, using state instead
        // const language = formData.get("language") as string; // Removed, using state instead
        const description = formData.get("description") as string;

        if (!title || !code || !language) {
            setError("Please fill out all required fields.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("/api/snippets", {
                title,
                code,
                language,
                description,
            });

            if (res.data.success) {
                // Redirect to explore page or snippet detail page
                router.push("/explore");
            } else {
                setError(res.data.error);
            }
        } catch (err) {
            // setError(err.response?.data?.error || "An error occurred");
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleEditorChange = (value: string | undefined) => {
        setCode(value || "");
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <ExploreNavBar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6">Upload Code Snippet</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium mb-2">Title *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2">Language *</label>
                        <select
                            name="language"
                            value={language}
                            onChange={handleLanguageChange}
                            required
                            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none"
                        >
                            <option value="">Select a language</option>
                            {languageOptions.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2">Code *</label>
                        <div className="bg-gray-800 rounded border border-gray-700">
                            <Editor
                                height="300px"
                                defaultLanguage={language}
                                language={language}
                                value={code}
                                theme="vs-dark"
                                onChange={handleEditorChange}
                                options={{
                                    automaticLayout: true,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    scrollBeyondLastLine: false,
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2">Description (Optional)</label>
                        <textarea
                            name="description"
                            rows={4}
                            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 rounded hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadPage;

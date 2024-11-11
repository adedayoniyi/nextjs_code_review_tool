"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBell, FaCog } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar: React.FC = () => {
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-900 px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">
                CodeReviewTool
            </Link>

            <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white">
                    <FaBell size={20} />
                </button>
                <button className="text-gray-400 hover:text-white">
                    <FaCog size={20} />
                </button>
                <Link href="/profile">
                    {session?.user?.image ? (
                        <Image
                            src={session.user.image}
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
                            {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}
                </Link>
            </div>
        </nav>
    );
};




import { FaPlus } from "react-icons/fa";
import axios from "axios";
import CodeSnippet from "./code_snipprt";

interface Snippet {
    id: string;
    code: string;
    language: string;
    title: string;
    description: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
}

const ExplorePage: React.FC = () => {
    const [snippets, setSnippets] = useState<Snippet[]>([]);

    useEffect(() => {
        // Fetch code snippets from the API
        const fetchSnippets = async () => {
            try {
                const response = await axios.get("/api/snippets");
                setSnippets(response.data);
            } catch (error) {
                console.error("Error fetching snippets:", error);
            }
        };

        fetchSnippets();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                {snippets.map((snippet) => (
                    <CodeSnippet
                        key={snippet.id}
                        id={snippet.id}
                        code={snippet.code}
                        language={snippet.language}
                        title={snippet.title}
                        description={snippet.description}
                        author={snippet.author}
                    />
                ))}
            </div>

            {/* Floating Action Button */}
            <Link href="/upload">
                <button
                    className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
                    aria-label="Upload Code Snippet"
                >
                    <FaPlus size={24} />
                </button>
            </Link>
        </div>
    );
};

export default ExplorePage;
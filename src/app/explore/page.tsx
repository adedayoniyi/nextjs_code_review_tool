'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { FaPlus } from "react-icons/fa"
import axios from "axios"
import CodeSnippet from "./code_snipprt"
import ExploreNavBar from "@/components/ExploreNavbar"

interface Snippet {
    id: string
    code: string
    language: string
    title: string
    description: string
    author: {
        id: string
        name: string
        avatar?: string
    }
}

export default function ExplorePage() {
    const [snippets, setSnippets] = useState<Snippet[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const response = await axios.get("/api/snippets")
                setSnippets(response.data)
            } catch (error) {
                console.error("Error fetching snippets:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSnippets()
    }, [])

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <ExploreNavBar />
            <div className="container mx-auto px-4 py-6">
                {isLoading ? (
                    // Skeleton loader
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6 mb-6 animate-pulse">
                            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                            <div className="h-32 bg-gray-700 rounded mb-4"></div>
                            <div className="flex items-center space-x-2">
                                <div className="rounded-full bg-gray-700 h-8 w-8"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    snippets.map((snippet) => (
                        <CodeSnippet
                            key={snippet.id}
                            id={snippet.id}
                            code={snippet.code}
                            language={snippet.language}
                            title={snippet.title}
                            description={snippet.description}
                            author={snippet.author}
                        />
                    ))
                )}
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
    )
}
"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-b from-gray-900 to-black shadow-md fixed w-full z-20 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gray-100 hover:text-gray-300 transition-colors duration-300">
                    CodeReviewTool
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link href="#features" className="text-gray-200 hover:text-gray-400 transition-colors duration-300">
                        Features
                    </Link>
                    <Link href="#how-to-use" className="text-gray-200 hover:text-gray-400 transition-colors duration-300">
                        How to Use
                    </Link>
                    <Link href="/login" className="text-gray-200 hover:text-gray-400 transition-colors duration-300">
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-indigo-600 transition duration-300"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="text-gray-200 hover:text-gray-400 focus:outline-none transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            // Close Icon
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger Icon
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 py-4 rounded-b-lg shadow-lg">
                    <Link href="#features" className="block px-4 py-2 text-gray-200 hover:text-gray-400 transition-colors duration-300">
                        Features
                    </Link>
                    <Link href="#how-to-use" className="block px-4 py-2 text-gray-200 hover:text-gray-400 transition-colors duration-300">
                        How to Use
                    </Link>
                    <Link href="/login" className="block px-4 py-2 text-gray-200 hover:text-gray-400 transition-colors duration-300">
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="block px-4 py-2 mt-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-center rounded hover:from-purple-700 hover:to-indigo-600 transition duration-300"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

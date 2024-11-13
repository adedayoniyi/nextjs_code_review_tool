'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`fixed w-full z-20 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="text-2xl font-bold text-gray-100 hover:text-gray-300 transition-colors duration-300">
                        CodeReviewTool
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink href="#features">Features</NavLink>
                        <NavLink href="#how-to-use">How to Use</NavLink>
                        <NavLink href="/login">Login</NavLink>
                        <Link
                            href="/signup"
                            className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-indigo-600 transition duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-200 hover:text-gray-400 focus:outline-none transition-colors duration-300"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="py-2 space-y-1">
                        <MobileNavLink href="#features" onClick={toggleMenu}>
                            Features
                        </MobileNavLink>
                        <MobileNavLink href="#how-to-use" onClick={toggleMenu}>
                            How to Use
                        </MobileNavLink>
                        <MobileNavLink href="/login" onClick={toggleMenu}>
                            Login
                        </MobileNavLink>
                        <Link
                            href="/signup"
                            className="block w-full text-center px-4 py-2 mt-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full hover:from-purple-700 hover:to-indigo-600 transition duration-300"
                            onClick={toggleMenu}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-gray-200 hover:text-gray-400 transition-colors duration-300">
            {children}
        </Link>
    )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-300 rounded-md"
            onClick={onClick}
        >
            {children}
        </Link>
    )
}
"use client";

import React from "react";
import Link from "next/link";
import { FaBell, FaCog } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ExploreNavBar: React.FC = () => {
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

export default ExploreNavBar;

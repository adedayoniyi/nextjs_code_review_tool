"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

// Utility function to generate a consistent color based on a string (e.g., user name)
const getAvatarColor = (name: string): string => {
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500",
        "bg-orange-500",
        "bg-gray-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

// Utility function to extract initials from the user's name
const getInitials = (name: string): string => {
    const namesArray = name.trim().split(" ");
    if (namesArray.length === 0) return "";
    if (namesArray.length === 1) return namesArray[0].charAt(0).toUpperCase();
    return (
        namesArray[0].charAt(0).toUpperCase() +
        namesArray[namesArray.length - 1].charAt(0).toUpperCase()
    );
};

// Placeholder Navbar component (replace with your actual Navbar)
const Navbar: React.FC = () => (
    <nav className="bg-gray-800 p-4">
        <h1 className="text-white text-xl">My App</h1>
    </nav>
);

const ProfilePage: React.FC = () => {
    const { data: session, status } = useSession();

    // Handle loading state
    if (status === "loading") {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
                <p>Loading...</p>
            </div>
        );
    }

    // If the user is not authenticated, you might want to redirect or show a message
    if (!session) {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
                <p>You are not logged in.</p>
            </div>
        );
    }

    const user = session.user;
    const avatarColor = user.name ? getAvatarColor(user.name) : "bg-gray-500";
    const initials = user.name ? getInitials(user.name) : "U";
    const userRole = user.role ? user.role : "User"; // Default role

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Navbar */}
            <Navbar />

            {/* Profile Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex flex-col items-center">
                        {/* User Avatar */}
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User Avatar"}
                                width={100}
                                height={100}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div
                                className={`w-24 h-24 ${avatarColor} rounded-full flex items-center justify-center text-4xl text-white`}
                            >
                                {initials}
                            </div>
                        )}

                        {/* User Name */}
                        <h2 className="mt-4 text-2xl font-semibold">
                            {user.name || "User Name"}
                        </h2>

                        {/* User Email */}
                        <p className="mt-2 text-gray-400">{user.email}</p>

                        {/* User Role */}
                        <p className="mt-1 text-gray-300 italic">{userRole}</p>

                        {/* Logout Button */}
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="mt-6 w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

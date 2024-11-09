"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSignOut = () => {
        signOut({ redirect: false }).then(() => {
            router.push("/");
        });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-4xl font-bold">Welcome to Code Review Tool</h1>
            {status === "authenticated" ? (
                <div className="mt-4">
                    <p>Hello, {session.user?.name}</p>
                    <button
                        onClick={handleSignOut}
                        className="mt-2 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => router.push("/login")}
                    className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
                >
                    Sign In
                </button>
            )}
        </main>
    );
}

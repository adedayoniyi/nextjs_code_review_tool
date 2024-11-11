"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError(res.error);
        }
        if (res?.ok) {
            router.push("/explore");
        }
    };

    return (
        <section className="w-full h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="p-6 w-full max-w-md flex flex-col items-center gap-4 bg-gray-800 rounded shadow-lg"
            >
                {error && <div className="text-red-500">{error}</div>}
                <h1 className="text-3xl font-bold text-white">Login</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full h-12 px-4 bg-gray-700 text-white rounded focus:outline-none"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full h-12 px-4 bg-gray-700 text-white rounded focus:outline-none"
                />

                <button
                    type="submit"
                    className="w-full h-12 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    Login
                </button>

                <p className="text-gray-400">
                    Dont have an account?{" "}
                    <Link href="/signup" className="text-indigo-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </section>
    );
}

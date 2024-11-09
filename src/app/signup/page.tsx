"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        const formData = new FormData(event.currentTarget);
        const fullName = formData.get("fullName") as string;
        const developerRole = formData.get("developerRole") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("/api/auth/register", {
                fullName,
                developerRole,
                email,
                password,
            });

            if (res.data.success) {
                // Redirect to OTP verification page
                router.push("/verify-otp?email=" + encodeURIComponent(email));
            } else {
                setError(res.data.error);
            }
        } catch (err) {
            //   setError(err?.response.data?.error || "An error occurred");
            setError("An error occurred");

        }
    };

    return (
        <section className="w-full h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="p-6 w-full max-w-md flex flex-col items-center gap-4 bg-gray-800 rounded shadow-lg"
            >
                {error && <div className="text-red-500">{error}</div>}
                <h1 className="text-3xl font-bold text-white">Sign Up</h1>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    className="w-full h-12 px-4 bg-gray-700 text-white rounded focus:outline-none"
                />

                <input
                    type="text"
                    name="developerRole"
                    placeholder="Developer Role"
                    required
                    className="w-full h-12 px-4 bg-gray-700 text-white rounded focus:outline-none"
                />

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

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className="w-full h-12 px-4 bg-gray-700 text-white rounded focus:outline-none"
                />

                <button
                    type="submit"
                    className="w-full h-12 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    Sign Up
                </button>

                <p className="text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-500 hover:underline">
                        Sign In
                    </a>
                </p>
            </form>
        </section>
    );
}

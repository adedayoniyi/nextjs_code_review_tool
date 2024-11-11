"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true); // Start loading
        const formData = new FormData(event.currentTarget);
        const fullName = formData.get("fullName") as string;
        const developerRole = formData.get("developerRole") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false); // Stop loading
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
            // setError(err?.response.data?.error || "An error occurred");
            setError("An error occurred");
        } finally {
            setIsLoading(false); // Stop loading in both success and error
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
                    disabled={isLoading} // Disable button when loading
                    className={`w-full h-12 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition flex items-center justify-center ${isLoading ? "cursor-not-allowed opacity-50" : ""
                        }`}
                >
                    {isLoading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            Signing Up...
                        </>
                    ) : (
                        "Sign Up"
                    )}
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

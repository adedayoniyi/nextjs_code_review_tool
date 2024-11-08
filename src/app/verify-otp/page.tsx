"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyOTP() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        const formData = new FormData(event.currentTarget);
        const otp = formData.get("otp") as string;

        try {
            const res = await axios.post("/api/auth/verify-otp", { email, otp });

            if (res.data.success) {
                // Redirect to login page
                router.push("/login");
            } else {
                setError(res.data.error);
            }
        } catch (err) {
            //   setError(err.response?.data?.error || "An error occurred");
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
                <h1 className="text-3xl font-bold text-white">Verify Your Account</h1>
                <p className="text-gray-400">Enter the OTP sent to {email}</p>

                <input
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    required
                    className="w-full h-12 px-4 bg-gray-700 text-white rounded focus:outline-none"
                />

                <button
                    type="submit"
                    className="w-full h-12 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    Verify
                </button>
            </form>
        </section>
    );
}

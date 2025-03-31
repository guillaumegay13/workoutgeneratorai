"use client";

import { useState } from "react";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setStatus({
                type: "error",
                message: "Please enter a valid email address."
            });
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        try {
            // In a real app, you would send this to your API/backend
            // For demo purposes, we're simulating a successful API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setStatus({
                type: "success",
                message: "Thank you for subscribing! Check your email for fitness tips."
            });
            setEmail("");
        } catch (error) {
            setStatus({
                type: "error",
                message: "Something went wrong. Please try again later."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">Get Fitness Tips & Updates</h3>
                <p className="text-blue-100 mb-4">Join our newsletter for workout tips, nutrition advice, and early access to new features.</p>

                {status && (
                    <div className={`text-sm p-3 rounded-md ${status.type === "success"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                        {status.message}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
              py-3 px-6 rounded-lg font-semibold text-sm whitespace-nowrap
              ${isSubmitting
                                ? "bg-blue-400 text-white cursor-not-allowed"
                                : "bg-white text-blue-600 hover:bg-blue-50"
                            }
            `}
                    >
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </button>
                </div>

                <p className="text-blue-200 text-xs">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </form>
        </div>
    );
} 
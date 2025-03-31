"use client";

import { useState } from "react";

export default function WorkoutForm() {
    const [formData, setFormData] = useState({
        goal: "Lose weight",
        fitnessLevel: "Beginner",
        equipment: "Full gym",
        workoutsPerWeek: "2-3 days",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            // In a real app, this would be an API call to your backend
            // For demo purposes, we're just simulating a delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Show success message
            setMessage({
                type: "success",
                text: "Your personalized workout plan is ready! Check your email.",
            });

            // TODO: In production, redirect to workout plan page or open modal
        } catch (error) {
            setMessage({
                type: "error",
                text: "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
            {message && (
                <div
                    className={`mb-6 p-4 rounded-lg ${message.type === "success"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        What's your fitness goal?
                    </label>
                    <select
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                        <option value="Lose weight">Lose weight</option>
                        <option value="Build muscle">Build muscle</option>
                        <option value="Improve endurance">Improve endurance</option>
                        <option value="General fitness">General fitness</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your fitness level:
                    </label>
                    <select
                        id="fitnessLevel"
                        name="fitnessLevel"
                        value={formData.fitnessLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Available equipment:
                    </label>
                    <select
                        id="equipment"
                        name="equipment"
                        value={formData.equipment}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                        <option value="Full gym">Full gym</option>
                        <option value="Basic home equipment">Basic home equipment</option>
                        <option value="No equipment">No equipment</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="workoutsPerWeek" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Workouts per week:
                    </label>
                    <select
                        id="workoutsPerWeek"
                        name="workoutsPerWeek"
                        value={formData.workoutsPerWeek}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                        <option value="2-3 days">2-3 days</option>
                        <option value="4-5 days">4-5 days</option>
                        <option value="6-7 days">6-7 days</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-medium text-lg py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl flex justify-center items-center`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        "Generate My Workout Plan"
                    )}
                </button>
            </form>
        </div>
    );
} 
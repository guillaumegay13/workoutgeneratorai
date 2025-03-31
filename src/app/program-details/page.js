"use client";

import Link from "next/link";

export default function ProgramDetails() {
    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <Link href="/create-program" className="text-gray-500 hover:text-gray-700 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-semibold text-center">
                            Program Details ✨
                        </h1>
                        <div className="w-6"></div> {/* Empty div for spacing */}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Your Workout Program</h2>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                Beginner
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-medium text-gray-800 mb-2">Selected Equipment</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Dumbbells</span>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Kettlebells</span>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Resistance bands</span>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-medium text-gray-800 mb-2">Workout Days</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Monday</span>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Wednesday</span>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Friday</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 mb-6">
                        <h3 className="font-medium text-gray-800 mb-4">Workout Schedule</h3>

                        <div className="space-y-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-800">Monday</h4>
                                    <span className="text-sm text-gray-500">Upper Body</span>
                                </div>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                                        <span>Dumbbell Bench Press - 3 sets of 10 reps</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                                        <span>Seated Rows - 3 sets of 12 reps</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                                        <span>Shoulder Press - 3 sets of 10 reps</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-800">Wednesday</h4>
                                    <span className="text-sm text-gray-500">Lower Body</span>
                                </div>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                                        <span>Goblet Squats - 3 sets of 12 reps</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                                        <span>Romanian Deadlifts - 3 sets of 10 reps</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                                        <span>Lunges - 3 sets of 10 reps per leg</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-800">Friday</h4>
                                    <span className="text-sm text-gray-500">Full Body</span>
                                </div>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                                        <span>Kettlebell Swings - 3 sets of 15 reps</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                                        <span>Push-ups - 3 sets of 12 reps</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                                        <span>Resistance Band Rows - 3 sets of 15 reps</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col space-y-3">
                        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                            Save Program
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>

                        <Link
                            href="/"
                            className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 
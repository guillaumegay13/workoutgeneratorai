"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useOnboarding } from "@/app/context/OnboardingContext";

const coaches = [
    {
        id: "coach_kate",
        name: "Kate",
        specialty: "Fitness & Wellness",
        description: "Weight loss, toning and general well-being.",
        image: "/coaches/coach_kate.jpg",
        bgColor: "bg-red-100",
    },
    {
        id: "coach_rory",
        name: "Rory",
        specialty: "Functional Training & Hyrox",
        description: "Functional movements and muscle endurance.",
        image: "/coaches/coach_rory.jpg",
        bgColor: "bg-blue-100",
    },
    {
        id: "coach_matt",
        name: "Matt",
        specialty: "Strength & Conditioning",
        description: "Muscle gain and athletic power.",
        image: "/coaches/coach_matt.jpg",
        bgColor: "bg-green-100",
    },
];

export default function CoachSelection() {
    const { onboardingData, updateOnboardingData } = useOnboarding();
    const [selectedCoach, setSelectedCoach] = useState(onboardingData.coach_id || null);

    const handleCoachSelect = (coachId) => {
        setSelectedCoach(coachId);
        updateOnboardingData({
            coach_id: coachId
        });

        console.log('Coach selected:', {
            coach_id: coachId,
            onboardingData: {
                ...onboardingData,
                coach_id: coachId
            }
        });
    };

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with progress indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-semibold text-center">
                            Choose your Coach ✨
                        </h1>
                        <div className="w-6"></div>
                    </div>

                    {/* Progress indicator - unified style */}
                    <div className="flex items-center justify-center gap-1.5 mt-6">
                        <div className="w-8 h-2 rounded-full bg-blue-500"></div>
                        <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                    {/* Coach selection grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {coaches.map((coach) => (
                            <div
                                key={coach.id}
                                className={`border rounded-xl p-6 cursor-pointer transition hover:shadow-lg ${selectedCoach === coach.id
                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                                    : "border-gray-200 hover:border-blue-300"
                                    }`}
                                onClick={() => handleCoachSelect(coach.id)}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className={`w-24 h-24 rounded-full overflow-hidden mb-4 ${coach.bgColor}`}>
                                        <Image
                                            src={coach.image}
                                            alt={coach.name}
                                            width={96}
                                            height={96}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">{coach.name}</h3>
                                    <p className="text-blue-600 font-medium text-sm">{coach.specialty}</p>
                                    <p className="text-gray-600 mt-2">{coach.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation - unified style */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Previous
                    </Link>

                    <Link
                        href={selectedCoach ? "/onboarding/personal-info" : "#"}
                        onClick={(e) => !selectedCoach && e.preventDefault()}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white ${selectedCoach
                            ? "bg-gray-900 hover:bg-gray-800"
                            : "bg-gray-300 cursor-not-allowed"
                            }`}
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
} 
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useOnboarding } from "@/app/context/OnboardingContext";

// Helper function to calculate age from birth date
const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

export default function PersonalInfo() {
    const router = useRouter();
    const { onboardingData, updateOnboardingData } = useOnboarding();
    const [birthDate, setBirthDate] = useState(onboardingData.birth_date || "01 Jan 2000");
    const [gender, setGender] = useState(onboardingData.gender || "Male");
    const [heightUnit, setHeightUnit] = useState(onboardingData.height_unit || "cm");
    const [height, setHeight] = useState(onboardingData.height || "180");
    const [weightUnit, setWeightUnit] = useState(onboardingData.weight_unit || "kg");
    const [weight, setWeight] = useState(onboardingData.weight || "64");

    // Format date function for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";

        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    // Handle date change
    const handleDateChange = (e) => {
        const inputDate = new Date(e.target.value);
        if (!isNaN(inputDate.getTime())) {
            const formattedDate = formatDate(inputDate);
            setBirthDate(formattedDate);

            // Calculate age and update both birth_date and age
            const age = calculateAge(inputDate);
            handleChange('birth_date', formattedDate);
            handleChange('age', age);

            console.log('Birth date changed:', {
                birth_date: formattedDate,
                calculated_age: age
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        if (!birthDate || !gender || !height || !weight) {
            alert("Please fill in all required fields");
            return;
        }

        // Validate height and weight are numbers
        if (isNaN(parseFloat(height)) || isNaN(parseFloat(weight))) {
            alert("Height and weight must be numbers");
            return;
        }

        // Calculate age from birth date
        const age = calculateAge(new Date(birthDate));

        const updatedData = {
            height,
            weight,
            height_unit: heightUnit,
            weight_unit: weightUnit,
            gender,
            birth_date: birthDate,
            age
        };

        console.log('Personal Info - Next clicked. Data collected:', {
            ...onboardingData,
            ...updatedData
        });

        updateOnboardingData(updatedData);

        // Navigate to next page
        router.push('/onboarding/preferences');
    };

    const handleChange = (field, value) => {
        updateOnboardingData({ [field]: value });
    };

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with progress indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <Link href="/onboarding/coach-selection" className="text-gray-500 hover:text-gray-700 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-semibold text-center">
                            Create a program ✨
                        </h1>
                        <div className="w-6"></div> {/* Empty div for spacing */}
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center justify-center gap-1.5 mt-8">
                        <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-8 h-2 rounded-full bg-blue-500"></div>
                        <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Birth date */}
                    <div>
                        <label htmlFor="birthDate" className="block text-lg font-medium text-gray-800">
                            Birth date <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type="text"
                                id="birthDateDisplay"
                                value={birthDate}
                                readOnly
                                className="w-full h-16 bg-gray-50 rounded-lg pl-4 pr-12 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="date"
                                id="birthDate"
                                onChange={handleDateChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="absolute top-0 right-0 h-full flex items-center pr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Gender selection */}
                    <div>
                        <label className="block text-lg font-medium text-gray-800">
                            Gender <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2 grid grid-cols-1 gap-4">
                            <button
                                type="button"
                                className={`h-16 rounded-lg px-4 flex items-center justify-between ${gender === "Male"
                                    ? "bg-gray-50 border border-gray-200"
                                    : "bg-white border border-gray-200"
                                    }`}
                                onClick={() => setGender("Male")}
                            >
                                <span className="text-gray-800">Male</span>
                                {gender === "Male" && (
                                    <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </button>

                            <button
                                type="button"
                                className={`h-16 rounded-lg px-4 flex items-center justify-between ${gender === "Female"
                                    ? "bg-gray-50 border border-gray-200"
                                    : "bg-white border border-gray-200"
                                    }`}
                                onClick={() => setGender("Female")}
                            >
                                <span className="text-gray-800">Female</span>
                                {gender === "Female" && (
                                    <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Height */}
                    <div>
                        <label className="block text-lg font-medium text-gray-800">
                            Unit
                        </label>
                        <div className="mt-2 grid grid-cols-2 bg-gray-100 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                className={`py-3 px-4 text-center ${heightUnit === "cm"
                                    ? "bg-white text-gray-800"
                                    : "bg-transparent text-gray-500"
                                    }`}
                                onClick={() => setHeightUnit("cm")}
                            >
                                cm
                            </button>
                            <button
                                type="button"
                                className={`py-3 px-4 text-center ${heightUnit === "ft inch"
                                    ? "bg-white text-gray-800"
                                    : "bg-transparent text-gray-500"
                                    }`}
                                onClick={() => setHeightUnit("ft inch")}
                            >
                                ft inch
                            </button>
                        </div>

                        <div className="mt-2">
                            <label htmlFor="height" className="block text-gray-600 text-sm">
                                Size
                            </label>
                            <input
                                type="text"
                                id="height"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full h-16 bg-gray-50 rounded-lg pl-4 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="block text-lg font-medium text-gray-800">
                            Unit
                        </label>
                        <div className="mt-2 grid grid-cols-2 bg-gray-100 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                className={`py-3 px-4 text-center ${weightUnit === "kg"
                                    ? "bg-white text-gray-800"
                                    : "bg-transparent text-gray-500"
                                    }`}
                                onClick={() => setWeightUnit("kg")}
                            >
                                kg
                            </button>
                            <button
                                type="button"
                                className={`py-3 px-4 text-center ${weightUnit === "lbs"
                                    ? "bg-white text-gray-800"
                                    : "bg-transparent text-gray-500"
                                    }`}
                                onClick={() => setWeightUnit("lbs")}
                            >
                                lbs
                            </button>
                        </div>

                        <div className="mt-2">
                            <label htmlFor="weight" className="block text-gray-600 text-sm">
                                Weight
                            </label>
                            <input
                                type="text"
                                id="weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full h-16 bg-gray-50 rounded-lg pl-4 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Next button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-4 px-4 rounded-lg flex items-center justify-center gap-2"
                        >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 
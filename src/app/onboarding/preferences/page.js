"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useOnboarding } from "@/app/context/OnboardingContext";
import { useRouter } from 'next/navigation';

export default function Preferences() {
    const router = useRouter();
    const { onboardingData, updateOnboardingData } = useOnboarding();

    // Initialize state with empty values
    const [level, setLevel] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [days, setDays] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize state from onboardingData after first render
    useEffect(() => {
        if (!isInitialized && onboardingData) {
            setLevel(onboardingData.level || "");
            setEquipment(typeof onboardingData.equipment === 'string' && onboardingData.equipment
                ? onboardingData.equipment.split(',')
                : []);
            setDays(typeof onboardingData.days === 'string' && onboardingData.days
                ? onboardingData.days.split(',')
                : []);
            setIsInitialized(true);
        }
    }, [onboardingData, isInitialized]);

    // Update onboarding data when days change
    useEffect(() => {
        if (isInitialized && days.length >= 0) {
            updateOnboardingData({
                days: days.join(','),
                frequency: days.length
            });

            console.log('Days/Frequency updated:', {
                days: days.join(','),
                frequency: days.length,
                onboardingData: {
                    ...onboardingData,
                    days: days.join(','),
                    frequency: days.length
                }
            });
        }
    }, [days, isInitialized]);

    // Update onboarding data when equipment changes
    useEffect(() => {
        if (isInitialized) {
            updateOnboardingData({
                equipment: equipment.length > 0 ? equipment.join(',') : ''
            });

            console.log('Equipment updated:', {
                equipment: equipment.length > 0 ? equipment.join(',') : '',
                onboardingData: {
                    ...onboardingData,
                    equipment: equipment.length > 0 ? equipment.join(',') : ''
                }
            });
        }
    }, [equipment, isInitialized]);

    const handleLevelSelect = (selectedLevel) => {
        setLevel(selectedLevel);
        updateOnboardingData({ level: selectedLevel });
    };

    const handleEquipmentToggle = (item) => {
        const updatedEquipment = equipment.includes(item)
            ? equipment.filter(equip => equip !== item)
            : [...equipment, item];

        setEquipment(updatedEquipment);
    };

    const handleDayToggle = (day) => {
        const updatedDays = days.includes(day)
            ? days.filter(d => d !== day)
            : [...days, day];

        setDays(updatedDays);
    };

    const isNextEnabled = level && equipment.length > 0 && days.length > 0;

    const handleNext = () => {
        const updatedData = {
            level,
            equipment: equipment.length > 0 ? equipment.join(',') : '',
            days: days.length > 0 ? days.join(',') : '',
            frequency: days.length
        };

        console.log('Preferences - Next clicked. Data collected:', {
            ...onboardingData,
            ...updatedData
        });

        updateOnboardingData(updatedData);
        router.push('/onboarding/chatbot');
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/onboarding/personal-info"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Preferences
                        </h1>
                        <div className="w-6"></div>
                    </div>

                    {/* Progress indicator - unified style */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <div className="w-16 h-1.5 rounded-full bg-gray-200"></div>
                        <div className="w-16 h-1.5 rounded-full bg-gray-200"></div>
                        <div className="w-16 h-1.5 rounded-full bg-blue-500"></div>
                        <div className="w-16 h-1.5 rounded-full bg-gray-200"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                    {/* Level Selection */}
                    <div className="mb-8">
                        <label className="block text-lg font-medium text-gray-800 mb-4">
                            Level <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-3">
                            {["Beginner", "Intermediate", "Advanced"].map((levelOption) => (
                                <button
                                    key={levelOption}
                                    type="button"
                                    onClick={() => handleLevelSelect(levelOption)}
                                    className={`w-full h-16 rounded-lg border ${level === levelOption
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200"
                                        } px-4 flex items-center`}
                                >
                                    <span className="text-gray-800">{levelOption}</span>
                                    {level === levelOption && (
                                        <div className="ml-auto h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Equipment Selection */}
                    <div className="mb-8">
                        <label className="block text-lg font-medium text-gray-800 mb-2">
                            Equipment <span className="text-red-500">*</span>
                        </label>
                        <p className="text-gray-600 mb-4">Select the equipment you have access to.</p>

                        <div className="grid grid-cols-2 gap-3">
                            {["Barbells", "Dumbbells", "Kettlebells", "Resistance bands", "Cable machine", "Weights machines", "Treadmill", "Stationary bike"].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => handleEquipmentToggle(item)}
                                    className={`rounded-lg border px-4 py-3 flex items-center justify-center ${equipment.includes(item)
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200"
                                        }`}
                                >
                                    <span className="text-gray-800">{item}</span>
                                    {equipment.includes(item) && (
                                        <div className="ml-2 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Days of the Week */}
                    <div className="mb-12">
                        <label className="block text-lg font-medium text-gray-800 mb-2">
                            Days of the Week <span className="text-red-500">*</span>
                        </label>
                        <p className="text-gray-600 mb-4">Select the days you plan to work out.</p>

                        <div className="grid grid-cols-3 gap-3">
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => handleDayToggle(day)}
                                    className={`rounded-lg border px-4 py-3 flex items-center justify-center ${days.includes(day)
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200"
                                        }`}
                                >
                                    <span className="text-gray-800">{day.slice(0, 3)}</span>
                                    {days.includes(day) && (
                                        <div className="ml-2 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons - unified style */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <Link
                            href="/onboarding/personal-info"
                            className="flex items-center justify-center gap-2 px-6 py-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Previous
                        </Link>

                        <button
                            onClick={handleNext}
                            disabled={!isNextEnabled}
                            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-white transition-colors ${isNextEnabled
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-200 cursor-not-allowed"
                                }`}
                        >
                            Continue
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 
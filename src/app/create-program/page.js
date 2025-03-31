"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateProgram() {
    const [level, setLevel] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [days, setDays] = useState([]);

    const handleLevelSelect = (selectedLevel) => {
        setLevel(selectedLevel);
    };

    const handleEquipmentToggle = (item) => {
        if (equipment.includes(item)) {
            setEquipment(equipment.filter(equip => equip !== item));
        } else {
            setEquipment([...equipment, item]);
        }
    };

    const handleDayToggle = (day) => {
        if (days.includes(day)) {
            setDays(days.filter(d => d !== day));
        } else {
            setDays([...days, day]);
        }
    };

    const isNextEnabled = level && equipment.length > 0 && days.length > 0;

    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-semibold text-center">
                            Create a program ✨
                        </h1>
                        <div className="w-6"></div> {/* Empty div for spacing */}
                    </div>
                </div>

                {/* Level Selection */}
                <div className="mb-8">
                    <label className="block text-lg font-medium text-gray-800 mb-4">
                        Level <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={() => handleLevelSelect("Beginner")}
                            className={`w-full h-16 rounded-lg border ${level === "Beginner"
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200"
                                } px-4 flex items-center`}
                        >
                            <span className="text-gray-800">Beginner</span>
                            {level === "Beginner" && (
                                <div className="ml-auto h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleLevelSelect("Intermediate")}
                            className={`w-full h-16 rounded-lg border ${level === "Intermediate"
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200"
                                } px-4 flex items-center`}
                        >
                            <span className="text-gray-800">Intermediate</span>
                            {level === "Intermediate" && (
                                <div className="ml-auto h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleLevelSelect("Advanced")}
                            className={`w-full h-16 rounded-lg border ${level === "Advanced"
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200"
                                } px-4 flex items-center`}
                        >
                            <span className="text-gray-800">Advanced</span>
                            {level === "Advanced" && (
                                <div className="ml-auto h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Equipment Selection */}
                <div className="mb-8">
                    <label className="block text-lg font-medium text-gray-800 mb-2">
                        Equipment
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
                        Days of the Week
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

                {/* Navigation buttons */}
                <div className="grid grid-cols-2 gap-4">
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
                        href={isNextEnabled ? "/program-details" : "#"}
                        onClick={(e) => !isNextEnabled && e.preventDefault()}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white ${isNextEnabled
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
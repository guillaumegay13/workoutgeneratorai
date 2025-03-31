"use client";

import { createContext, useContext, useState, useCallback } from 'react';

const OnboardingContext = createContext({});

export function OnboardingProvider({ children }) {
    const [onboardingData, setOnboardingData] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('onboardingData');
            return saved ? JSON.parse(saved) : {
                // User Auth Info
                user_id: '',
                email: '',
                firstname: '',
                photoURL: '',

                // User Info
                age: '',
                gender: '',
                height: '',
                weight: '',
                height_unit: 'cm',
                weight_unit: 'kg',

                // Program Preferences
                goal: '',
                level: '',
                type: 'bodyweight', // Default to bodyweight
                days: [],
                session_duration_minutes: 45, // Default to 45 minutes
                coach_id: '',
                reset: false,

                // Chat History
                chat_history: [
                    {
                        role: "system",
                        content: "" // Will be populated based on collected data
                    }
                ]
            };
        }
        return {};
    });

    const updateOnboardingData = useCallback((newData) => {
        setOnboardingData(prev => {
            // Only update if there are actual changes
            const updated = { ...prev, ...newData };
            if (JSON.stringify(updated) === JSON.stringify(prev)) {
                return prev;
            }

            if (typeof window !== 'undefined') {
                localStorage.setItem('onboardingData', JSON.stringify(updated));
            }
            return updated;
        });
    }, []);

    // Helper function to format data for API
    const getFormattedData = () => {
        const {
            user_id,
            firstname,
            age,
            gender,
            height,
            weight,
            goal,
            level,
            type,
            days,
            session_duration_minutes,
            coach_id,
            reset,
            chat_history
        } = onboardingData;

        // Format the days array to a comma-separated string
        const formattedDays = Array.isArray(days)
            ? days.join(',')
            : days;

        return {
            user_id,
            firstname,
            age: parseInt(age),
            gender,
            height,
            weight,
            goal,
            level: level?.toLowerCase(),
            type,
            days: formattedDays,
            session_duration_minutes,
            coach_id,
            reset,
            chat_history
        };
    };

    // Helper function to generate system message
    const generateSystemMessage = () => {
        const {
            gender,
            age,
            height_unit,
            weight_unit,
            height,
            weight,
            goal,
            level,
            days,
            session_duration_minutes,
            firstname,
            type
        } = onboardingData;

        const frequency = Array.isArray(days) ? days.length : 0;
        const formattedDays = Array.isArray(days) ? days.join(',') : '';

        return `
You are a Kate, a top-tier fitness coach specializing in Strength & Conditioning and you must generate tailored training programs for your trainee.
You will engage in a friendly chat with your new trainee. Here are some important information about your trainee:
    "gender": "${gender}",
    "age": "${age}",
    "height_unit": "${height_unit}",
    "weight_unit": "${weight_unit}",
    "height": "${height}",
    "weight": "${weight}",
    "goal": "${goal}",
    "level": "${level?.toLowerCase()}",
    "frequency": "${frequency}",
    "type": "${type}",
    "days": "${formattedDays}",
    "session_duration_minutes": "${session_duration_minutes}",
    "firstname": "${firstname}"

While hiding your intentions and taking into account the provided information, you need to ask for relevant information to create the perfect a one-week workout routine as a JSON. Please stay concise in your questions.
The training program format should be:
Once and only when you have all the necessary information to create the program, you will tell the trainee that you will send him the program soon and end your message with this :[CREATE_PROGRAM].
`;
    };

    return (
        <OnboardingContext.Provider value={{
            onboardingData,
            updateOnboardingData,
            getFormattedData,
            generateSystemMessage
        }}>
            {children}
        </OnboardingContext.Provider>
    );
}

export const useOnboarding = () => useContext(OnboardingContext); 
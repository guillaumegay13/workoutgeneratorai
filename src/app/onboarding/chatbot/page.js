"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useOnboarding } from "@/app/context/OnboardingContext";
import { useRouter } from 'next/navigation';

// Helper function to decode special characters
const decodeSpecialCharacters = (text) => {
    try {
        // First try to decode as UTF-8
        return decodeURIComponent(escape(text));
    } catch (e) {
        // Fallback to the original text if decoding fails
        console.log('Decoding failed for text:', text, e);
        return text;
    }
};

// Helper function to format chat history
const formatChatHistory = (messages) => {
    return messages.map(m => ({
        role: m.role,
        content: decodeSpecialCharacters(m.content)
    }));
};

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [hasStartedChat, setHasStartedChat] = useState(false);
    const messagesEndRef = useRef(null);
    const initializationRef = useRef(false);
    const { onboardingData } = useOnboarding();
    const [failedMessageIndexes, setFailedMessageIndexes] = useState(new Set());
    const router = useRouter();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Move sendMessage outside of component or use useCallback
    const sendMessage = useCallback(async (message, showInChat = true) => {
        if (!message.trim() || !onboardingData) {
            console.log('Message validation failed:', {
                message,
                hasMessage: !!message.trim(),
                hasOnboardingData: !!onboardingData
            });
            return;
        }

        const messageIndex = messages.length;

        console.log('Sending message:', {
            message,
            showInChat,
            messageIndex,
            currentMessages: messages.length
        });

        // Only show user message if showInChat is true
        if (showInChat) {
            console.log('Adding user message to chat:', message);
            setMessages(prev => {
                const newMessages = [...prev, {
                    role: 'user',
                    content: message
                }];
                console.log('Updated messages after user:', newMessages);
                return newMessages;
            });
        }

        setIsLoading(true);
        setInputMessage("");

        try {
            // Log onboarding data before API call
            console.log('Onboarding data before chat API call:', {
                coach_id: onboardingData?.coach_id,
                complete_data: onboardingData,
                chat_history: chatHistory
            });

            const payload = {
                user_id: onboardingData.user_id || '',
                age: parseInt(onboardingData.age || '0'),
                gender: onboardingData.gender || '',
                height: onboardingData.height || '0',
                weight: onboardingData.weight || '0',
                height_unit: onboardingData.height_unit || 'cm',
                weight_unit: onboardingData.weight_unit || 'kg',
                sport: 'fitness',
                equipment: onboardingData.equipment || [],
                level: onboardingData.level || 'beginner',
                frequency: onboardingData.days?.length || 0,
                days: Array.isArray(onboardingData.days) ? onboardingData.days.join(',') : (onboardingData.days || ''),
                firstname: onboardingData.firstname || '',
                message,
                chat_history: chatHistory,
                coach_id: onboardingData.coach_id || '',
                language: 'en'
            };

            console.log('Chat API Payload:', {
                coach_id: payload.coach_id,
                message: payload.message,
                complete_payload: payload,
                chat_history: payload.chat_history
            });

            const response = await fetch('/api/chat_with_agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            console.log('Raw API Response:', data);

            setFailedMessageIndexes(prev => {
                const newSet = new Set(prev);
                newSet.delete(messageIndex);
                return newSet;
            });

            // Update chat history from response
            if (data.chat_history && Array.isArray(data.chat_history)) {
                console.log('Updating chat history:', data.chat_history);
                const decodedHistory = data.chat_history.map(msg => ({
                    role: msg.role,
                    content: decodeSpecialCharacters(msg.content)
                }));
                setChatHistory(decodedHistory);
            }

            // Parse and add assistant's message
            let assistantMessage;
            let parsedResponse = null;

            console.log('Parsing response:', {
                responseType: typeof data.response,
                response: data.response,
                message: data.message
            });

            try {
                // If response is a JSON string, parse it
                if (typeof data.response === 'string' && data.response.trim().startsWith('{')) {
                    parsedResponse = JSON.parse(data.response);
                    console.log('Parsed JSON response:', parsedResponse);
                    assistantMessage = parsedResponse.message;
                }
                // If response is already an object with message
                else if (data.response && typeof data.response === 'object' && data.response.message) {
                    console.log('Response is already an object:', data.response);
                    assistantMessage = data.response.message;
                }
                // Fall back to message or response field
                else {
                    console.log('Using fallback fields');
                    assistantMessage = data.message || data.response;
                }
            } catch (e) {
                console.log('Failed to parse response:', e);
                assistantMessage = data.message || data.response;
            }

            console.log('Final assistant message:', {
                message: assistantMessage,
                showInChat,
                willShow: !!assistantMessage && showInChat
            });

            // Only show assistant's response if we have a message and either:
            // 1. It's not the initial "Hi" message (showInChat is true), or
            // 2. It is the initial "Hi" message (showInChat is false) and messages array is empty
            if (assistantMessage && (showInChat || (!showInChat && messages.length === 0))) {
                setMessages(prev => {
                    const newMessages = [...prev, {
                        role: 'assistant',
                        content: decodeSpecialCharacters(assistantMessage)
                    }];
                    console.log('Updated messages after assistant:', newMessages);
                    return newMessages;
                });
            }

            // Handle program creation if needed
            if (parsedResponse?.program_creation || data.program_creation) {
                // Update onboarding data with program-specific fields
                const updatedData = {
                    ...onboardingData
                };

                // Handle program_start_date
                if (data.program_start_date) {
                    updatedData.start_date = data.program_start_date;
                }

                // Handle program duration and weeks
                if (data.program_duration_weeks) {
                    if (data.same_routine === false) {
                        updatedData.duration = 1;
                        updatedData.number_of_weeks = data.program_duration_weeks;
                        updatedData.same_routine = false;
                    } else {
                        updatedData.duration = data.program_duration_weeks;
                        updatedData.number_of_weeks = 1;
                        updatedData.same_routine = true;
                    }
                } else {
                    updatedData.duration = 6;
                    updatedData.number_of_weeks = 1;
                    updatedData.same_routine = true;
                }

                console.log('Program Generation API Payload:', {
                    user_id: updatedData.user_id,
                    age: parseInt(updatedData.age || '0'),
                    gender: updatedData.gender,
                    height: updatedData.height,
                    weight: updatedData.weight,
                    height_unit: updatedData.height_unit || 'cm',
                    weight_unit: updatedData.weight_unit || 'kg',
                    sport: 'fitness',
                    coach_id: updatedData.coach_id,
                    duration: updatedData.duration,
                    frequency: updatedData.days?.length || 0,
                    days: Array.isArray(updatedData.days) ? updatedData.days.join(',') : updatedData.days,
                    firstname: updatedData.firstname,
                    language: 'en',
                    number_of_weeks: updatedData.number_of_weeks,
                    birth_date: updatedData.birth_date,
                    chat_history: chatHistory,
                    start_date: updatedData.start_date,
                    level: updatedData.level || 'beginner',
                    same_routine: updatedData.same_routine,
                    equipment: updatedData.equipment
                });

                try {
                    // Make API call in the background
                    const programResponse = fetch('/api/test/generate_program_from_chat_history_chuncks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: updatedData.user_id,
                            age: parseInt(updatedData.age || '0'),
                            gender: updatedData.gender,
                            height: updatedData.height,
                            weight: updatedData.weight,
                            height_unit: updatedData.height_unit || 'cm',
                            weight_unit: updatedData.weight_unit || 'kg',
                            sport: 'fitness',
                            coach_id: updatedData.coach_id,
                            duration: updatedData.duration,
                            frequency: updatedData.days?.length || 0,
                            days: Array.isArray(updatedData.days) ? updatedData.days.join(',') : updatedData.days,
                            firstname: updatedData.firstname,
                            language: 'en',
                            number_of_weeks: updatedData.number_of_weeks,
                            birth_date: updatedData.birth_date,
                            chat_history: chatHistory,
                            start_date: updatedData.start_date,
                            level: updatedData.level || 'beginner',
                            same_routine: updatedData.same_routine,
                            equipment: updatedData.equipment
                        }),
                    });

                    // Navigate immediately
                    router.push('/onboarding/program-ready');

                    // Handle the response in the background
                    programResponse.then(response => {
                        if (!response.ok) {
                            console.error('Program Generation Error:', response.status, response.statusText);
                            return;
                        }
                        return response.json();
                    }).then(programData => {
                        if (programData) {
                            console.log('Program Generation Result:', programData);
                        }
                    }).catch(error => {
                        console.error('Program Generation Background Error:', error);
                    });

                } catch (error) {
                    console.error('Program Generation Error:', error);
                    // Still navigate even if there's an initial error
                    router.push('/onboarding/program-ready');
                }
            }

        } catch (error) {
            console.error('Error:', error);
            setFailedMessageIndexes(prev => new Set([...prev, messageIndex]));
        } finally {
            setIsLoading(false);
        }
    }, [onboardingData, messages, chatHistory]);

    useEffect(() => {
        const initializeChat = async () => {
            if (!initializationRef.current && !hasStartedChat && onboardingData && onboardingData.coach_id && !isLoading) {
                console.log('Starting initial chat:', {
                    hasStartedChat,
                    coach_id: onboardingData.coach_id,
                    isLoading,
                    isInitialized: initializationRef.current
                });
                initializationRef.current = true;
                setHasStartedChat(true);
                await sendMessage("Hi", false);
            }
        };

        initializeChat();
    }, [onboardingData, hasStartedChat, sendMessage, isLoading]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
        }
    };

    const retryMessage = (index) => {
        const message = messages[index].content;
        setFailedMessageIndexes(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });
        sendMessage(message);
    };

    const handleSkip = async () => {
        if (!onboardingData) return;

        const skipPayload = {
            user_id: onboardingData.user_id || '',
            age: parseInt(onboardingData.age || '0'),
            gender: onboardingData.gender || '',
            height: onboardingData.height || '0',
            weight: onboardingData.weight || '0',
            height_unit: onboardingData.height_unit || 'cm',
            weight_unit: onboardingData.weight_unit || 'kg',
            sport: 'fitness',
            equipment: onboardingData.equipment || [],
            days: Array.isArray(onboardingData.days) ? onboardingData.days.join(',') : (onboardingData.days || ''),
            frequency: onboardingData.days?.length || 0,
            firstname: onboardingData.firstname || '',
            duration: onboardingData.duration || 6,
            chat_history: chatHistory,
            coach_id: onboardingData.coach_id || '',
            language: 'en',
            number_of_weeks: onboardingData.number_of_weeks || 1,
            level: onboardingData.level || 'beginner',
            same_routine: onboardingData.same_routine ?? true,
            start_date: onboardingData.start_date
        };

        // Navigate immediately
        router.push('/onboarding/program-ready');

        // Make API call in the background
        fetch('/api/test/generate_program_from_chat_history_chuncks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(skipPayload),
        }).then(response => {
            if (!response.ok) {
                console.error('Skip Program Generation Error:', response.status, response.statusText);
                return;
            }
            return response.json();
        }).then(skipData => {
            if (skipData) {
                console.log('Skip Program Generation Result:', skipData);
            }
        }).catch(error => {
            console.error('Skip Error:', error);
        });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/onboarding/preferences" className="text-gray-600 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-semibold">Chat with Coach</h1>
                        <button
                            onClick={handleSkip}
                            className="text-gray-600 hover:text-gray-900 flex items-center"
                        >
                            Skip
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-2xl mx-auto space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-sm rounded-2xl p-4 ${message.role === 'user'
                                ? 'bg-blue-600 text-white ml-4'
                                : 'bg-gray-100 text-gray-900 mr-4'
                                }`}>
                                <p>{message.content}</p>
                                {failedMessageIndexes.has(index) && (
                                    <button
                                        onClick={() => retryMessage(index)}
                                        className="text-red-500 text-sm mt-2 flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Retry
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-2xl p-4 flex space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 px-4 py-4">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputMessage.trim()}
                            className="rounded-full bg-blue-600 p-2 text-white disabled:opacity-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 
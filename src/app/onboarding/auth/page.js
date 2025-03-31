"use client";

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleAuth } from '@/app/hooks/useGoogleAuth';
import { useOnboarding } from '@/app/context/OnboardingContext';
import GoogleAuthButton from '@/app/components/GoogleAuthButton';

export default function Auth() {
    const router = useRouter();
    const { user, loading, signInWithGoogle } = useGoogleAuth();
    const { onboardingData, updateOnboardingData } = useOnboarding();

    const updateUserData = useCallback(() => {
        if (user && (!onboardingData.user_id || onboardingData.user_id !== user.uid)) {
            updateOnboardingData({
                user_id: user.uid,
                email: user.email,
                firstname: user.displayName?.split(' ')[0] || '',
                photoURL: user.photoURL || '',
            });
        }
    }, [user, onboardingData.user_id, updateOnboardingData]);

    useEffect(() => {
        if (user) {
            updateUserData();
            // Only redirect if we're not already on the coach selection page
            if (!window.location.pathname.includes('/onboarding/coach-selection')) {
                router.push('/onboarding/coach-selection');
            }
        }
    }, [user, router, updateUserData]);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Logo or Icon */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome to AI Workout
                    </h1>
                    <p className="text-gray-600">
                        Sign in to create your personalized workout program
                    </p>
                </div>

                {/* Auth Button */}
                <GoogleAuthButton
                    onSuccess={handleGoogleSignIn}
                    isLoading={loading}
                />

                {/* Terms and Privacy */}
                <p className="text-xs text-center text-gray-500">
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-800">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-800">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
} 
"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import {
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Get the token and store it in a cookie
                const token = await user.getIdToken();
                document.cookie = `firebase-token=${token}; path=/`;
                setUser(user);
            } else {
                // Remove the token cookie when user is not authenticated
                document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            console.error('Google sign-in error:', error);
            throw error;
        }
    };

    const signOut = () => auth.signOut();

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); 
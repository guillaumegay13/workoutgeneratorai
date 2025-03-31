"use client";

import { useAuth } from '../context/AuthContext';

export function useGoogleAuth() {
    const auth = useAuth();
    return auth;
} 
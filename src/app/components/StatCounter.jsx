"use client";

import { useCountUp } from "../hooks/useCountUp";

export default function StatCounter({ end, duration = 2000, suffix = "+", children }) {
    const count = useCountUp(end, duration);

    return (
        <div className="p-6">
            <div className="text-4xl font-bold mb-2">{count.toLocaleString()}{suffix}</div>
            <div className="text-xl opacity-80">{children}</div>
        </div>
    );
} 
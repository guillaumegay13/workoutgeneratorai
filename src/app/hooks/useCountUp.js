"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for animated count-up effect
 * @param {number} end - The final number to count up to
 * @param {number} duration - Duration of the animation in milliseconds
 * @param {number} delay - Delay before starting the animation in milliseconds
 * @returns {number} The current count value
 */
export function useCountUp(end, duration = 2000, delay = 0) {
    const [count, setCount] = useState(0);
    const timeoutRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        if (delay > 0) {
            timeoutRef.current = setTimeout(startCounting, delay);
        } else {
            startCounting();
        }

        function startCounting() {
            let startTimestamp = null;

            function step(timestamp) {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                setCount(Math.floor(progress * end));

                if (progress < 1) {
                    frameRef.current = window.requestAnimationFrame(step);
                }
            }

            frameRef.current = window.requestAnimationFrame(step);
        }

        // Clean up animation frames and timeouts
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
        };
    }, [end, duration, delay]);

    return count;
} 
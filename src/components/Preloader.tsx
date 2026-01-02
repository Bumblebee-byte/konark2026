'use client';

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [counter, setCounter] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // 1. THE COUNTING LOGIC (0% to 100%)
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                // If we hit 100, stop the loop
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                // ✅ SLOWER LOGIC:
                // 1. Smaller jumps (only 1% to 4% per tick)
                const jump = Math.floor(Math.random() * 4) + 1;

                // Ensure we don't overshoot 100
                return Math.min(prev + jump, 100);
            });
        }, 30); // ✅ SLOWER SPEED: Runs every 120ms (was 80ms)

        return () => clearInterval(interval);
    }, []);

    // 2. THE EXIT ANIMATION
    useGSAP(() => {
        if (counter >= 100) {
            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                }
            });

            tl.to(".counter-text", {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.5 // ✅ Added a small pause at 100% so users can see "100%" briefly
            })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "power4.inOut",
                });
        }
    }, [counter]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col justify-between p-6 md:p-20 overflow-hidden font-epic"
        >
            {/* TOP BAR */}
            <div className="flex justify-between items-start counter-text">
                <h1 className="text-xl md:text-3xl font-bold uppercase tracking-tighter leading-none">
                    Konark<br/><span className="text-[#ff4d00]">2025</span>
                </h1>
                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest text-right">
                    System Initializing<br/>Loading Assets...
                </p>
            </div>

            {/* CENTER FLASHING WORDS */}
            <div ref={textRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full counter-text px-4">
                <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter opacity-20 scale-110">
                    {counter < 40 ? "Innovate" : counter < 80 ? "Create" : "Launch"}
                </h2>
            </div>

            {/* BOTTOM PROGRESS */}
            <div className="flex flex-col gap-4 counter-text">
                <h1 className="text-8xl md:text-[12rem] font-black tabular-nums leading-none text-[#ff4d00] mix-blend-screen">
                    {counter}%
                </h1>
                <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-[#ff4d00]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${counter}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </div>
            </div>
        </div>
    );
}
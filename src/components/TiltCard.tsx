'use client';

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TiltCardProps {
    title: string;
    description: string;
    icon: string;
    details: string;
}

export default function TiltCard({ title, description, icon, details }: TiltCardProps) {
    const tiltRef = useRef<HTMLDivElement>(null);
    const floatRef = useRef<HTMLDivElement>(null); // ✅ New Ref for the floating wrapper
    const [isFlipped, setIsFlipped] = useState(false);

    // Store the GSAP animation instance so we can pause/resume it
    const floatTween = useRef<gsap.core.Tween | null>(null);

    // ✅ 1. RANDOM DANCING ANIMATION
    useGSAP(() => {
        // Create a random floating movement
        // We use random() to make sure every card moves differently
        floatTween.current = gsap.to(floatRef.current, {
            y: "random(-20, 20)", // Move up/down 20px
            x: "random(-10, 10)", // Move left/right 10px
            rotation: "random(-2, 2)", // Slight tilt
            duration: "random(2, 4)", // Random speed between 2s and 4s
            repeat: -1, // Infinite loop
            yoyo: true, // Go back and forth
            ease: "sine.inOut", // Smooth wave-like motion
        });
    }, { scope: floatRef });

    // ✅ 2. PAUSE ON CLICK / RESUME ON CLOSE
    useEffect(() => {
        if (floatTween.current) {
            if (isFlipped) {
                floatTween.current.pause(); // Stop moving so user can read
            } else {
                floatTween.current.resume(); // Start dancing again
            }
        }

        // Auto-close timer logic (from previous step)
        let timer: NodeJS.Timeout;
        if (isFlipped) {
            timer = setTimeout(() => setIsFlipped(false), 10000);
        }
        return () => clearTimeout(timer);
    }, [isFlipped]);


    // --- STANDARD TILT PHYSICS (UNCHANGED) ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!tiltRef.current) return;
        const rect = tiltRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0); y.set(0);
    };

    return (
        // ✅ WRAPPER: Handles the "Dancing" (GSAP)
        <div ref={floatRef} className="w-full h-full">

            {/* INNER: Handles the "Tilting" (Framer Motion) */}
            <motion.div
                ref={tiltRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-64 w-full rounded-xl cursor-pointer perspective-1000 group z-10"
            >
                {/* FLIP CONTAINER */}
                <motion.div
                    className="relative w-full h-full"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* FRONT */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 backdrop-blur-md flex flex-col justify-between"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className="h-12 w-12 rounded-full bg-[#ff4d00]/20 flex items-center justify-center text-2xl border border-[#ff4d00]/50 text-[#ff4d00] group-hover:bg-[#ff4d00] group-hover:text-black transition-colors duration-300">
                            {icon}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold uppercase tracking-tighter text-white group-hover:text-[#ff4d00] transition-colors">
                                {title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                                {description}
                            </p>
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ff4d00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* BACK */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-xl bg-[#ff4d00] border border-white/10 p-6 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(255,77,0,0.6)]"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                        }}
                    >
                        <h3 className="text-xl font-bold text-black uppercase mb-2">Event Details</h3>
                        <div className="w-12 h-1 bg-black mb-4"></div>
                        <p className="text-black font-medium text-sm leading-relaxed">
                            {details}
                        </p>
                        <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-black/60">
                            Auto-closing in 10s...
                        </p>
                    </div>

                </motion.div>
            </motion.div>
        </div>
    );
}
'use client';

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";

interface TiltCardProps {
    title: string;
    description: string;
    icon: string; // Just an emoji or simple text for now
}

export default function TiltCard({ title, description, icon }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics for the tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Rotate the card based on mouse position
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        const pctX = mouseXFromCenter / width;
        const pctY = mouseYFromCenter / height;

        x.set(pctX);
        y.set(pctY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative h-64 w-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 backdrop-blur-md transition-colors hover:border-[#ff4d00]/50 group"
        >
            {/* Floating content */}
            <div style={{ transform: "translateZ(50px)" }} className="absolute inset-4 flex flex-col justify-between">
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
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ff4d00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
}
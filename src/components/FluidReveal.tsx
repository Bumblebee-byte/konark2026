'use client';

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import Image from "next/image";

interface FluidRevealProps {
    topImage: string;
    bottomImage: string;
}

export default function FluidReveal({ topImage, bottomImage }: FluidRevealProps) {
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef(0);

    // --- PHYSICS CONFIG (Works for Touch & Mouse) ---
    const springMain = { damping: 15, stiffness: 250, mass: 0.2 };
    const springMid =  { damping: 20, stiffness: 200, mass: 0.4 };
    const springSlow = { damping: 25, stiffness: 150, mass: 0.6 };

    const mouseX = useSpring(0, springMain);
    const mouseY = useSpring(0, springMain);
    const mouseX2 = useSpring(0, springMid);
    const mouseY2 = useSpring(0, springMid);
    const mouseX3 = useSpring(0, springSlow);
    const mouseY3 = useSpring(0, springSlow);

    const midX1 = useTransform([mouseX, mouseX2], ([x1, x2]: any) => (x1 + x2) / 2);
    const midY1 = useTransform([mouseY, mouseY2], ([y1, y2]: any) => (y1 + y2) / 2);
    const midX2 = useTransform([mouseX2, mouseX3], ([x2, x3]: any) => (x2 + x3) / 2);
    const midY2 = useTransform([mouseY2, mouseY3], ([y2, y3]: any) => (y2 + y3) / 2);

    // --- AUTO ANIMATION ---
    useEffect(() => {
        let animationFrame: number;
        const animate = () => {
            if (!isHovering && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                timeRef.current += 0.005;
                const t = timeRef.current;
                const rangeX = rect.width * 0.3;
                const rangeY = rect.height * 0.25;

                const x = centerX + Math.sin(t) * rangeX * Math.cos(t * 0.7);
                const y = centerY + Math.cos(t * 0.9) * rangeY * Math.sin(t);

                mouseX.set(x); mouseY.set(y);
                mouseX2.set(x); mouseY2.set(y);
                mouseX3.set(x); mouseY3.set(y);
                animationFrame = requestAnimationFrame(animate);
            }
        };
        if (!isHovering) animationFrame = requestAnimationFrame(animate);
        return () => { if (animationFrame) cancelAnimationFrame(animationFrame); };
    }, [isHovering, mouseX, mouseY, mouseX2, mouseY2, mouseX3, mouseY3]);

    // --- UNIFIED MOVE HANDLER (Mouse & Touch) ---
    const handleMove = (x: number, y: number) => {
        if (!isHovering) setIsHovering(true);
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const relX = x - rect.left;
            const relY = y - rect.top;
            mouseX.set(relX); mouseY.set(relY);
            mouseX2.set(relX); mouseY2.set(relY);
            mouseX3.set(relX); mouseY3.set(relY);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden bg-black cursor-none" //ouch-none prevents scrolling while dragging
            onMouseEnter={() => setIsHovering(true)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)} // ✅ ADDED TOUCH SUPPORT
            onMouseLeave={() => setIsHovering(false)}
            onTouchEnd={() => setIsHovering(false)} // Reset on touch lift
        >
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image src={bottomImage} alt="Background" fill className="object-cover opacity-100" priority />
            </div>

            {/* Liquid Mask */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                    <mask id="fluidMask">
                        <rect width="100%" height="100%" fill="black" />
                        <g filter="url(#goo)">
                            <motion.circle cx={mouseX} cy={mouseY} r={160} fill="white" />
                            <motion.circle cx={mouseX2} cy={mouseY2} r={140} fill="white" />
                            <motion.circle cx={mouseX3} cy={mouseY3} r={120} fill="white" />
                            <motion.circle cx={midX1} cy={midY1} r={100} fill="white" />
                            <motion.circle cx={midX2} cy={midY2} r={80} fill="white" />
                        </g>
                    </mask>
                </defs>
            </svg>

            {/* Top Reveal */}
            <div className="absolute inset-0 w-full h-full" style={{ mask: "url(#fluidMask)", WebkitMask: "url(#fluidMask)" }}>
                <Image src={topImage} alt="Revealed Content" fill className="object-contain p-4 md:p-10" priority />
            </div>

            {/* Cursor Ring */}
            <motion.div
                className="absolute w-5 h-5 border-2 border-white rounded-full pointer-events-none mix-blend-difference z-50"
                style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
            />
        </div>
    );
}
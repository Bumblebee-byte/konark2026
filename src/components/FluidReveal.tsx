'use client';

import { useState, useEffect, useRef } from "react";
// Ensure you have 'motion' installed.
import { motion, useSpring, useTransform } from "motion/react";
import Image from "next/image";

interface FluidRevealProps {
    topImage: string;
    bottomImage: string;
}

export default function FluidReveal({ topImage, bottomImage }: FluidRevealProps) {
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // We use a Ref to track time so the animation doesn't reset/jump when you stop hovering
    const timeRef = useRef(0);

    // 1. Smoother Physics Configuration
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 }; // Looser spring for better "liquid" feel

    // 2. Spring Values
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    const mouseX2 = useSpring(0, { damping: 25, stiffness: 90, mass: 0.7 });
    const mouseY2 = useSpring(0, { damping: 25, stiffness: 90, mass: 0.7 });

    const mouseX3 = useSpring(0, { damping: 30, stiffness: 80, mass: 1.0 });
    const mouseY3 = useSpring(0, { damping: 30, stiffness: 80, mass: 1.0 });

    // 3. Transform Logic (with :any fix)
    const midX1 = useTransform([mouseX, mouseX2], ([x1, x2]: any) => (x1 + x2) / 2);
    const midY1 = useTransform([mouseY, mouseY2], ([y1, y2]: any) => (y1 + y2) / 2);
    const midX2 = useTransform([mouseX2, mouseX3], ([x2, x3]: any) => (x2 + x3) / 2);
    const midY2 = useTransform([mouseY2, mouseY3], ([y2, y3]: any) => (y2 + y3) / 2);

    // 4. AUTO-ANIMATION LOOP
    useEffect(() => {
        let animationFrame: number;

        const animate = () => {
            if (!isHovering && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Increase time slightly faster
                timeRef.current += 0.002;
                const t = timeRef.current;

                // Lissajous figure (Figure-8 pattern) for organic movement
                // We moved the multiplier outside to make it wider (rect.width * 0.25)
                const x = centerX + Math.sin(t) * (rect.width * 0.25) * Math.cos(t * 0.5);
                const y = centerY + Math.cos(t * 0.8) * (rect.height * 0.2) * Math.sin(t);

                mouseX.set(x); mouseY.set(y);
                mouseX2.set(x); mouseY2.set(y);
                mouseX3.set(x); mouseY3.set(y);

                animationFrame = requestAnimationFrame(animate);
            }
        };

        if (!isHovering) {
            animationFrame = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [isHovering, mouseX, mouseY, mouseX2, mouseY2, mouseX3, mouseY3]);

    // 5. MOUSE HANDLER
    const handleMouseMove = (e: React.MouseEvent) => {
        // When mouse moves, we set isHovering to true immediately
        setIsHovering(true);

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            mouseX.set(x); mouseY.set(y);
            mouseX2.set(x); mouseY2.set(y);
            mouseX3.set(x); mouseY3.set(y);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const revealSize = 300;

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden bg-black"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // We removed onMouseEnter because handleMouseMove handles it better
        >
            {/* A. BOTTOM LAYER (Background) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bottomImage}
                    alt="Background"
                    fill
                    className="object-cover opacity-100"
                    priority
                />
            </div>

            {/* B. SVG MASK */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>

                    <mask id="fluidMask">
                        <rect width="100%" height="100%" fill="black" />
                        <g filter="url(#goo)">
                            <motion.circle cx={mouseX} cy={mouseY} r={revealSize / 2} fill="white" />
                            <motion.circle cx={mouseX2} cy={mouseY2} r={revealSize / 2.5} fill="white" />
                            <motion.circle cx={mouseX3} cy={mouseY3} r={revealSize / 3} fill="white" />
                            <motion.circle cx={midX1} cy={midY1} r={revealSize / 4} fill="white" />
                            <motion.circle cx={midX2} cy={midY2} r={revealSize / 4.5} fill="white" />
                        </g>
                    </mask>
                </defs>
            </svg>

            {/* C. TOP LAYER (Revealed) */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{ mask: "url(#fluidMask)", WebkitMask: "url(#fluidMask)" }}
            >
                <Image
                    src={topImage}
                    alt="Revealed Content"
                    fill
                    className="object-contain p-4 md:p-10"
                    priority
                />
            </div>

            {/* Custom Cursor (Optional - helps see where the 'center' is) */}
            <motion.div
                className="absolute w-4 h-4 rounded-full border border-white pointer-events-none mix-blend-difference z-50 opacity-50"
                style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
            />
        </div>
    );
}
'use client';

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";

// --- DATA ---
interface EventItem {
    id: number;
    title: string;
    category: string;
    date: string;
    img: string;
    link: string;
}

interface Props {
    events: EventItem[];
}

export default function EventHorizontalScroll({ events }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the container
    const { scrollX } = useScroll({
        container: containerRef,
    });

    // Smooth out the scroll value for silkier animations
    const smoothScrollX = useSpring(scrollX, { stiffness: 150, damping: 30 });

    return (
        <div className="relative w-full h-full flex flex-col justify-center bg-black">

            {/* SCROLL CONTAINER */}
            <div
                ref={containerRef}
                className="w-full h-[70vh] flex items-center overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-[50vw]" // Padding ensures first item can be centered
            >
                {events.map((event, index) => (
                    <Card
                        key={event.id}
                        event={event}
                        index={index}
                        scrollX={smoothScrollX}
                    />
                ))}
            </div>

            {/* INDICATOR TEXT (Optional helper) */}
            <div className="absolute bottom-10 w-full text-center pointer-events-none">
                <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Swipe to Explore</p>
            </div>
        </div>
    );
}

// --- INDIVIDUAL CARD COMPONENT ---
function Card({ event, index, scrollX }: { event: EventItem, index: number, scrollX: MotionValue<number> }) {
    // CALCULATIONS:
    // We assume each card is roughly 300px wide + gap.
    // You might need to tweak '350' based on your actual card width + margin.
    const cardWidth = 350;
    const position = index * cardWidth;

    // 1. Calculate distance from center (0 = center, 1 = one card away, etc.)
    const distanceFromCenter = useTransform(scrollX, (value) => {
        const distance = value - position;
        return distance / cardWidth;
    });

    // 2. Animations based on distance

    // Scale: Center = 1.0, Sides = 0.8
    const scale = useTransform(distanceFromCenter, [-1, 0, 1], [0.8, 1.1, 0.8]);

    // Opacity: Center = 1, Sides = 0.4
    const opacity = useTransform(distanceFromCenter, [-1, 0, 1], [0.4, 1, 0.4]);

    // Rotate Y: Center = 0deg, Left = 45deg, Right = -45deg (Coverflow effect)
    const rotateY = useTransform(distanceFromCenter, [-1, 0, 1], [45, 0, -45]);

    // Z-Index: Center needs to be on top
    const zIndex = useTransform(distanceFromCenter, (d) => Math.abs(d) < 0.5 ? 10 : 1);

    return (
        <motion.div
            style={{
                scale,
                opacity,
                rotateY,
                zIndex,
                perspective: 1000, // Essential for 3D effect
            }}
            className="snap-center shrink-0 w-[300px] md:w-[350px] h-[500px] md:h-[600px] mx-4 flex flex-col relative"
        >
            <Link href={event.link} className="w-full h-full block group relative">

                {/* 1. GLASS CONTAINER */}
                <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#111] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:border-[#ff4d00]/50">

                    {/* IMAGE */}
                    <div className="relative w-full h-full">
                        <Image
                            src={event.img}
                            alt={event.title}
                            fill
                            className="object-cover"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    </div>

                    {/* TEXT CONTENT (Inside Card) */}
                    <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">

                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4d00] mb-2 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                            {event.date}
                        </span>

                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                            {event.title}
                        </h3>

                        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {event.category}
                        </p>
                    </div>

                </div>
            </Link>
        </motion.div>
    );
}
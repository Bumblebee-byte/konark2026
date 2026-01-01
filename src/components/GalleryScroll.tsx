'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

// Reusing your existing images for the gallery
const items = [
    {
        id: 1,
        title: "THE LEGACY",
        year: "1998",
        img: "/konark-bg.jpg",
        offset: "mt-0", // Aligned Top
    },
    {
        id: 2,
        title: "TECH INNOVATION",
        year: "2015",
        img: "/animeblue.jpg",
        offset: "mt-32", // Pushed down (Scattered look)
    },
    {
        id: 3,
        title: "CULTURAL NIGHT",
        year: "2022",
        img: "/animegreen.jpg",
        offset: "mt-10", // Slightly down
    },
    {
        id: 4,
        title: "ROBO WARS",
        year: "2023",
        img: "/konark-bg.jpg",
        offset: "mt-48", // Low position
    },
    {
        id: 5,
        title: "THE FUTURE",
        year: "2025",
        img: "/animeblue.jpg",
        offset: "mt-20", // Middle
    },
];

export default function GalleryScroll() {
    const targetRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of this specific section
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Transform vertical scroll into horizontal movement
    // Moves from 1% (start) to -95% (end) horizontally
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        // Height 300vh means users scroll "3 screens worth" to get through the horizontal part
        <section ref={targetRef} className="relative h-[300vh] bg-[#111112]">

            {/* Sticky Container: Stays fixed on screen while you scroll */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Moving Track */}
                <motion.div style={{ x }} className="flex gap-20 pl-20 pr-20">

                    {/* Intro Text Card */}
                    <div className="min-w-[50vw] md:min-w-[30vw] flex flex-col justify-center">
                        <h2 className="text-6xl md:text-9xl font-black uppercase text-white tracking-tighter leading-none">
                            Our<br/>
                            <span className="text-[#ff4d00]">Journey</span>
                        </h2>
                        <p className="text-gray-400 mt-6 max-w-sm text-lg">
                            Scroll through the history of North India's largest technical festival.
                        </p>
                        <div className="w-24 h-1 bg-white/20 mt-10"></div>
                    </div>

                    {/* Gallery Items */}
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`relative min-w-[80vw] md:min-w-[40vw] h-[60vh] md:h-[70vh] flex flex-col ${item.offset}`}
                        >
                            {/* Connecting Line (Like Lando's site) */}
                            <div className="absolute -left-10 top-1/2 w-20 h-[1px] bg-white/20 hidden md:block"></div>

                            {/* Year Tag */}
                            <span className="text-xs font-bold tracking-[0.3em] text-[#ff4d00] mb-4 block">
                  {item.year}
               </span>

                            {/* Image Container */}
                            <div className="relative w-full h-full overflow-hidden rounded-lg group border border-white/10 hover:border-[#ff4d00] transition-colors duration-500">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                {/* Overlay Title */}
                                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
                                    <h3 className="text-3xl font-bold text-white uppercase">{item.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}

                </motion.div>
            </div>
        </section>
    );
}
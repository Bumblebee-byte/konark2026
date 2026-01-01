'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

// --- CONFIGURATION ---

// 1. IMAGE PATHS
// ✅ Keeping .JPG as per your successful test
const myImages = Array.from({ length: 10 }, (_, i) => `/gallery/photo${i + 1}.JPG`);

const sampleTitles = ["LEGACY", "INNOVATION", "FUTURE", "ROBOTICS", "CODE", "DESIGN", "CULTURE", "TECH", "VISION", "CREATE"];

const widths = ["w-[60vw] md:w-[30vw]", "w-[80vw] md:w-[40vw]", "w-[50vw] md:w-[25vw]", "w-[70vw] md:w-[35vw]"];
const heights = ["h-[50vh]", "h-[60vh]", "h-[70vh]", "h-[40vh]"];
const offsets = ["mt-0", "mt-32", "-mt-32", "mt-16", "-mt-16", "mt-48", "-mt-24"];

const items = myImages.map((imgSrc, i) => ({
    id: i,
    title: `${sampleTitles[i % sampleTitles.length]} ${2025 - i}`,
    year: `${2025 - i}`,
    img: imgSrc,
    widthClass: widths[i % widths.length],
    heightClass: heights[i % heights.length],
    marginClass: offsets[i % offsets.length],
}));

export default function GalleryScroll() {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);

    const blobVariants: any = {
        animate: {
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
            transition: { duration: 20, ease: "easeInOut", repeat: Infinity }
        }
    };

    return (
        // ✅ CHANGED: Reduced from 1500vh to 600vh.
        // This makes the gallery scroll 2.5x FASTER.
        <section ref={targetRef} className="relative h-[600vh] bg-[#111112]">

            {/* Background Animation */}
            <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
                <motion.div
                    variants={blobVariants}
                    animate="animate"
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
                />
                <motion.div
                    variants={blobVariants}
                    animate="animate"
                    transition={{ delay: 5 }}
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#ff4d00]/10 rounded-full blur-[150px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
            </div>

            {/* Sticky Container */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden z-10 -mt-[100vh]">

                {/* Moving Track */}
                <motion.div style={{ x }} className="flex gap-12 md:gap-24 pl-10 md:pl-20 pr-20 items-center">

                    {/* Intro Text */}
                    <div className="min-w-[60vw] md:min-w-[30vw] flex flex-col justify-center shrink-0 z-20 ml-10">
                        <h2 className="text-5xl md:text-9xl font-black uppercase text-white tracking-tighter leading-none drop-shadow-2xl">
                            Our<br/>
                            <span className="text-[#ff4d00]">Legacy</span>
                        </h2>
                        <p className="text-gray-400 mt-6 max-w-sm text-sm md:text-lg">
                            50 years of innovation. Scroll to explore.
                        </p>
                        <div className="w-24 h-1 bg-[#ff4d00] mt-10"></div>
                    </div>

                    {/* Gallery Items */}
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`relative shrink-0 flex flex-col ${item.widthClass} ${item.heightClass} ${item.marginClass}`}
                            style={{ zIndex: index % 2 === 0 ? 10 : 5 }}
                        >
                            <div className="absolute -left-[60px] top-1/2 w-[60px] h-[1px] bg-white/10 hidden md:block"></div>

                            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#ff4d00] mb-2 md:mb-4 block ml-2">
                  {item.year}
               </span>

                            <div className="relative w-full h-full overflow-hidden rounded-xl group border border-white/10 hover:border-[#ff4d00]/50 transition-all duration-500 shadow-2xl bg-[#050505]">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 scale-105 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                                />
                                <div className="absolute bottom-0 left-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-xl md:text-3xl font-bold text-white uppercase drop-shadow-lg leading-none">{item.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}

                </motion.div>
            </div>
        </section>
    );
}
'use client';

import { useRef, useState, useEffect } from "react";
// ... (keep all your other imports: Image, FluidReveal, etc.)
import FluidReveal from "../components/FluidReveal";
import Navigation from "../components/Navigation";
import TiltCard from "../components/TiltCard";
import GalleryScroll from "../components/GalleryScroll";
import Sponsors from "../components/Sponsors";
import Footer from "../components/Footer";
// ✅ IMPORT PRELOADER
import Preloader from "../components/Preloader";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    // ✅ STATE: Is the website loading?
    const [isLoading, setIsLoading] = useState(true);

    // ✅ GSAP ANIMATION LOGIC (Only runs AFTER loading is done)
    useGSAP(() => {
        if (isLoading) return; // Don't animate hidden stuff

        // 1. Animate Title
        gsap.from(".gsap-title", {
            scrollTrigger: {
                trigger: ".gsap-title",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            y: 100, opacity: 0, duration: 1, ease: "power4.out"
        });

        // 2. Animate Cards
        gsap.from(".gsap-card", {
            scrollTrigger: {
                trigger: ".card-grid",
                start: "top 75%",
            },
            y: 100, opacity: 0, scale: 0.8, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)"
        });

    }, { scope: containerRef, dependencies: [isLoading] }); // Run this when isLoading changes

    const scrollToDetails = () => {
        const gallerySection = document.getElementById('gallery-section');
        if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main ref={containerRef} className="w-full bg-[#111112] text-white">

            {/* ✅ PRELOADER LOGIC */}
            {/* While loading, show Preloader. Once done, it disappears. */}
            {isLoading && (
                <Preloader onComplete={() => setIsLoading(false)} />
            )}

            {/* --- HERO --- */}
            <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <FluidReveal topImage="/animegreen.jpg" bottomImage="/animeblue.jpg" />
                </div>
                <Navigation />

                {/* Only show scroll hint if NOT loading */}
                {!isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-12 z-10 pointer-events-none">
                        <button
                            onClick={scrollToDetails}
                            className="flex flex-col items-center gap-4 pointer-events-auto cursor-pointer group"
                        >


                        </button>
                    </div>
                )}
            </section>

            {/* --- GALLERY --- */}
            <div id="gallery-section">
                <GalleryScroll />
            </div>

            {/* --- EVENT DETAILS --- */}
            <section id="details-section" className="min-h-screen w-full bg-[#050505] border-t border-white/10 p-6 md:p-20 relative z-10">

                <div className="gsap-title flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">
                        Explore Events
                    </h2>
                    <p className="text-[#ff4d00] text-xs font-bold uppercase tracking-[0.2em] mt-2 animate-pulse">
                        — Click cards to see magic —
                    </p>
                    <p className="text-gray-400 mt-4 max-w-lg text-sm md:text-base">
                        Participate in over 50+ events ranging from coding battles to robot wars.
                    </p>
                </div>

                {/* Card Grid */}
                <div className="card-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {/* Make sure you are using your 'Dancing' TiltCard here */}
                    <div className="gsap-card"><TiltCard title="Ideathon" description="Pitch your revolutionary ideas." icon="💡" details="Prize: ₹50k | Team: 2-4" /></div>
                    <div className="gsap-card"><TiltCard title="Hackathon" description="24-hour coding marathon." icon="💻" details="Theme: AI for Good | Free Food" /></div>
                    <div className="gsap-card"><TiltCard title="Robo Wars" description="Build bots and destroy competition." icon="🤖" details="15kg & 60kg Category" /></div>
                    <div className="gsap-card"><TiltCard title="Gaming" description="FIFA, Valorant, BGMI tournaments." icon="🎮" details="PC Specs provided." /></div>
                    <div className="gsap-card"><TiltCard title="Workshops" description="Learn AI, Blockchain, Security." icon="🛠️" details="Certificate for all." /></div>
                    <div className="gsap-card"><TiltCard title="Star Night" description="Live celebrity performance." icon="✨" details="Entry via ID Card." /></div>
                </div>
            </section>

            <Sponsors />
            <Footer />

        </main>
    );
}
'use client'; // Needed for the onClick scroll feature

import Image from "next/image";
import FluidReveal from "../components/FluidReveal";
import Navigation from "../components/Navigation";

export default function Home() {

    // Function to smooth scroll to the details section
    const scrollToDetails = () => {
        const detailsSection = document.getElementById('details-section');
        if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="w-full bg-[#111112] text-white">

            {/* --- SECTION 1: HERO --- */}
            <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">

                {/* Background Animation */}
                <div className="absolute inset-0 z-0">
                    <FluidReveal
                        topImage="/animegreen.jpg"
                        bottomImage="/animeblue.jpg"
                    />
                </div>

                {/* Navigation Menu */}
                <Navigation />

                {/* Text Overlay (Now Clickable!) */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-12 z-10 pointer-events-none">

                    {/* ✅ FIXED: Made this a button with pointer-events-auto */}
                    <button
                        onClick={scrollToDetails}
                        className="flex flex-col items-center gap-4 pointer-events-auto cursor-pointer group"
                    >
                        <p className="text-xs md:text-xl tracking-[0.3em] md:tracking-[0.5em] uppercase text-[#ff4d00] animate-pulse group-hover:text-white transition-colors">
                            Scroll to Enter
                        </p>
                        {/* Arrow Icon */}
                        <div className="w-[1px] h-8 md:h-12 bg-[#ff4d00] opacity-50 group-hover:h-16 transition-all duration-300"></div>
                    </button>

                </div>

            </section>

            {/* --- SECTION 2: CONTENT --- */}
            {/* ✅ Added ID for the scroll target */}
            <section id="details-section" className="min-h-screen w-full bg-[#050505] border-t border-white/10 p-6 md:p-10 relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mt-10 md:mt-20 text-center uppercase tracking-tighter">
                    Event Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-6xl mx-auto">
                    <div className="h-48 md:h-64 bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-[#ff4d00] transition-colors">
                        <h3 className="text-2xl font-bold text-[#ff4d00]">Competitions</h3>
                        <p className="text-gray-400 mt-2 text-sm md:text-base">Battle it out in code, robotics, and design.</p>
                    </div>
                    <div className="h-48 md:h-64 bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-[#ff4d00] transition-colors">
                        <h3 className="text-2xl font-bold text-[#ff4d00]">Workshops</h3>
                        <p className="text-gray-400 mt-2 text-sm md:text-base">Learn from industry experts.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
import Image from "next/image";
import FluidReveal from "../components/FluidReveal";
import Navigation from "../components/Navigation";

export default function Home() {
    return (
        <main className="w-full bg-[#111112] text-white">

            {/* --- SECTION 1: HERO (Mobile Optimized) --- */}
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

                {/* Text Overlay - Centered and Responsive */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-12 z-10 pointer-events-none mix-blend-difference">
                    {/* This text stays at the bottom on both Phone and Laptop */}
                    <p className="text-xs md:text-xl tracking-[0.3em] md:tracking-[0.5em] uppercase text-[#ff4d00] animate-pulse">
                        Scroll to Enter
                    </p>
                    <div className="w-[1px] h-8 md:h-12 bg-[#ff4d00] mt-4 opacity-50"></div>
                </div>

            </section>

            {/* --- SECTION 2: CONTENT --- */}
            <section className="min-h-screen w-full bg-[#050505] border-t border-white/10 p-6 md:p-10 relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mt-10 md:mt-20 text-center uppercase tracking-tighter">
                    Event Details
                </h2>

                {/* Responsive Grid Example */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-6xl mx-auto">
                    <div className="h-48 md:h-64 bg-white/5 rounded-2xl border border-white/10 p-6">
                        <h3 className="text-2xl font-bold text-[#ff4d00]">Competitions</h3>
                        <p className="text-gray-400 mt-2 text-sm md:text-base">Battle it out in code, robotics, and design.</p>
                    </div>
                    <div className="h-48 md:h-64 bg-white/5 rounded-2xl border border-white/10 p-6">
                        <h3 className="text-2xl font-bold text-[#ff4d00]">Workshops</h3>
                        <p className="text-gray-400 mt-2 text-sm md:text-base">Learn from industry experts.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
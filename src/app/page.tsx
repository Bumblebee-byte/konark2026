'use client';

import Image from "next/image";
import FluidReveal from "../components/FluidReveal";
import Navigation from "../components/Navigation";
import TiltCard from "../components/TiltCard";
import GalleryScroll from "../components/GalleryScroll";
// ✅ NEW IMPORTS
import Sponsors from "../components/Sponsors";
import Footer from "../components/Footer";

export default function Home() {

    const scrollToDetails = () => {
        const gallerySection = document.getElementById('gallery-section');
        if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="w-full bg-[#111112] text-white">

            {/* --- HERO --- */}
            <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <FluidReveal topImage="/animegreen.jpg" bottomImage="/animeblue.jpg" />
                </div>
                <Navigation />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-12 z-10 pointer-events-none">
                    <button
                        onClick={scrollToDetails}
                        className="flex flex-col items-center gap-4 pointer-events-auto cursor-pointer group"
                    >
                        <p className="text-xs md:text-xl tracking-[0.3em] md:tracking-[0.5em] uppercase text-[#ff4d00] animate-pulse group-hover:text-white transition-colors">
                            Scroll to Enter
                        </p>
                        <div className="w-[1px] h-8 md:h-12 bg-[#ff4d00] opacity-50 group-hover:h-16 transition-all duration-300"></div>
                    </button>
                </div>
            </section>

            {/* --- GALLERY --- */}
            <div id="gallery-section">
                <GalleryScroll />
            </div>

            {/* --- EVENT DETAILS --- */}
            <section id="details-section" className="min-h-screen w-full bg-[#050505] border-t border-white/10 p-6 md:p-20 relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">
                        Explore Events
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-lg text-sm md:text-base">
                        Participate in over 50+ events ranging from coding battles to robot wars.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    <TiltCard title="Ideathon" description="Pitch your revolutionary ideas to industry experts and win funding." icon="💡" />
                    <TiltCard title="Hackathon" description="24-hour coding marathon to solve real-world problems." icon="💻" />
                    <TiltCard title="Robo Wars" description="Build your ultimate bot and destroy the competition in the arena." icon="🤖" />
                    <TiltCard title="Gaming" description="FIFA, Valorant, and BGMI tournaments with massive prize pools." icon="🎮" />
                    <TiltCard title="Workshops" description="Hands-on learning sessions on AI, Blockchain, and Cyber Security." icon="🛠️" />
                    <TiltCard title="Star Night" description="Conclude the fest with a live performance by a celebrity artist." icon="✨" />
                </div>
            </section>

            {/* --- ✅ NEW: SPONSORS & FOOTER --- */}
            <Sponsors />
            <Footer />

        </main>
    );
}
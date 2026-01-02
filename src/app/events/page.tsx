'use client';

import { useState } from "react";
import Navigation from "../../components/Navigation";
import EventHorizontalScroll from "../../components/EventHorizontalScroll";
import Sponsors from "../../components/Sponsors";
import Footer from "../../components/Footer";
import Preloader from "../../components/Preloader";

// --- DATA: SEPARATED LISTS ---
const RECENT_EVENTS = [
    { id: 1, title: "DESIGN SUMMIT", category: "CONFERENCE", date: "DEC 12", img: "/images/photo1.jpg", link: "#" },
    { id: 2, title: "HACKATHON v1", category: "COMPETITION", date: "OCT 15", img: "/images/photo3.jpg", link: "#" },
    { id: 3, title: "STARTUP GRIND", category: "NETWORKING", date: "SEP 01", img: "/images/photo4.jpg", link: "#" },
    { id: 4, title: "ROBO EXPO", category: "EXHIBITION", date: "AUG 10", img: "/images/photo5.jpg", link: "#" },
    { id: 5, title: "WEB3 BOOTCAMP", category: "WORKSHOP", date: "JUL 15", img: "/images/photo2.jpg", link: "#" },
];

const UPCOMING_EVENTS = [
    { id: 6, title: "KONARK '25", category: "MEGA EVENT", date: "COMING SOON", img: "/images/photo1.jpg", link: "#" },
    { id: 7, title: "STAR NIGHT", category: "CULTURAL", date: "MAR 15", img: "/images/photo4.jpg", link: "#" },
    { id: 8, title: "DRONE RACING", category: "COMPETITION", date: "MAR 12", img: "/images/photo3.jpg", link: "#" },
    { id: 9, title: "VALORANT CUP", category: "ESPORTS", date: "MAR 10", img: "/images/photo5.jpg", link: "#" },
    { id: 10, title: "AI NEXUS", category: "CONFERENCE", date: "FEB 28", img: "/images/photo2.jpg", link: "#" },
];

export default function EventsPage() {
    const [isLoading, setIsLoading] = useState(true);
    // State to toggle between the two lists
    const [activeTab, setActiveTab] = useState<'recent' | 'upcoming'>('recent');

    return (
        <main className="w-full bg-[#050505] text-white flex flex-col min-h-screen">

            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            <Navigation />

            {/* --- HEADER SECTION --- */}
            <section className="relative z-10 pt-32 md:pt-40 px-6 md:px-16 pb-10 flex flex-col items-start">

                {/* DYNAMIC TITLE based on selection */}
                <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-none">
                    {activeTab === 'recent' ? "RECENT EVENTS" : "UPCOMING EVENTS"}
                </h1>

                {/* TOGGLE BUTTONS */}
                <div className="flex gap-8 mt-8 md:mt-10">
                    <button
                        onClick={() => setActiveTab('recent')}
                        className={`text-sm md:text-base font-bold uppercase tracking-[0.2em] transition-all relative pb-2
                        ${activeTab === 'recent' ? 'text-white after:w-full' : 'text-gray-600 hover:text-white after:w-0'}
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#ff4d00] after:transition-all after:duration-300`}
                    >
                        Recent (Past)
                    </button>

                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`text-sm md:text-base font-bold uppercase tracking-[0.2em] transition-all relative pb-2
                        ${activeTab === 'upcoming' ? 'text-white after:w-full' : 'text-gray-600 hover:text-white after:w-0'}
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#ff4d00] after:transition-all after:duration-300`}
                    >
                        Upcoming (Future)
                    </button>
                </div>
            </section>

            {/* --- SCROLLABLE GALLERY --- */}
            {/* We switch the data prop based on activeTab */}
            <div className="relative z-0 pb-20 min-h-[500px]">
                <EventHorizontalScroll events={activeTab === 'recent' ? RECENT_EVENTS : UPCOMING_EVENTS} />
            </div>

            {/* FOOTER */}
            <div className="relative z-20 bg-[#111112]">
                <Sponsors />
                <Footer />
            </div>

        </main>
    );
}
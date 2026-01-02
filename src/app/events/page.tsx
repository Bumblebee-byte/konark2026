'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "../../components/Navigation";
import EventHorizontalScroll from "../../components/EventHorizontalScroll";
import Sponsors from "../../components/Sponsors";
import Footer from "../../components/Footer";
import Preloader from "../../components/Preloader";

const RECENT_EVENTS = [
    { id: 1, title: "FIBO 2024", category: "Exhibition", date: "April 12", img: "/images/photo1.jpg", link: "https://google.com" },
    { id: 2, title: "HACKATHON", category: "Competition", date: "May 05", img: "/images/photo2.jpg", link: "/events/hackathon" },
    { id: 3, title: "ROBO WARS", category: "Robotics", date: "May 20", img: "/images/photo3.jpg", link: "/events/robo-wars" },
    { id: 4, title: "STAR NIGHT", category: "Concert", date: "June 01", img: "/images/photo4.jpg", link: "/events/star-night" },
    { id: 5, title: "GAMING", category: "Esports", date: "June 15", img: "/images/photo5.jpg", link: "/events/gaming" },
];

const UPCOMING_EVENTS = [
    { id: 7, title: "KONARK '25", category: "Mega Event", date: "Coming Soon", img: "/images/photo1.jpg", link: "/events/konark-2025" },
    { id: 8, title: "AI SUMMIT", category: "Conference", date: "August 2025", img: "/images/photo2.jpg", link: "/events/ai-summit" },
];

export default function EventsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'recent' | 'upcoming'>('recent');

    return (
        <main className="w-full bg-black text-white flex flex-col min-h-screen overflow-x-hidden">
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            <Navigation />

            {/* HEADER */}
            <div className="relative pt-32 pb-10 flex flex-col items-center z-10">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">EVENTS</h1>

                {/* TABS */}
                <div className="flex gap-8 border-b border-white/10 pb-4">
                    <button
                        onClick={() => setActiveTab('recent')}
                        className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === 'recent' ? 'text-[#ff4d00]' : 'text-gray-600 hover:text-white'}`}
                    >
                        Recent
                    </button>
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === 'upcoming' ? 'text-[#ff4d00]' : 'text-gray-600 hover:text-white'}`}
                    >
                        Upcoming
                    </button>
                </div>
            </div>

            {/* CAROUSEL AREA */}
            <div className="w-full h-[70vh] relative z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                    >
                        <EventHorizontalScroll events={activeTab === 'recent' ? RECENT_EVENTS : UPCOMING_EVENTS} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-10 bg-[#111112]">
                <Sponsors />
                <Footer />
            </div>
        </main>
    );
}
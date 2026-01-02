'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "motion/react";
import Link from "next/link";

// --- TEAM DATA ---
const teamMembers = [
    {
        name: "Sarika",
        role: "Lead Developer",
        // We are testing with standard HTML img tag now
        image: "/gallery/Sarika.jpeg",
        linkedin: "#",
        github: "#"
    },
    {
        name: "Akanshi",
        role: "Captain",
        image: "/gallery/Akanshi.jpeg",
        linkedin: "#",
        github: "#"
    },
    {
        name: "Prashant",
        role: "UI/UX Designer",
        image: "/gallery/Prashant.png",
        linkedin: "#",
        github: "#",
        Color: "Black"
    },
    {
        name: "Akhil",
        role: "Sponsorship Head",
        image: "/gallery/Akhil.jpeg",
        linkedin: "#",
        github: "#"
    },
    {
        name: "Rahul Kumar",
        role: "Creative Director",
        image: "/gallery/Rahul.jpeg",
        linkedin: "#",
        github: "#"
    },
    {
        name: "Krish",
        role: "Technical Head",
        image: "/gallery/Krish.jpeg",
        linkedin: "#",
        github: "#"
    },
];

const Card = ({ member, index }: { member: any, index: number }) => {
    return (
        <div
            // Force height and background color
            style={{ height: '450px', backgroundColor: '#111' }}
            className="group relative w-full overflow-hidden rounded-xl border border-white/20"
        >
            {/* IMAGE CONTAINER */}
            <div className="absolute inset-0 z-0 transition-all duration-500 group-hover:scale-110">

                {/* ✅ FIX 1: Removed 'grayscale' classes so it's always color */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={member.image}
                    alt={member.name}
                    // Removed: grayscale group-hover:grayscale-0
                    className="w-full h-full object-cover transition-all duration-500"
                />

                {/* ✅ FIX 2: DELETED the Dark Gradient Overlay div completely */}
                {/* The div that was here is gone now. */}
            </div>

            {/* CONTENT (Text might be harder to read on bright images now) */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {/* Added a slight text shadow so white text pops off bright images */}
                <span className=" text-m font- text-black bold uppercase tracking-[1.5em] mb-5 block drop-shadow-md">
            {member.role}
        </span>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none font-epic drop-shadow-lg">
                    {member.name}
                </h3>
                {/* ... social links remain the same ... */}
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                    <div className="flex gap-4 pt-4 border-t border-white/20">
                        <Link href={member.linkedin} className="text-sm text-gray-400 hover:text-white transition-colors">LinkedIn</Link>
                        <Link href={member.github} className="text-sm text-gray-400 hover:text-white transition-colors">GitHub</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function TeamPage() {
    return (
        <main className="bg-[#111112] min-h-screen text-white font-epic">
            <Navigation />

            {/* HEADER */}
            <section className="pt-40 pb-20 px-6 md:px-20 text-center">
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
                    The <span className="text-[#ff4d00]">Architects</span>
                </h1>
                <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                    Meet the minds behind the madness.
                </p>
            </section>

            {/* GRID */}
            <section className="px-6 md:px-20 pb-40 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, i) => (
                        <Card key={i} member={member} index={i} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
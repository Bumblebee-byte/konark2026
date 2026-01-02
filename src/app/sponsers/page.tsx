'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Preloader from "../../components/Preloader";

// --- SPONSOR DATA ---
const SPONSORS = [
    {
        tier: "Platinum",
        // 'col-span-2' makes these cards twice as wide
        className: "md:col-span-2 md:row-span-2 h-[400px]",
        logos: [
            { id: 1, name: "Stripe", img: "/images/Stripe.PNG", link: "#" },
            { id: 2, name: "OpenAI", img: "/images/OpenAI.PNG", link: "#" }
        ]
    },
    {
        tier: "Gold",
        className: "md:col-span-1 h-[250px]",
        logos: [
            { id: 3, name: "Vercel", img: "/images/Vercel.PNG", link: "#" },
            { id: 4, name: "Supabase", img: "/images/Supabase.PNG", link: "#" },
            { id: 5, name: "Figma", img: "/images/Figma.PNG", link: "#" },
            { id: 6, name: "Linear", img: "/images/Linear.JPG", link: "#" }
        ]
    },
    {
        tier: "Silver",
        className: "md:col-span-1 h-[200px]",
        logos: [
            { id: 7, name: "Raycast", img: "/images/Raycast.JPG", link: "#" },
            { id: 8, name: "Notion", img: "/images/Notion.PNG", link: "#" },
            { id: 9, name: "Arc", img: "/images/Arc.PNG", link: "#" },
            { id: 10, name: "Loom", img: "/images/loom.PNG", link: "#" }
        ]
    }
];

export default function SponsorsPage() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <main className="w-full bg-black text-white flex flex-col min-h-screen">

            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            <Navigation />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-40 pb-20 px-6 md:px-12 border-b border-white/10">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-8">
                        Our Partners
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
                        We’re honored to be supported by the world’s most forward-thinking companies. Together, we are shaping the future of technology.
                    </p>
                </div>
            </section>

            {/* --- SPONSOR GRID --- */}
            <section className="px-6 md:px-12 py-20">

                {/* GRID EXPLANATION:
                   - grid-cols-2 md:grid-cols-4: 2 columns mobile, 4 desktop.
                   - gap-[1px]: Creates the visible grid lines.
                   - bg-white/10: The color of the gap becomes the border color.
                */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 overflow-hidden rounded-lg">

                    {SPONSORS.map((group) => (
                        group.logos.map((sponsor) => (
                            <a
                                key={sponsor.id}
                                href={sponsor.link}
                                target="_blank"
                                className={`
                                    relative group bg-white hover:bg-[#0a0a0a] transition-colors duration-500
                                    flex flex-col items-center justify-center p-8 md:p-12
                                    ${group.className}
                                `}
                            >
                                {/* Tier Badge (Top Left) */}
                                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                                        {group.tier}
                                    </span>
                                </div>

                                {/* External Link Icon (Top Right) */}
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>

                                {/* LOGO - SIZE INCREASED HERE */}
                                {/* Changed h-[40%] to h-[70%] and max-w-[180px] to max-w-[300px] */}
                                <div className="relative w-full h-[70%] max-w-[300px]">
                                    <Image
                                        src={sponsor.img}
                                        alt={sponsor.name}
                                        fill
                                        className="object-contain filter grayscale brightness-75 opacity-60 group-hover:filter-none group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>

                            </a>
                        ))
                    ))}

                    {/* Empty slots to fill the grid if needed (Optional aesthetics) */}
                    <div className="bg-[#050505] h-[200px] md:h-auto hidden md:block"></div>
                </div>

            </section>

            {/* --- CTA SECTION (Stripe Style) --- */}
            <section className="px-6 md:px-12 pb-32 pt-10">
                <div className="bg-[#111] border border-white/10 rounded-2xl p-10 md:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-medium mb-4">Interested in sponsoring?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Connect with thousands of developers, designers, and tech enthusiasts.
                            Download our prospectus to see available packages.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Link
                            href="/contact"
                            className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <button className="px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors">
                            Download Deck
                        </button>
                    </div>

                </div>
            </section>

            <Footer />

        </main>
    );
}
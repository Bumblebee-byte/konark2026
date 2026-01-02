'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

// --- MENU CONFIGURATION ---
const menuItems = [
    { title: "Home", href: "/" },
    { title: "Contact Team", href: "/team" },
    { title: "All Events", href: "/events" },
    {
        title: "Competitions",
        href: "#",
        submenu: [
            { title: "Ideathon", href: "https://youtube.com" },
            { title: "Hackathon", href: "https://youtube.com" },
            { title: "Robotics", href: "https://youtube.com" },
            { title: "Coding", href: "https://youtube.com" },
            { title: "Gaming", href: "https://youtube.com" }
        ]
    },
    { title: "Workshops", href: "https://youtube.com" },
    { title: "Sponsors", href: "https://youtube.com" },
    { title: "Gallery", href: "https://youtube.com" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

    const toggleSubmenu = (index: number) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    return (
        <>
            {/* 1. TOP BAR (Always Visible) */}
            <nav className="absolute top-0 w-full p-4 md:p-8 flex justify-between items-center z-50 pointer-events-auto">

                {/* LEFT SIDE: Home Button + Logo Links */}
                <div className="flex items-center gap-4 md:gap-6">

                    {/* ✅ UPDATED: CLEAN HOME BUTTON (No Circle) */}
                    <Link
                        href="/"
                        className="flex items-center justify-center text-white mix-blend-difference hover:text-[#ff4d00] transition-colors duration-300"
                        title="Back to Home"
                    >
                        {/* Simple Home SVG Icon - Slightly larger for better visibility without the circle */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-7 md:h-7">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </Link>

                    {/* Existing Links */}
                    <Link
                        href="https://gjust.ac.in/"
                        target="_blank"
                        className="text-lg md:text-2xl font-bold tracking-tighter text-white mix-blend-difference hover:opacity-80 transition-opacity"
                    >
                        GJUS&T
                    </Link>
                    <Link
                        href="https://www.iconnectgjust.in/"
                        target="_blank"
                        className="text-lg md:text-2xl font-bold tracking-tighter text-white mix-blend-difference hover:opacity-80 transition-opacity"
                    >
                        iConnect
                    </Link>
                </div>

                {/* Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase cursor-pointer transition-all z-50 
            ${isOpen ? 'bg-white text-black' : 'bg-[#ff4d00] text-white hover:bg-white hover:text-black'}`}
                >
                    {isOpen ? "Close" : "Menu"}
                </button>
            </nav>

            {/* 2. THE LEITWIND-STYLE OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-20px" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-20px" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 bg-[#111112] z-40 flex flex-col md:flex-row"
                    >

                        {/* --- LEFT COLUMN: NAVIGATION LINKS --- */}
                        <div className="w-full md:w-1/2 h-full flex flex-col px-6 pt-24 pb-10 md:px-24 md:py-0 justify-start md:justify-center overflow-y-auto">
                            <div className="flex flex-col gap-4 md:gap-6">
                                {menuItems.map((item, index) => (
                                    <div key={index} className="flex flex-col items-start border-b border-white/10 pb-3 md:pb-4 last:border-none">

                                        {/* Main Link Header */}
                                        <div
                                            className="group flex items-center justify-between w-full cursor-pointer"
                                            onClick={() => item.submenu ? toggleSubmenu(index) : null}
                                        >
                                            <h3 className="text-3xl md:text-5xl font-bold text-white group-hover:text-[#ff4d00] transition-colors uppercase tracking-tight">
                                                {item.submenu ? (
                                                    <span>{item.title}</span>
                                                ) : (
                                                    <Link href={item.href} onClick={() => setIsOpen(false)}>{item.title}</Link>
                                                )}
                                            </h3>

                                            {/* Plus Icon */}
                                            {item.submenu && (
                                                <span className={`text-xl md:text-2xl transition-transform duration-300 ${activeSubmenu === index ? 'rotate-45 text-[#ff4d00]' : 'text-gray-500'}`}>
                                                    +
                                                </span>
                                            )}
                                        </div>

                                        {/* Submenu Expansion */}
                                        <AnimatePresence>
                                            {item.submenu && activeSubmenu === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden flex flex-col gap-3 mt-3 ml-2 w-full"
                                                >
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            href={subItem.href}
                                                            target="_blank"
                                                            className="text-base md:text-lg text-gray-400 hover:text-[#ff4d00] transition-colors py-1 block"
                                                        >
                                                            — {subItem.title}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: FEATURED IMAGE --- */}
                        <div className="hidden md:flex w-1/2 h-full bg-[#050505] relative items-center justify-center border-l border-white/10 p-10">
                            <div className="relative w-full h-[80%] rounded-2xl overflow-hidden group">
                                <Image
                                    src="/animeblue.jpg"
                                    alt="Featured"
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                />
                                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent">
                                    <h4 className="text-4xl font-bold text-white mb-2">KONARK 2025</h4>
                                    <p className="text-gray-300">Join the biggest tech fest of North India.</p>

                                    <a
                                        href="https://tally.so/r/b59QAE"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative z-50 mt-4 inline-block px-6 py-3 bg-[#ff4d00] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
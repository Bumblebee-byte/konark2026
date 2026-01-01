'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

// --- MENU CONFIGURATION ---
const menuItems = [
    {
        title: "Home",
        href: "https://youtube.com"
    },
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
    {
        title: "Workshops",
        href: "https://youtube.com"
    },
    {
        title: "Sponsors",
        href: "https://youtube.com"
    },
    {
        title: "Gallery",
        href: "https://youtube.com"
    },
    {
        title: "Contact Team",
        href: "https://youtube.com"
    }
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
            <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-50 pointer-events-auto">

                {/* Logo / Links */}
                <div className="flex gap-6">
                    <Link href="https://gjust.ac.in/" target="_blank" className="text-xl md:text-2xl font-bold tracking-tighter text-white mix-blend-difference hover:opacity-80 transition-opacity">
                        GJUS&T
                    </Link>
                    <Link href="https://www.iconnectgjust.in/" target="_blank" className="text-xl md:text-2xl font-bold tracking-tighter text-white mix-blend-difference hover:opacity-80 transition-opacity">
                        iConnect
                    </Link>
                </div>

                {/* Menu Button (Leitwind Style Green/Orange Button) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase cursor-pointer transition-all z-50 
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
                        className="fixed inset-0 bg-[#111112] z-40 flex flex-col md:flex-row pt-24 md:pt-0"
                    >

                        {/* --- LEFT COLUMN: NAVIGATION LINKS --- */}
                        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 overflow-y-auto">
                            <div className="flex flex-col gap-6">
                                {menuItems.map((item, index) => (
                                    <div key={index} className="flex flex-col items-start border-b border-white/10 pb-4 last:border-none">

                                        {/* Main Link Header */}
                                        <div
                                            className="group flex items-center gap-4 cursor-pointer"
                                            onClick={() => item.submenu && toggleSubmenu(index)}
                                        >
                                            <h3 className="text-3xl md:text-5xl font-bold text-white group-hover:text-[#ff4d00] transition-colors uppercase tracking-tight">
                                                {item.submenu ? item.title : (
                                                    <Link href={item.href} target="_blank">{item.title}</Link>
                                                )}
                                            </h3>

                                            {/* The Leitwind "Plus" Icon */}
                                            {item.submenu && (
                                                <span className={`text-2xl transition-transform duration-300 ${activeSubmenu === index ? 'rotate-45 text-[#ff4d00]' : 'text-gray-500'}`}>
                          +
                        </span>
                                            )}
                                        </div>

                                        {/* Submenu Expansion (Accordion) */}
                                        <AnimatePresence>
                                            {item.submenu && activeSubmenu === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden flex flex-col gap-3 mt-4 ml-2"
                                                >
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            href={subItem.href}
                                                            target="_blank"
                                                            className="text-lg text-gray-400 hover:text-[#ff4d00] transition-colors"
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

                        {/* --- RIGHT COLUMN: FEATURED IMAGE / NEWSLETTER --- */}
                        <div className="hidden md:flex w-1/2 h-full bg-[#050505] relative items-center justify-center border-l border-white/10 p-10">
                            {/* This mimics the "Subscribe to Newsletter" box in Leitwind */}
                            <div className="relative w-full h-[80%] rounded-2xl overflow-hidden group">
                                <Image
                                    src="/animeblue.jpg" // Uses your existing image
                                    alt="Featured"
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                />
                                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent">
                                    <h4 className="text-4xl font-bold text-white mb-2">KONARK 2025</h4>
                                    <p className="text-gray-300">Join the biggest tech fest of North India.</p>
                                    <button className="mt-4 px-6 py-3 bg-[#ff4d00] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all">
                                        Register Now
                                    </button>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
'use client';

import { motion } from "motion/react";

// You can replace these with real logo images later.
// For now, we use text to show the effect immediately.
const sponsors = [
    "Jack & Jones", "MICROSOFT", "CELIO", "TESLA", "OPENAI",
    "NVIDIA", "INTEL", "IBM", "SAMSUNG", "APPLE"
];

export default function Sponsors() {
    return (
        <section className="py-24 bg-[#111112] border-t border-white/10 overflow-hidden relative">

            <div className="text-center mb-12">
                <p className="text-[#ff4d00] tracking-[0.3em] text-sm font-bold uppercase mb-2">Powering The Future</p>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Our Partners</h2>
            </div>

            {/* Container for the infinite scroll */}
            <div className="relative flex flex-col gap-8">

                {/* ROW 1: Moving Left */}
                <div className="flex overflow-hidden mask-image-gradient">
                    <motion.div
                        className="flex gap-12 md:gap-24 whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    >
                        {[...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
                            <span key={i} className="text-4xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase tracking-tighter hover:text-white transition-colors cursor-pointer">
                {sponsor}
              </span>
                        ))}
                    </motion.div>
                </div>

                {/* ROW 2: Moving Right */}
                <div className="flex overflow-hidden mask-image-gradient">
                    <motion.div
                        className="flex gap-12 md:gap-24 whitespace-nowrap"
                        animate={{ x: [-1000, 0] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                    >
                        {[...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
                            <span key={i} className="text-4xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase tracking-tighter hover:text-[#ff4d00] transition-colors cursor-pointer">
                {sponsor}
              </span>
                        ))}
                    </motion.div>
                </div>

            </div>

            {/* Side Fades to make it look smooth */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#111112] to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#111112] to-transparent z-10"></div>

        </section>
    );
}
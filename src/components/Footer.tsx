'use client';

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10 px-6 md:px-20 text-white">

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">KONARK</h2>
                    <p className="text-gray-400 max-w-sm">
                        The annual technical festival of Guru Jambheshwar University of Science & Technology, Hisar.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-[#ff4d00] font-bold uppercase tracking-widest mb-6">Explore</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Workshops</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Sponsors</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Our Team</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-[#ff4d00] font-bold uppercase tracking-widest mb-6">Contact</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link href="https://www.iconnectgjust.in/" className="hover:text-white transition-colors">iConnect</Link></li>
                        <li><Link href="tel:+917988823880" className="#">7988823880</Link></li>
                        <li>Hisar, Haryana, India</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-s text-gray-500 uppercase tracking-widest">
                <p>&copy; 2025 KONARK. All Rights Reserved.</p>
                <p>Designed with ❤️ by Prashant</p>
            </div>

        </footer>
    );
}
'use client';

import { useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Preloader from "../../components/Preloader";

// Social Links Data
const SOCIAL_LINKS = [
    { name: "Instagram", url: "https://www.instagram.com/iconnectgjust/" },
    { name: "LinkedIn", url: "https://in.linkedin.com/company/iconnect-gjust" },
    { name: "Twitter", url: "https://x.com/iconnectgjust" },
    { name: "YouTube", url: "https://www.youtube.com/@iConnectGJUST" }
];

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState(""); // Feedback message state

    // --- FORM SUBMISSION HANDLER ---
    const onSubmit = async (event: any) => {
        event.preventDefault();
        setResult("Sending....");

        const formData = new FormData(event.target);

        // ✅ YOUR API KEY IS NOW INTEGRATED HERE
        formData.append("access_key", "bbdc136f-1b57-4cd4-824e-d76b4d6c69b2");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message Sent Successfully!");
                event.target.reset(); // Clear form after success
            } else {
                console.log("Error", data);
                setResult(data.message);
            }
        } catch (error) {
            setResult("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="w-full bg-black text-white flex flex-col min-h-screen selection:bg-[#ff4d00] selection:text-white">

            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            <Navigation />

            {/* --- HERO HEADER --- */}
            <section className="pt-40 pb-20 px-6 md:px-12 border-b border-white/10">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-8">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
                        Have questions about sponsorship, events, or participation? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* --- SPLIT CONTENT SECTION --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">

                {/* LEFT COLUMN: CONTACT INFO */}
                <div className="border-r border-white/10 p-6 md:p-16 flex flex-col gap-16">

                    {/* Email & Phone */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span> Contact Details
                        </h3>
                        <div className="flex flex-col gap-4 text-xl md:text-2xl font-light">
                            <a href="mailto:iconnect@gjust.org" className="hover:text-[#ff4d00] transition-colors w-max">
                                iconnect@gjust.org
                            </a>
                            <a href="tel:+917988823880" className="hover:text-[#ff4d00] transition-colors w-max">
                                +91 79888 23880
                            </a>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-white/20"></span> Location
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
                            Guru Jambheshwar University of Science and Technology,<br />
                            Hisar, Haryana 125001<br />
                            India
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="mt-auto">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Socials</h3>
                        <div className="flex gap-8 flex-wrap">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-[#ff4d00] transition-colors uppercase text-sm font-bold tracking-widest"
                                >
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: CONTACT FORM */}
                <div className="p-6 md:p-16 bg-[#050505]">
                    <form onSubmit={onSubmit} className="flex flex-col gap-10 max-w-lg">

                        {/* Hidden input to prevent spam (Honeypot) - Optional but good practice provided by Web3Forms logic */}
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Enter your full name"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white outline-none focus:border-[#ff4d00] transition-colors placeholder:text-white/20"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email address"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white outline-none focus:border-[#ff4d00] transition-colors placeholder:text-white/20"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                            <select name="subject" required className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white outline-none focus:border-[#ff4d00] transition-colors cursor-pointer appearance-none">
                                <option className="bg-black text-gray-400" value="" disabled selected>Select a topic</option>
                                <option className="bg-black" value="sponsorship">Sponsorship</option>
                                <option className="bg-black" value="events">Event Inquiry</option>
                                <option className="bg-black" value="technical">Technical Support</option>
                                <option className="bg-black" value="other">Other</option>
                            </select>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                placeholder="Tell us how we can help..."
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white outline-none focus:border-[#ff4d00] transition-colors placeholder:text-white/20 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="mt-6 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#ff4d00] hover:text-white transition-all duration-300 w-full md:w-auto self-start"
                        >
                            Send Message
                        </button>

                        {/* Status Message */}
                        {result && (
                            <p className={`mt-4 text-sm font-bold uppercase tracking-widest ${result.includes("Success") ? "text-green-500" : "text-[#ff4d00]"}`}>
                                {result}
                            </p>
                        )}

                    </form>
                </div>

            </section>

            <Footer />

        </main>
    );
}
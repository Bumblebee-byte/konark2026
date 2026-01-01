import Image from "next/image";
import FluidReveal from "../components/FluidReveal";
import Navigation from "../components/Navigation"; // ✅ Import the new menu

export default function Home() {
    return (
        <main className="w-full bg-[#111112] text-white">

            {/* --- SECTION 1: HERO --- */}
            <section className="h-screen w-full relative">
                <div className="absolute inset-0 z-0">
                    <FluidReveal
                        // Swapped images as per your request
                        topImage="/animegreen.jpg"
                        bottomImage="/animeblue.jpg"
                    />
                </div>

                {/* ✅ NEW: The Navigation Component handles the Menu Button now */}
                <Navigation />

            </section>

            {/* --- SECTION 2: CONTENT --- */}
            <section className="min-h-screen w-full bg-[#050505] border-t border-white/10 p-10 relative z-10">
                <h2 className="text-6xl font-bold mt-20 text-center">Event Details</h2>
            </section>
        </main>
    );
}
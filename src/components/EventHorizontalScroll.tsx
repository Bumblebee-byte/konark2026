'use client';

import Image from "next/image";
import Link from "next/link";

interface EventItem {
    id: number;
    title: string;
    category: string;
    date: string;
    img: string;
    link: string;
}

interface Props {
    events: EventItem[];
}

export default function EventHorizontalScroll({ events }: Props) {
    return (
        <div className="w-full overflow-x-auto no-scrollbar pb-10">
            {/* Container for cards with padding on sides */}
            <div className="flex gap-6 px-6 md:px-16 w-max">

                {events.map((event) => (
                    <Link
                        href={event.link}
                        key={event.id}
                        className="group relative shrink-0 w-[280px] h-[400px] md:w-[340px] md:h-[500px] rounded-xl overflow-hidden bg-[#111]"
                    >
                        {/* 1. IMAGE BACKDROP */}
                        <div className="absolute inset-0">
                            <Image
                                src={event.img}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Strong Gradient Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        </div>

                        {/* 2. CONTENT INSIDE CARD AT BOTTOM */}
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col items-start z-10">

                            {/* Small Category & Date */}
                            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-[#ff4d00] mb-2 uppercase tracking-[0.2em]">
                                <span>{event.category}</span>
                                <span className="text-white/50">.</span>
                                <span className="text-white/80">{event.date}</span>
                            </div>

                            {/* Big Title */}
                            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-[0.9] group-hover:translate-x-1 transition-transform duration-300">
                                {event.title}
                            </h3>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
}
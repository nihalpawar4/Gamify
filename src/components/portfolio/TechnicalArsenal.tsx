"use client";

import { motion } from "framer-motion";

export default function TechnicalArsenal() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="text-center py-16 px-4"
        >
            {/* Spinner */}
            <div className="flex justify-center mb-8">
                <div className="relative w-8 h-8">
                    <svg className="animate-spin-slow w-8 h-8" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="14" stroke="#2a2a2a" strokeWidth="1.5" />
                        <path d="M16 2 A14 14 0 0 1 30 16" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            {/* Section Label with animated scanline */}
            <div className="relative inline-block mb-4 overflow-hidden">
                <p className="text-[10px] font-mono font-semibold tracking-[0.3em] text-[#22c55e] uppercase relative z-10"
                    style={{ textShadow: "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.2)" }}>
                    {"// CODING_PLAYGROUND [TECH_STACK]"}
                </p>
                {/* Scanline effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22c55e]/10 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                    style={{ width: "50%" }}
                />
            </div>

            {/* Title with stronger glow */}
            <h2
                className="text-[42px] font-normal text-[#e5e5e5] mb-5"
                style={{
                    fontFamily: "'Playfair Display', serif",
                    textShadow: "0 0 30px rgba(34, 197, 94, 0.15), 0 0 60px rgba(34, 197, 94, 0.05)",
                }}
            >
                <span className="italic">Coding Playground</span>{" "}
                <span className="font-bold not-italic">Arsenal.</span>
            </h2>

            {/* Description */}
            <p className="text-[12px] leading-[1.8] text-[#737373] max-w-lg mx-auto">
                A curated set of languages, tools & game mechanics we use to make learning to code feel like playing.
            </p>
        </motion.section>
    );
}

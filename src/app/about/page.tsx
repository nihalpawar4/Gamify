"use client";

import TopBar from "@/components/portfolio/TopBar";
import LeftSidebar from "@/components/portfolio/LeftSidebar";
import RightSidebar from "@/components/portfolio/RightSidebar";
import PageWrapper from "@/components/portfolio/PageWrapper";
import { motion } from "framer-motion";
import { Gamepad2, Users, Code, Zap } from "lucide-react";

const stats = [
    { icon: Gamepad2, value: "50+", label: "CODING GAMES" },
    { icon: Users, value: "10K+", label: "PLAYERS WORLDWIDE" },
    { icon: Code, value: "6", label: "LANGUAGES SUPPORTED" },
    { icon: Zap, value: "100%", label: "FREE FOREVER" },
];

export default function AboutPage() {
    return (
        <>
            <TopBar />
            <LeftSidebar />
            <RightSidebar />
            <PageWrapper
                title="About Techno Games"
                subtitle="A platform built to make learning to code feel like playing a game."
            >
                {/* Mission */}
                <div className="rounded-lg border border-[#1e1e1e] bg-[#111111] p-5 mt-4 mb-6">
                    <p className="text-[9px] font-mono tracking-widest text-[#22c55e] uppercase mb-3">
                        {"// OUR_MISSION"}
                    </p>
                    <p className="text-[12px] leading-[1.8] text-[#a3a3a3]">
                        Techno Games was born from a simple idea: coding should be <span className="text-[#e5e5e5] font-semibold">fun</span>. We believe the best way to learn
                        programming is through hands-on practice with immediate feedback — not lectures and textbooks. That&apos;s why we built a platform
                        where every challenge feels like a game, every bug fixed feels like a victory, and every line of code you write makes you a better
                        developer.
                    </p>
                    <p className="text-[12px] leading-[1.8] text-[#a3a3a3] mt-3">
                        Whether you&apos;re 8 or 80, a complete beginner or a seasoned dev looking for quick brain teasers — there&apos;s something here for you.
                        We&apos;re committed to keeping it <span className="text-[#22c55e] font-semibold">free, open, and growing</span>.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="rounded-lg border border-[#1e1e1e] bg-[#111111] p-4 text-center hover:border-[#2a2a2a] transition-colors"
                        >
                            <stat.icon size={16} className="text-[#22c55e] mx-auto mb-2" />
                            <p className="text-[18px] font-bold text-[#e5e5e5] font-mono">{stat.value}</p>
                            <p className="text-[9px] font-semibold tracking-[0.15em] text-[#525252] uppercase mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Team */}
                <div className="rounded-lg border border-[#1e1e1e] bg-[#111111] p-5">
                    <p className="text-[9px] font-mono tracking-widest text-[#22c55e] uppercase mb-3">
                        {"// BUILT_BY"}
                    </p>
                    <p className="text-[12px] leading-[1.8] text-[#a3a3a3]">
                        Techno Games is built and maintained by <span className="text-[#e5e5e5] font-semibold">Nihal Pawar</span> — a full-stack
                        developer passionate about education, open source, and making technology accessible to everyone.
                    </p>
                </div>
            </PageWrapper>
        </>
    );
}

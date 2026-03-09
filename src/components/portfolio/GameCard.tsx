"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Circle, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

interface GameCardProps {
    title: string;
    badge: string;
    description: string;
    tags: string[];
    playLink?: string;
    index?: number;
    disabled?: boolean;
    difficulty?: "Beginner" | "Intermediate" | "Pro";
}

const diffColors: Record<string, { text: string; border: string; bg: string }> = {
    Beginner: { text: "text-[#22c55e]", border: "border-[#22c55e]/30", bg: "bg-[#22c55e]/10" },
    Intermediate: { text: "text-[#eab308]", border: "border-[#eab308]/30", bg: "bg-[#eab308]/10" },
    Pro: { text: "text-[#ef4444]", border: "border-[#ef4444]/30", bg: "bg-[#ef4444]/10" },
};

export default function GameCard({
    title,
    badge,
    description,
    tags,
    playLink = "#",
    index = 0,
    disabled = false,
    difficulty,
}: GameCardProps) {
    const { user, isGuest, setShowLogin, setLoginMessage } = useAuth();
    const dc = difficulty ? diffColors[difficulty] : null;

    // Guest can only play Beginner
    const guestBlocked = isGuest && difficulty && difficulty !== "Beginner";

    const handlePlayClick = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            setLoginMessage("Login or play as Guest to start coding");
            setShowLogin(true);
            return;
        }
        if (guestBlocked) {
            e.preventDefault();
            setLoginMessage("Create a free account to unlock Intermediate & Pro levels");
            setShowLogin(true);
            return;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
            whileHover={{ y: disabled ? 0 : -2 }}
            className={`group rounded-lg border border-[#1e1e1e] bg-[#111111] hover:bg-[#141414] hover:border-[#2a2a2a] transition-all duration-300 p-5 pb-4 flex flex-col justify-between h-full ${disabled ? "opacity-60" : ""}`}
        >
            {/* Header */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Circle size={8} className="text-[#22c55e] fill-[#22c55e]" />
                        <h3 className="text-[13px] font-bold tracking-[0.12em] text-[#e5e5e5] uppercase">
                            {title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        {dc && (
                            <span className={`px-2 py-0.5 rounded text-[9px] font-semibold tracking-widest uppercase border ${dc.text} ${dc.border} ${dc.bg}`}>
                                {difficulty}
                            </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[9px] font-semibold tracking-widest uppercase border ${badge === "COMING SOON"
                                ? "text-[#525252] border-[#1e1e1e] bg-[#0a0a0a] animate-pulse"
                                : badge === "AI POWERED"
                                    ? "text-[#a855f7] border-[#a855f7]/30 bg-[#a855f7]/10 animate-pulse"
                                    : "text-[#737373] border-[#2a2a2a] bg-[#1a1a1a]"
                            }`}
                            style={badge === "AI POWERED" ? { boxShadow: "0 0 12px rgba(168,85,247,0.3)" } : undefined}
                        >
                            {badge}
                        </span>
                    </div>
                </div>

                <p className="text-[11.5px] leading-[1.75] text-[#737373] mb-4">
                    {description}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[9px] font-medium tracking-wider text-[#525252] uppercase"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                {disabled ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#525252] uppercase shrink-0">
                        COMING SOON
                    </span>
                ) : guestBlocked ? (
                    <span
                        onClick={handlePlayClick}
                        className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#525252] uppercase shrink-0 cursor-pointer hover:text-[#a3a3a3] transition-colors"
                    >
                        <Lock size={10} />
                        LOCKED
                    </span>
                ) : (
                    <Link href={playLink} onClick={handlePlayClick}>
                        <motion.span
                            whileHover={{ x: 2 }}
                            className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#e5e5e5] hover:text-[#22c55e] transition-colors uppercase underline underline-offset-4 decoration-[#2a2a2a] hover:decoration-[#22c55e] shrink-0 cursor-pointer"
                        >
                            PLAY NOW
                            <ArrowUpRight size={10} strokeWidth={2.5} />
                        </motion.span>
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

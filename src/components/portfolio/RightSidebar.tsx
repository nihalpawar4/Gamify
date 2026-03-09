"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { getGamesPlayedToday } from "@/lib/storage";
import { createPresenceChannel, supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

import type { PresenceState } from "@/lib/supabase";

const highlights = [
    { text: "50+ CODING GAMES" },
    { text: "C, C++, JAVA & JS" },
    { text: "GLOBAL LEADERBOARDS" },
    { text: "FREE FOREVER" },
    { text: "BUILT FOR BEGINNERS 8+" },
    { text: "WEEKLY NEW CHALLENGES" },
];

export default function RightSidebar() {
    const { user, profile } = useAuth();
    const [onlineCount, setOnlineCount] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [latestActivity, setLatestActivity] = useState("");
    const [activityKey, setActivityKey] = useState(0);

    // Real presence tracking
    useEffect(() => {
        if (!user || !profile) return;

        const channel = createPresenceChannel(user.id, profile.username, (presences: PresenceState[]) => {
            setOnlineCount(presences.length);
        });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, profile]);

    // Games played counter
    useEffect(() => {
        setGamesPlayed(getGamesPlayedToday());
        const gamesInterval = setInterval(() => {
            setGamesPlayed(getGamesPlayedToday());
        }, 5000);
        return () => clearInterval(gamesInterval);
    }, []);

    // Live activity from Supabase scores
    useEffect(() => {
        const channel = supabase
            .channel("sidebar-scores-feed")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "game_scores" },
                (payload) => {
                    if (payload.new) {
                        const s = payload.new as { username: string; game: string; score: number };
                        setLatestActivity(`${s.username} scored ${s.score} in ${s.game}`);
                        setActivityKey((k) => k + 1);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Show presence count or fallback
    const displayCount = onlineCount > 0 ? onlineCount : (user ? 1 : 0);

    const updateActivity = useCallback(() => {
        // Only update if no real activity is flowing
        if (!latestActivity) {
            setLatestActivity("Waiting for live player activity...");
            setActivityKey((k) => k + 1);
        }
    }, [latestActivity]);

    useEffect(() => {
        updateActivity();
    }, [updateActivity]);

    return (
        <aside className="fixed right-0 top-[49px] bottom-0 w-[190px] border-l border-[#1e1e1e] bg-[#0a0a0a] px-4 py-6 overflow-y-auto z-40 hidden xl:block">
            {/* Status */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="mb-6"
            >
                <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-1 h-1 rounded-full bg-[#22c55e]" />
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] text-[#525252] uppercase">
                        STATUS
                    </h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-[#1e1e1e] bg-[#111111]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.1em] text-[#22c55e] uppercase font-mono">
                        {displayCount} ONLINE
                    </span>
                </div>

                {/* Live Activity Ticker */}
                <div className="mt-2 px-3 py-1.5 rounded-md border border-[#1e1e1e] bg-[#111111] overflow-hidden min-h-[28px]">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={activityKey}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="text-[8.5px] font-mono tracking-wider text-[#525252] leading-snug"
                        >
                            {latestActivity || "No activity yet"}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {gamesPlayed > 0 && (
                    <div className="mt-2 px-3 py-1.5 rounded-md border border-[#1e1e1e] bg-[#111111]">
                        <span className="text-[9px] font-mono tracking-wider text-[#525252] uppercase">
                            {gamesPlayed} GAMES TODAY
                        </span>
                    </div>
                )}
            </motion.div>


            {/* Highlights */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className="mb-6"
            >
                <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-1 h-1 rounded-full bg-[#22c55e]" />
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] text-[#525252] uppercase">
                        HIGHLIGHTS
                    </h3>
                </div>
                <ul className="space-y-2.5">
                    {highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mt-1 shrink-0" />
                            <span className="text-[10px] font-semibold tracking-wide text-[#a3a3a3] uppercase leading-relaxed">
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Version Box */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            >
                <div className="rounded-md border border-[#1e1e1e] bg-[#111111] p-3">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-semibold tracking-widest text-[#525252] uppercase">
                                VERSION
                            </span>
                            <span className="text-[10px] font-mono font-semibold tracking-widest text-[#525252]">
                                3.0
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                        <Zap size={10} className="text-[#22c55e]" />
                        <span className="text-[9px] font-semibold tracking-[0.2em] text-[#525252] uppercase">
                            POWERED BY SUPABASE
                        </span>
                    </div>
                </div>
            </motion.div>
        </aside>
    );
}

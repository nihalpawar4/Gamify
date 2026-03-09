"use client";

import TopBar from "@/components/portfolio/TopBar";
import LeftSidebar from "@/components/portfolio/LeftSidebar";
import RightSidebar from "@/components/portfolio/RightSidebar";
import PageWrapper from "@/components/portfolio/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Trophy, Medal, Award, Users, Wifi } from "lucide-react";
import { getBestScores, subscribeToScores, createPresenceChannel, supabase, type DBGameScore, type PresenceState } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export default function LeaderboardsPage() {
    const { user, profile } = useAuth();
    const [entries, setEntries] = useState<DBGameScore[]>([]);
    const [filter, setFilter] = useState<"all" | "CodeQuest" | "BugBlaster">("all");
    const [onlineUsers, setOnlineUsers] = useState<PresenceState[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch initial scores
    const fetchScores = useCallback(async () => {
        const { data } = await getBestScores(50, filter === "all" ? undefined : filter);
        setEntries(data as DBGameScore[]);
        setLoading(false);
    }, [filter]);

    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

    // Realtime score updates
    useEffect(() => {
        const channel = subscribeToScores((newScore) => {
            setEntries((prev) => {
                const updated = [newScore, ...prev];
                updated.sort((a, b) => b.score - a.score);
                return updated.slice(0, 50);
            });
        });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Presence — track online users
    useEffect(() => {
        if (!user || !profile) return;

        const channel = createPresenceChannel(user.id, profile.username, (presences) => {
            setOnlineUsers(presences);
        });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, profile]);

    const filtered = filter === "all" ? entries : entries.filter((e) => e.game === filter);

    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy size={12} className="text-[#eab308]" />;
        if (index === 1) return <Medal size={12} className="text-[#a3a3a3]" />;
        if (index === 2) return <Award size={12} className="text-[#cd7c2f]" />;
        return <span className="text-[10px] font-mono text-[#525252] w-3 text-center">{index + 1}</span>;
    };

    return (
        <>
            <TopBar />
            <LeftSidebar />
            <RightSidebar />
            <PageWrapper
                title="Leaderboards"
                subtitle="Real-time scores from players around the world. Play games to climb the ranks!"
            >
                {/* Online Players Bar */}
                <div className="flex items-center justify-between mb-4 px-4 py-2.5 rounded-lg border border-[#1e1e1e] bg-[#111111]">
                    <div className="flex items-center gap-2">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                        </div>
                        <Users size={12} className="text-[#22c55e]" />
                        <span className="text-[10px] font-bold tracking-wider text-[#22c55e] uppercase">
                            {onlineUsers.length} PLAYER{onlineUsers.length !== 1 ? "S" : ""} ONLINE
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {onlineUsers.slice(0, 8).map((u, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="w-6 h-6 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center"
                                title={u.username}
                            >
                                <span className="text-[8px] font-bold text-[#22c55e] uppercase">
                                    {u.username.charAt(0)}
                                </span>
                            </motion.div>
                        ))}
                        {onlineUsers.length > 8 && (
                            <span className="text-[9px] font-mono text-[#525252]">
                                +{onlineUsers.length - 8} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 mb-4">
                    {(["all", "CodeQuest", "BugBlaster"] as const).map((tab) => (
                        <motion.button
                            key={tab}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setFilter(tab)}
                            className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${filter === tab
                                ? "border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]"
                                : "border-[#2a2a2a] bg-[#111111] text-[#525252] hover:text-[#a3a3a3]"
                                }`}
                        >
                            {tab === "all" ? "ALL GAMES" : tab.toUpperCase()}
                        </motion.button>
                    ))}
                    <span className="text-[9px] font-mono text-[#525252] ml-auto flex items-center gap-1.5">
                        <Wifi size={10} className="text-[#22c55e]" />
                        <span className="relative inline-flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" />
                        </span>
                        LIVE — SUPABASE REALTIME
                    </span>
                </div>

                {/* Leaderboard Table */}
                <div className="rounded-lg border border-[#1e1e1e] bg-[#111111] overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-[40px_1fr_1fr_80px_60px_100px] gap-2 px-4 py-2.5 border-b border-[#1e1e1e] bg-[#0d0d0d]">
                        <span className="text-[9px] font-mono tracking-widest text-[#525252] uppercase">#</span>
                        <span className="text-[9px] font-mono tracking-widest text-[#525252] uppercase">PLAYER</span>
                        <span className="text-[9px] font-mono tracking-widest text-[#525252] uppercase">GAME</span>
                        <span className="text-[9px] font-mono tracking-widest text-[#525252] uppercase text-right">SCORE</span>
                        <span className="text-[9px] font-mono tracking-widest text-[#525252] uppercase text-center">LVL</span>
                        <span className="text-[9px] font-mono tracking-widest text-[#525252] uppercase text-right">DATE</span>
                    </div>

                    {/* Loading */}
                    {loading ? (
                        <div className="px-4 py-8 text-center">
                            <p className="text-[11px] font-mono text-[#525252] animate-pulse">
                                LOADING SCORES FROM SUPABASE...
                            </p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                            <p className="text-[11px] font-mono text-[#525252]">NO ENTRIES YET. PLAY A GAME TO GET ON THE BOARD!</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filtered.slice(0, 20).map((entry, i) => {
                                const dateStr = entry.created_at
                                    ? new Date(entry.created_at).toISOString().split("T")[0]
                                    : "—";
                                return (
                                    <motion.div
                                        key={entry.id || `${entry.user_id}-${entry.score}-${i}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.02 }}
                                        className={`grid grid-cols-[40px_1fr_1fr_80px_60px_100px] gap-2 px-4 py-2.5 border-b border-[#1e1e1e] last:border-b-0 hover:bg-[#1a1a1a] transition-colors ${i < 3 ? "bg-[#0f0f0f]" : ""
                                            }`}
                                    >
                                        <div className="flex items-center">{getRankIcon(i)}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center shrink-0">
                                                <span className="text-[8px] font-bold text-[#22c55e] uppercase">
                                                    {entry.username.charAt(0)}
                                                </span>
                                            </div>
                                            <span className={`text-[11px] font-semibold tracking-wide truncate ${i < 3 ? "text-[#e5e5e5]" : "text-[#a3a3a3]"
                                                }`}>
                                                {entry.username}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] font-mono tracking-wider text-[#525252] uppercase">
                                                {entry.game}
                                            </span>
                                            {entry.language && (
                                                <span className="text-[8px] font-mono tracking-wider text-[#22c55e]/60 uppercase px-1 py-0.5 rounded border border-[#22c55e]/10 bg-[#22c55e]/5">
                                                    {entry.language}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`text-[11px] font-mono font-bold text-right ${i < 3 ? "text-[#22c55e]" : "text-[#737373]"
                                            }`}>
                                            {entry.score}
                                        </span>
                                        <span className="text-[10px] font-mono text-[#525252] text-center">
                                            {entry.level}/{3}
                                        </span>
                                        <span className="text-[10px] font-mono text-[#525252] text-right">
                                            {dateStr}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    )}
                </div>
            </PageWrapper>
        </>
    );
}

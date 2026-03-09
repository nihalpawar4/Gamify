"use client";

import { motion } from "framer-motion";
import { Coins, Sparkles, ArrowUpRight, UserX } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function CreditsDisplay() {
    const { user, profile, isGuest } = useAuth();

    if (!user || !profile) return null;

    const isUnlimited = profile.is_subscribed || profile.credits >= 9999;

    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="mb-6"
        >
            <div className="flex items-center gap-1.5 mb-3">
                <span className="w-1 h-1 rounded-full bg-[#22c55e]" />
                <h3 className="text-[10px] font-semibold tracking-[0.2em] text-[#525252] uppercase">
                    {isGuest ? "GUEST MODE" : "CREDITS"}
                </h3>
            </div>

            <div className="rounded-md border border-[#1e1e1e] bg-[#111111] p-3 space-y-2">
                {isGuest ? (
                    <>
                        <div className="flex items-center gap-2">
                            <UserX size={12} className="text-[#525252]" />
                            <span className="text-[10px] font-mono font-bold tracking-wider text-[#737373] uppercase">
                                LIMITED ACCESS
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Coins size={10} className="text-[#eab308]" />
                            <span className="text-[11px] font-mono font-bold text-[#eab308]">{profile.credits}</span>
                            <span className="text-[9px] font-mono text-[#525252]">credits</span>
                        </div>
                        <p className="text-[8px] font-mono text-[#525252] leading-relaxed">
                            BEGINNER ONLY • CREATE ACCOUNT FOR FULL ACCESS
                        </p>
                    </>
                ) : isUnlimited ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Sparkles size={12} className="text-[#22c55e]" />
                            <span className="text-[11px] font-mono font-bold tracking-wider text-[#22c55e] uppercase">
                                UNLIMITED
                            </span>
                        </div>
                        <span className="text-[9px] font-bold tracking-wider text-[#525252] uppercase block">
                            {profile.subscription_tier.toUpperCase()} PLAN
                        </span>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <Coins size={12} className="text-[#eab308]" />
                            <span className="text-[14px] font-mono font-bold text-[#eab308]">{profile.credits}</span>
                            <span className="text-[9px] font-mono text-[#525252]">credits</span>
                        </div>
                        <span className="text-[9px] font-bold tracking-wider text-[#525252] uppercase block">
                            {profile.subscription_tier.toUpperCase()} PLAN
                        </span>
                        <Link href="/pricing">
                            <motion.div
                                whileHover={{ x: 2 }}
                                className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-[#22c55e] hover:text-[#4ade80] transition-colors cursor-pointer"
                            >
                                UPGRADE
                                <ArrowUpRight size={8} strokeWidth={2.5} />
                            </motion.div>
                        </Link>
                    </>
                )}
            </div>
        </motion.div>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";

interface ConnectModalProps {
    platform: string;
    icon: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onConnected: (username: string) => void;
}

export default function ConnectModal({ platform, icon, isOpen, onClose, onConnected }: ConnectModalProps) {
    const [phase, setPhase] = useState<"idle" | "connecting" | "done">("idle");
    const [username, setUsername] = useState("");

    const fakeUsernames: Record<string, string> = {
        GitHub: "@nihal-coder",
        LinkedIn: "/nihalpawar",
        "X (Twitter)": "@nihal_dev",
    };

    useEffect(() => {
        if (isOpen) {
            setPhase("idle");
            setUsername("");
        }
    }, [isOpen]);

    const handleConnect = () => {
        setPhase("connecting");
        const fakeName = fakeUsernames[platform] || "@user";
        setTimeout(() => {
            setUsername(fakeName);
            setPhase("done");
            setTimeout(() => {
                onConnected(fakeName);
                onClose();
            }, 1200);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[320px] rounded-lg border border-[#1e1e1e] bg-[#111111] shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1e1e]">
                            <div className="flex items-center gap-2">
                                {icon}
                                <span className="text-[11px] font-bold tracking-[0.12em] text-[#e5e5e5] uppercase">
                                    Connect {platform}
                                </span>
                            </div>
                            <button onClick={onClose} className="text-[#525252] hover:text-[#e5e5e5] transition-colors cursor-pointer">
                                <X size={12} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-4 py-5 text-center">
                            <AnimatePresence mode="wait">
                                {phase === "idle" && (
                                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <p className="text-[11px] leading-[1.7] text-[#737373] mb-4">
                                            Connect your {platform} account to show your profile on the platform and unlock social features.
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(34, 197, 94, 0.25)" }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={handleConnect}
                                            className="px-5 py-2 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[10px] font-bold tracking-wider text-[#22c55e] uppercase transition-all cursor-pointer"
                                        >
                                            CONNECT {platform.toUpperCase()}
                                        </motion.button>
                                    </motion.div>
                                )}

                                {phase === "connecting" && (
                                    <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <Loader2 size={24} className="text-[#22c55e] animate-spin mx-auto mb-3" />
                                        <p className="text-[11px] font-mono tracking-wider text-[#22c55e] uppercase">
                                            Connecting to {platform}...
                                        </p>
                                        <p className="text-[10px] font-mono text-[#525252] mt-1">
                                            Authenticating secure channel
                                        </p>
                                    </motion.div>
                                )}

                                {phase === "done" && (
                                    <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                        <CheckCircle2 size={24} className="text-[#22c55e] mx-auto mb-3" />
                                        <p className="text-[11px] font-bold tracking-wider text-[#22c55e] uppercase">
                                            Connected ✓
                                        </p>
                                        <p className="text-[10px] font-mono text-[#a3a3a3] mt-1">
                                            {username}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

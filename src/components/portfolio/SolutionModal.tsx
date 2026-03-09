"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Coins, Lock, X } from "lucide-react";
import Link from "next/link";

interface SolutionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SolutionModal({ isOpen, onClose }: SolutionModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-[360px] max-w-[90vw] rounded-lg border border-[#1e1e1e] bg-[#111111] shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e] bg-[#0d0d0d]">
                            <div className="flex items-center gap-2">
                                <Lock size={14} className="text-[#eab308]" />
                                <span className="text-[11px] font-bold tracking-[0.15em] text-[#e5e5e5] uppercase">
                                    OUT OF CREDITS
                                </span>
                            </div>
                            <button onClick={onClose} className="text-[#525252] hover:text-[#e5e5e5] transition-colors cursor-pointer">
                                <X size={14} />
                            </button>
                        </div>

                        <div className="px-5 py-5 text-center">
                            <Coins size={32} className="text-[#eab308] mx-auto mb-3 opacity-60" />
                            <p className="text-[11px] leading-[1.7] text-[#a3a3a3] mb-1">
                                You&apos;ve used all your free credits!
                            </p>
                            <p className="text-[11px] leading-[1.7] text-[#737373] mb-4">
                                Unlock unlimited solutions, Pro-level challenges, and priority support with a subscription.
                            </p>

                            <Link href="/pricing" onClick={onClose}>
                                <motion.div
                                    whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(34, 197, 94, 0.25)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[11px] font-bold tracking-wider text-[#22c55e] uppercase transition-all cursor-pointer"
                                >
                                    VIEW PRICING PLANS →
                                </motion.div>
                            </Link>

                            <button
                                onClick={onClose}
                                className="mt-2 w-full py-2 text-[10px] font-mono tracking-wider text-[#525252] hover:text-[#737373] transition-colors cursor-pointer"
                            >
                                CONTINUE WITHOUT SOLUTION
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

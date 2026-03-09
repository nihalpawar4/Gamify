"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface HintPanelProps {
    hints: string[];
    solution: string;
    isOpen: boolean;
    onToggle: () => void;
    difficulty?: string;
    onRevealSolution?: () => Promise<void>;
}

export default function HintPanel({
    hints,
    solution,
    isOpen,
    onToggle,
}: HintPanelProps) {
    const [solutionRevealed, setSolutionRevealed] = useState(false);

    return (
        <div className="border-t border-[#1e1e1e]">
            {/* Toggle Button */}
            <motion.button
                whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                whileTap={{ scale: 0.99 }}
                onClick={onToggle}
                className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#0d0d0d] cursor-pointer transition-colors"
            >
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border border-[#22c55e]/30 bg-[#22c55e]/10 flex items-center justify-center">
                        <Lightbulb size={10} className="text-[#22c55e]" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-[#22c55e] uppercase">
                        HINTS ({hints.length} STEPS)
                    </span>
                    <span className="text-[8px] font-mono text-[#525252] uppercase ml-1">FREE</span>
                </div>
                {isOpen ? (
                    <ChevronUp size={12} className="text-[#525252]" />
                ) : (
                    <ChevronDown size={12} className="text-[#525252]" />
                )}
            </motion.button>

            {/* Panel Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-3 sm:px-4 py-3 bg-[#0a0a0a] border-t border-[#1e1e1e] max-h-[300px] overflow-y-auto">
                            <div className="space-y-2">
                                {hints.map((hint, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08, duration: 0.3 }}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="text-[10px] font-mono font-bold text-[#22c55e] mt-0.5 shrink-0">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <p className="text-[11px] font-mono leading-[1.7] text-[#a3a3a3]">
                                            {hint.replace(/^\d+\.\s*/, "")}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Reveal Solution — always free */}
                            <div className="mt-4 pt-3 border-t border-[#1e1e1e]">
                                {solutionRevealed ? (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Eye size={10} className="text-[#22c55e]" />
                                            <span className="text-[10px] font-bold tracking-wider text-[#22c55e] uppercase">
                                                FULL SOLUTION
                                            </span>
                                        </div>
                                        <motion.pre
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 rounded-md border border-[#1e1e1e] bg-[#111111] text-[11px] sm:text-[12px] font-mono leading-[1.6] text-[#22c55e] overflow-x-auto whitespace-pre-wrap"
                                        >
                                            {solution}
                                        </motion.pre>
                                    </div>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(34, 197, 94, 0.2)" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSolutionRevealed(true)}
                                        className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-[#22c55e]/20 bg-[#22c55e]/5 hover:bg-[#22c55e]/10 text-[10px] font-bold tracking-wider text-[#22c55e] uppercase transition-all cursor-pointer"
                                    >
                                        <Eye size={10} />
                                        REVEAL FULL SOLUTION (FREE)
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

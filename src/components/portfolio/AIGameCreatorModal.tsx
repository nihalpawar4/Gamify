"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Sparkles, Play, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface AIGameCreatorModalProps { isOpen: boolean; onClose: () => void }

const diffOpts = ["Beginner", "Intermediate", "Pro"] as const;
const langOpts = ["C", "C++", "Java", "JavaScript"] as const;

const terminalLines = [
    "[AI] Analyzing your game description...",
    "[AI] Identifying challenge type: algorithm",
    "[AI] Selecting language template: {LANG}...",
    "[AI] Generating test cases...",
    "[AI] Building starter code scaffold...",
    "[AI] Calibrating difficulty: {DIFF}...",
    "[AI] Generating 5 detailed hints...",
    "[AI] Writing solution code...",
    "[AI] Validating all test cases pass...",
    "[AI] ✓ Game generated successfully! 🎉",
];

export default function AIGameCreatorModal({ isOpen, onClose }: AIGameCreatorModalProps) {
    const [desc, setDesc] = useState("");
    const [lang, setLang] = useState("C");
    const [diff, setDiff] = useState("Beginner");
    const [phase, setPhase] = useState<"input" | "loading" | "done">("input");
    const [lines, setLines] = useState<string[]>([]);
    const termRef = useRef<HTMLDivElement>(null);

    useEffect(() => { if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight; }, [lines]);

    const generate = () => {
        if (!desc.trim()) return;
        setPhase("loading");
        setLines([]);
        const processed = terminalLines.map(l => l.replace("{LANG}", lang).replace("{DIFF}", diff));
        processed.forEach((line, i) => {
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (i === processed.length - 1) setTimeout(() => setPhase("done"), 600);
            }, (i + 1) * 400);
        });
    };

    const reset = () => { setPhase("input"); setLines([]); setDesc(""); };
    const handleClose = () => { onClose(); setTimeout(reset, 300); };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={handleClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]" />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25 }}
                        className="fixed inset-4 md:inset-12 lg:inset-20 z-[90] rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] shadow-2xl flex flex-col overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e] bg-[#0d0d0d]">
                            <div className="flex items-center gap-2">
                                <Sparkles size={14} className="text-[#22c55e]" />
                                <span className="text-[11px] font-bold tracking-[0.15em] text-[#e5e5e5] uppercase">AI GAME CREATOR</span>
                                <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-widest text-[#eab308] border border-[#eab308]/30 bg-[#eab308]/10 uppercase">BETA</span>
                            </div>
                            <button onClick={handleClose} className="text-[#525252] hover:text-[#e5e5e5] transition-colors cursor-pointer"><X size={14} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {phase === "input" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6">
                                    <div>
                                        <p className="text-[10px] font-mono font-semibold tracking-[0.3em] text-[#22c55e] uppercase mb-2"
                                            style={{ textShadow: "0 0 20px rgba(34,197,94,0.4)" }}>
                                            {"// AI_GAME_LAB [GENERATOR]"}
                                        </p>
                                        <h2 className="text-[28px] text-[#e5e5e5] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            <span className="italic">Create Your Own</span> <span className="font-bold">Game.</span>
                                        </h2>
                                        <p className="text-[12px] text-[#737373] leading-[1.8]">
                                            Describe any coding challenge in plain English and our AI will instantly build a full game with test cases, hints, and solution.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-2 block">DESCRIBE YOUR GAME</label>
                                        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4}
                                            placeholder="e.g. Make a game where you implement binary search on a sorted array..."
                                            className="w-full px-4 py-3 rounded-md border border-[#1e1e1e] bg-[#111111] text-[13px] text-[#e5e5e5] font-mono placeholder:text-[#525252] outline-none focus:border-[#22c55e]/30 transition-colors resize-none leading-[1.7]" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-2 block">LANGUAGE</label>
                                            <div className="flex flex-wrap gap-2">
                                                {langOpts.map(l => (
                                                    <button key={l} onClick={() => setLang(l)}
                                                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${lang === l ? "border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]" : "border-[#2a2a2a] bg-[#111111] text-[#525252] hover:text-[#a3a3a3]"
                                                            }`}>{l}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-2 block">DIFFICULTY</label>
                                            <div className="flex flex-wrap gap-2">
                                                {diffOpts.map(d => (
                                                    <button key={d} onClick={() => setDiff(d)}
                                                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${diff === d ? "border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]" : "border-[#2a2a2a] bg-[#111111] text-[#525252] hover:text-[#a3a3a3]"
                                                            }`}>{d}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(34,197,94,0.3)" }} whileTap={{ scale: 0.98 }}
                                        onClick={generate} disabled={!desc.trim()}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[12px] font-bold tracking-wider text-[#22c55e] uppercase transition-all disabled:opacity-30 cursor-pointer">
                                        <Sparkles size={14} /> GENERATE GAME <ChevronRight size={14} />
                                    </motion.button>
                                </motion.div>
                            )}

                            {(phase === "loading" || phase === "done") && (
                                <div className="max-w-2xl mx-auto">
                                    <div ref={termRef} className="rounded-md border border-[#1e1e1e] bg-[#111111] p-4 font-mono text-[12px] leading-[1.8] min-h-[200px]">
                                        {lines.map((line, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                                                className={line.includes("✓") ? "text-[#22c55e]" : "text-[#737373]"}>{line}</motion.div>
                                        ))}
                                        {phase === "loading" && <span className="text-[#22c55e] animate-pulse">▊</span>}
                                    </div>

                                    {phase === "done" && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 space-y-4">
                                            {/* Fake preview card */}
                                            <div className="rounded-lg border border-[#22c55e]/20 bg-[#22c55e]/5 p-5">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Terminal size={14} className="text-[#22c55e]" />
                                                    <span className="text-[11px] font-bold tracking-[0.15em] text-[#22c55e] uppercase">AI-GENERATED GAME</span>
                                                    <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-widest text-[#eab308] border border-[#eab308]/30 bg-[#eab308]/10 uppercase">{lang}</span>
                                                    <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-widest text-[#a3a3a3] border border-[#2a2a2a] bg-[#111111] uppercase">{diff}</span>
                                                </div>
                                                <p className="text-[12px] text-[#a3a3a3] font-mono leading-[1.6] mb-3">{desc}</p>
                                                <div className="flex items-center gap-2 text-[9px] font-mono text-[#525252]">
                                                    <span>✓ 3 test cases</span><span>•</span><span>✓ 5 hints</span><span>•</span><span>✓ Full solution</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34,197,94,0.3)" }}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 text-[11px] font-bold tracking-wider text-[#22c55e] uppercase cursor-pointer">
                                                    <Play size={12} fill="#22c55e" /> PLAY NOW (COMING SOON)
                                                </motion.button>
                                                <motion.button whileHover={{ scale: 1.02 }} onClick={reset}
                                                    className="px-4 py-2.5 rounded-md border border-[#2a2a2a] bg-[#111111] text-[11px] font-bold tracking-wider text-[#737373] uppercase cursor-pointer">
                                                    CREATE ANOTHER
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

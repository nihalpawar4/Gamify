"use client";

import TopBar from "@/components/portfolio/TopBar";
import LeftSidebar from "@/components/portfolio/LeftSidebar";
import RightSidebar from "@/components/portfolio/RightSidebar";
import PageWrapper from "@/components/portfolio/PageWrapper";
import { motion } from "framer-motion";
import { useState } from "react";
import { Terminal, Play, Code, Layers, Trophy, Sparkles, ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const languages = ["C", "C++", "Java", "JavaScript"] as const;
const helloWorlds: Record<string, { code: string; output: string }> = {
    C: { code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}', output: "Hello, World!" },
    "C++": { code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}', output: "Hello, World!" },
    Java: { code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}', output: "Hello, World!" },
    JavaScript: { code: 'function solve() {\n    return "Hello, World!";\n}\n\nconsole.log(solve());', output: "Hello, World!" },
};

const steps = [
    { icon: Layers, title: "PICK A GAME", desc: "Choose from CodeQuest, BugBlaster, LoopMaster, ArrayArena, or FunctionForge. Each game teaches different programming concepts.", color: "#22c55e" },
    { icon: Code, title: "SELECT LANGUAGE & DIFFICULTY", desc: "Pick your language (C, C++, Java, JavaScript) and difficulty (Beginner, Intermediate, Pro). C is the default — perfect for learning systems programming.", color: "#eab308" },
    { icon: Terminal, title: "WRITE CODE IN THE EDITOR", desc: "Each level has a mission briefing, starter code, and test cases. Write your solution in the built-in code editor with syntax highlighting.", color: "#22c55e" },
    { icon: Play, title: "RUN & TEST", desc: "Hit COMPILE & RUN to execute your code. The terminal shows test results — pass all tests to score points and advance to the next level.", color: "#3b82f6" },
    { icon: Sparkles, title: "USE HINTS (FREE!)", desc: "Stuck? Open the hint panel for 5 progressive hints — from gentle nudges to near-solutions. Hints are always free for everyone.", color: "#a855f7" },
    { icon: Trophy, title: "CLIMB THE LEADERBOARD", desc: "Your best score per challenge is saved. Compete globally with real-time rankings powered by Supabase. Score once per challenge — no farming!", color: "#ef4444" },
];

export default function HowToPlayPage() {
    const [tryLang, setTryLang] = useState<string>("C");
    const [tryOutput, setTryOutput] = useState<string | null>(null);
    const [running, setRunning] = useState(false);

    const runDemo = () => {
        setRunning(true);
        setTryOutput(null);
        setTimeout(() => {
            setTryOutput(helloWorlds[tryLang].output);
            setRunning(false);
        }, 800);
    };

    return (
        <>
            <TopBar />
            <LeftSidebar />
            <RightSidebar />
            <PageWrapper title="How to Play" subtitle="Master coding through fun, interactive games. Here's everything you need to know.">

                {/* ──── Step-by-Step Guide ──── */}
                <section className="mt-6 space-y-4">
                    {steps.map((step, i) => (
                        <motion.div key={step.title}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            className="rounded-lg border border-[#1e1e1e] bg-[#111111] p-5 flex gap-4 items-start hover:border-[#2a2a2a] transition-colors"
                        >
                            <div className="w-9 h-9 rounded-md border flex items-center justify-center shrink-0 mt-0.5"
                                style={{ borderColor: `${step.color}33`, backgroundColor: `${step.color}10` }}>
                                <step.icon size={16} style={{ color: step.color }} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[10px] font-mono text-[#525252] tracking-wider">STEP {String(i + 1).padStart(2, "0")}</span>
                                    <span className="text-[12px] font-bold tracking-[0.12em] text-[#e5e5e5] uppercase">{step.title}</span>
                                </div>
                                <p className="text-[11px] text-[#737373] leading-[1.8]">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* ──── Divider ──── */}
                <div className="my-8 border-t border-[#1e1e1e]" />

                {/* ──── Interactive Demo ──── */}
                <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-1 h-1 rounded-full bg-[#22c55e]" />
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-[#22c55e] uppercase"
                            style={{ textShadow: "0 0 15px rgba(34,197,94,0.4)" }}>
                            TRY IT YOURSELF
                        </span>
                    </div>

                    <div className="rounded-lg border border-[#1e1e1e] bg-[#111111] overflow-hidden">
                        {/* Language tabs */}
                        <div className="flex items-center gap-1 px-4 py-2.5 border-b border-[#1e1e1e] bg-[#0d0d0d]">
                            <span className="text-[9px] font-mono text-[#525252] tracking-wider mr-2">LANGUAGE:</span>
                            {languages.map(l => (
                                <button key={l} onClick={() => { setTryLang(l); setTryOutput(null); }}
                                    className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${tryLang === l ? "border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]" : "border-transparent text-[#525252] hover:text-[#a3a3a3]"
                                        }`}>{l}</button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1e1e1e]">
                            {/* Code */}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[9px] font-mono text-[#525252] tracking-wider">EDITOR</span>
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-[#ef4444]/60" />
                                        <span className="w-2 h-2 rounded-full bg-[#eab308]/60" />
                                        <span className="w-2 h-2 rounded-full bg-[#22c55e]/60" />
                                    </div>
                                </div>
                                <pre className="text-[11px] font-mono text-[#a3a3a3] leading-[1.7] bg-[#0a0a0a] rounded p-3 border border-[#1e1e1e] overflow-x-auto whitespace-pre">
                                    {helloWorlds[tryLang].code}
                                </pre>
                                <motion.button whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(34,197,94,0.25)" }}
                                    whileTap={{ scale: 0.97 }} onClick={runDemo} disabled={running}
                                    className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-md border border-[#22c55e]/40 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[10px] font-bold tracking-wider text-[#22c55e] uppercase transition-all disabled:opacity-50 cursor-pointer">
                                    <Play size={12} fill="#22c55e" /> {running ? "RUNNING..." : "COMPILE & RUN"}
                                </motion.button>
                            </div>

                            {/* Output */}
                            <div className="p-4">
                                <span className="text-[9px] font-mono text-[#525252] tracking-wider block mb-2">TERMINAL OUTPUT</span>
                                <div className="bg-[#0a0a0a] rounded p-3 border border-[#1e1e1e] min-h-[120px] font-mono text-[11px] leading-[1.7]">
                                    <span className="text-[#525252]">{">"} Awaiting code execution...</span>
                                    {running && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-[#eab308]">
                                            [SYSTEM] Compiling {tryLang}...<span className="animate-pulse">▊</span>
                                        </motion.div>
                                    )}
                                    {tryOutput && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 space-y-1">
                                            <div className="text-[#22c55e]">[SYSTEM] Compilation successful ✓</div>
                                            <div className="text-[#e5e5e5]">{tryOutput}</div>
                                            <div className="text-[#22c55e] mt-2 flex items-center gap-1"><CheckCircle size={10} /> All tests passed!</div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ──── Divider ──── */}
                <div className="my-8 border-t border-[#1e1e1e]" />

                {/* ──── Tips ──── */}
                <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-1 h-1 rounded-full bg-[#eab308]" />
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-[#525252] uppercase">PRO TIPS</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {["Start with Beginner C levels — they teach fundamentals", "Use hints freely — they don't cost credits", "Score is awarded only once per challenge — quality over quantity"].map((tip, i) => (
                            <div key={i} className="rounded-md border border-[#1e1e1e] bg-[#111111] p-3 text-[11px] text-[#737373] leading-[1.7]">
                                <span className="text-[#22c55e] font-bold mr-1">TIP {i + 1}:</span> {tip}
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ──── CTA ──── */}
                <div className="mt-8 mb-4 flex justify-center">
                    <Link href="/games">
                        <motion.button whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(34,197,94,0.25)" }}
                            className="flex items-center gap-2 px-6 py-3 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[12px] font-bold tracking-wider text-[#22c55e] uppercase transition-all cursor-pointer">
                            <Sparkles size={14} /> READY? JUMP INTO A GAME <ChevronRight size={14} />
                        </motion.button>
                    </Link>
                </div>

            </PageWrapper>
        </>
    );
}

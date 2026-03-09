"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const codeSnippets = [
    '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
    '#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}',
    'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello!");\n  }\n}',
    'function solve(arr) {\n  return arr.sort((a,b) => a-b);\n}',
];

const logs = [
    "Initializing runtime environment...",
    "Loading C compiler... ✓",
    "Loading C++ compiler... ✓",
    "Loading Java JDK... ✓",
    "Loading JavaScript engine... ✓",
    "Connecting to playground... ✓",
    "Syncing leaderboards... ✓",
    "Loading game levels... ✓",
    "System ready.",
];

export default function LoadingScreen() {
    const [show, setShow] = useState(() => {
        if (typeof window === "undefined") return false;
        return !localStorage.getItem("tg_visited");
    });
    const [progress, setProgress] = useState(0);
    const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
    const [snippet, setSnippet] = useState(0);

    useEffect(() => {
        if (!show) return;
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) { clearInterval(interval); return 100; }
                return prev + 1.2;
            });
        }, 25);
        return () => clearInterval(interval);
    }, [show]);

    useEffect(() => {
        if (!show) return;
        logs.forEach((log, i) => {
            setTimeout(() => setVisibleLogs(prev => [...prev, log]), (i + 1) * 280);
        });
        const snippetInterval = setInterval(() => setSnippet(p => (p + 1) % codeSnippets.length), 700);
        return () => clearInterval(snippetInterval);
    }, [show]);

    useEffect(() => {
        if (progress >= 100) {
            localStorage.setItem("tg_visited", "1");
            const timer = setTimeout(() => setShow(false), 400);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center"
                >
                    {/* Title */}
                    <div className="mb-8 text-center">
                        <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-[11px] font-mono font-bold tracking-[0.3em] text-[#22c55e] uppercase"
                            style={{ textShadow: "0 0 20px rgba(34,197,94,0.5)" }}>
                            TECHNO GAMES INITIALIZING...
                            <span className="animate-pulse ml-1">▊</span>
                        </motion.p>
                    </div>

                    {/* Code snippet */}
                    <div className="w-[400px] max-w-[90vw] mb-8 rounded-md border border-[#1e1e1e] bg-[#111111] p-4 overflow-hidden h-[120px]">
                        <AnimatePresence mode="wait">
                            <motion.pre key={snippet} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 0.4, y: 0 }}
                                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                                className="text-[10px] font-mono text-[#22c55e] leading-[1.6] whitespace-pre">
                                {codeSnippets[snippet]}
                            </motion.pre>
                        </AnimatePresence>
                    </div>

                    {/* Terminal logs */}
                    <div className="w-[400px] max-w-[90vw] mb-6 h-[100px] overflow-hidden">
                        {visibleLogs.map((log, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                                className={`text-[10px] font-mono leading-[1.8] ${log.includes("✓") ? "text-[#22c55e]" : log.includes("ready") ? "text-[#22c55e] font-bold" : "text-[#525252]"}`}>
                                {">"} {log}
                            </motion.div>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="w-[400px] max-w-[90vw]">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[9px] font-mono tracking-wider text-[#525252] uppercase">Loading</span>
                            <span className="text-[9px] font-mono tracking-wider text-[#22c55e]">{Math.min(100, Math.floor(progress))}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-[#1e1e1e] overflow-hidden">
                            <motion.div
                                className="h-full bg-[#22c55e] rounded-full"
                                style={{ width: `${Math.min(100, progress)}%`, boxShadow: "0 0 8px rgba(34,197,94,0.5)" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

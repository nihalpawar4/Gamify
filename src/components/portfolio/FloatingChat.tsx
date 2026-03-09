"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Trash2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface ChatMsg { role: "user" | "bot"; text: string }

const replies: Record<string, string> = {
    "credit": "You start with 100 free credits! Credits are used to reveal Pro-level solutions. Hints are always free. Subscribe for unlimited credits.",
    "codequest": "CodeQuest is our flagship game! Write code to escape the maze. 15 levels × 3 difficulties × 4 languages (C, C++, Java, JavaScript). Start at /play/codequest",
    "bugblaster": "BugBlaster challenges you to find and fix bugs in broken code. 15 unique debugging puzzles across 3 difficulty tiers. Try it at /play/bugblaster",
    "loopmaster": "LoopMaster teaches loops & iterations through fun challenges. Master for/while loops, nested loops, and more. Play at /play/loopmaster",
    "arrayarena": "ArrayArena is all about array manipulation — sorting, filtering, slicing, and more. Play at /play/arrayarena",
    "functionforge": "FunctionForge lets you build & test custom functions. Learn parameters, return values, closures, and higher-order functions!",
    "play": "Head to the Games page to see all available games! Click GAMES in the sidebar or use ⌘+K to search.",
    "leaderboard": "Check the Leaderboards page to see top scores from players worldwide! Scores update in real-time via Supabase.",
    "language": "We support C (default), C++, Java, and JavaScript. Switch languages using the dropdown in the game editor.",
    "help": "I can help with: games, credits, languages, leaderboards, pricing, or how to play. Just ask!",
    "price": "Free tier: 100 credits, all beginner & intermediate games. Pro ($9/mo): unlimited credits + all levels. Ultimate ($19/mo): everything + priority support.",
    "contact": "Click CONTACT in the sidebar to send us a message. We typically respond within 24 hours!",
    "hi": "Hey there! 👋 Welcome to Techno Games. How can I help you today?",
    "hello": "Hello! 👋 Ready to code? Ask me about any game, your credits, or how to get started!",
};

function getReply(msg: string): string {
    const lower = msg.toLowerCase();
    for (const [key, val] of Object.entries(replies)) {
        if (lower.includes(key)) return val;
    }
    if (lower.includes("how") && lower.includes("play")) return "1. Pick a game from the Games page\n2. Select difficulty & language\n3. Write code in the editor\n4. Click RUN to test\n5. Pass all tests to advance!";
    if (lower.includes("ai") || lower.includes("generate")) return "The AI Game Creator is coming soon! You'll be able to describe any coding challenge and our AI will build a full game for you. Stay tuned! 🚀";
    return "Interesting question! This feature is coming soon. Try asking about: games, credits, languages, pricing, or how to play. Type 'help' for options.";
}

export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState<ChatMsg[]>([{ role: "bot", text: "Welcome to Techno Games! 👋\nI'm your coding assistant. Ask me anything about games, credits, or how to play!" }]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

    const send = useCallback(() => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setInput("");
        setMsgs(prev => [...prev, { role: "user", text: userMsg }]);
        setTyping(true);
        setTimeout(() => {
            setMsgs(prev => [...prev, { role: "bot", text: getReply(userMsg) }]);
            setTyping(false);
        }, 600 + Math.random() * 800);
    }, [input]);

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(34,197,94,0.4)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full border border-[#22c55e]/40 bg-[#111111] flex items-center justify-center cursor-pointer shadow-lg"
                style={{ boxShadow: "0 0 15px rgba(34,197,94,0.2)" }}
            >
                {open ? <X size={18} className="text-[#22c55e]" /> : <MessageCircle size={18} className="text-[#22c55e]" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-6 z-[60] w-[340px] h-[440px] rounded-lg border border-[#1e1e1e] bg-[#0d0d0d]/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e1e] bg-[#0a0a0a]">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                                <span className="text-[10px] font-bold tracking-[0.15em] text-[#e5e5e5] uppercase">TECHNO ASSISTANT</span>
                            </div>
                            <button onClick={() => { setMsgs([{ role: "bot", text: "Chat cleared. How can I help?" }]); }} className="text-[#525252] hover:text-[#a3a3a3] transition-colors cursor-pointer">
                                <Trash2 size={12} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                            {msgs.map((m, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] px-3 py-2 rounded-lg text-[11px] font-mono leading-[1.6] whitespace-pre-wrap ${m.role === "user"
                                            ? "bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e]"
                                            : "bg-[#1a1a1a] border border-[#2a2a2a] text-[#a3a3a3]"
                                        }`}>
                                        {m.text}
                                    </div>
                                </motion.div>
                            ))}
                            {typing && (
                                <div className="flex justify-start">
                                    <div className="px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#525252] text-[11px] font-mono flex items-center gap-1">
                                        <span className="animate-pulse">▊</span> typing...
                                    </div>
                                </div>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div className="px-3 py-2.5 border-t border-[#1e1e1e] bg-[#0a0a0a]">
                            <div className="flex items-center gap-2">
                                <input value={input} onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && send()}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-transparent text-[11px] font-mono text-[#e5e5e5] placeholder:text-[#525252] outline-none" />
                                <button onClick={send} className="text-[#22c55e] hover:text-[#4ade80] transition-colors cursor-pointer">
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

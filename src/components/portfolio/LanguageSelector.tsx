"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export type Language = "c" | "cpp" | "java" | "javascript";

interface LanguageSelectorProps {
    value: Language;
    onChange: (lang: Language) => void;
    disabled?: boolean;
}

const languages: { key: Language; label: string; mono: string }[] = [
    { key: "c", label: "C", mono: "main.c" },
    { key: "cpp", label: "C++", mono: "main.cpp" },
    { key: "java", label: "Java", mono: "Main.java" },
    { key: "javascript", label: "JavaScript", mono: "solution.js" },
];

export default function LanguageSelector({ value, onChange, disabled }: LanguageSelectorProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = languages.find((l) => l.key === value)!;

    return (
        <div ref={ref} className="relative z-10">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !disabled && setOpen(!open)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#22c55e]/20 bg-[#0d0d0d] hover:border-[#22c55e]/40 transition-all cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <Code2 size={10} className="text-[#22c55e]" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#22c55e] uppercase">
                    {selected.label}
                </span>
                <span className="text-[9px] font-mono text-[#525252]">{selected.mono}</span>
                <ChevronDown size={10} className={`text-[#525252] transition-transform ${open ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-1 w-48 rounded-md border border-[#1e1e1e] bg-[#111111] shadow-xl overflow-hidden"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.key}
                                onClick={() => { onChange(lang.key); setOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#1a1a1a] transition-colors cursor-pointer ${value === lang.key ? "bg-[#22c55e]/5 border-l-2 border-[#22c55e]" : "border-l-2 border-transparent"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${value === lang.key ? "text-[#22c55e]" : "text-[#a3a3a3]"
                                        }`}>
                                        {lang.label}
                                    </span>
                                </div>
                                <span className="text-[9px] font-mono text-[#525252]">{lang.mono}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

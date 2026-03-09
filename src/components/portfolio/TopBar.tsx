"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Command, Gamepad2, Search, X, LogIn, User, LogOut, Coins, UserX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";

const commandItems = [
    { label: "Home", href: "/", section: "Navigate" },
    { label: "Games Library", href: "/games", section: "Navigate" },
    { label: "How to Play", href: "/how-to-play", section: "Navigate" },
    { label: "View Leaderboards", href: "/leaderboards", section: "Navigate" },
    { label: "Pricing Plans", href: "/pricing", section: "Navigate" },
    { label: "About", href: "/about", section: "Navigate" },
    { label: "Contact", href: "/contact", section: "Navigate" },
    { label: "Play CodeQuest (Beginner)", href: "/play/codequest", section: "Games" },
    { label: "Play BugBlaster (Beginner)", href: "/play/bugblaster", section: "Games" },
    { label: "Play Beginner Games", href: "/games", section: "Quick Actions" },
    { label: "View Top Scores", href: "/leaderboards", section: "Quick Actions" },
];

export default function TopBar() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [showUserMenu, setShowUserMenu] = useState(false);
    const router = useRouter();
    const { user, profile, isGuest, setShowLogin, setLoginMessage, signOut, signInAsGuest } = useAuth();

    const filtered = commandItems.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
                setSearch("");
            }
            if (e.key === "Escape") setOpen(false);
        },
        []
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const handleGuestPlay = async () => {
        const result = await signInAsGuest();
        if (!result.error) {
            router.push("/games");
        }
    };

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-md"
            >
                {/* Name */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Gamepad2 size={16} className="text-[#22c55e]" />
                    <h1
                        className="text-[13px] font-semibold tracking-[0.2em] text-[#e5e5e5] uppercase"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        TECHNO GAMES
                    </h1>
                </Link>

                {/* Command Menu Trigger */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setOpen(true); setSearch(""); }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-md border border-[#2a2a2a] bg-[#111111] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                >
                    <div className="flex items-center gap-1">
                        <kbd className="flex items-center justify-center w-5 h-5 rounded border border-[#2a2a2a] bg-[#1a1a1a] text-[10px] text-[#737373]">
                            <Command size={10} />
                        </kbd>
                        <span className="text-[10px] text-[#737373] mx-0.5">+</span>
                        <kbd className="flex items-center justify-center w-5 h-5 rounded border border-[#2a2a2a] bg-[#1a1a1a] text-[10px] text-[#737373] font-mono">
                            K
                        </kbd>
                    </div>
                    <span className="text-[11px] text-[#525252] uppercase tracking-widest font-medium ml-1">
                        Command Menu
                    </span>
                </motion.button>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {user && profile ? (
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#2a2a2a] bg-[#111111] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                            >
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isGuest
                                        ? "bg-[#525252]/20 border border-[#525252]/30"
                                        : "bg-[#22c55e]/20 border border-[#22c55e]/30"
                                    }`}>
                                    {isGuest ? (
                                        <UserX size={10} className="text-[#525252]" />
                                    ) : (
                                        <User size={10} className="text-[#22c55e]" />
                                    )}
                                </div>
                                <span className={`text-[10px] font-bold tracking-wider uppercase ${isGuest ? "text-[#737373]" : "text-[#a3a3a3]"
                                    }`}>
                                    {isGuest ? "GUEST" : profile.username}
                                </span>
                                <span className="flex items-center gap-0.5 text-[9px] font-mono text-[#eab308]">
                                    <Coins size={8} />
                                    {profile.credits >= 9999 ? "∞" : profile.credits}
                                </span>
                            </motion.button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="absolute right-0 top-full mt-1 w-52 rounded-lg border border-[#1e1e1e] bg-[#111111] shadow-xl overflow-hidden z-50"
                                    >
                                        <div className="px-3 py-2 border-b border-[#1e1e1e]">
                                            <p className="text-[10px] font-mono text-[#737373] truncate">
                                                {isGuest ? "Anonymous Guest" : profile.email}
                                            </p>
                                            <p className="text-[9px] font-bold tracking-wider text-[#525252] uppercase mt-0.5">
                                                {isGuest ? "GUEST MODE" : `${profile.subscription_tier.toUpperCase()} PLAN`}
                                            </p>
                                        </div>

                                        {isGuest && (
                                            <button
                                                onClick={() => {
                                                    setShowUserMenu(false);
                                                    signOut().then(() => {
                                                        setLoginMessage("Create a free account to unlock all features");
                                                        setShowLogin(true);
                                                    });
                                                }}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-medium text-[#22c55e] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                                            >
                                                <User size={10} />
                                                Upgrade to Full Account
                                            </button>
                                        )}

                                        <Link
                                            href="/pricing"
                                            onClick={() => setShowUserMenu(false)}
                                            className="flex items-center gap-2 px-3 py-2 text-[10px] font-medium text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#e5e5e5] transition-colors"
                                        >
                                            <Coins size={10} />
                                            Pricing Plans
                                        </Link>
                                        <button
                                            onClick={() => { signOut(); setShowUserMenu(false); }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-medium text-[#ef4444] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                                        >
                                            <LogOut size={10} />
                                            Sign Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setShowLogin(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#2a2a2a] bg-[#111111] hover:bg-[#1a1a1a] text-[10px] font-bold tracking-wider text-[#a3a3a3] hover:text-[#e5e5e5] uppercase transition-all cursor-pointer"
                            >
                                <LogIn size={10} />
                                LOGIN
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleGuestPlay}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#525252]/30 bg-[#525252]/5 hover:bg-[#525252]/10 text-[10px] font-bold tracking-wider text-[#737373] hover:text-[#a3a3a3] uppercase transition-all cursor-pointer"
                            >
                                <UserX size={10} />
                                GUEST
                            </motion.button>
                        </div>
                    )}

                    {/* CTA Button */}
                    <Link href={user ? "/games" : "#"} onClick={(e) => {
                        if (!user) {
                            e.preventDefault();
                            setLoginMessage("Login or play as Guest to start coding");
                            setShowLogin(true);
                        }
                    }}>
                        <motion.div
                            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(34, 197, 94, 0.25)" }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 transition-all text-[11px] font-semibold tracking-[0.15em] text-[#22c55e] uppercase cursor-pointer"
                        >
                            START PLAYING
                            <ArrowUpRight size={12} strokeWidth={2.5} />
                        </motion.div>
                    </Link>
                </div>
            </motion.header>

            {/* Command Palette Modal */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[70] w-[520px] max-w-[90vw] rounded-lg border border-[#2a2a2a] bg-[#111111] shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e1e]">
                                <Search size={14} className="text-[#525252] shrink-0" />
                                <input
                                    autoFocus
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent text-[13px] text-[#e5e5e5] placeholder:text-[#525252] outline-none font-mono"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && filtered.length > 0) {
                                            router.push(filtered[0].href);
                                            setOpen(false);
                                        }
                                    }}
                                />
                                <button onClick={() => setOpen(false)} className="text-[#525252] hover:text-[#e5e5e5] transition-colors cursor-pointer">
                                    <X size={14} />
                                </button>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto py-2">
                                {filtered.length === 0 ? (
                                    <p className="px-4 py-6 text-center text-[11px] text-[#525252] font-mono">
                                        NO RESULTS FOUND
                                    </p>
                                ) : (
                                    filtered.map((item) => (
                                        <button
                                            key={item.href + item.label}
                                            onClick={() => { router.push(item.href); setOpen(false); }}
                                            className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#1a1a1a] transition-colors text-left group cursor-pointer"
                                        >
                                            <span className="text-[12px] font-medium text-[#a3a3a3] group-hover:text-[#e5e5e5] transition-colors">
                                                {item.label}
                                            </span>
                                            <span className="text-[9px] font-mono tracking-widest text-[#525252] uppercase">
                                                {item.section}
                                            </span>
                                        </button>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Terminal, Loader2, CheckCircle2, AlertTriangle, UserX } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginModal() {
    const { showLogin, setShowLogin, signUp, signIn, signInWithOAuth, signInAsGuest, loginMessage, setLoginMessage } = useAuth();
    const [tab, setTab] = useState<"signin" | "signup">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [guestLoading, setGuestLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        const result = tab === "signup" ? await signUp(email, password) : await signIn(email, password);
        if (result.error) {
            setError(result.error);
        } else {
            setSuccess(tab === "signup" ? "Account created! Welcome aboard." : "Logged in successfully!");
            setTimeout(() => { setShowLogin(false); setLoginMessage(""); setEmail(""); setPassword(""); setSuccess(""); }, 1200);
        }
        setLoading(false);
    };

    const handleGuest = async () => {
        setGuestLoading(true);
        setError("");
        const result = await signInAsGuest();
        if (result.error) { setError(result.error); }
        else {
            setSuccess("Playing as Guest! (Beginner levels only)");
            setTimeout(() => { setShowLogin(false); setLoginMessage(""); setSuccess(""); }, 1200);
        }
        setGuestLoading(false);
    };

    const handleGoogle = async () => {
        setError("");
        const result = await signInWithOAuth("google");
        if (result.error) setError(result.error);
    };

    const handleClose = () => { setShowLogin(false); setLoginMessage(""); setError(""); setSuccess(""); };

    return (
        <AnimatePresence>
            {showLogin && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={handleClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]" />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-[400px] max-w-[90vw] rounded-lg border border-[#1e1e1e] bg-[#111111] shadow-2xl overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e] bg-[#0d0d0d]">
                            <div className="flex items-center gap-2">
                                <Terminal size={14} className="text-[#22c55e]" />
                                <span className="text-[11px] font-bold tracking-[0.15em] text-[#e5e5e5] uppercase">AUTHENTICATION</span>
                            </div>
                            <button onClick={handleClose} className="text-[#525252] hover:text-[#e5e5e5] transition-colors cursor-pointer">
                                <X size={14} />
                            </button>
                        </div>

                        {/* Login Message */}
                        {loginMessage && (
                            <div className="px-5 py-2.5 border-b border-[#1e1e1e] bg-[#22c55e]/5">
                                <p className="text-[10px] font-mono tracking-wider text-[#22c55e] text-center">{loginMessage}</p>
                            </div>
                        )}

                        {/* Google Sign In (Primary) */}
                        <div className="px-5 pt-4 pb-3">
                            <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)" }}
                                whileTap={{ scale: 0.98 }} onClick={handleGoogle}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[11px] font-bold tracking-wider text-[#22c55e] uppercase transition-all cursor-pointer">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                SIGN IN WITH GOOGLE
                            </motion.button>
                        </div>

                        {/* Guest Mode */}
                        <div className="px-5 mb-3">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={handleGuest} disabled={guestLoading}
                                className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-[#525252]/30 bg-[#525252]/5 hover:bg-[#525252]/10 text-[10px] font-bold tracking-wider text-[#a3a3a3] uppercase transition-all disabled:opacity-50 cursor-pointer">
                                {guestLoading ? <Loader2 size={10} className="animate-spin" /> : <><UserX size={10} /> PLAY AS GUEST (BEGINNER ONLY)</>}
                            </motion.button>
                        </div>

                        {/* Divider */}
                        <div className="px-5 flex items-center gap-3 mb-3">
                            <div className="flex-1 border-t border-[#1e1e1e]" />
                            <span className="text-[9px] font-mono tracking-widest text-[#525252] uppercase">OR EMAIL</span>
                            <div className="flex-1 border-t border-[#1e1e1e]" />
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-[#1e1e1e]">
                            {(["signin", "signup"] as const).map((t) => (
                                <button key={t} onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                                    className={`flex-1 py-2.5 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer ${tab === t ? "text-[#22c55e] border-b-2 border-[#22c55e] bg-[#22c55e]/5" : "text-[#525252] hover:text-[#a3a3a3]"
                                        }`}>
                                    {t === "signin" ? "SIGN IN" : "SIGN UP"}
                                </button>
                            ))}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">
                            <div>
                                <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-1.5 block">EMAIL</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                    className="w-full px-3 py-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] text-[12px] text-[#e5e5e5] font-mono placeholder:text-[#525252] outline-none focus:border-[#22c55e]/30 transition-colors"
                                    placeholder="you@example.com" />
                            </div>
                            <div>
                                <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-1.5 block">PASSWORD</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                                    className="w-full px-3 py-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] text-[12px] text-[#e5e5e5] font-mono placeholder:text-[#525252] outline-none focus:border-[#22c55e]/30 transition-colors"
                                    placeholder="Min 6 characters" />
                            </div>

                            {error && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-2 rounded-md border border-[#ef4444]/20 bg-[#ef4444]/5">
                                    <AlertTriangle size={12} className="text-[#ef4444] shrink-0" />
                                    <p className="text-[10px] font-mono text-[#ef4444]">{error}</p>
                                </motion.div>
                            )}
                            {success && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-2 rounded-md border border-[#22c55e]/20 bg-[#22c55e]/5">
                                    <CheckCircle2 size={12} className="text-[#22c55e] shrink-0" />
                                    <p className="text-[10px] font-mono text-[#22c55e]">{success}</p>
                                </motion.div>
                            )}

                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-[#2a2a2a] bg-[#0a0a0a] hover:bg-[#1a1a1a] text-[11px] font-bold tracking-wider text-[#a3a3a3] uppercase transition-all disabled:opacity-50 cursor-pointer">
                                {loading ? <Loader2 size={12} className="animate-spin" /> : tab === "signup" ? "CREATE FREE ACCOUNT" : "SIGN IN WITH EMAIL"}
                            </motion.button>
                        </form>

                        {tab === "signup" && (
                            <div className="px-5 pb-4 border-t border-[#1e1e1e] pt-3">
                                <p className="text-[9px] font-mono text-[#525252] text-center">
                                    ✓ ALL GAMES FREE &nbsp;•&nbsp; ✓ UNLIMITED HINTS &nbsp;•&nbsp; ✓ NO CREDIT CARD
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

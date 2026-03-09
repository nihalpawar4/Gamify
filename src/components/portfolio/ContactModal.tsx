"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Terminal, Loader2, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { submitContact } from "@/lib/supabase";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [statusMsg, setStatusMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        const { error } = await submitContact({ name, email, message });

        if (error) {
            setStatus("error");
            setStatusMsg(error.message || "Failed to send message. Try again.");
        } else {
            setStatus("success");
            const ts = new Date().toLocaleTimeString("en-US", { hour12: false });
            setStatusMsg(`MESSAGE SENT ✓ [${ts}]`);
            setName("");
            setEmail("");
            setMessage("");
            setTimeout(() => {
                onClose();
                setStatus("idle");
            }, 2500);
        }
        setLoading(false);
    };

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
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-[420px] max-w-[90vw] rounded-lg border border-[#1e1e1e] bg-[#111111] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e] bg-[#0d0d0d]">
                            <div className="flex items-center gap-2">
                                <Terminal size={14} className="text-[#22c55e]" />
                                <span className="text-[11px] font-bold tracking-[0.15em] text-[#e5e5e5] uppercase">
                                    CONTACT // SEND MESSAGE
                                </span>
                            </div>
                            <button onClick={onClose} className="text-[#525252] hover:text-[#e5e5e5] transition-colors cursor-pointer">
                                <X size={14} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">
                            <div>
                                <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-1.5 block">
                                    NAME
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] text-[12px] text-[#e5e5e5] font-mono placeholder:text-[#525252] outline-none focus:border-[#22c55e]/30 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-1.5 block">
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] text-[12px] text-[#e5e5e5] font-mono placeholder:text-[#525252] outline-none focus:border-[#22c55e]/30 transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-1.5 block">
                                    MESSAGE
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] text-[12px] text-[#e5e5e5] font-mono placeholder:text-[#525252] outline-none focus:border-[#22c55e]/30 transition-colors resize-none"
                                    placeholder="Type your message here..."
                                />
                            </div>

                            {/* Status Messages */}
                            {status === "error" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-2 rounded-md border border-[#ef4444]/20 bg-[#ef4444]/5">
                                    <AlertTriangle size={12} className="text-[#ef4444] shrink-0" />
                                    <p className="text-[10px] font-mono text-[#ef4444]">{statusMsg}</p>
                                </motion.div>
                            )}
                            {status === "success" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-3 py-2 rounded-md border border-[#22c55e]/20 bg-[#22c55e]/5">
                                    <CheckCircle2 size={12} className="text-[#22c55e] shrink-0" />
                                    <p className="text-[10px] font-mono text-[#22c55e]">{statusMsg}</p>
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[11px] font-bold tracking-wider text-[#22c55e] uppercase transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? (
                                    <Loader2 size={12} className="animate-spin" />
                                ) : (
                                    <>
                                        <Send size={10} />
                                        SEND MESSAGE
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <div className="px-5 pb-4">
                            <p className="text-[9px] font-mono text-[#525252] text-center">
                                Messages are sent directly to our Supabase database in real-time.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

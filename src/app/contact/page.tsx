"use client";

import TopBar from "@/components/portfolio/TopBar";
import LeftSidebar from "@/components/portfolio/LeftSidebar";
import RightSidebar from "@/components/portfolio/RightSidebar";
import PageWrapper from "@/components/portfolio/PageWrapper";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";

const socials = [
    { icon: Github, label: "GITHUB", href: "https://github.com", handle: "@technogames" },
    { icon: Twitter, label: "X / TWITTER", href: "https://twitter.com", handle: "@technogames" },
    { icon: Linkedin, label: "LINKEDIN", href: "https://linkedin.com", handle: "/technogames" },
    { icon: MessageCircle, label: "DISCORD", href: "#", handle: "TechnoGames Community" },
];

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulated send
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <>
            <TopBar />
            <LeftSidebar />
            <RightSidebar />
            <PageWrapper
                title="Contact"
                subtitle="Got feedback, bug reports, or just want to say hi? Reach out to us."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Contact Form */}
                    <div className="rounded-lg border border-[#1e1e1e] bg-[#111111] p-5">
                        <p className="text-[9px] font-mono tracking-widest text-[#22c55e] uppercase mb-4">
                            {"// SEND_MESSAGE"}
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-1 block">
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
                                <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-1 block">
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
                                <label className="text-[9px] font-mono tracking-widest text-[#525252] uppercase mb-1 block">
                                    MESSAGE
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] text-[12px] text-[#e5e5e5] font-mono placeholder:text-[#525252] outline-none focus:border-[#22c55e]/30 transition-colors resize-none"
                                    placeholder="Tell us what's on your mind..."
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(34, 197, 94, 0.2)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[10px] font-bold tracking-wider text-[#22c55e] uppercase transition-all cursor-pointer"
                            >
                                {sent ? (
                                    <>MESSAGE SENT ✓</>
                                ) : (
                                    <>
                                        <Send size={10} />
                                        SEND MESSAGE
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    {/* Socials */}
                    <div className="space-y-3">
                        <div className="rounded-lg border border-[#1e1e1e] bg-[#111111] p-5">
                            <p className="text-[9px] font-mono tracking-widest text-[#22c55e] uppercase mb-4">
                                {"// CONNECT_WITH_US"}
                            </p>
                            <div className="space-y-2">
                                {socials.map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{ x: 3 }}
                                        className="flex items-center justify-between py-2 px-3 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] hover:border-[#2a2a2a] transition-colors group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <social.icon size={12} className="text-[#525252] group-hover:text-[#22c55e] transition-colors" />
                                            <span className="text-[10px] font-bold tracking-[0.15em] text-[#a3a3a3] uppercase">
                                                {social.label}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono text-[#525252]">
                                            {social.handle}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="rounded-lg border border-[#1e1e1e] bg-[#111111] p-5">
                            <p className="text-[9px] font-mono tracking-widest text-[#22c55e] uppercase mb-3">
                                {"// DIRECT_EMAIL"}
                            </p>
                            <a
                                href="mailto:hello@technogames.dev"
                                className="flex items-center gap-2 text-[12px] font-mono text-[#a3a3a3] hover:text-[#22c55e] transition-colors"
                            >
                                <Mail size={12} />
                                hello@technogames.dev
                            </a>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
}

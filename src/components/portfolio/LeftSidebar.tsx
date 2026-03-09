"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    Home, Gamepad2, HelpCircle, Trophy, Info, Mail,
    Github, Linkedin, Twitter,
    MessageCircle, Newspaper, BookOpen, CreditCard,
} from "lucide-react";
import ContactModal from "./ContactModal";

const navigateItems = [
    { icon: Home, label: "HOME", href: "/" },
    { icon: Gamepad2, label: "GAMES", href: "/games" },
    { icon: HelpCircle, label: "HOW TO PLAY", href: "/how-to-play" },
    { icon: Trophy, label: "LEADERBOARDS", href: "/leaderboards" },
    { icon: CreditCard, label: "PRICING", href: "/pricing" },
    { icon: Info, label: "ABOUT", href: "/about" },
];

const connectItems = [
    { icon: Github, label: "GITHUB", href: "https://github.com" },
    { icon: Linkedin, label: "LINKEDIN", href: "https://linkedin.com" },
    { icon: Twitter, label: "X (TWITTER)", href: "https://twitter.com" },
];

const visitItems = [
    { icon: MessageCircle, label: "DISCORD", href: "#" },
    { icon: Newspaper, label: "NEWSLETTER", href: "#" },
    { icon: BookOpen, label: "BLOG", href: "#" },
];

interface SidebarSectionProps {
    title: string;
    items: { icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; label: string; href: string }[];
    delay?: number;
    pathname: string;
    external?: boolean;
    disabled?: boolean;
}

function SidebarSection({ title, items, delay = 0, pathname, external, disabled }: SidebarSectionProps) {
    return (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }} className="mb-6">
            <div className="flex items-center gap-1.5 mb-3">
                <span className="w-1 h-1 rounded-full bg-[#22c55e]" />
                <h3 className="text-[10px] font-semibold tracking-[0.2em] text-[#525252] uppercase">{title}</h3>
            </div>
            <ul className="space-y-1">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    if (external) {
                        if (disabled) {
                            return (
                                <li key={item.label}>
                                    <div className="relative group/tip">
                                        <div className="flex items-center gap-2 py-1 px-1 rounded text-[11px] font-medium tracking-wide text-[#525252] opacity-40 blur-[0.5px] cursor-not-allowed">
                                            <item.icon size={12} strokeWidth={1.8} />
                                            <span>{item.label}</span>
                                        </div>
                                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[8px] font-mono text-[#525252] uppercase tracking-wider whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-50">
                                            Coming Soon
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                        return (
                            <li key={item.label}>
                                <motion.div whileHover={{ x: 3 }}>
                                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 py-1 px-1 rounded text-[11px] font-medium tracking-wide transition-colors text-[#737373] hover:text-[#e5e5e5]">
                                        <item.icon size={12} strokeWidth={1.8} />
                                        <span>{item.label}</span>
                                    </a>
                                </motion.div>
                            </li>
                        );
                    }
                    return (
                        <li key={item.label}>
                            <motion.div whileHover={{ x: 3 }}>
                                <Link href={item.href}
                                    className={`flex items-center gap-2 py-1 px-1 rounded text-[11px] font-medium tracking-wide transition-colors group ${isActive ? "text-[#22c55e]" : "text-[#737373] hover:text-[#e5e5e5]"
                                        }`}>
                                    <item.icon size={12} strokeWidth={1.8} />
                                    <span>{item.label}</span>
                                </Link>
                            </motion.div>
                        </li>
                    );
                })}
                {title === "NAVIGATE" && <ContactButton pathname={pathname} />}
            </ul>
        </motion.div>
    );
}

function ContactButton({ pathname }: { pathname: string }) {
    const [contactOpen, setContactOpen] = useState(false);
    const isActive = pathname === "/contact";
    return (
        <>
            <li>
                <motion.div whileHover={{ x: 3 }}>
                    <button onClick={() => setContactOpen(true)}
                        className={`flex items-center gap-2 py-1 px-1 rounded text-[11px] font-medium tracking-wide transition-colors cursor-pointer w-full text-left ${isActive ? "text-[#22c55e]" : "text-[#737373] hover:text-[#e5e5e5]"
                            }`}>
                        <Mail size={12} strokeWidth={1.8} />
                        <span>CONTACT</span>
                    </button>
                </motion.div>
            </li>
            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </>
    );
}

export default function LeftSidebar() {
    const pathname = usePathname();
    return (
        <aside className="fixed left-0 top-[49px] bottom-0 w-[160px] border-r border-[#1e1e1e] bg-[#0a0a0a] px-4 py-6 overflow-y-auto z-40 hidden lg:block">
            <SidebarSection title="NAVIGATE" items={navigateItems} delay={0.1} pathname={pathname} />
            <SidebarSection title="CONNECT" items={connectItems} delay={0.2} pathname={pathname} external disabled />
            <SidebarSection title="VISIT" items={visitItems} delay={0.3} pathname={pathname} external />
        </aside>
    );
}

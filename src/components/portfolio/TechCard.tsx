"use client";

import { motion } from "framer-motion";
import { Circle, FileCode, Code, Database, Hash, FileJson, Globe, Palette, Terminal } from "lucide-react";
import React from "react";

interface TechBadgeProps {
    icon: React.ReactNode;
    name: string;
}

function TechBadge({ icon, name }: TechBadgeProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.04, y: -1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#1e1e1e] bg-[#0a0a0a] hover:border-[#2a2a2a] hover:bg-[#111111] transition-all cursor-default"
        >
            <span className="text-[#525252]">{icon}</span>
            <span className="text-[11px] font-medium text-[#a3a3a3] tracking-wide">
                {name}
            </span>
        </motion.div>
    );
}

interface TechCardProps {
    title: string;
    items: { icon: React.ReactNode; name: string }[];
    index?: number;
}

export default function TechCard({ title, items, index = 0 }: TechCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
            className="rounded-lg border border-[#1e1e1e] bg-[#111111] p-5"
        >
            {/* Title */}
            <div className="flex items-center gap-2 mb-4">
                <Circle size={8} className="text-[#22c55e] fill-[#22c55e]" />
                <h3 className="text-[12px] font-bold tracking-[0.15em] text-[#e5e5e5] uppercase">
                    {title}
                </h3>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
                {items.map((item, i) => (
                    <TechBadge key={i} icon={item.icon} name={item.name} />
                ))}
            </div>
        </motion.div>
    );
}

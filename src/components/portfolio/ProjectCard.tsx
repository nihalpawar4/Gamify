"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Circle } from "lucide-react";

interface ProjectCardProps {
    title: string;
    badge: string;
    description: string;
    tags: string[];
    repoLink?: string;
    index?: number;
}

export default function ProjectCard({
    title,
    badge,
    description,
    tags,
    repoLink = "#",
    index = 0,
}: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -2 }}
            className="group rounded-lg border border-[#1e1e1e] bg-[#111111] hover:bg-[#141414] hover:border-[#2a2a2a] transition-all duration-300 p-5 pb-4 flex flex-col justify-between h-full"
        >
            {/* Header */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Circle size={8} className="text-[#22c55e] fill-[#22c55e]" />
                        <h3 className="text-[13px] font-bold tracking-[0.12em] text-[#e5e5e5] uppercase">
                            {title}
                        </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-semibold tracking-widest text-[#737373] uppercase border border-[#2a2a2a] bg-[#1a1a1a]">
                        {badge}
                    </span>
                </div>

                {/* Description */}
                <p className="text-[11.5px] leading-[1.75] text-[#737373] mb-4">
                    {description}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[9px] font-medium tracking-wider text-[#525252] uppercase"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <motion.a
                    href={repoLink}
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#e5e5e5] hover:text-[#22c55e] transition-colors uppercase underline underline-offset-4 decoration-[#2a2a2a] hover:decoration-[#22c55e] shrink-0"
                >
                    VIEW REPO
                    <ArrowUpRight size={10} strokeWidth={2.5} />
                </motion.a>
            </div>
        </motion.div>
    );
}

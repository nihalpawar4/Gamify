"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
}

export default function PageWrapper({ children, title, subtitle }: PageWrapperProps) {
    return (
        <main className="pt-[49px] lg:ml-[160px] xl:mr-[190px] min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-6"
            >
                {title && (
                    <div className="mb-6">
                        <p className="text-[10px] font-mono font-semibold tracking-[0.3em] text-[#22c55e] uppercase mb-2">
                            {"// SYSTEM_MODULE"}
                        </p>
                        <h1
                            className="text-[32px] font-normal text-[#e5e5e5] mb-2"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            <span className="italic">{title}</span>
                        </h1>
                        {subtitle && (
                            <p className="text-[12px] leading-[1.8] text-[#737373] max-w-xl">
                                {subtitle}
                            </p>
                        )}
                        <div className="mt-4 border-t border-[#1e1e1e]" />
                    </div>
                )}
                {children}
            </motion.div>
        </main>
    );
}

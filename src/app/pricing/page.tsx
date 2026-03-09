"use client";

import TopBar from "@/components/portfolio/TopBar";
import LeftSidebar from "@/components/portfolio/LeftSidebar";
import RightSidebar from "@/components/portfolio/RightSidebar";
import PageWrapper from "@/components/portfolio/PageWrapper";
import { motion } from "framer-motion";
import { Check, Coins, Crown, Rocket, Zap, Star, Shield, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const plans = [
    {
        name: "FREE",
        price: "$0",
        period: "forever",
        color: "text-[#22c55e]",
        border: "border-[#22c55e]/20",
        bg: "bg-[#22c55e]/5",
        icon: <Coins size={20} className="text-[#22c55e]" />,
        features: [
            "All beginner & intermediate games",
            "Detailed hints (unlimited)",
            "Free solution reveals",
            "Basic leaderboard access",
            "Community support",
        ],
        cta: "CURRENT PLAN",
        disabled: true,
        tier: "free" as const,
    },
    {
        name: "PRO",
        price: "$9",
        period: "/month",
        color: "text-[#eab308]",
        border: "border-[#eab308]/30",
        bg: "bg-[#eab308]/5",
        icon: <Crown size={20} className="text-[#eab308]" />,
        popular: true,
        features: [
            "Unlimited solution reveals",
            "All game difficulties (incl. Pro)",
            "Full solution reveals",
            "Priority support",
            "Custom terminal themes",
            "Ad-free experience",
        ],
        cta: "SUBSCRIBE TO PRO",
        disabled: false,
        tier: "pro" as const,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    },
    {
        name: "ULTIMATE",
        price: "$19",
        period: "/month",
        color: "text-[#a855f7]",
        border: "border-[#a855f7]/30",
        bg: "bg-[#a855f7]/5",
        icon: <Rocket size={20} className="text-[#a855f7]" />,
        features: [
            "Everything in Pro",
            "Early access to new games",
            "Custom avatar & profile badge",
            "Private leaderboard",
            "1-on-1 mentoring sessions",
            "API access",
            "Exclusive Discord channel",
        ],
        cta: "GO ULTIMATE",
        disabled: false,
        tier: "ultimate" as const,
        priceId: process.env.NEXT_PUBLIC_STRIPE_ULTIMATE_PRICE_ID,
    },
];

export default function PricingPage() {
    const { user, profile, setShowLogin } = useAuth();

    const handleSubscribe = async (tier: "pro" | "ultimate", priceId?: string) => {
        if (!user) {
            setShowLogin(true);
            return;
        }

        if (!priceId || priceId.includes("placeholder")) {
            // Demo mode — show alert
            alert(`[DEMO MODE] Stripe checkout for ${tier.toUpperCase()} plan would open here.\n\nTo enable real payments:\n1. Create products in Stripe Dashboard\n2. Add price IDs to .env.local\n3. Create /api/stripe/checkout route`);
            return;
        }

        try {
            const stripe = await stripePromise;
            if (!stripe) return;

            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId, userId: user.id, tier }),
            });
            const data = await res.json();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (stripe as any).redirectToCheckout({ sessionId: data.sessionId });
        } catch (err) {
            console.error("Stripe checkout error:", err);
        }
    };

    return (
        <>
            <TopBar />
            <LeftSidebar />
            <RightSidebar />
            <PageWrapper
                title="Pricing Plans"
                subtitle="Choose the plan that fits your coding journey. All plans include access to our core games and community."
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {plans.map((plan, i) => {
                        const isCurrentPlan = profile?.subscription_tier === plan.tier;

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: plan.disabled ? 0 : -3 }}
                                className={`relative rounded-lg border ${plan.border} bg-[#111111] p-5 flex flex-col ${plan.popular ? "ring-1 ring-[#eab308]/20" : ""
                                    }`}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="flex items-center gap-1 px-3 py-0.5 rounded-full border border-[#eab308]/30 bg-[#eab308]/10 text-[8px] font-bold tracking-widest text-[#eab308] uppercase">
                                            <Star size={8} fill="#eab308" />
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                {/* Plan Header */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        {plan.icon}
                                        <h3 className={`text-[13px] font-bold tracking-[0.15em] uppercase ${plan.color}`}>
                                            {plan.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[28px] font-bold text-[#e5e5e5]">{plan.price}</span>
                                        <span className="text-[11px] font-mono text-[#525252]">{plan.period}</span>
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 mb-5 flex-1">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2">
                                            <Check size={10} className={`${plan.color} mt-0.5 shrink-0`} />
                                            <span className="text-[10.5px] text-[#a3a3a3] leading-relaxed">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                {isCurrentPlan ? (
                                    <div className="flex items-center justify-center gap-1.5 py-2.5 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/5">
                                        <Shield size={10} className="text-[#22c55e]" />
                                        <span className="text-[10px] font-bold tracking-wider text-[#22c55e] uppercase">
                                            CURRENT PLAN
                                        </span>
                                    </div>
                                ) : plan.disabled ? (
                                    <div className="flex items-center justify-center gap-1.5 py-2.5 rounded-md border border-[#2a2a2a] bg-[#0a0a0a]">
                                        <span className="text-[10px] font-bold tracking-wider text-[#525252] uppercase">
                                            FREE FOREVER
                                        </span>
                                    </div>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${plan.name === "PRO" ? "rgba(234, 179, 8, 0.2)" : "rgba(168, 85, 247, 0.2)"}` }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleSubscribe(plan.tier as "pro" | "ultimate", plan.priceId)}
                                        className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md border ${plan.border} ${plan.bg} hover:opacity-90 text-[10px] font-bold tracking-wider ${plan.color} uppercase transition-all cursor-pointer`}
                                    >
                                        <Zap size={10} />
                                        {plan.cta}
                                        <ArrowUpRight size={10} />
                                    </motion.button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="mt-8 rounded-lg border border-[#1e1e1e] bg-[#111111] p-5">
                    <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#a3a3a3] uppercase mb-3">
            // FAQ
                    </h3>
                    <div className="space-y-3">
                        {[
                            {
                                q: "Are solutions free?",
                                a: "Yes! All hints and solutions are completely free. Pro plan unlocks additional features like custom themes and priority support.",
                            },
                            {
                                q: "Can I cancel anytime?",
                                a: "Yes! Cancel your subscription anytime from your account settings. You keep access until the end of your billing period.",
                            },
                            {
                                q: "Is there a student discount?",
                                a: "Yes! Students get 50% off Pro and Ultimate plans. Contact us with your .edu email to apply.",
                            },
                        ].map((faq) => (
                            <div key={faq.q}>
                                <p className="text-[10.5px] font-semibold text-[#e5e5e5] mb-0.5">{faq.q}</p>
                                <p className="text-[10px] text-[#737373] leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </PageWrapper>
        </>
    );
}

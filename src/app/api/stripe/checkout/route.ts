import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// NOTE: Install stripe on the server side: npm install stripe
// This route handles creating Stripe Checkout sessions

export async function POST(req: NextRequest) {
    try {
        const { priceId, userId, tier } = await req.json();

        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
            return NextResponse.json(
                { error: "Stripe is not configured. Add your secret key to .env.local" },
                { status: 400 }
            );
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
        });

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${req.nextUrl.origin}/pricing?success=true&tier=${tier}`,
            cancel_url: `${req.nextUrl.origin}/pricing?canceled=true`,
            metadata: { userId, tier },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}

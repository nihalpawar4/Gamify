"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase, getUserProfile, createUserProfile, subscribeToProfile, type DBUserProfile } from "./supabase";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    profile: DBUserProfile | null;
    session: Session | null;
    loading: boolean;
    isGuest: boolean;
    signUp: (email: string, password: string) => Promise<{ error: string | null }>;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signInWithOAuth: (provider: "google") => Promise<{ error: string | null }>;
    signInAsGuest: () => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
    showLogin: boolean;
    setShowLogin: (v: boolean) => void;
    loginMessage: string;
    setLoginMessage: (v: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<DBUserProfile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

    const isGuest = !!user?.is_anonymous;

    const loadProfile = useCallback(async (userId: string, email: string) => {
        let p = await getUserProfile(userId);
        if (!p) {
            await createUserProfile({
                id: userId,
                email: email || `guest_${userId.slice(0, 8)}@techno.games`,
                username: email ? email.split("@")[0] : `Guest_${userId.slice(0, 6)}`,
            });
            p = await getUserProfile(userId);
        }
        if (p) setProfile(p);
        return p;
    }, []);

    const refreshProfile = useCallback(async () => {
        if (user) {
            const p = await getUserProfile(user.id);
            if (p) setProfile(p);
        }
    }, [user]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session: s } }) => {
            setSession(s);
            setUser(s?.user ?? null);
            if (s?.user) {
                loadProfile(s.user.id, s.user.email || "");
            }
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, s) => {
                setSession(s);
                setUser(s?.user ?? null);
                if (s?.user) {
                    await loadProfile(s.user.id, s.user.email || "");
                } else {
                    setProfile(null);
                }
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, [loadProfile]);

    // Realtime profile updates
    useEffect(() => {
        if (!user) return;
        const channel = subscribeToProfile(user.id, (updated) => {
            setProfile(updated);
        });
        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const signUp = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) return { error: error.message };
        return { error: null };
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        return { error: null };
    };

    const signInWithOAuth = async (provider: "google") => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${window.location.origin}/` },
        });
        if (error) return { error: error.message };
        return { error: null };
    };

    const signInAsGuest = async () => {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) return { error: error.message };
        return { error: null };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        setSession(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                session,
                loading,
                isGuest,
                signUp,
                signIn,
                signInWithOAuth,
                signInAsGuest,
                signOut,
                refreshProfile,
                showLogin,
                setShowLogin,
                loginMessage,
                setLoginMessage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Database Types ──────────────────────────────────────

export interface DBContact {
    id?: string;
    name: string;
    email: string;
    message: string;
    created_at?: string;
}

export interface DBUserProfile {
    id: string;
    email: string;
    username: string;
    avatar_url?: string;
    credits: number;
    is_subscribed: boolean;
    subscription_tier: "free" | "pro" | "ultimate";
    preferred_language?: string;
    created_at?: string;
}

export interface DBGameScore {
    id?: string;
    user_id: string;
    username: string;
    game: string;
    difficulty: string;
    score: number;
    level: number;
    language?: string;
    created_at?: string;
}

// ─── Contact Functions ───────────────────────────────────

export async function submitContact(contact: DBContact) {
    const { data, error } = await supabase
        .from("contacts")
        .insert([contact])
        .select();
    return { data, error };
}

// ─── User Profile Functions ──────────────────────────────

export async function getUserProfile(userId: string): Promise<DBUserProfile | null> {
    const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();
    if (error) return null;
    return data;
}

export async function createUserProfile(profile: Partial<DBUserProfile> & { id: string; email: string }) {
    const { data, error } = await supabase
        .from("user_profiles")
        .insert([{
            id: profile.id,
            email: profile.email,
            username: profile.username || profile.email.split("@")[0],
            credits: 100,
            is_subscribed: false,
            subscription_tier: "free",
            preferred_language: "c",
        }])
        .select();
    return { data, error };
}

export async function updateSubscription(userId: string, tier: "pro" | "ultimate") {
    const { error } = await supabase
        .from("user_profiles")
        .update({
            is_subscribed: true,
            subscription_tier: tier,
            credits: 9999,
        })
        .eq("id", userId);
    return { success: !error };
}

export async function updatePreferredLanguage(userId: string, language: string) {
    const { error } = await supabase
        .from("user_profiles")
        .update({ preferred_language: language })
        .eq("id", userId);
    return { success: !error };
}

// ─── Game Scores Functions ───────────────────────────────

export async function submitScore(score: Omit<DBGameScore, "id">) {
    const { data, error } = await supabase
        .from("game_scores")
        .insert([score])
        .select();
    return { data, error };
}

export async function getTopScores(limit: number = 20, game?: string) {
    let query = supabase
        .from("game_scores")
        .select("*")
        .order("score", { ascending: false })
        .limit(limit);
    if (game) {
        query = query.eq("game", game);
    }
    const { data, error } = await query;
    return { data: data || [], error };
}

// Best score per user (deduped leaderboard)
export async function getBestScores(limit: number = 50, game?: string) {
    // Fetch all scores, then deduplicate client-side (best per user)
    let query = supabase
        .from("game_scores")
        .select("*")
        .order("score", { ascending: false })
        .limit(200);
    if (game) query = query.eq("game", game);

    const { data, error } = await query;
    if (!data) return { data: [], error };

    // Keep only the best score per user_id
    const bestByUser = new Map<string, DBGameScore>();
    for (const entry of data) {
        const existing = bestByUser.get(entry.user_id);
        if (!existing || entry.score > existing.score) {
            bestByUser.set(entry.user_id, entry);
        }
    }

    const sorted = Array.from(bestByUser.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    return { data: sorted, error: null };
}

// ─── Challenge Completion Tracking ──────────────────────

export async function markChallengeCompleted(userId: string, challengeKey: string) {
    const { error } = await supabase
        .from("completed_challenges")
        .upsert({ user_id: userId, challenge_key: challengeKey })
        .select();
    return { success: !error };
}

export async function isChallengeCompleted(userId: string, challengeKey: string): Promise<boolean> {
    const { data } = await supabase
        .from("completed_challenges")
        .select("id")
        .eq("user_id", userId)
        .eq("challenge_key", challengeKey)
        .single();
    return !!data;
}

// ─── Realtime Helpers ────────────────────────────────────

export function subscribeToProfile(userId: string, callback: (profile: DBUserProfile) => void) {
    return supabase
        .channel(`profile-${userId}`)
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "user_profiles", filter: `id=eq.${userId}` },
            (payload) => {
                if (payload.new) callback(payload.new as DBUserProfile);
            }
        )
        .subscribe();
}

export function subscribeToScores(callback: (score: DBGameScore) => void) {
    return supabase
        .channel("scores-realtime")
        .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "game_scores" },
            (payload) => {
                if (payload.new) callback(payload.new as DBGameScore);
            }
        )
        .subscribe();
}

export function subscribeToContacts(callback: (contact: DBContact) => void) {
    return supabase
        .channel("contacts-realtime")
        .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "contacts" },
            (payload) => {
                if (payload.new) {
                    console.log("[REALTIME] New contact submission:", payload.new);
                    callback(payload.new as DBContact);
                }
            }
        )
        .subscribe();
}

// ─── Presence Helpers ────────────────────────────────────

export interface PresenceState {
    username: string;
    game?: string;
    online_at: string;
}

export function createPresenceChannel(
    userId: string,
    username: string,
    onSync: (presences: PresenceState[]) => void
) {
    const channel = supabase.channel("online-users", {
        config: { presence: { key: userId } },
    });

    channel
        .on("presence", { event: "sync" }, () => {
            const state = channel.presenceState<PresenceState>();
            const users: PresenceState[] = [];
            for (const key of Object.keys(state)) {
                const presences = state[key];
                if (presences && presences.length > 0) {
                    users.push(presences[0]);
                }
            }
            onSync(users);
        })
        .subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await channel.track({
                    username,
                    online_at: new Date().toISOString(),
                });
            }
        });

    return channel;
}

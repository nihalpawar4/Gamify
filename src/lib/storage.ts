// localStorage helper utilities for Techno Games

export interface LeaderboardEntry {
    name: string;
    game: string;
    score: number;
    level: number;
    date: string;
}

export interface GameProgress {
    codequest: Record<string, { currentLevel: number; completed: boolean; bestScore: number }>;
    bugblaster: Record<string, { currentLevel: number; completed: boolean; bestScore: number }>;
}

export interface ConnectState {
    github: { connected: boolean; username: string };
    linkedin: { connected: boolean; username: string };
    twitter: { connected: boolean; username: string };
}

const LEADERBOARD_KEY = "techno_games_leaderboard";
const PROGRESS_KEY = "techno_games_progress_v2";
const GAMES_PLAYED_KEY = "techno_games_played_today";
const CONNECT_KEY = "techno_games_connect";

const fakeNames = [
    "CyberNinja", "PixelHacker", "ByteRunner", "NeonCoder", "TerminalKid",
    "GlitchDev", "MatrixBot", "DataPunk", "CodeWizard", "BinaryGhost",
    "SyntaxSamurai", "LoopMaster", "HashKnight", "StackHero", "DebugDemon",
    "VoidWalker", "NodeNinja", "CacheCat", "BitShifter", "RootAccess",
];

// ─── Leaderboard ─────────────────────────────────────────

export function getLeaderboard(): LeaderboardEntry[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(LEADERBOARD_KEY);
    if (!data) {
        const seed: LeaderboardEntry[] = [
            { name: "CyberNinja", game: "CodeQuest", score: 980, level: 3, date: "2026-03-08" },
            { name: "PixelHacker", game: "BugBlaster", score: 920, level: 3, date: "2026-03-08" },
            { name: "ByteRunner", game: "CodeQuest", score: 850, level: 3, date: "2026-03-07" },
            { name: "NeonCoder", game: "BugBlaster", score: 780, level: 2, date: "2026-03-07" },
            { name: "TerminalKid", game: "CodeQuest", score: 720, level: 2, date: "2026-03-06" },
            { name: "GlitchDev", game: "BugBlaster", score: 650, level: 2, date: "2026-03-06" },
            { name: "MatrixBot", game: "CodeQuest", score: 600, level: 1, date: "2026-03-05" },
            { name: "DataPunk", game: "BugBlaster", score: 550, level: 1, date: "2026-03-05" },
        ];
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(seed));
        return seed;
    }
    return JSON.parse(data);
}

export function addLeaderboardEntry(entry: LeaderboardEntry) {
    const board = getLeaderboard();
    board.push(entry);
    board.sort((a, b) => b.score - a.score);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board.slice(0, 50)));
}

export function addFakeLeaderboardEntry() {
    const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    const games = ["CodeQuest", "BugBlaster"];
    const game = games[Math.floor(Math.random() * games.length)];
    const score = Math.floor(Math.random() * 500) + 200;
    const level = Math.floor(Math.random() * 3) + 1;
    const today = new Date().toISOString().split("T")[0];
    addLeaderboardEntry({ name, game, score, level, date: today });
}

// ─── Game Progress ───────────────────────────────────────

function defaultDiffProgress() {
    return { currentLevel: 0, completed: false, bestScore: 0 };
}

export function getProgress(): GameProgress {
    if (typeof window === "undefined")
        return {
            codequest: { beginner: defaultDiffProgress(), intermediate: defaultDiffProgress(), pro: defaultDiffProgress() },
            bugblaster: { beginner: defaultDiffProgress(), intermediate: defaultDiffProgress(), pro: defaultDiffProgress() },
        };
    const data = localStorage.getItem(PROGRESS_KEY);
    if (!data) {
        const initial: GameProgress = {
            codequest: { beginner: defaultDiffProgress(), intermediate: defaultDiffProgress(), pro: defaultDiffProgress() },
            bugblaster: { beginner: defaultDiffProgress(), intermediate: defaultDiffProgress(), pro: defaultDiffProgress() },
        };
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(initial));
        return initial;
    }
    return JSON.parse(data);
}

export function updateProgress(game: "codequest" | "bugblaster", difficulty: string, level: number, score: number) {
    const progress = getProgress();
    if (!progress[game][difficulty]) {
        progress[game][difficulty] = defaultDiffProgress();
    }
    const g = progress[game][difficulty];
    g.currentLevel = Math.max(g.currentLevel, level);
    g.bestScore = Math.max(g.bestScore, score);
    if (level >= 3) g.completed = true;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

// ─── Daily games played ──────────────────────────────────

export function getGamesPlayedToday(): number {
    if (typeof window === "undefined") return 0;
    const today = new Date().toISOString().split("T")[0];
    const data = localStorage.getItem(GAMES_PLAYED_KEY);
    if (!data) return 0;
    const parsed = JSON.parse(data);
    return parsed.date === today ? parsed.count : 0;
}

export function incrementGamesPlayed() {
    const today = new Date().toISOString().split("T")[0];
    const data = localStorage.getItem(GAMES_PLAYED_KEY);
    let count = 1;
    if (data) {
        const parsed = JSON.parse(data);
        count = parsed.date === today ? parsed.count + 1 : 1;
    }
    localStorage.setItem(GAMES_PLAYED_KEY, JSON.stringify({ date: today, count }));
}

// ─── Connect state ───────────────────────────────────────

export function getConnectState(): ConnectState {
    if (typeof window === "undefined")
        return {
            github: { connected: false, username: "" },
            linkedin: { connected: false, username: "" },
            twitter: { connected: false, username: "" },
        };
    const data = localStorage.getItem(CONNECT_KEY);
    if (!data) {
        return {
            github: { connected: false, username: "" },
            linkedin: { connected: false, username: "" },
            twitter: { connected: false, username: "" },
        };
    }
    return JSON.parse(data);
}

export function setConnected(platform: "github" | "linkedin" | "twitter", username: string) {
    const state = getConnectState();
    state[platform] = { connected: true, username };
    localStorage.setItem(CONNECT_KEY, JSON.stringify(state));
}

// ─── Live activity feed ──────────────────────────────────

const activities = [
    "just completed Level 3 in CodeQuest",
    "fixed all bugs in BugBlaster",
    "reached the Pro difficulty",
    "scored 950 points in CodeQuest",
    "joined the leaderboard top 10",
    "completed all beginner levels",
    "earned the Speed Coder badge",
    "unlocked Intermediate mode",
    "finished BugBlaster in 2 mins",
    "solved the palindrome challenge",
];

export function getRandomActivity(): string {
    const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    const activity = activities[Math.floor(Math.random() * activities.length)];
    return `${name} ${activity}`;
}

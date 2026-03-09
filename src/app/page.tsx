"use client";

import TopBar from "@/components/portfolio/TopBar";
import LeftSidebar from "@/components/portfolio/LeftSidebar";
import RightSidebar from "@/components/portfolio/RightSidebar";
import GameCard from "@/components/portfolio/GameCard";
import TechnicalArsenal from "@/components/portfolio/TechnicalArsenal";
import TechCard from "@/components/portfolio/TechCard";
import AIGameCreatorModal from "@/components/portfolio/AIGameCreatorModal";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FileCode, Braces, FileType, Globe, Palette, Blocks,
  Hash, Triangle, Waves, Film, Database, Smartphone,
  PenTool, Target, Sparkles, ChevronRight,
} from "lucide-react";

const featuredGames = [
  {
    title: "CODEQUEST: ESCAPE THE MAZE",
    badge: "PYTHON / JS",
    description:
      "Guide your robot through mazes by writing real code — learn loops, conditionals & functions while having fun. Features 3 difficulty levels with real-time code execution.",
    tags: ["JAVASCRIPT", "BEGINNER", "MAZE", "3 LEVELS"],
    playLink: "/play/codequest",
    difficulty: "Beginner" as const,
  },
  {
    title: "BUGBLASTER: FIX THE CODE",
    badge: "DEBUGGING",
    description:
      "Spot & fix bugs in broken programs to defeat space invaders — perfect for understanding errors & logic. Covers syntax errors, logic bugs, and edge cases.",
    tags: ["DEBUGGING", "JS", "FUN", "ALL-AGES"],
    playLink: "/play/bugblaster",
    difficulty: "Beginner" as const,
  },
];

const comingSoonGames = [
  {
    title: "TYPERACER: SPEED CODE",
    badge: "COMING SOON",
    description:
      "Race against time to type out code snippets as fast as possible. Improve your typing speed and accuracy while learning programming syntax.",
    tags: ["TYPING", "SPEED", "ALL-LANGUAGES"],
    difficulty: "Intermediate" as const,
  },
  {
    title: "ALGO ARENA: BATTLE BOTS",
    badge: "COMING SOON",
    description:
      "Write algorithms to control battle bots in a real-time arena. Compete against other players' bots and climb the global rankings.",
    tags: ["ALGORITHMS", "PVP", "STRATEGY"],
    difficulty: "Pro" as const,
  },
  {
    title: "CSS PAINTER: PIXEL ART",
    badge: "COMING SOON",
    description:
      "Recreate pixel art masterpieces using only CSS properties. Learn selectors, flexbox, grid, and animations through creative challenges.",
    tags: ["CSS", "ART", "CREATIVE", "VISUAL"],
    difficulty: "Beginner" as const,
  },
];

const iconSize = 12;
const iconStroke = 1.5;

const languageItems = [
  { icon: <FileCode size={iconSize} strokeWidth={iconStroke} />, name: "C" },
  { icon: <Braces size={iconSize} strokeWidth={iconStroke} />, name: "C++" },
  { icon: <Target size={iconSize} strokeWidth={iconStroke} />, name: "Java" },
  { icon: <FileCode size={iconSize} strokeWidth={iconStroke} />, name: "Python" },
  { icon: <Braces size={iconSize} strokeWidth={iconStroke} />, name: "JavaScript" },
  { icon: <FileType size={iconSize} strokeWidth={iconStroke} />, name: "TypeScript" },
  { icon: <Blocks size={iconSize} strokeWidth={iconStroke} />, name: "Scratch Blocks" },
  { icon: <Globe size={iconSize} strokeWidth={iconStroke} />, name: "HTML" },
  { icon: <Palette size={iconSize} strokeWidth={iconStroke} />, name: "CSS" },
];

const toolsItems = [
  { icon: <Hash size={iconSize} strokeWidth={iconStroke} />, name: "React.js" },
  { icon: <Triangle size={iconSize} strokeWidth={iconStroke} />, name: "Next.js" },
  { icon: <Waves size={iconSize} strokeWidth={iconStroke} />, name: "Tailwind CSS" },
  { icon: <Film size={iconSize} strokeWidth={iconStroke} />, name: "Framer Motion" },
  { icon: <Database size={iconSize} strokeWidth={iconStroke} />, name: "Supabase" },
  { icon: <Smartphone size={iconSize} strokeWidth={iconStroke} />, name: "Expo" },
  { icon: <PenTool size={iconSize} strokeWidth={iconStroke} />, name: "CodeMirror" },
  { icon: <Hash size={iconSize} strokeWidth={iconStroke} />, name: "ShadCN-UI" },
];

export default function Home() {
  const [gameCount, setGameCount] = useState(42);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    // Slowly increase game count in real-time
    const interval = setInterval(() => {
      setGameCount((prev) => prev + 1);
    }, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-grid">
      <TopBar />
      <LeftSidebar />
      <RightSidebar />

      <main className="pt-[49px] lg:ml-[160px] xl:mr-[190px]">
        {/* ──── Technical Arsenal (TOP) ──── */}
        <TechnicalArsenal />

        <AIGameCreatorModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />

        {/* ──── Featured Game Cards ──── */}
        <section className="p-4 pt-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-1 rounded-full bg-[#22c55e]" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#525252] uppercase">
              FEATURED GAMES
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredGames.map((game, index) => (
              <GameCard
                key={game.title}
                title={game.title}
                badge={game.badge}
                description={game.description}
                tags={game.tags}
                playLink={game.playLink}
                index={index}
                difficulty={game.difficulty}
              />
            ))}
          </div>
        </section>

        <div className="mx-4 border-t border-[#1e1e1e]" />

        {/* ──── More Games (Coming Soon) ──── */}
        <section className="p-4 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-1 rounded-full bg-[#525252]" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#525252] uppercase">
              MORE GAMES
            </span>
            <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-widest text-[#525252] border border-[#1e1e1e] bg-[#0a0a0a] uppercase ml-1">
              COMING SOON
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comingSoonGames.map((game, index) => (
              <GameCard
                key={game.title}
                title={game.title}
                badge={game.badge}
                description={game.description}
                tags={game.tags}
                index={index + 2}
                disabled={true}
                difficulty={game.difficulty}
              />
            ))}
          </div>
        </section>

        <div className="mx-4 border-t border-[#1e1e1e]" />

        {/* ──── Tech Stack Cards ──── */}
        <section className="px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TechCard title="LANGUAGES IN OUR GAMES" items={languageItems} index={0} />
            <TechCard title="TOOLS & TECH WE USE" items={toolsItems} index={1} />
          </div>
        </section>

        <div className="mx-4 border-t border-[#1e1e1e]" />

        {/* ──── AI Game Lab (BOTTOM) ──── */}
        <section className="px-4 py-6">
          <div className="rounded-lg border border-[#1e1e1e] bg-[#111111] p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e]/5 via-transparent to-[#22c55e]/5 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[10px] font-mono font-semibold tracking-[0.3em] text-[#22c55e] uppercase mb-2"
                style={{ textShadow: "0 0 20px rgba(34,197,94,0.5)" }}>
                {"// AI_GAME_LAB [COMING SOON]"}
              </p>
              <h3 className="text-[22px] text-[#e5e5e5] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="italic">Create Your Own</span>{" "}
                <span className="font-bold">Game with AI.</span>
              </h3>
              <p className="text-[11px] text-[#737373] leading-[1.8] mb-4 max-w-lg">
                Describe any coding challenge in plain English and our AI will instantly build a full game with test cases, hints, and a solution.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(34,197,94,0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAiModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[11px] font-bold tracking-wider text-[#22c55e] uppercase transition-all cursor-pointer"
              >
                <Sparkles size={14} /> LAUNCH AI GAME CREATOR <ChevronRight size={14} />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Live game counter (BOTTOM) */}
        <div className="mx-4 border-t border-[#1e1e1e]" />
        <div className="mx-4 py-6 pb-10 flex items-center justify-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" />
          </span>
          <motion.span
            key={gameCount}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-mono tracking-wider text-[#525252] uppercase"
          >
            {gameCount} GAMES AVAILABLE
          </motion.span>
        </div>
      </main>
    </div>
  );
}

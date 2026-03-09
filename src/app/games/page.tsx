"use client";

import TopBar from "@/components/portfolio/TopBar";
import LeftSidebar from "@/components/portfolio/LeftSidebar";
import RightSidebar from "@/components/portfolio/RightSidebar";
import PageWrapper from "@/components/portfolio/PageWrapper";
import GameCard from "@/components/portfolio/GameCard";
import { allGames } from "@/lib/gameData";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";

export default function GamesPage() {
    const { user, setShowLogin, setLoginMessage } = useAuth();

    // Protect: if no user, prompt login
    useEffect(() => {
        if (!user) {
            setLoginMessage("Login or play as Guest to start coding");
            setShowLogin(true);
        }
    }, [user, setShowLogin, setLoginMessage]);

    return (
        <>
            <TopBar />
            <LeftSidebar />
            <RightSidebar />
            <PageWrapper
                title="Game Library"
                subtitle="Choose a coding game and start playing. Each game teaches real programming concepts through fun, interactive challenges."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {allGames.map((game, index) => (
                        <GameCard
                            key={game.slug}
                            title={game.title}
                            badge={game.badge}
                            description={game.description}
                            tags={game.tags}
                            playLink={`/play/${game.slug}`}
                            index={index}
                            disabled={!game.playable}
                            difficulty={game.difficulty}
                        />
                    ))}
                </div>
            </PageWrapper>
        </>
    );
}

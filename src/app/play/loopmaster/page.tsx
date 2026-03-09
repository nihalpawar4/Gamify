"use client";
import TopBar from "@/components/portfolio/TopBar";
import LeftSidebar from "@/components/portfolio/LeftSidebar";
import RightSidebar from "@/components/portfolio/RightSidebar";
import TerminalGame from "@/components/portfolio/TerminalGame";

export default function LoopMasterPage() {
    return (
        <>
            <TopBar />
            <LeftSidebar />
            <RightSidebar />
            <TerminalGame gameSlug="codequest" gameTitle="LOOPMASTER: ITERATE & CONQUER" mode="write" />
        </>
    );
}

"use client";

import { AuthProvider } from "@/lib/auth-context";
import LoginModal from "@/components/portfolio/LoginModal";
import LoadingScreen from "@/components/portfolio/LoadingScreen";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <LoadingScreen />
            {children}
            <LoginModal />
        </AuthProvider>
    );
}

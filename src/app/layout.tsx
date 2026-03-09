import type { Metadata } from "next";
import "./globals.css";
import { AuthWrapper } from "./auth-wrapper";

export const metadata: Metadata = {
  title: "Techno Games | Learn to Code Through Play",
  description: "Fun, simple coding games to learn programming through play. Master Python, JavaScript & more with 50+ interactive challenges.",
  keywords: ["coding games", "learn to code", "programming", "Python", "JavaScript", "kids coding", "beginner programming"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] overflow-x-hidden">
        <AuthWrapper>
          <div className="min-h-screen bg-[#0a0a0a] bg-grid">
            {children}
          </div>
        </AuthWrapper>
      </body>
    </html>
  );
}

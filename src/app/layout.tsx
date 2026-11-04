import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatWidget } from "@/components/ui/FloatingChatWidget";
import { SecretAdminModal } from "@/components/admin/SecretAdminModal";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "javohir.engineer · Software Engineer",
  description:
    "I'm Javohir Sadullayev — a .NET backend developer and AI product builder. I build high-concurrency systems, design event-driven architectures, and train speech assessment models.",
  keywords: [
    ".NET",
    "ASP.NET Core",
    "C#",
    "Backend Developer",
    "PostgreSQL",
    "Redis",
    "SignalR",
    "Azure Speech",
    "Javohir Sadullayev",
    "javohir.engineer",
  ],
  authors: [{ name: "Javohir Sadullayev" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-ink antialiased selection:bg-yellow selection:text-ink">
        <LanguageProvider>
          <ScrollProgressBar />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingChatWidget />
          <SecretAdminModal />
          <CustomCursor />
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { TypingWarHeader } from "@/components/projects/typingwar/TypingWarHeader";
import { TypingWarBand } from "@/components/projects/typingwar/TypingWarBand";
import { TypingWarOverview } from "@/components/projects/typingwar/TypingWarOverview";
import { TypingWarBuilt } from "@/components/projects/typingwar/TypingWarBuilt";
import { TypingWarResults } from "@/components/projects/typingwar/TypingWarResults";
import { TypingWarNav } from "@/components/projects/typingwar/TypingWarNav";

export const metadata: Metadata = {
  title: "TypingWar · Real-Time Duel Engine · Javohir Sadullayev",
  description:
    "TypingWar real-time multiplayer duel engine engineered by Javohir Sadullayev. Built with .NET 8, SignalR Core, Redis Pub/Sub, and cadence anti-cheat verification under sub-50ms latency.",
  alternates: {
    canonical: "/projects/typingwar",
  },
};

export default function TypingWarPage() {
  return (
    <article className="flex flex-col w-full bg-cream">
      <TypingWarHeader />
      <TypingWarBand />
      <TypingWarOverview />
      <TypingWarBuilt />
      <TypingWarResults />
      <TypingWarNav />
    </article>
  );
}

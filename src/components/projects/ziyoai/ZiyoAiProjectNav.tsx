import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ZiyoAiProjectNav() {
  return (
    <nav
      aria-label="Project Navigation"
      className="w-full bg-yellow border-b-2 border-ink py-5 px-6 lg:px-14"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Prev Link: All projects */}
        <Link
          href="/projects"
          className="group flex items-center gap-2 text-ink hover:opacity-80 transition font-sans font-semibold text-xs sm:text-[12.5px]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-ink group-hover:-translate-x-1 transition-transform" />
          <span>All projects</span>
        </Link>

        {/* Next Link: Next: TypingWar */}
        <Link
          href="/projects/typingwar"
          className="group flex items-center gap-2 text-ink hover:opacity-80 transition font-display font-semibold text-sm sm:text-base tracking-[-0.3px]"
        >
          <span>Next: TypingWar</span>
          <ArrowRight className="w-4 h-4 text-ink group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}

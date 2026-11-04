import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function TypingWarNav() {
  return (
    <nav
      aria-label="Project Navigation"
      className="w-full bg-yellow border-b-2 border-ink"
    >
      <div className="max-w-7xl mx-auto py-5 px-6 lg:px-14 flex items-center justify-between">
        {/* Previous: All projects */}
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-ink font-sans text-[13px] font-semibold hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5] group-hover:-translate-x-1 transition-transform" />
          <span>All projects</span>
        </Link>

        {/* Next: MeningVaqtim */}
        <Link
          href="/projects/meningvaqtim"
          className="group inline-flex items-center gap-2 text-ink font-display text-base font-semibold tracking-[-0.3px] hover:opacity-80 transition-opacity"
        >
          <span>Next: MeningVaqtim</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}

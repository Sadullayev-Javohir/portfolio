import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-ink">
      <div className="flex flex-col gap-2 max-w-2xl">
        <span className="font-mono text-[11px] font-medium tracking-[1.6px] text-muted uppercase">
          {eyebrow}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-bold text-ink tracking-tight leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-muted text-sm sm:text-[15px] leading-relaxed pt-1">
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-ink bg-cream hover:bg-yellow shadow-solid-sm hover:shadow-solid transition-all text-xs sm:text-sm font-semibold text-ink whitespace-nowrap self-start md:self-end"
        >
          <span>{action.label}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

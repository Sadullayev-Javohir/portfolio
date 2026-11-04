"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_KEYS: { key: "home" | "about" | "projects" | "experience" | "skills" | "blog" | "resume"; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "experience", href: "/experience" },
  { key: "skills", href: "/skills" },
  { key: "blog", href: "/blog" },
  { key: "resume", href: "/resume" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dict, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-cream border-b-2 border-ink">
      <div className="max-w-[1440px] mx-auto h-[76px] px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="javohir.engineer">
          <div className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] rounded-xl overflow-hidden border-2 border-ink bg-ink shadow-solid-sm group-hover:scale-105 group-hover:rotate-2 group-hover:shadow-solid transition-all duration-200 flex items-center justify-center shrink-0">
            <Image
              src="/logo.svg"
              alt="javohir.engineer logo"
              width={44}
              height={44}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[14.5px] sm:text-[15.5px] font-bold tracking-tight text-ink group-hover:text-ink/80 transition-colors leading-tight">
              javohir<span className="text-coral">.engineer</span>
            </span>
            <span className="font-mono text-[8.5px] uppercase tracking-[1.4px] text-muted font-medium">
              {dict.nav.roleTag}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_KEYS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-ink text-cream shadow-solid-sm"
                    : "text-ink hover:bg-black/5 hover:-translate-y-0.5"
                }`}
              >
                {dict.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button & Language Switcher & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <Link
            href="/contact"
            className="group hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-yellow border-2 border-ink shadow-solid hover:shadow-[5px_5px_0px_#14110F] hover:-translate-y-0.5 active:translate-y-0 active:shadow-solid-sm transition-all text-[12.5px] sm:text-[13px] font-semibold text-ink shrink-0"
          >
            <span>{dict.nav.getInTouch}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-lg border-2 border-ink bg-cream shadow-solid-sm active:translate-y-0.5 text-ink cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[76px] bg-cream border-b-2 border-ink p-5 sm:p-6 shadow-solid-lg z-50 flex flex-col gap-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2">
            {NAV_KEYS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-base font-semibold border-2 transition-all ${
                    isActive
                      ? "bg-yellow border-ink shadow-solid-sm text-ink"
                      : "border-transparent text-ink hover:bg-black/5"
                  }`}
                >
                  {dict.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-ink/20 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-yellow border-2 border-ink shadow-solid text-sm font-bold text-ink hover:bg-yellow-hover transition-colors"
            >
              <span>{dict.nav.getInTouch}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center justify-around py-2 text-xs font-mono text-muted">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink font-semibold"
              >
                GitHub ↗
              </a>
              <span>·</span>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink font-semibold"
              >
                LinkedIn ↗
              </a>
              <span>·</span>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink font-semibold"
              >
                Telegram ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

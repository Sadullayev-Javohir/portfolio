"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { TelegramIcon } from "@/components/ui/icons/TelegramIcon";
import { SOCIAL_LINKS } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { dict } = useLanguage();

  const handleSecretTap = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      window.dispatchEvent(new CustomEvent("open-secret-admin"));
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 2500);
    }
  };
  return (
    <footer className="w-full bg-ink text-cream border-t-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-16 flex flex-col gap-11">
        {/* Footer Top */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Footer Copy */}
          <div className="max-w-xl flex flex-col gap-5">
            <span className="font-mono text-[11px] text-coral tracking-[1.6px] uppercase font-medium">
              ✳ SAY HELLO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-cream tracking-tight leading-[1.05]">
              Got a backend problem worth solving?
            </h2>
            <p className="text-[#B9B0A4] text-sm sm:text-[15px] leading-relaxed max-w-lg">
              {dict.footer.tagline}
            </p>

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="mailto:javohirsadullayev836@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-yellow border-2 border-yellow text-ink font-semibold text-[13.5px] hover:bg-yellow-hover hover:scale-105 transition-all shadow-sm"
              >
                <Mail className="w-4 h-4 text-ink" />
                <span>javohirsadullayev836@gmail.com</span>
              </a>
              <a
                href="tel:+998886036644"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full border-2 border-[#4A4440] text-cream hover:border-cream/50 transition-colors text-[13px] font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-cream" />
                <span>+998 88 603 66 44</span>
              </a>
            </div>
          </div>

          {/* Footer Navigation Columns */}
          <div className="flex gap-16 sm:gap-24">
            {/* Sitemap Column */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9.5px] tracking-[1.6px] text-[#8F8678] uppercase font-medium">
                {dict.footer.pagesLabel}
              </span>
              <ul className="flex flex-col gap-2 text-sm text-cream font-normal">
                <li><Link href="/" className="hover:text-yellow transition-colors">{dict.nav.home}</Link></li>
                <li><Link href="/about" className="hover:text-yellow transition-colors">{dict.nav.about}</Link></li>
                <li><Link href="/projects" className="hover:text-yellow transition-colors">{dict.nav.projects}</Link></li>
                <li><Link href="/experience" className="hover:text-yellow transition-colors">{dict.nav.experience}</Link></li>
                <li><Link href="/skills" className="hover:text-yellow transition-colors">{dict.nav.skills}</Link></li>
                <li><Link href="/blog" className="hover:text-yellow transition-colors">{dict.nav.blog}</Link></li>
                <li><Link href="/resume" className="hover:text-yellow transition-colors">{dict.nav.resume}</Link></li>
              </ul>
            </div>

            {/* Elsewhere Column */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9.5px] tracking-[1.6px] text-[#8F8678] uppercase font-medium">
                ELSEWHERE
              </span>
              <ul className="flex flex-col gap-2.5 text-sm text-cream font-normal">
                <li>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-yellow transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub ↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-yellow transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn ↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.email}
                    className="inline-flex items-center gap-2 hover:text-yellow transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email ↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-yellow transition-colors"
                  >
                    <TelegramIcon className="w-3.5 h-3.5" />
                    <span>Telegram ↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Separator Rule */}
        <div className="w-full h-[1px] bg-[#3A342E]" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] font-mono">
          <p
            onClick={handleSecretTap}
            className="text-[#8F8678] tracking-[0.3px] select-none cursor-default active:opacity-90"
            title=""
          >
            © 2026 Javohir Sadullayev · {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-yellow tracking-[0.3px] font-semibold hover:text-yellow-hover transition-colors group"
            >
              <div className="w-5 h-5 rounded-md overflow-hidden border border-cream/20 bg-cream/10 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="javohir.engineer logo"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>javohir<span className="text-coral">.engineer</span></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

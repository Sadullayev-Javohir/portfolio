"use client";

import React from "react";
import { Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function DownloadNote() {
  const { dict, language } = useLanguage();
  const pdfPath =
    language === "uz"
      ? "/assets/resume-uz.pdf"
      : language === "ru"
      ? "/assets/resume-ru.pdf"
      : "/assets/resume-en.pdf";

  const fileName = `Javohir-Sadullayev-Resume-${language.toUpperCase()}.pdf`;

  return (
    <section className="w-full px-6 sm:px-10 lg:px-14 pb-14 print:hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-line/60">
        {/* Copy */}
        <div className="flex flex-col gap-1 max-w-[700px]">
          <h4 className="font-display text-[16px] sm:text-[17px] font-semibold text-ink tracking-[-0.3px]">
            {dict.resumePage.preferPdfTitle}
          </h4>
          <p className="font-mono text-[8px] sm:text-[8.5px] text-muted leading-relaxed">
            {dict.resumePage.preferPdfDesc} Files: /assets/resume-en.pdf · resume-uz.pdf · resume-ru.pdf
          </p>
        </div>

        {/* Button */}
        <a
          href={pdfPath}
          download={fileName}
          className="px-[18px] py-[11px] rounded-full border-2 border-ink bg-ink text-cream text-[13px] font-semibold font-sans flex items-center gap-2 shadow-[3px_3px_0px_rgba(20,17,15,0.3)] hover:bg-ink-soft hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0 cursor-pointer"
        >
          <span>{dict.resumePage.downloadPdfBtn}</span>
          <Download className="w-3.5 h-3.5 text-cream" />
        </a>
      </div>
    </section>
  );
}

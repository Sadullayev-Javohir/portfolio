"use client";

import React, { useState } from "react";
import { CircleAlert, CircleCheck, Clock, MessageSquare, Send, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/portfolioData";

const SUGGESTED_TOPICS = [
  "⚡ Backend & Architecture",
  "🤖 AI & Speech Systems",
  "🚀 Redis & Caching",
  "💼 Job / Collaboration",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Field validation touched states
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = !email || emailRegex.test(email.trim());
  const showEmailError = touched.email && (!email.trim() || !isEmailValid);
  const showNameError = touched.name && name.trim().length < 2;
  const showMessageError = touched.message && message.trim().length < 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Mark all fields touched
    setTouched({ name: true, email: true, message: true, subject: true });

    // Validate
    if (name.trim().length < 2) {
      setErrorMessage("Iltimos, ismingizni kiriting (kamida 2 ta belgi).");
      return;
    }
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Iltimos, to'g'ri email manzilini kiriting.");
      return;
    }
    if (message.trim().length < 5) {
      setErrorMessage("Iltimos, xabar matnini kiriting (kamida 5 ta belgi).");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setIsSuccess(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setTouched({});
      } else {
        setErrorMessage(data.error || "Xabar yuborishda xatolik yuz berdi.");
      }
    } catch {
      setErrorMessage("Server bilan aloqa uzildi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setTouched({});
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-[22px]">
      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border-2 border-ink rounded-[22px] p-6 sm:p-[28px_30px] shadow-[8px_8px_0px_#14110F] flex flex-col gap-[18px]"
      >
        {/* Form Head */}
        <div className="w-full flex items-center justify-between pb-2 border-b border-line/40">
          <div className="flex flex-col gap-[3px]">
            <h2 className="font-display text-[22px] font-bold tracking-[-0.6px] text-ink">
              Send a message
            </h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.4px] text-muted">
              Direct inbox · All fields verified
            </span>
          </div>

          <div className="px-[10px] py-[4px] rounded-full bg-mint/25 border-[1.5px] border-ink flex items-center gap-1.5 shadow-solid-sm">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span className="font-mono text-[8.5px] uppercase tracking-[0.5px] text-ink font-bold">
              ONLINE · DIRECT INBOX
            </span>
          </div>
        </div>

        {/* Success Screen Banner */}
        {isSuccess ? (
          <div className="w-full bg-mint/20 border-2 border-mint rounded-[18px] p-6 flex flex-col items-center text-center gap-4 animate-fade-in my-2">
            <div className="w-12 h-12 rounded-full bg-mint border-2 border-ink shadow-solid-sm flex items-center justify-center">
              <CircleCheck className="w-6 h-6 text-ink" />
            </div>

            <div className="flex flex-col gap-1 max-w-[480px]">
              <h3 className="font-display text-[18px] font-bold text-ink">
                Xabaringiz muvaffaqiyatli yuborildi!
              </h3>
              <p className="font-sans text-[13px] leading-relaxed text-ink/80">
                Rahmat! Xabaringiz qabul qilindi. Tez orada ko&apos;rsatilgan email manzilingiz orqali javob qaytaraman.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-white hover:bg-cream border-2 border-ink font-mono text-xs font-bold text-ink shadow-solid-sm active:scale-95 transition-all cursor-pointer"
              >
                Yana xabar yuborish
              </button>

              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-yellow hover:bg-yellow-hover border-2 border-ink font-mono text-xs font-bold text-ink shadow-solid-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Telegram&apos;da yozish</span>
                <span className="font-sans">↗</span>
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Error Banner if error occurred */}
            {errorMessage && (
              <div className="w-full bg-peach border-2 border-coral rounded-[12px] p-3.5 flex items-center gap-2.5 animate-fade-in">
                <CircleAlert className="w-4 h-4 text-coral shrink-0" />
                <span className="font-sans text-[12px] font-medium text-ink">
                  {errorMessage}
                </span>
              </div>
            )}

            {/* Field Row: Name & Email */}
            <div className="w-full flex flex-col sm:flex-row gap-[14px]">
              {/* Name Field */}
              <div className="flex-1 flex flex-col gap-[6px]">
                <div className="w-full flex justify-between items-start">
                  <label
                    htmlFor="name"
                    className={`font-mono text-[8.5px] uppercase tracking-[1.2px] font-medium ${
                      showNameError ? "text-coral font-bold" : "text-muted"
                    }`}
                  >
                    NAME *
                  </label>
                </div>
                <div className="relative w-full">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Ismingiz yoki kompaniya nomi"
                    className={`w-full h-[44px] px-[13px] py-[11px] rounded-[10px] font-sans text-[12.5px] text-ink outline-none transition-colors placeholder:text-muted/60 ${
                      showNameError
                        ? "bg-[#FDF8F1] border-2 border-coral"
                        : "bg-[#FDF8F1] border-[1.5px] border-line focus:border-ink focus:bg-white"
                    }`}
                  />
                </div>
                {showNameError && (
                  <div className="flex items-center gap-[6px] pt-0.5">
                    <CircleAlert className="w-[11px] h-[11px] text-coral shrink-0" />
                    <span className="font-sans text-[10.5px] text-coral font-medium">
                      Ismingizni kiriting (kamida 2 ta harf).
                    </span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="flex-1 flex flex-col gap-[6px]">
                <div className="w-full flex justify-between items-start">
                  <label
                    htmlFor="email"
                    className={`font-mono text-[8.5px] uppercase tracking-[1.2px] font-medium ${
                      showEmailError ? "text-coral font-bold" : "text-muted"
                    }`}
                  >
                    EMAIL *
                  </label>
                </div>
                <div className="w-full">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="sizning.email@misol.uz"
                    className={`w-full h-[44px] px-[13px] py-[11px] rounded-[10px] font-sans text-[12.5px] outline-none transition-colors placeholder:text-muted/60 ${
                      showEmailError
                        ? "bg-[#FDF8F1] border-2 border-coral text-ink"
                        : "bg-[#FDF8F1] border-[1.5px] border-line focus:border-ink focus:bg-white text-ink"
                    }`}
                  />
                </div>
                {showEmailError && (
                  <div className="flex items-center gap-[6px] pt-0.5">
                    <CircleAlert className="w-[11px] h-[11px] text-coral shrink-0" />
                    <span className="font-sans text-[10.5px] text-coral font-medium">
                      Haqiqiy email manzilini kiriting (masalan: siz@gmail.com).
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Subject Field & Suggested Topics */}
            <div className="w-full flex flex-col gap-[6px]">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="subject"
                  className="font-mono text-[8.5px] uppercase tracking-[1.2px] text-muted font-medium"
                >
                  SUBJECT (MAVZU)
                </label>
                <span className="font-mono text-[8px] text-muted">
                  Ixtiyoriy yoki tezkor tanlang
                </span>
              </div>

              <input
                id="subject"
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Backend / AI / hamkorlik yoki maslahat"
                className="w-full h-[44px] px-[13px] py-[11px] rounded-[10px] bg-[#FDF8F1] border-[1.5px] border-line focus:border-ink focus:bg-white font-sans text-[12.5px] text-ink outline-none transition-colors placeholder:text-muted/60"
              />

              {/* Quick Topic Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTED_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSubject(topic.replace(/^[^\s]+\s*/, ""))}
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-mono font-medium border transition-all cursor-pointer ${
                      subject.includes(topic.replace(/^[^\s]+\s*/, ""))
                        ? "bg-yellow border-ink text-ink shadow-solid-sm"
                        : "bg-cream/50 border-ink/20 text-ink-soft hover:border-ink hover:bg-cream"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Field */}
            <div className="w-full flex flex-col gap-[6px]">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="message"
                  className={`font-mono text-[8.5px] uppercase tracking-[1.2px] font-medium ${
                    showMessageError ? "text-coral font-bold" : "text-muted"
                  }`}
                >
                  MESSAGE (XABAR MATNI) *
                </label>
                <span className="font-mono text-[8.5px] text-muted">
                  {message.length} / 2500
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={2500}
                value={message}
                onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Qanday loyiha yoki masalani hal qilmoqchisiz? Barcha tafsilotlarni yozishingiz mumkin..."
                className={`w-full px-[13px] py-[11px] rounded-[10px] font-sans text-[12.5px] leading-[20px] text-ink outline-none transition-colors placeholder:text-muted/60 resize-none min-h-[120px] ${
                  showMessageError
                    ? "bg-[#FDF8F1] border-2 border-coral"
                    : "bg-[#FDF8F1] border-[1.5px] border-line focus:border-ink focus:bg-white"
                }`}
              />
              {showMessageError && (
                <div className="flex items-center gap-[6px] pt-0.5">
                  <CircleAlert className="w-[11px] h-[11px] text-coral shrink-0" />
                  <span className="font-sans text-[10.5px] text-coral font-medium">
                    Xabar matnini kiriting (kamida 5 ta belgi).
                  </span>
                </div>
              )}
            </div>

            {/* Form Footer */}
            <div className="w-full pt-1 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center">
              <div className="flex items-center gap-[7px]">
                <Clock className="w-[13px] h-[13px] text-muted shrink-0" />
                <span className="font-mono text-[9px] text-muted">
                  Xabaringiz Javohir Sadullayevning pochtasiga to&apos;g&apos;ridan-to&apos;g&apos;ri yetkaziladi.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-full bg-yellow hover:bg-yellow-hover border-2 border-ink shadow-[3px_3px_0px_#14110F] font-sans text-[13.5px] font-semibold text-ink flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Yuborilmoqda..." : "Send message"}</span>
                <Send className={`w-[15px] h-[15px] ${isSubmitting ? "animate-pulse" : ""}`} />
              </button>
            </div>
          </>
        )}
      </form>

      {/* Trust & Guarantee Cards (Replacing old fake prototype preview) */}
      <div className="w-full flex flex-col sm:flex-row gap-[12px] pt-1">
        {/* 1. Fast Response */}
        <div className="flex-1 bg-white rounded-[16px] p-[14px_16px] flex flex-col gap-[6px] border-2 border-ink shadow-solid-sm">
          <div className="w-full flex justify-between items-center">
            <span className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-bold">
              RESPONSE TIME
            </span>
            <Clock className="w-[14px] h-[14px] text-ink" />
          </div>
          <span className="font-display text-[14px] font-bold text-ink">
            ~2–4 soat ichida
          </span>
          <span className="font-sans text-[11px] text-muted leading-tight">
            Ish kunlarida tezkor tahlil va aniq texnik javob.
          </span>
        </div>

        {/* 2. Direct Engineering Contact */}
        <div className="flex-1 bg-white rounded-[16px] p-[14px_16px] flex flex-col gap-[6px] border-2 border-ink shadow-solid-sm">
          <div className="w-full flex justify-between items-center">
            <span className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-bold">
              DIRECT REACH
            </span>
            <UserCheck className="w-[14px] h-[14px] text-ink" />
          </div>
          <span className="font-display text-[14px] font-bold text-ink">
            Dasturchining o&apos;zi
          </span>
          <span className="font-sans text-[11px] text-muted leading-tight">
            O&apos;rtakashlarsiz to&apos;g&apos;ridan-to&apos;g&apos;ri texnik muhokama.
          </span>
        </div>

        {/* 3. Confidentiality */}
        <div className="flex-1 bg-white rounded-[16px] p-[14px_16px] flex flex-col gap-[6px] border-2 border-ink shadow-solid-sm">
          <div className="w-full flex justify-between items-center">
            <span className="font-mono text-[8px] uppercase tracking-[1.2px] text-muted font-bold">
              PRIVACY
            </span>
            <ShieldCheck className="w-[14px] h-[14px] text-ink" />
          </div>
          <span className="font-display text-[14px] font-bold text-ink">
            100% Maxfiy
          </span>
          <span className="font-sans text-[11px] text-muted leading-tight">
            Loyiha g&apos;oyalari va arxitektura ma&apos;lumotlari sir saqlanadi.
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lock, X, Zap, CheckCircle, AlertCircle, ShieldAlert } from "lucide-react";

export function SecretAdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global key combination listener: Ctrl + Alt + A (or Cmd + Alt + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + Alt + A (or Cmd + Option + A on Mac)
      const isModifierActive = (e.ctrlKey || e.metaKey) && e.altKey;
      const isKeyA = e.key === "a" || e.key === "A" || e.code === "KeyA";

      if (isModifierActive && isKeyA) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    // Also support custom event for discreet mobile triggers
    const handleCustomTrigger = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-secret-admin", handleCustomTrigger);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-secret-admin", handleCustomTrigger);
    };
  }, [isOpen]);

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(false);
      setPin("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isLoading) return;
    setIsOpen(false);
    setPin("");
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setSuccess(true);
        // Save session pin for admin dashboard client state
        sessionStorage.setItem("admin_pin", pin.trim());

        // Redirect after brief visual confirmation
        setTimeout(() => {
          window.location.href = "/admin";
        }, 600);
      } else {
        setShake(true);
        setError(data.error || "PIN-kod noto'g'ri.");
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setError("Server bilan aloqa uzildi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm transition-all"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`w-full max-w-sm bg-white border-2 border-ink rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#14110F] relative transition-transform ${
          shake ? "animate-shake" : ""
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors cursor-pointer"
          title="Yopish (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-yellow border-2 border-ink shadow-solid-sm flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-ink" />
          </div>
          <h3 className="font-display font-black text-xl text-ink">
            Admin Kirish
          </h3>
          <p className="text-muted text-xs font-mono mt-1">
            Xavfsizlik PIN-kodini kiriting
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              maxLength={8}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError(null);
              }}
              placeholder="••••"
              disabled={isLoading || success}
              className="w-full px-4 py-3.5 rounded-xl border-2 border-ink bg-cream/30 text-ink font-mono text-center text-2xl tracking-[0.3em] placeholder:tracking-normal focus:outline-none focus:bg-white focus:shadow-solid-sm transition-all"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-2.5 rounded-xl bg-peach border border-coral text-xs font-mono text-ink flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-coral shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-2.5 rounded-xl bg-mint/40 border border-mint text-xs font-mono text-ink flex items-center gap-2 animate-fadeIn">
              <CheckCircle className="w-4 h-4 text-ink shrink-0" />
              <span>Tasdiqlandi! Yo&apos;naltirilmoqda...</span>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading || !pin.trim() || success}
            className="w-full py-3.5 rounded-xl bg-yellow hover:bg-yellow-hover border-2 border-ink font-mono font-bold text-sm text-ink shadow-solid hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span>Tekshirilmoqda...</span>
            ) : success ? (
              <>
                <span>Muvaffaqiyatli</span>
                <CheckCircle className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Kirish</span>
                <Zap className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] font-mono text-muted/70">
            Bekor qilish uchun <kbd className="px-1.5 py-0.5 bg-cream border border-ink/20 rounded text-[10px]">Esc</kbd> bosing
          </p>
        </form>
      </div>
    </div>
  );
}

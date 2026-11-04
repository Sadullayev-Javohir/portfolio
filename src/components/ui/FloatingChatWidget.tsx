"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  Maximize2,
  Minimize2,
  ArrowDown,
  GripHorizontal,
  Square,
} from "lucide-react";
import { usePortfolioChat } from "@/components/chat/usePortfolioChat";
import { ChatMessageContent } from "@/components/chat/ChatMessageContent";
import { useLanguage } from "@/context/LanguageContext";

export function FloatingChatWidget() {
  const { dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

  // Dragging state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatFeedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isUserScrolledUpRef = useRef(false);

  const {
    messages,
    input,
    setInput,
    isLoading,
    activeModel,
    sendMessage,
    clearMessages,
    stopGeneration,
  } = usePortfolioChat();

  // Scroll handler to detect when user manually scrolls up
  const handleScroll = useCallback(() => {
    const el = chatFeedRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isScrolledUp = distanceFromBottom > 50;
    isUserScrolledUpRef.current = isScrolledUp;
    setShowScrollBottomBtn(isScrolledUp);
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = chatFeedRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
    isUserScrolledUpRef.current = false;
    setShowScrollBottomBtn(false);
  }, []);

  // Auto-scroll on new message tokens ONLY if user hasn't scrolled up
  useEffect(() => {
    if (isOpen && !isUserScrolledUpRef.current) {
      scrollToBottom(false);
    }
  }, [messages, isOpen, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    isUserScrolledUpRef.current = false;
    setShowScrollBottomBtn(false);
    sendMessage();
    setTimeout(() => {
      scrollToBottom(true);
      inputRef.current?.focus();
    }, 50);
  };

  // Dragging logic - attached specifically to the drag-handle area
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.mouseX;
    const deltaY = e.clientY - dragStartRef.current.mouseY;

    const newX = dragStartRef.current.startX + deltaX;
    const newY = dragStartRef.current.startY + deltaY;

    const width = chatContainerRef.current?.offsetWidth || 400;
    const height = chatContainerRef.current?.offsetHeight || 550;

    const clampedX = Math.max(10, Math.min(window.innerWidth - width - 10, newX));
    const clampedY = Math.max(10, Math.min(window.innerHeight - height - 10, newY));

    setPosition({ x: clampedX, y: clampedY });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFullscreen) return;
    // Strictly ignore button clicks
    if ((e.target as HTMLElement).closest("button")) return;

    const el = chatContainerRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    const rect = el.getBoundingClientRect();
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: rect.left,
      startY: rect.top,
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Touch drag support for mobile/tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isFullscreen) return;
    if ((e.target as HTMLElement).closest("button")) return;

    const el = chatContainerRef.current;
    if (!el || !e.touches[0]) return;

    const touch = e.touches[0];
    const rect = el.getBoundingClientRect();

    dragStartRef.current = {
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      startX: rect.left,
      startY: rect.top,
    };
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartRef.current.mouseX;
    const deltaY = touch.clientY - dragStartRef.current.mouseY;

    const newX = dragStartRef.current.startX + deltaX;
    const newY = dragStartRef.current.startY + deltaY;

    const width = chatContainerRef.current?.offsetWidth || 400;
    const height = chatContainerRef.current?.offsetHeight || 550;

    const clampedX = Math.max(10, Math.min(window.innerWidth - width - 10, newX));
    const clampedY = Math.max(10, Math.min(window.innerHeight - height - 10, newY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <>
      {/* Expanded Chat Box */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          style={
            isFullscreen
              ? undefined
              : position
              ? { left: `${position.x}px`, top: `${position.y}px`, bottom: "auto", right: "auto" }
              : undefined
          }
          className={`bg-white border-2 border-ink shadow-[8px_8px_0px_#14110F] overflow-hidden flex flex-col z-50 transition-all ${
            isFullscreen
              ? "fixed inset-3 sm:inset-6 w-auto h-auto rounded-3xl"
              : position
              ? "fixed w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl"
              : "fixed bottom-6 right-6 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl"
          }`}
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-cream border-b-2 border-ink flex items-center justify-between select-none">
            {/* Draggable Title Area */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "none" }}
              className={`flex items-center gap-2.5 flex-1 mr-2 py-0.5 ${
                isFullscreen ? "cursor-default" : "cursor-grab active:cursor-grabbing"
              }`}
              title={isFullscreen ? "" : "Oynani siljitish uchun bu yerdan torting"}
            >
              {!isFullscreen && (
                <GripHorizontal className="w-4 h-4 text-muted hidden sm:inline-block opacity-60" />
              )}
              <div className="w-8 h-8 rounded-full bg-yellow border border-ink shadow-solid-sm flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-ink" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-ink leading-tight">
                  {dict.chatWidget.title}
                </h4>
                <p className="text-[10px] font-mono text-emerald-600 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span>Online</span>
                </p>
              </div>
            </div>

            {/* Action Buttons - separate container with direct pointer events */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={clearMessages}
                title="Suhbatni tozalash"
                className="p-1.5 rounded-lg border border-ink bg-white hover:bg-peach text-ink shadow-solid-sm active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? "Kichik oyna" : "To'liq ekran"}
                className="p-1.5 rounded-lg border border-ink bg-white hover:bg-yellow text-ink shadow-solid-sm active:scale-95 transition-all hidden sm:flex items-center justify-center cursor-pointer"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Yopish"
                className="p-1.5 rounded-lg border border-ink bg-white hover:bg-coral hover:text-white text-ink shadow-solid-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div
            ref={chatFeedRef}
            onScroll={handleScroll}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAFAF8] relative"
          >
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              const isLastMessage = index === messages.length - 1;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    isAssistant ? "items-start" : "items-start flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border border-ink shadow-solid-sm flex items-center justify-center shrink-0 ${
                      isAssistant ? "bg-coral text-white" : "bg-ink text-white"
                    }`}
                  >
                    {isAssistant ? (
                      <Bot className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-3 border-2 border-ink text-xs sm:text-sm ${
                      isAssistant
                        ? "bg-white text-ink shadow-solid-sm"
                        : "bg-ink text-cream shadow-solid-sm"
                    }`}
                  >
                    {isAssistant ? (
                      <div>
                        {msg.content ? (
                          <ChatMessageContent
                            content={msg.content}
                            isStreaming={isLoading && isLastMessage}
                          />
                        ) : (
                          <div className="flex items-center gap-1.5 py-1 text-xs font-mono text-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-coral animate-ping" />
                            <span>Javob tayyorlanmoqda...</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed text-cream">
                        {msg.content}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Scroll to bottom button when user scrolls up */}
            {showScrollBottomBtn && (
              <button
                type="button"
                onClick={() => scrollToBottom(true)}
                className="sticky bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-yellow border-2 border-ink text-xs font-mono font-bold text-ink shadow-solid-sm hover:translate-y-0.5 active:scale-95 transition-all flex items-center gap-1.5 animate-bounce z-10 cursor-pointer"
              >
                <span>Pastga tushish</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t-2 border-ink flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              id="chat-input"
              name="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "..." : dict.chatWidget.placeholder}
              disabled={isLoading}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 px-3 py-2 rounded-xl border-2 border-ink bg-cream/30 text-ink text-xs sm:text-sm font-sans placeholder:text-muted focus:outline-none focus:bg-white focus:shadow-solid-sm transition-all disabled:opacity-60"
            />

            {isLoading ? (
              <button
                type="button"
                onClick={stopGeneration}
                title="Javobni to'xtatish"
                className="px-3 py-2 rounded-xl bg-coral hover:bg-coral/90 border-2 border-ink text-white font-mono text-xs font-bold shadow-solid-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">To&apos;xtatish</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                title="Yuborish"
                className="p-2.5 rounded-xl bg-yellow hover:bg-yellow-hover border-2 border-ink text-ink shadow-solid-sm disabled:opacity-50 shrink-0 hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      )}

      {/* Floating Launcher Button - only visible when chat is closed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative px-4 py-3.5 rounded-full bg-yellow hover:bg-yellow-hover border-2 border-ink shadow-[4px_4px_0px_#14110F] hover:shadow-[6px_6px_0px_#14110F] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-solid-sm transition-all flex items-center gap-2.5 cursor-pointer select-none"
            title="Javohir AI bilan suhbat"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-coral"></span>
            </span>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-ink group-hover:rotate-12 transition-transform duration-200" />
              <span className="font-display font-bold text-xs sm:text-sm text-ink tracking-wide">
                AI Chat
              </span>
            </div>
          </button>
        </div>
      )}
    </>
  );
}

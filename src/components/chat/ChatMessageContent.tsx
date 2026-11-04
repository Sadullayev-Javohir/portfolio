import React from "react";

interface ChatMessageContentProps {
  content: string;
  isStreaming?: boolean;
}

/**
 * Pre-processes markdown to handle streaming artifacts and empty asterisks.
 */
function sanitizeStreamingMarkdown(raw: string): string {
  if (!raw) return "";

  // 1. Remove empty bold artifacts like ** ** or ****
  let text = raw.replace(/\*\*\s*\*\*/g, "");

  // 2. If there's a dangling trailing ** at the very end of stream, temporarily hide it
  if (text.endsWith("**")) {
    text = text.slice(0, -2);
  }

  // 3. Balance any odd unclosed ** so that it immediately renders as bold instead of raw **
  const boldMatches = text.match(/\*\*/g) || [];
  if (boldMatches.length % 2 === 1) {
    text += "**";
  }

  return text.replace(/\*\*\s*\*\*/g, "");
}

export function ChatMessageContent({ content, isStreaming = false }: ChatMessageContentProps) {
  const cleanContent = sanitizeStreamingMarkdown(content);

  // Split by fenced code blocks first
  const parts = cleanContent.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 text-xs sm:text-sm leading-relaxed break-words font-sans text-ink">
      {parts.map((part, index) => {
        const isLastPart = index === parts.length - 1;
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          const lang = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : "";
          const code = lang ? lines.slice(1).join("\n") : lines.join("\n");

          return (
            <div
              key={index}
              className="my-3 rounded-xl overflow-hidden border-2 border-ink bg-[#14110F] text-[#FDF8F1] shadow-solid-sm"
            >
              {lang && (
                <div className="px-3.5 py-1 bg-[#25211E] border-b border-ink/40 text-[10px] font-mono text-cream/70 flex justify-between items-center">
                  <span>{lang}</span>
                </div>
              )}
              <pre className="p-3.5 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-[#7BE0AD]">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Render normal markdown blocks (paragraphs, headers, tables, lists)
        const blocks = part.split(/\n\s*\n/);

        return (
          <React.Fragment key={index}>
            {blocks.map((block, bIdx) => {
              const lines = block.trim().split("\n");

              // Check if block is a Markdown Table
              if (
                lines.length >= 2 &&
                lines[0].includes("|") &&
                /^[|\s-:]+$/.test(lines[1])
              ) {
                const headers = lines[0]
                  .split("|")
                  .map((c) => c.trim())
                  .filter((c, i, arr) => i > 0 && i < arr.length - 1);
                const rows = lines.slice(2).map((rowLine) =>
                  rowLine
                    .split("|")
                    .map((c) => c.trim())
                    .filter((c, i, arr) => i > 0 && i < arr.length - 1)
                );

                return (
                  <div
                    key={bIdx}
                    className="my-3 overflow-x-auto rounded-xl border border-ink/40 bg-white shadow-solid-sm"
                  >
                    <table className="w-full text-left text-[11px] sm:text-xs font-sans">
                      <thead className="bg-cream border-b border-ink/30 font-bold text-ink">
                        <tr>
                          {headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-3 py-2 border-r border-ink/20 last:border-r-0">
                              {formatInlineMarkdown(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="border-b border-ink/10 last:border-b-0 hover:bg-cream/40"
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-3 py-2 border-r border-ink/10 last:border-r-0"
                              >
                                {formatInlineMarkdown(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              // Check if block is a Heading
              if (lines[0].startsWith("#")) {
                const headerMatch = lines[0].match(/^(#{1,6})\s+(.*)$/);
                if (headerMatch) {
                  const level = headerMatch[1].length;
                  const text = headerMatch[2];

                  if (level === 1) {
                    return (
                      <h2
                        key={bIdx}
                        className="font-display font-black text-base sm:text-lg text-ink pt-2 pb-1 border-b border-rule"
                      >
                        {formatInlineMarkdown(text)}
                      </h2>
                    );
                  }
                  if (level === 2) {
                    return (
                      <h3
                        key={bIdx}
                        className="font-display font-bold text-sm sm:text-base text-ink pt-2 pb-0.5"
                      >
                        {formatInlineMarkdown(text)}
                      </h3>
                    );
                  }
                  return (
                    <h4
                      key={bIdx}
                      className="font-display font-bold text-xs sm:text-sm text-ink pt-1"
                    >
                      {formatInlineMarkdown(text)}
                    </h4>
                  );
                }
              }

              // Regular paragraph or bullet list
              return (
                <div key={bIdx} className="space-y-1">
                  {lines.map((line, lIdx) => {
                    const trimmed = line.trim();
                    const isBullet =
                      trimmed.startsWith("- ") ||
                      trimmed.startsWith("• ") ||
                      trimmed.startsWith("* ");
                    const isNumbered = /^\d+\.\s+/.test(trimmed);

                    if (isBullet) {
                      const cleanText = trimmed.replace(/^[-•*]\s+/, "");
                      return (
                        <div key={lIdx} className="flex items-start gap-2 ml-1.5 my-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-ink shrink-0 mt-1.5" />
                          <span className="leading-relaxed">
                            {formatInlineMarkdown(cleanText)}
                          </span>
                        </div>
                      );
                    }

                    if (isNumbered) {
                      const numMatch = trimmed.match(/^(\d+\.)\s+(.*)$/);
                      return (
                        <div key={lIdx} className="flex items-start gap-2 ml-1.5 my-0.5">
                          <span className="font-mono font-bold text-[11px] text-ink shrink-0 mt-0.5">
                            {numMatch?.[1]}
                          </span>
                          <span className="leading-relaxed">
                            {formatInlineMarkdown(numMatch?.[2] || "")}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <p key={lIdx} className="leading-relaxed">
                        {formatInlineMarkdown(line)}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
      {isStreaming && (
        <span
          className="inline-block w-2 h-4 bg-ink ml-1 align-middle animate-pulse rounded-[1px] shadow-sm"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Parses bold, inline code, and links without leaving raw ** asterisks behind.
 */
function formatInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  // Remove any remaining stray empty asterisks like `** **`
  const cleaned = text.replace(/\*\*\s*\*\*/g, "");

  // Match bold **text**, inline `code`, and markdown links [text](url)
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  const segments = cleaned.split(regex);

  return segments.map((seg, idx) => {
    if (seg.startsWith("**") && seg.endsWith("**") && seg.length >= 4) {
      const innerText = seg.slice(2, -2).trim();
      if (!innerText) return null;
      return (
        <strong key={idx} className="font-bold text-ink">
          {innerText}
        </strong>
      );
    }

    if (seg.startsWith("`") && seg.endsWith("`") && seg.length >= 2) {
      return (
        <code
          key={idx}
          className="px-1 py-0.5 rounded bg-cream border border-ink/20 font-mono text-[11px] text-ink font-semibold"
        >
          {seg.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = seg.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue underline font-medium hover:text-blue/80 inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Strip any accidental stray double asterisks
    const cleanedSeg = seg.replace(/\*\*/g, "");
    return cleanedSeg;
  });
}

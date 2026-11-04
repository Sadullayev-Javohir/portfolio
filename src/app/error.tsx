"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-display text-2xl font-bold text-ink">Something went wrong</h2>
      <p className="font-sans text-sm text-muted mt-2 mb-4">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 bg-yellow border-2 border-ink rounded-full font-semibold text-sm shadow-solid-sm cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}

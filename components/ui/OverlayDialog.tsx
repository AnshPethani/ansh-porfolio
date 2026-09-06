"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

export type OverlayDialogProps = {
  /** id of the heading inside the panel, for aria-labelledby. */
  titleId: string;
  closeLabel?: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Full-screen dim + centered (or bottom-sheet on small phones) panel. Closes
 * on the X, a tap on the dimmed backdrop, or Escape. Focus is trapped inside
 * and restored to the opener on close.
 */
export function OverlayDialog({
  titleId,
  closeLabel = "Close",
  onClose,
  children,
}: OverlayDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center lg:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[min(88dvh,40rem)] w-full max-w-lg overflow-y-auto rounded-card border border-line bg-surface p-5 pr-14 shadow-soft sm:p-8 sm:pr-14"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded text-ink-muted transition-colors hover:text-ink"
        >
          <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default OverlayDialog;

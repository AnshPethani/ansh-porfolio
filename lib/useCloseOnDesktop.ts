"use client";

import { useEffect } from "react";

/** Dismisses a mobile dialog if the viewport crosses into the desktop layout. */
export function useCloseOnDesktop(onClose: () => void) {
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) onClose();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [onClose]);
}

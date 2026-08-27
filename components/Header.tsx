"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { resumeUrl } from "@/lib/data";
import { navItems, site } from "@/lib/site";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  /*
   * Three stages, so the header is invisible at rest without letting hero
   * content collide with the nav on the way past:
   *   at the top   — fully transparent, no border
   *   scrolling    — faint backdrop so text passes behind it, still no border
   *   past the hero — firmer backdrop plus the hairline
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watching the hero element keeps the last stage correct no matter how tall
  // the hero renders at a given breakpoint.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(entry ? !entry.isIntersecting : false),
      { rootMargin: "-60px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Highlights the section currently sitting under the header.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const scrollToTop = useCallback(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const settled = pastHero || menuOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors",
        !scrolled && !menuOpen && "bg-transparent",
        scrolled && !settled && "bg-bg/70 backdrop-blur-sm",
        settled && "bg-bg/90 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "border-b transition-colors",
          pastHero && !menuOpen ? "border-line" : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-header max-w-content items-center gap-4 px-5 sm:px-8">
          <Link
            href="/"
            onClick={scrollToTop}
            aria-label={`${site.name} — back to top`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-sm font-medium uppercase tracking-label text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <span className="-mr-[0.12em]">{site.monogram}</span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-6">
              {navItems.map((item) => {
                const active = activeId === item.href.replace("#", "");
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "rounded-sm font-mono text-sm uppercase tracking-label transition-colors",
                        active ? "text-accent" : "text-ink-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-6">
            <Button href={resumeUrl} newTab variant="secondary" size="sm">
              Resume
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded text-ink-muted transition-colors hover:text-ink lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!menuOpen}
        className={cn(
          "overflow-hidden border-b bg-bg/95 backdrop-blur-sm lg:hidden",
          "motion-safe:transition-[max-height,border-color] motion-safe:duration-300",
          menuOpen ? "max-h-96 border-line" : "max-h-0 border-transparent",
        )}
      >
        <nav aria-label="Primary (mobile)" className="mx-auto max-w-content px-5 py-4 sm:px-8">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const active = activeId === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "true" : undefined}
                    tabIndex={menuOpen ? undefined : -1}
                    className={cn(
                      "block rounded-sm py-2.5 font-mono text-sm uppercase tracking-label transition-colors",
                      active ? "text-accent" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

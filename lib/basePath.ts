/**
 * GitHub Pages serves this site from a subpath, so any URL written by hand —
 * rather than through next/link or next/image, which apply basePath themselves —
 * has to be prefixed. Inlined at build time from next.config.js.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

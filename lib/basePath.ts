/**
 * Prefix for hand-written public URLs (resume, portrait). Empty when the site
 * is served from the domain root (user GitHub Pages). next/link applies its
 * own basePath when that option is set in next.config.js.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

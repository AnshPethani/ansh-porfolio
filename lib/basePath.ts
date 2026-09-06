/**
 * Prefix for hand-written public URLs (resume, portrait). Empty when the site
 * is served from https://anshpethani.github.io/ (user Pages, no basePath).
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

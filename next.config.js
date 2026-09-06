/*
 * User-site deploy: this project is meant to live at
 * https://anshpethani.github.io (repo must be named anshpethani.github.io).
 * No basePath — Pages serves from the domain root.
 *
 * Custom domain later? Add public/CNAME with the domain and set
 * NEXT_PUBLIC_SITE_URL to match.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true }, // no image optimization server on GH Pages
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // Empty in this config — kept so withBasePath() stays a single place for
  // hand-written public/ URLs if a subpath is ever reintroduced.
  env: { NEXT_PUBLIC_BASE_PATH: "" },
};

module.exports = nextConfig;

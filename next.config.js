/*
 * User-site deploy: live at https://anshpethani.github.io/
 *
 * The GitHub repo must be named anshpethani.github.io for that URL to work.
 * After `next build`, scripts/postbuild-legacy-redirect.mjs drops a redirect
 * at out/ansh-porfolio/ so old application links still open the site.
 *
 * Custom domain? Add public/CNAME and set NEXT_PUBLIC_SITE_URL.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  env: { NEXT_PUBLIC_BASE_PATH: "" },
};

module.exports = nextConfig;

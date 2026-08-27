/*
 * TODO(ansh): REPO_NAME must exactly match the GitHub repository name, because
 * GitHub Pages serves the site from https://<user>.github.io/<repo>/. It is
 * currently "ansh-porfolio" (note the missing "t") to match the real repo at
 * github.com/AnshPethani/ansh-porfolio. If you rename the repo, change this too.
 *
 * Using a custom domain instead? Delete REPO_NAME/basePath/assetPrefix below,
 * add a public/CNAME file containing just the domain (e.g. anshpethani.com),
 * and set NEXT_PUBLIC_SITE_URL to it.
 */
const REPO_NAME = "ansh-porfolio";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? `/${REPO_NAME}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true }, // no image optimization server on GH Pages
  basePath,
  assetPrefix: isProd ? `${basePath}/` : "",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // Exposed so hand-written <a href> values (e.g. the resume PDF) can be
  // prefixed too — next/link and next/image handle basePath on their own.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

module.exports = nextConfig;

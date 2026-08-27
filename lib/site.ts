/*
 * TODO(ansh): `url` is used for metadataBase (OpenGraph/canonical URLs). It
 * defaults to the GitHub Pages address. If you attach a custom domain, add a
 * public/CNAME file with the domain and set NEXT_PUBLIC_SITE_URL to match.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anshpethani.github.io/ansh-porfolio";

export const site = {
  name: "Ansh Pethani",
  monogram: "AP",
  role: "MS Computer Science, NC State University",
  tagline: "AI/ML research and full-stack engineering",
  description:
    "Ansh Pethani is a Master of Computer Science student at NC State University working on graph neural networks, computer vision, and production ML pipelines, with prior full-stack engineering experience.",
  url: SITE_URL,
} as const;

export const navItems: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

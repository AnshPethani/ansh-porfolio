import { withBasePath } from "@/lib/basePath";

/*
 * TODO(ansh): values to confirm before launch —
 *   1. `social.github` / `social.linkedin` / `social.email` below: verify these
 *      are the handles you want public.
 *   2. public/resume.pdf is your real resume as of Aug 2026. Note it lists a
 *      phone number, which the site itself deliberately omits — see the comment
 *      in components/ContactSection.tsx. Swap the file to update it; this path
 *      does not change.
 *   3. The Hueb role has no `url` because the only link available was a
 *      tracking URL that could not be verified — add the canonical company URL
 *      and it will render as a link automatically.
 *   4. Project `url` fields are omitted until repos/demos are public. Adding one
 *      makes the link icon appear on that card.
 */

export type Role = {
  company: string;
  title: string;
  /** Company homepage. Rendered as an external link on the company name. */
  url?: string;
  /** Free-form so "Present" and locations read naturally in the mono date slot. */
  period: string;
  location?: string;
  bullets: string[];
  /** Tech pills. Omitted on `tier: "earlier"` roles by design. */
  tech?: string[];
  /** `main` roles get full cards; `earlier` roles render compact and tag-free. */
  tier: "main" | "earlier";
};

export type Education = {
  institution: string;
  url?: string;
  degree: string;
  /** Pre-formatted because the two schools use different scales (4.0 vs 10). */
  grade: string;
  period: string;
};

export type Project = {
  name: string;
  year: string;
  pitch: string;
  tech: string[];
  /** Absent until a repo or demo is public — the link icon is hidden when empty. */
  url?: string;
};

export type Publication = {
  authors: string;
  year: string;
  title: string;
  /** Venue, volume, pages, publisher — rendered in italics after the title. */
  venue: string;
  url: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const roles: Role[] = [
  {
    company: "iEXCEL Lab, CS Department, NC State University",
    title: "Research Associate",
    url: "https://sites.google.com/ncsu.edu/draditimallavarapu",
    period: "Aug 2026 – Present",
    location: "Raleigh, NC, USA",
    tier: "main",
    bullets: [
      "Managing CI/CD pipelines and backend deployments, maintaining backend integrations, and adding features to webpages",
      "Engineering a GNN to validate trophic interactions and generate interaction plausibility scores from crowdsourced food web data",
      "Integrating pre-trained multi-species computer vision pipelines into existing backend and frontend architectures",
      "Facilitating expert validation studies for a vision-model-based alt-text generator and deploying analytical tools driven by large-scale publication datasets",
    ],
    tech: ["Graph Neural Networks", "Computer Vision", "CI/CD", "Python"],
  },
  {
    company: "IEC Lab, CS Department, NC State University",
    title: "Research Associate",
    url: "https://www.ieclab.org/",
    period: "Aug 2025 – Aug 2026",
    location: "Raleigh, NC, USA",
    tier: "main",
    bullets: [
      "Developed Python ETL pipelines to parse, clean, and resolve conflicts across CSV, XML & JSON records",
      "Developed and optimized an LLM-based Python pipeline for automated quiz generation using student responses",
      "Researched embedding models and deployed NV-Embed-v2 to generate embeddings, evaluated via K-Means clustering",
    ],
    tech: ["Python", "ETL", "LLMs", "NV-Embed-v2", "K-Means"],
  },
  {
    company: "IoTIoT",
    title: "AI Development Intern",
    url: "https://iotiot.in/",
    period: "Jan 2025 – Jul 2025",
    location: "India",
    tier: "main",
    bullets: [
      "Developed AI/ML systems: an offline chatbot (Ollama, Flask, Tauri, Rust), image detection models with TensorFlow/Keras (from scratch and via transfer learning), and a zero-shot voice cloning model",
      "Engineered generative AI applications using Gemini/OpenAI APIs, built a Google A2A wrapper for WhatsApp MCP, and documented technical learnings through AI-focused blogs",
    ],
    tech: ["Ollama", "Flask", "Tauri", "Rust", "TensorFlow", "Keras", "Gemini API"],
  },
  {
    company: "DeepKlarity",
    title: "Python Backend and AI Development Intern",
    url: "https://deepklarity.com/",
    period: "Sep 2024 – May 2025",
    location: "India",
    tier: "main",
    bullets: [
      "Engineered ML & AI solutions including YOLOv11-based image detection models (dog-nose & cat-face) and generative AI-powered chatbots (blog generation, RAG for document/PDF/image Q&A)",
      "Built and deployed a Gmail add-on for automated email risk assessment, an AutoEDA tool for PDF-based data analysis, and a data analytics platform",
      "Designed full-stack web applications using React, JavaScript, FastAPI, and PostgreSQL",
    ],
    tech: ["YOLOv11", "RAG", "FastAPI", "React", "PostgreSQL"],
  },
  {
    company: "Hueb",
    title: "Technical Intern",
    url: "https://www.hueb.com/",
    period: "Nov 2023 – Dec 2023",
    location: "Remote",
    tier: "earlier",
    bullets: [
      "Verified, tested, and enhanced an iOS application while catering to business needs",
      "Used the application's admin interface to make edits directly to the application",
      "Enhanced user journey, utilization, and efficiency of the application",
    ],
  },
  {
    company: "L&T Technology Services",
    title: "Technical Intern",
    url: "https://www.ltts.com",
    period: "Sep 2023 – Nov 2023",
    location: "Mumbai, India · On-site",
    tier: "earlier",
    bullets: [
      "Explored IoT systems, focusing on ELV packages and digital system integration",
      "Created and managed a database of potential clients and contacted them to pitch sales",
      "Conducted market research on IoT technology demand using data mining techniques",
      "Brought in leads for the team and set up meetings with prospective clients",
    ],
  },
];

export const mainRoles = roles.filter((role) => role.tier === "main");
export const earlierRoles = roles.filter((role) => role.tier === "earlier");

export const education: Education[] = [
  {
    institution: "North Carolina State University",
    url: "https://www.ncsu.edu",
    degree: "Master of Computer Science",
    grade: "GPA 4.0 / 4.0",
    period: "Aug 2025 – May 2027",
  },
  {
    institution: "Vellore Institute of Technology",
    url: "https://vit.ac.in",
    degree: "B.Tech, Information Technology",
    grade: "CGPA 8.91 / 10",
    period: "Sep 2021 – May 2025",
  },
];

export const projects: Project[] = [
  {
    name: "NBA/ABA Statistics and Future Predictions",
    year: "2025",
    pitch:
      "Mined decades of NBA and ABA box scores for the association rules that actually correlate with winning, then trained models on top of them to forecast game outcomes and individual player performance.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    name: "IDS Attack Detection in IoV CAN Bus",
    year: "2024",
    pitch:
      "Benchmarked 12 machine learning and deep learning architectures against a 1.4M-instance vehicular CAN bus dataset to find where intrusion detection breaks down. SMOTE resampling fixed the severe class imbalance, and the winning models were tuned for the accuracy-to-compute tradeoff an in-vehicle system can actually afford.",
    tech: ["Python", "TensorFlow", "Scikit-learn", "Imbalanced-learn", "Pandas", "NumPy"],
  },
  {
    name: "Real-Time Analysis",
    year: "2024",
    pitch:
      "A streaming pipeline that scrapes the web and re-analyzes the incoming data every five seconds, redrawing its visualizations automatically as each new batch lands rather than waiting on a manual refresh.",
    tech: ["Python", "PySpark", "Hadoop"],
  },
  {
    name: "Socket Programming Chat App",
    year: "2023",
    pitch:
      "A multi-machine chat client built directly on Python TCP sockets — no framework in between — to work through connection handling, message framing, and concurrent clients from first principles.",
    tech: ["Python", "TCP Sockets"],
  },
];

export const publications: Publication[] = [
  {
    authors: "Pethani, A., Nallakaruppan, M. K.",
    year: "2024",
    title: "Electronic Copyright and Legal Application Regarding Non-Fungible Tokens (NFTs)",
    venue:
      "Recent Trends in Intelligence Enabled Research (DoSIER 2023), Advances in Intelligent Systems and Computing, vol. 1457. Springer, Singapore.",
    url: "https://link.springer.com/chapter/10.1007/978-981-97-2321-8_17",
  },
  {
    authors: "Nallakaruppan, M. K., Pethani, A., Pelusi, D.",
    year: "2025",
    title: "Data Security in the Age of Marketing: Safeguarding Customer Information and Compliance",
    venue: "Data Engineering for Data-driven Marketing, pp. 165–178. Emerald Publishing Limited.",
    url: "https://www.emerald.com/books/edited-volume/17020/chapter-abstract/94021750/Data-Security-in-the-Age-of-Marketing-Safeguarding-Customer-Information-and-Compliance",
  },
];

export const skillGroups: SkillGroup[] = [
  { category: "Languages", items: ["Python", "JavaScript", "Java", "C", "C++", "SQL"] },
  {
    category: "AI / ML",
    items: [
      "OpenAI API",
      "Gemini API",
      "Ollama",
      "TensorFlow",
      "Scikit-learn",
      "Keras",
      "NumPy",
      "Pandas",
    ],
  },
  { category: "Frontend", items: ["React", "HTML", "CSS"] },
  { category: "Backend", items: ["FastAPI", "Flask", "REST APIs"] },
  { category: "Databases", items: ["PostgreSQL", "ChromaDB"] },
  { category: "Tools", items: ["Git", "Linux", "Postman", "VS Code", "Rust", "Tauri"] },
];

export const coursework: string[] = [
  "Design & Analysis of Algorithms",
  "Machine Learning",
  "Cloud Computing",
  "Big Data",
  "Computer & Network Security",
  "Software Engineering",
  "Database Management Systems",
];

export const social = {
  email: "anshpethani@gmail.com",
  linkedin: "https://www.linkedin.com/in/pethaniansh25/",
  github: "https://github.com/AnshPethani",
} as const;

export const resumeUrl = withBasePath("/resume.pdf");

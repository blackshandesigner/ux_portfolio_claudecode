export type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export const linkedInUrl =
  "https://www.linkedin.com/in/hui-shan-chen-35b263117/";
export const contactEmail = "blackshandesigner@gmail.com";

export const experiences = [
  {
    start: "07/2021",
    end: "Present",
    duration: "Berlin, Germany",
    title: "Product Designer",
    company: "Customer Alliance GmbH",
    description: "",
    achievements: [
      "Led end-to-end design and launch of AI Insights MVPs, translating complex customer feedback into actionable insights and AI-generated recommendations for hotel managers across EMEA.",
      "Bridged design and development using Claude Code, translating user problems and product requirements into functional B2B SaaS features through prototyping and AI-assisted implementation.",
      "Applied a development and quality-validation workflow, running unit, integration, and end-to-end tests before creating pull requests in GitHub.",
      "Analyzed user behavior through Mixpanel and Google Analytics, combining behavioral insights, customer interviews, and usability testing to identify friction and prioritize product improvements.",
      "Developed and maintained an accessible, scalable design system aligned with WCAG standards, connecting Figma, Zeroheight, design tokens, and the codebase to strengthen consistency and maintainability.",
      "Collaborated with engineering and cross-functional stakeholders to balance user needs, technical feasibility, and business goals; used customer feedback, CSAT, and NPS to inform iteration.",
    ],
  },
  {
    start: "08/2020",
    end: "10/2020",
    duration: "Milan, Italy",
    title: "UI/UX Design Intern",
    company: "Penguinpass",
    description: "",
    achievements: [
      "Designed multiple landing page mockups to support marketing campaigns and event engagement strategies.",
      "Redesigned the Penguinpass trade fair UI to improve clarity and usability.",
      "Collaborated with the project manager to coordinate design tasks and ensure alignment with business and user needs.",
      "Contributed to a lean, user-focused design process in a startup environment.",
    ],
  },
  {
    start: "05/2020",
    end: "08/2020",
    duration: "Milan, Italy",
    title: "UI/UX Designer (Project)",
    company: "Ktchn Lab, Vinhood, Morsy",
    description: "",
    achievements: [
      "Designed a contactless food delivery app to help the HoReCa sector adapt during COVID-19, improving the ordering flow and customer experience.",
      "Addressed the urgent needs of a rapidly shifting food and beverage industry, focusing on safety, accessibility, and digital adaptability.",
    ],
  },
];

export const processSteps = [
  ["01", "Align", "Business goals, problem framing, analyze metrics, risks, stakeholder context."],
  ["02", "Explore", "Research the problem through feedback, user interviews, analytics, and competitor review."],
  ["03", "Prototype", "Use AI-assisted prototyping to explore concepts, validate flows, and align with stakeholders."],
  ["04", "Validate", "Test with users, synthesize feedback, and assess technical feasibility."],
  ["05", "Build", "Translate validated designs into functional features using Claude Code and GitHub."],
  ["06", "Ship & Iterate", "Run unit, integration, and E2E tests, prepare PRs, and measure post-launch behavior."],
];

export const methods = {
  Discovery: ["Stakeholder interviews", "Mixpanel analytics", "User research & problem framing", "Define assumptions for validation"],
  Validation: ["AI prototype", "User testing", "Analyze testing feedback and synthesize the assumption.", "Technical discovery", "Design critique"],
  "Development & Delivery": ["Claude Code", "GitHub PRs", "Automated testing", "Post-launch analytics"],
};

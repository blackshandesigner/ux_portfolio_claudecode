import Link from "next/link";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import type { Project } from "@/data/projects";

/**
 * Split hero: sticky "Back to Selected Work" toolbar, dark title panel, and a
 * pale accent image area. Mirrors the case-study template's structural hero.
 */
export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <>
      <header className="case-toolbar">
        <Link
          className="case-back-link"
          href="/#work"
          aria-label="Back to Selected Work"
        >
          <ArrowLeftIcon aria-hidden="true" />
          <span>Back to Selected Work</span>
        </Link>
      </header>
      <section
        className={`case-hero accent-${project.accent}`}
        aria-labelledby="case-study-title"
      >
        <div className="case-hero-split">
          <div className="case-title-panel">
            <h1 id="case-study-title">{project.title}</h1>
          </div>
          <CaseImagePlaceholder
            className="case-cover"
            label="Hero product image"
            hint="Recommended: 1600 × 1200 px"
            alt={project.heroAlt}
          />
        </div>
      </section>
    </>
  );
}

/**
 * Polished placeholder that stands in for real imagery while preserving the
 * template's border, accent surface, and aspect ratio (prevents layout shift).
 */
export function CaseImagePlaceholder({
  label,
  hint,
  alt,
  className = "",
}: {
  label: string;
  hint: string;
  alt?: string;
  className?: string;
}) {
  return (
    <figure
      className={`case-image-placeholder ${className}`.trim()}
      role="img"
      aria-label={alt ?? `${label} placeholder. ${hint}`}
    >
      <ImageIcon aria-hidden="true" />
      <figcaption>
        <strong>{label}</strong>
        <span>Add image · {hint}</span>
      </figcaption>
    </figure>
  );
}

/**
 * One narrative section. The visible number/label column is intentionally
 * omitted; the section title is kept as a screen-reader-only heading so the
 * document outline and accessibility remain intact.
 */
export function CaseStudyContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="case-content-section" aria-label={title}>
      <h2 className="sr-only">{title}</h2>
      <div className="case-section-body">{children}</div>
    </section>
  );
}

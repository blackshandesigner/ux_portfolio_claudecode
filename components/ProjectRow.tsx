import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className={`project-row accent-${project.accent}`}>
      <Link className="project-card-link" href={`/work/${project.slug}`} aria-label={`Open case study: ${project.title}`}>
        <div className="project-number" aria-hidden="true">{project.number}</div>
        <div className="project-copy">
          <div className="project-primary">
            <h3>{project.title}</h3>
          </div>
          <div className="project-details">
            <div><span>Challenge</span><p>{project.challenge}</p></div>
            <div><span>Approach</span><p>{project.approach}</p></div>
            <div><span>Outcome</span><p>{project.outcome}</p></div>
          </div>
        </div>
        {project.cardImage ? (
          <div className="project-image">
            <Image
              src={project.cardImage}
              alt={project.cardImageAlt ?? `Product screenshot from ${project.title}`}
              fill
              sizes="(max-width: 720px) 100vw, 33vw"
            />
          </div>
        ) : (
          <div className="project-image-placeholder" role="img" aria-label={`Placeholder for a product screenshot from ${project.title}`}>
            <span>Product screenshot</span>
            <small>Add image</small>
          </div>
        )}
      </Link>
    </article>
  );
}

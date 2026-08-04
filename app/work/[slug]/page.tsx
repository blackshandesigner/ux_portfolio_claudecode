import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import {
  CaseImagePlaceholder,
  CaseStudyContentSection,
  CaseStudyHero,
} from "@/components/CaseStudy";
import { Reveal } from "@/components/Reveal";
import {
  getProject,
  projects,
  type CaseNarrative,
  type PartRef,
  type Project,
} from "@/data/projects";

const SITE_URL = "https://huishanchen.vercel.app";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const canonical = `/work/${project.slug}`;
  return {
    title: project.title,
    description: project.facts.overview,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} — Hui-Shan Chen`,
      description: project.facts.overview,
      type: "article",
      url: `${SITE_URL}${canonical}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <main id="main-content" className="case-page page-container">
        <CaseStudyHero project={project} />

        <div className="case-narrative">
          {project.sectionPlan ? (
            project.sectionPlan.map((section) => (
              <Reveal key={section.title}>
                <CaseStudyContentSection title={section.title}>
                  {section.parts.map((ref, i) => {
                    const narrative = getNarrative(project, ref);
                    return narrative ? (
                      <NarrativePart
                        key={i}
                        narrative={narrative}
                        as={i === 0 ? "lead" : "subhead"}
                      />
                    ) : null;
                  })}
                </CaseStudyContentSection>
              </Reveal>
            ))
          ) : (
            <>
          {/* 1 — Context */}
          <Reveal>
            <CaseStudyContentSection title="Context">
              <p className="case-lead">{project.context.lead}</p>
              <Paragraphs items={project.context.body} />
            </CaseStudyContentSection>
          </Reveal>

          {/* 2 — Problem */}
          <Reveal>
            <CaseStudyContentSection title="Problem">
              <p className="case-lead">{project.problem.lead}</p>
              <Paragraphs items={project.problem.body} />
              {project.problem.quoteGroup ? (
                <div className="case-quote-group">
                  {project.problem.quoteGroup.intro ? (
                    <p className="case-quote-intro">
                      {project.problem.quoteGroup.intro}
                    </p>
                  ) : null}
                  <ul className="case-quote-list">
                    {project.problem.quoteGroup.quotes.map((quote) => (
                      <li key={quote}>{quote}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <Paragraphs items={project.problem.bodyAfter} />
              {project.problem.question ? (
                <blockquote>{project.problem.question}</blockquote>
              ) : null}
            </CaseStudyContentSection>
          </Reveal>

          {/* 3 — Concept (+ key insight) */}
          <Reveal>
            <CaseStudyContentSection title="Concept">
              {project.researchNarrative ? (
                <ProseBlock narrative={project.researchNarrative} as="lead" />
              ) : (
                <>
                  <p className="case-lead">Research</p>
                  <p>
                    The research plan was built around the product decision rather
                    than a preferred method, moving between observed behaviour,
                    direct conversation, and prototype evidence.
                  </p>
                  <div className="case-method-grid">
                    {project.research.map((method, i) => (
                      <div key={method}>
                        <span>0{i + 1}</span>
                        <p>{method}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {project.insightsNarrative ? (
                <ProseBlock narrative={project.insightsNarrative} as="subhead" />
              ) : (
                <>
                  <p className="case-subhead">Key insights</p>
                  <div className="decision-grid">
                    {project.insights.map((insight, i) => (
                      <article key={insight.title}>
                        <span>0{i + 1}</span>
                        <h3>{insight.title}</h3>
                        <p>{insight.detail}</p>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </CaseStudyContentSection>
          </Reveal>

          {/* 4 — Design decisions (+ evidence) */}
          <Reveal>
            <CaseStudyContentSection title="Design decisions">
              {project.decisionsNarrative ? (
                <ProseBlock narrative={project.decisionsNarrative} as="lead" />
              ) : (
                <>
                  <p className="case-lead">Design decisions</p>
                  <div className="decision-grid">
                    {project.decisions.map((decision, i) => (
                      <article key={decision.title}>
                        <span>
                          {project.number}.{i + 1}
                        </span>
                        <h3>{decision.title}</h3>
                        <p>{decision.detail}</p>
                      </article>
                    ))}
                  </div>
                </>
              )}
              {project.developmentNarrative ? (
                <ProseBlock narrative={project.developmentNarrative} as="subhead" />
              ) : (
                <>
                  <p className="case-subhead">Design development</p>
                  <div
                    className="flow-diagram"
                    role="img"
                    aria-label={`User flow: ${project.flow
                      .map((f) => f.label)
                      .join(", then ")}.`}
                  >
                    {project.flow.map((node, i) => (
                      <FlowNode
                        key={node.step}
                        node={node}
                        isLast={i === project.flow.length - 1}
                      />
                    ))}
                  </div>
                  <div className="case-image-pair">
                    <CaseImagePlaceholder
                      label="Early concept"
                      hint="Recommended: 1200 × 900 px"
                    />
                    <CaseImagePlaceholder
                      label="Refined wireframe"
                      hint="Recommended: 1200 × 900 px"
                    />
                  </div>
                </>
              )}
            </CaseStudyContentSection>
          </Reveal>

          {/* 5 — Future direction */}
          <Reveal>
            <CaseStudyContentSection title="Final solution">
              {project.solutionNarrative ? (
                <NarrativePart narrative={project.solutionNarrative} as="lead" />
              ) : (
                <>
                  <CaseImagePlaceholder
                    className={`solution-frame accent-${project.accent}`}
                    label="Final product image"
                    hint="Recommended: 2000 × 1400 px"
                  />
                  <p>{project.solution}</p>
                </>
              )}
              {project.solutionExtra ? (
                <NarrativePart narrative={project.solutionExtra} as="subhead" />
              ) : null}
            </CaseStudyContentSection>
          </Reveal>

          {/* 6 — Outcomes (+ what I learned) */}
          <Reveal>
            <CaseStudyContentSection title="Outcomes">
              {project.outcomesNarrative ? (
                <>
                  <p className="case-lead">{project.outcomesNarrative.lead}</p>
                  <Paragraphs items={project.outcomesNarrative.body} />
                  {project.outcomesNarrative.listIntro ? (
                    <p>{project.outcomesNarrative.listIntro}</p>
                  ) : null}
                  {project.outcomesNarrative.list ? (
                    <ul className="case-bullet-list">
                      {project.outcomesNarrative.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  <Paragraphs items={project.outcomesNarrative.bodyAfter} />
                </>
              ) : (
                <>
                  <p className="case-lead">Outcomes</p>
                  <div className="outcome-list">
                    {project.outcomes.map((outcome, i) => (
                      <div key={outcome}>
                        <span>0{i + 1}</span>
                        <strong>{outcome}</strong>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {project.learningNarrative ? (
                <ProseBlock narrative={project.learningNarrative} as="subhead" />
              ) : (
                <>
                  <p className="case-subhead">What I learned</p>
                  <p>{project.learning}</p>
                </>
              )}
            </CaseStudyContentSection>
          </Reveal>

          {/* Appended standalone sections */}
          {project.extraSections?.map((section) => (
            <Reveal key={section.title}>
              <CaseStudyContentSection title={section.title}>
                <ProseBlock narrative={section.narrative} as="lead" />
              </CaseStudyContentSection>
            </Reveal>
          ))}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Render a paragraph, converting **…** spans into semibold <strong>. */
function renderInline(text: string) {
  // Supports **bold** and ==highlight== inline markers.
  return text.split(/(\*\*.+?\*\*|==.+?==)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <mark key={i} className="case-mark">
          {part.slice(2, -2)}
        </mark>
      );
    }
    return part;
  });
}

function Paragraphs({ items }: { items?: string[] }) {
  return (
    <>
      {items?.map((paragraph) => <p key={paragraph}>{renderInline(paragraph)}</p>)}
    </>
  );
}

/** Superset of every narrative shape, so one component can render any part. */
type AnyNarrative = {
  lead: string;
  body?: string[];
  codeExample?: { flow?: string; caption?: string; lines: string[] };
  pyramid?: {
    tiers: { label: string; token: string; fill: string }[];
    swatch: string;
    labelColor?: string;
    images?: { label: string; hint: string; src?: string; alt?: string }[];
  };
  quoteGroup?: { intro?: string; quotes: string[] };
  listIntro?: string;
  list?: string[];
  lists?: { intro?: string; items: string[] }[];
  bodyImage?: { src: string; alt: string; width: number; height: number; maxHeight?: number };
  bodyImageAfter?: number;
  cards?: { title: string; detail: string }[];
  imageRow?: { src: string; alt: string }[];
  bodyAfter?: string[];
  bottomImage?: { src: string; alt: string; width: number; height: number; maxHeight?: number };
  closing?: string[];
  question?: string;
};

/** A single image rendered at its natural aspect ratio (full-width unless `maxHeight` caps it). */
function InlineImage({
  image,
}: {
  image: { src: string; alt: string; width: number; height: number; maxHeight?: number };
}) {
  return (
    <figure className="case-inline-image">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 1320px) 100vw, 1320px"
        style={
          image.maxHeight
            ? { width: "auto", height: image.maxHeight, maxWidth: "100%", margin: "0 auto" }
            : undefined
        }
      />
    </figure>
  );
}

/** Two (or more) images shown in a responsive row, reusing the token-image styles. */
function ImageRow({ items }: { items: { src: string; alt: string }[] }) {
  return (
    <div className="token-image-row">
      {items.map((img) => (
        <figure className="token-image" key={img.src}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
          />
        </figure>
      ))}
    </div>
  );
}

/** Layered token pyramid diagram (top → bottom), with dashed chips on the right. */
function TokenPyramid({
  pyramid,
}: {
  pyramid: {
    tiers: { label: string; token: string; fill: string }[];
    swatch: string;
    labelColor?: string;
    images?: { label: string; hint: string; src?: string; alt?: string }[];
  };
}) {
  const labelColor = pyramid.labelColor ?? "#ffffff";
  const tiers = pyramid.tiers;
  const n = tiers.length;
  const cx = 250;
  const yTop = 30;
  const yBase = 430;
  const baseHW = 210;
  const topRatio = 0.34;
  const yA = (topRatio * yBase - yTop) / (topRatio - 1);
  const hwAt = (y: number) => (baseHW * (y - yA)) / (yBase - yA);
  const bandH = (yBase - yTop) / n;
  const chipX = 560;
  const swatch = 26;
  const label = `Token hierarchy pyramid. ${tiers
    .map((t) => `${t.label}: ${t.token}`)
    .join("; ")}.`;
  return (
    <>
      <div className="token-pyramid">
      <svg
        className="token-pyramid-svg"
        viewBox="0 0 900 460"
        width="100%"
        role="img"
        aria-label={label}
      >
        {tiers.map((tier, i) => {
          const y0 = yTop + i * bandH;
          const y1 = yTop + (i + 1) * bandH;
          const hw0 = hwAt(y0);
          const hw1 = hwAt(y1);
          const cy = (y0 + y1) / 2;
          const rightX = cx + hwAt(cy);
          const points = `${cx - hw0},${y0} ${cx + hw0},${y0} ${cx + hw1},${y1} ${cx - hw1},${y1}`;
          return (
            <g key={tier.label}>
              <polygon points={points} fill={tier.fill} stroke="#ffffff" strokeWidth="5" />
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={labelColor}
                fontSize="18"
                fontWeight="600"
              >
                {tier.label}
              </text>
              <line
                x1={rightX + 8}
                y1={cy}
                x2={chipX - 14}
                y2={cy}
                stroke="#cbc4da"
                strokeWidth="1.5"
                strokeDasharray="4 5"
              />
              <rect
                x={chipX}
                y={cy - swatch / 2}
                width={swatch}
                height={swatch}
                rx="6"
                fill={pyramid.swatch}
              />
              <text
                x={chipX + swatch + 14}
                y={cy}
                dominantBaseline="middle"
                fill="#202326"
                fontSize="18"
              >
                {tier.token}
              </text>
            </g>
          );
        })}
      </svg>
      </div>
      {pyramid.images?.length ? (
        <div className="token-image-row">
          {pyramid.images.map((img) =>
            img.src ? (
              <figure className="token-image" key={img.label}>
                <Image
                  src={img.src}
                  alt={img.alt ?? img.label}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  style={{ objectFit: "contain", padding: "16px 0" }}
                />
              </figure>
            ) : (
              <CaseImagePlaceholder
                key={img.label}
                label={img.label}
                hint={img.hint}
              />
            )
          )}
        </div>
      ) : null}
    </>
  );
}

/** Monospace token / code example with an optional flow line and caption. */
function CodeExample({
  example,
}: {
  example: { flow?: string; caption?: string; lines: string[] };
}) {
  return (
    <div className="case-code">
      {example.flow ? <p className="case-code-flow">{example.flow}</p> : null}
      {example.caption ? (
        <p className="case-code-caption">{example.caption}</p>
      ) : null}
      <div className="case-code-block">
        {example.lines.map((line) => (
          <code key={line}>{line}</code>
        ))}
      </div>
    </div>
  );
}

/** Resolve a section-plan part reference to its narrative content. */
function getNarrative(
  project: Project,
  ref: PartRef
): AnyNarrative | undefined {
  if (typeof ref === "object") return project.extraSections?.[ref.extra]?.narrative;
  switch (ref) {
    case "context":
      return project.context;
    case "problem":
      return project.problem;
    case "research":
      return project.researchNarrative;
    case "insights":
      return project.insightsNarrative;
    case "decisions":
      return project.decisionsNarrative;
    case "development":
      return project.developmentNarrative;
    case "solution":
      return project.solutionNarrative;
    case "outcomes":
      return project.outcomesNarrative;
    case "learning":
      return project.learningNarrative;
    default:
      return undefined;
  }
}

/** Renders any narrative part as the section heading (lead) or a subheading. */
function NarrativePart({
  narrative,
  as,
}: {
  narrative: AnyNarrative;
  as: "lead" | "subhead";
}) {
  return (
    <>
      <p className={as === "lead" ? "case-lead" : "case-subhead"}>
        {narrative.lead}
      </p>
      {narrative.bodyImage && narrative.bodyImageAfter != null ? (
        <>
          <Paragraphs items={narrative.body?.slice(0, narrative.bodyImageAfter + 1)} />
          <InlineImage image={narrative.bodyImage} />
          <Paragraphs items={narrative.body?.slice(narrative.bodyImageAfter + 1)} />
        </>
      ) : (
        <>
          <Paragraphs items={narrative.body} />
          {narrative.bodyImage ? <InlineImage image={narrative.bodyImage} /> : null}
        </>
      )}
      {narrative.cards ? (
        <div className="decision-grid">
          {narrative.cards.map((card, i) => (
            <article key={card.title}>
              <span>0{i + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      ) : null}
      {narrative.codeExample ? (
        <CodeExample example={narrative.codeExample} />
      ) : null}
      {narrative.pyramid ? <TokenPyramid pyramid={narrative.pyramid} /> : null}
      {narrative.quoteGroup ? (
        <div className="case-quote-group">
          {narrative.quoteGroup.intro ? (
            <p className="case-quote-intro">{narrative.quoteGroup.intro}</p>
          ) : null}
          <ul className="case-quote-list">
            {narrative.quoteGroup.quotes.map((quote) => (
              <li key={quote}>{quote}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {narrative.listIntro ? <p>{narrative.listIntro}</p> : null}
      {narrative.list ? (
        <ul className="case-bullet-list">
          {narrative.list.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      ) : null}
      {narrative.lists?.flatMap((group, gi) => [
        group.intro ? <p key={`li-${gi}`}>{group.intro}</p> : null,
        <ul className="case-bullet-list" key={`ul-${gi}`}>
          {group.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>,
      ])}
      <Paragraphs items={narrative.bodyAfter} />
      {narrative.imageRow ? <ImageRow items={narrative.imageRow} /> : null}
      {narrative.bottomImage ? <InlineImage image={narrative.bottomImage} /> : null}
      <Paragraphs items={narrative.closing} />
      {narrative.question ? <blockquote>{narrative.question}</blockquote> : null}
    </>
  );
}

/** A lead/body narrative rendered as either the section heading or a subheading. */
function ProseBlock({
  narrative,
  as,
}: {
  narrative: CaseNarrative;
  as: "lead" | "subhead";
}) {
  return (
    <>
      <p className={as === "lead" ? "case-lead" : "case-subhead"}>
        {narrative.lead}
      </p>
      <Paragraphs items={narrative.body} />
      {narrative.bodyImage ? <InlineImage image={narrative.bodyImage} /> : null}
      {narrative.codeExample ? (
        <CodeExample example={narrative.codeExample} />
      ) : null}
      {narrative.pyramid ? <TokenPyramid pyramid={narrative.pyramid} /> : null}
      <Paragraphs items={narrative.bodyAfter} />
      {narrative.imageRow ? <ImageRow items={narrative.imageRow} /> : null}
      {narrative.bottomImage ? <InlineImage image={narrative.bottomImage} /> : null}
      <Paragraphs items={narrative.closing} />
    </>
  );
}

function FlowNode({
  node,
  isLast,
}: {
  node: { step: string; label: string; detail: string };
  isLast: boolean;
}) {
  return (
    <>
      <div>
        <span>{node.step}</span>
        <strong>{node.label}</strong>
        <small>{node.detail}</small>
      </div>
      {isLast ? null : (
        <i aria-hidden="true">→</i>
      )}
    </>
  );
}

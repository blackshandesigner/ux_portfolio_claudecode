export type Accent = "sage" | "lavender" | "peach";

export type CaseInsight = { title: string; detail: string };
export type CaseDecision = { title: string; detail: string };
export type FlowStep = { step: string; label: string; detail: string };
/** A monospace code / token example, optionally with a flow line and caption. */
export type CodeExample = { flow?: string; caption?: string; lines: string[] };
/** One tier of a token pyramid (ordered top → bottom). */
export type PyramidTier = { label: string; token: string; fill: string };
/** A layered pyramid diagram (e.g. raw → global → semantic tokens). */
export type TokenPyramid = {
  tiers: PyramidTier[];
  swatch: string;
  /** Tier label colour (defaults to white). */
  labelColor?: string;
  /** Optional images shown beside the pyramid (real image when `src` is set, else a placeholder). */
  images?: { label: string; hint: string; src?: string; alt?: string }[];
};
/**
 * A section with a large lead statement followed by body paragraphs, and
 * optionally a code example / pyramid plus closing paragraphs after it.
 */
/** A pair (or more) of images shown in a responsive row between prose blocks. */
export type ImageRowItem = { src: string; alt: string };
/** A single image rendered at its natural aspect ratio (full-width unless `maxHeight` caps it). */
export type InlineImage = { src: string; alt: string; width: number; height: number; maxHeight?: number };
export type CaseNarrative = {
  lead: string;
  body: string[];
  codeExample?: CodeExample;
  pyramid?: TokenPyramid;
  /** Optional single full-width image rendered directly after `body`. */
  bodyImage?: InlineImage;
  /** Optional emphasised quote/callout group rendered after `body`. */
  quoteGroup?: CaseQuoteGroup;
  /** Optional numbered cards (decision-grid style) rendered after `body`. */
  cards?: CaseDecision[];
  /** Optional image row rendered at the very bottom, after `bodyAfter`. */
  imageRow?: ImageRowItem[];
  bodyAfter?: string[];
  /** Optional single image rendered at the very bottom, after `bodyAfter`. */
  bottomImage?: InlineImage;
  /** Optional prose rendered after `imageRow`/`bottomImage` (below trailing images). */
  closing?: string[];
};
/** An emphasised group of quotes (e.g. questions a user might ask). */
export type CaseQuoteGroup = { intro?: string; quotes: string[] };
/** A narrative that may include a bulleted list between prose blocks. */
export type ListNarrative = {
  lead: string;
  body?: string[];
  listIntro?: string;
  list?: string[];
  bodyAfter?: string[];
  /** Optional single image rendered at the very bottom, after `bodyAfter`. */
  bottomImage?: InlineImage;
};
/** The Problem section: lead, prose, an optional quote group, and closing prose. */
export type ProblemNarrative = {
  lead: string;
  body?: string[];
  /** Optional single full-width image rendered directly after `body`. */
  bodyImage?: InlineImage;
  quoteGroup?: CaseQuoteGroup;
  bodyAfter?: string[];
  /** Optional image row rendered at the very bottom, after `bodyAfter`. */
  imageRow?: ImageRowItem[];
  /** Optional "How might we" framing rendered as a blockquote. */
  question?: string;
};

/**
 * A reference to one piece of narrative content. Built-in keys point at the
 * project's named fields; `{ extra: n }` points at extraSections[n].
 */
export type PartRef =
  | "context"
  | "problem"
  | "research"
  | "insights"
  | "decisions"
  | "development"
  | "solution"
  | "outcomes"
  | "learning"
  | { extra: number };

/**
 * Groups one or more content parts under a single case-study section. The first
 * part is the section heading; any others render as bold subheadings, so a
 * project can be consolidated to 5–6 sections without losing content.
 */
export type PlannedSection = { title: string; parts: PartRef[] };

export type Project = {
  /** Two-digit index shown on the homepage and section labels. */
  number: string;
  /** Displayed verbatim on the homepage row and the case-study hero. */
  title: string;
  /** URL segment. Must match the routes defined in the brief exactly. */
  slug: string;
  /** Drives the per-project accent surface (sage / lavender / peach). */
  accent: Accent;

  /** Homepage "Selected Work" summary. Rendered verbatim. */
  challenge: string;
  approach: string;
  outcome: string;

  /** Metadata grid on the case-study page. */
  facts: {
    overview: string;
    role: string;
    timeline: string;
  };

  /** Alt text for the (placeholder) hero product image. */
  heroAlt: string;

  /** Optional homepage card image (public path). Falls back to a placeholder. */
  cardImage?: string;
  cardImageAlt?: string;
  /** Optional object-position for the (cover-fit) card image, e.g. "center 40%". */
  cardImagePosition?: string;

  /** Optional case-study hero image (public path). Falls back to a placeholder. */
  heroImage?: string;
  /** Optional object-position for the (cover-fit) hero image, e.g. "center 65%". */
  heroImagePosition?: string;

  /** Numbered case-study narrative. */
  context: CaseNarrative;
  problem: ProblemNarrative;
  /** Research methods shown as a grid (used when `researchNarrative` is absent). */
  research: string[];
  /** Optional prose that replaces the research method grid for this project. */
  researchNarrative?: CaseNarrative;
  /** Optional prose that replaces the insight cards for this project. */
  insightsNarrative?: CaseNarrative;
  /** Optional prose that replaces the decision cards for this project. */
  decisionsNarrative?: CaseNarrative;
  /** Optional prose that replaces the flow diagram + image pair for this project. */
  developmentNarrative?: CaseNarrative;
  /** Optional prose that replaces the final-solution image + summary for this project. */
  solutionNarrative?: CaseNarrative;
  /** Optional second part (with a bulleted list) appended to the final-solution section. */
  solutionExtra?: ListNarrative;
  /** Optional prose (with an optional bulleted list) that replaces the outcome list. */
  outcomesNarrative?: ListNarrative;
  /** Optional prose that replaces the single learning statement for this project. */
  learningNarrative?: CaseNarrative;
  /** Additional standalone sections appended after the core six. */
  extraSections?: { title: string; narrative: CaseNarrative }[];
  /**
   * Optional grouping of the project's content into a small number of sections.
   * When present, the case-study page renders these instead of the default
   * one-section-per-field layout.
   */
  sectionPlan?: PlannedSection[];
  insights: CaseInsight[];
  decisions: CaseDecision[];
  flow: FlowStep[];
  solution: string;
  outcomes: string[];
  learning: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "AI Insights: Turn guest reviews into clear, actionable decisions",
    slug: "ai-insights-turn-guest-reviews-into-clear-actionable-decisions",
    accent: "sage",
    challenge:
      "Hotel teams struggled to turn large volumes of guest feedback into clear priorities and practical next steps.",
    approach:
      "Run design sprint, interviewed 15 hospitality professionals, tested concepts, and designed an AI experience that combined concise summaries, supporting evidence, and prioritized recommendations.",
    outcome:
      "The solution summarized key themes, connected insights to source reviews, and suggested prioritized actions for improvement.",
    facts: {
      overview:
        "An AI Insights MVP that turns guest review text into recommended actions for hotel teams across the EMEA region.",
      role: "Product Designer",
      timeline: "Customer Alliance · Berlin",
    },
    heroAlt:
      "Placeholder for the AI Insights product hero image showing grouped guest-feedback insights and recommended actions.",
    cardImage: "/images/project_ai_insights/project-01-ai-insights_re.png",
    cardImageAlt:
      "Homepage screenshot from the Turn review text into actionable AI Insights project.",
    cardImagePosition: "center 50%",
    heroImage: "/images/project_ai_insights/project-01-ai-insights_re.png",
    context: {
      lead: "Making AI Insights relevant to every hotel",
      body: [
        "Our AI could summarise thousands of guest reviews, but the results were too generic to answer the questions that mattered most.",
        "AI Insights was created to help hospitality teams understand large volumes of guest feedback. Instead of reading every review manually, customers could see recurring positive and negative themes, AI-generated summaries, and recommended actions in one place.",
        "The original experience organised feedback into predefined topics such as breakfast, cleanliness, facilities, and staff service. This gave customers a quick overview of their performance and created a consistent structure across the product. However, hotels are rarely organised in exactly the same way. They have different departments, facilities, customer promises, and operational priorities. A category such as “Staff friendliness” might be useful at a high level, but it could not tell a manager whether the feedback referred to reception, housekeeping, restaurant staff, or another team.",
        "Customers were also trying to answer questions that no universal taxonomy could anticipate. They wanted to know whether guests noticed a new investment, whether complaints increased after changing suppliers, or whether a specific spa service was performing well. As the questions became more specific, the existing AI Insights experience became less useful.",
      ],
    },
    problem: {
      lead: "Starting with the decisions customers needed to make",
      body: [
        "Before designing a solution, I spoke with customers about how they currently worked with guest feedback.",
        "Some checked reviews every day, while others produced reports once or twice a month. Despite these differences, many of them followed a similar process: read reviews, copy information into Excel, classify comments into categories and subcategories, and then prepare a summary for management.",
        "One quality manager described manually categorising thousands of comments every month. Because the process took so much time, the team could not analyse feedback as frequently as they wanted and had less time for strategic work such as identifying root causes.",
        "Customers did not only want to know what guests were saying. They wanted to understand whether something had changed and whether they needed to act.",
      ],
      quoteGroup: {
        intro: "A manager might ask:",
        quotes: [
          "“Did guests notice the new coffee equipment?”",
          "“Are complaints increasing since we changed breakfast suppliers?”",
          "“Is our sustainability programme genuinely valued?”",
          "“Which operational issue should we prioritise first?”",
        ],
      },
      bodyAfter: [
        "This changed how I framed the opportunity. A custom category was not simply another way to organise feedback. It could become a way for customers to validate business decisions using real guest experiences.",
      ],
    },
    research: [
      "Customer interviews with hotel managers",
      "Design workshops with cross-functional partners",
      "Moderated usability testing on early prototypes",
      "Google Analytics and product-usage review",
    ],
    researchNarrative: {
      lead: "Giving customers control without making them configure the AI",
      body: [
        "The first concept allowed customers to define their own category using a name and description.",
        "A name such as “Coffee experience” could still be ambiguous. It might refer to coffee quality, breakfast service, in-room equipment, or the availability of coffee throughout the hotel. The description allowed customers to explain what they were interested in without manually entering every possible keyword or variation.",
        "The AI could then match semantically related feedback, including different phrases that described the same experience. This was particularly important because customers often used their own terminology. One participant wanted the system to recognise multiple textual variations of the same spa service, while others needed categories that reflected departments and sub-services specific to their organisation. However, flexibility introduced a new problem. Customers were unsure how the AI would interpret what they entered.",
        "They wanted to know whether “Cleanliness” would include “Dirty room,” whether spelling mistakes would matter, and whether the same category would work across different languages. They were also worried about spending time creating a category that returned no results. To reduce this uncertainty, the experience needed more than an empty input field. Examples, clearer descriptions of semantic matching, and an estimated number of matching reviews could help customers understand what the AI was likely to find before they saved the category.",
      ],
    },
    insights: [
      {
        title: "Volume is not the problem, prioritization is",
        detail:
          "Managers could already access plenty of feedback; what they lacked was a fast way to see which themes needed action first.",
      },
      {
        title: "Trust has to be earned",
        detail:
          "A recommendation was only useful when managers could see why an insight surfaced and adjust it to their own property.",
      },
      {
        title: "Categories are not one-size-fits-all",
        detail:
          "Different properties tracked different things, so fixed categories left important themes uncaptured.",
      },
    ],
    insightsNarrative: {
      lead: "Keeping creation and analysis in the same place",
      body: [
        "The most important problem appeared after customers created a category. The original prototype separated category management from the main analysis view. Once a customer saved a new category, they needed to leave the setup area and find it elsewhere on the page.",
        "Six of seven participants failed to locate the category they had just created. Some assumed it had not been saved, while others thought the feature was broken. The form itself was not the main issue. The experience failed because the result of the action was no longer visible.",
        "I redesigned the flow so that a category would appear in the main AI Insights view immediately after it was created. Even if the AI was still analysing historical reviews, the category would remain visible with a clear processing state. This maintained continuity between the action and its result. Customers could see that the category existed, understand why the data was not ready, and return to it once processing was complete.",
        "The early specification required customers to manually refresh the page after waiting several minutes. A more complete experience would update the processing state automatically rather than asking customers to manage the system’s progress themselves.",
      ],
    },
    decisions: [
      {
        title: "Lead with recommended actions",
        detail:
          "Each insight is framed around a clear next step, not just a sentiment score, so the interface points toward doing something.",
      },
      {
        title: "Make categories configurable",
        detail:
          "Managers can create and adjust custom categories so insights reflect how their property actually operates.",
      },
      {
        title: "Keep the source in reach",
        detail:
          "Every insight stays connected to the underlying review text so managers can verify the evidence before acting.",
      },
    ],
    decisionsNarrative: {
      lead: "Creating a useful overview at a glance",
      body: [
        "Once the analysis was complete, each category needed to communicate its most important information without requiring customers to open it.",
        "I designed the category cards to show the overall sentiment, the balance of positive and negative mentions, and the most frequently mentioned strength or issue. This allowed a manager to quickly understand whether the topic was performing well and whether something required attention. The sentiment badge used an intentionally simple rule. When positive mentions were at least twice the number of negative mentions, the category was positive. The inverse produced a negative result. Everything in between was presented as mixed. When fewer than five mentions were available, the system avoided presenting an overly confident conclusion.",
        "The goal was not to expose the technical model. It was to provide a result that customers could understand and explain to someone else.",
      ],
    },
    flow: [
      { step: "01", label: "Collect reviews", detail: "Aggregate guest feedback across channels" },
      { step: "02", label: "Group into insights", detail: "Cluster review text into custom categories" },
      { step: "03", label: "Recommend actions", detail: "Surface prioritized, evidence-backed next steps" },
    ],
    developmentNarrative: {
      lead: "Connecting every insight to its evidence",
      body: [
        "AI-generated summaries could help customers understand feedback quickly, but they also needed a way to verify what the system was telling them. Selecting a custom category updated the rest of the AI Insights experience with relevant positive and negative themes, summaries, supporting mentions, and recommended actions. I also designed the experience so that customers could move from a summary back to the original guest reviews. This created a clear relationship between the AI’s interpretation and the evidence behind it.",
        "A manager could begin with a broad conclusion, investigate the recurring themes that produced it, and then read the individual comments when more context was required. This was especially important for trust. Customers noticed when the total number of reviews differed from the number analysed by the AI. Without an explanation, even a small discrepancy could make the entire result feel unreliable. The interface therefore needed to communicate which reviews were included, the selected date range, when the analysis was updated, and why some reviews might not contain a relevant mention.",
      ],
    },
    solution:
      "The final concept turns raw review text into grouped, prioritized insights—each tied to a recommended action and the quotes that support it—so managers can move from reading to acting with confidence.",
    solutionNarrative: {
      lead: "Moving beyond mention counts",
      body: [
        "During the research, customers repeatedly described guest feedback in relation to time. They wanted to compare the current month with the previous month, the same period in the previous year, or another property in the same hotel group. One customer wanted to check AI Insights daily and compare the results with the previous day, the current month, and the same period one year earlier. This showed that a custom category would become significantly more valuable when it could be monitored over time.",
        "A count of 40 negative mentions says very little on its own. The same number becomes meaningful when customers know that it increased from 15 the previous month or that similar hotels receive far fewer complaints. Trend analysis and benchmarking therefore became an important part of the longer-term direction. Instead of behaving like a saved search, each category could become a lightweight operational KPI that helped customers measure the effect of changes.",
      ],
    },
    outcomes: [
      "Validated strong demand for custom categories",
      "Identified key improvements to make insights easier to create and trust",
      "Shaped a flexible AI Insights experience ready for MVP delivery",
    ],
    outcomesNarrative: {
      lead: "What testing changed",
      body: [
        "The research validated that customers had clear reasons to define their own categories. They wanted to measure investments, monitor operational changes, identify risks, and prepare stronger evidence for management decisions.",
        "At the same time, usability testing revealed that the original creation experience was not ready. The failure to find a newly created category would have damaged trust before customers had the opportunity to experience the feature’s value. Finding this problem early changed the focus of the design. Improving the category form was no longer enough.",
        "The work resulted in a validated direction for Custom Categories, a clearer understanding of their role in customer workflows, and a prioritised set of improvements around input guidance, processing feedback, data transparency, trends, and benchmarking.",
        "The supplied materials do not yet include post-launch adoption or commercial metrics, so I would present this outcome as validated product direction and reduced development risk, rather than claiming measured business impact.",
      ],
    },
    learning:
      "AI is most useful when it does the prioritization work and still lets people see the evidence behind a recommendation. Trust comes from transparency, not just accuracy.",
    learningNarrative: {
      lead: "The future",
      body: [
        "Custom Categories could move AI Insights from a generic reporting feature towards a configurable operational intelligence tool. Customers would be able to define the business questions that matter to them, see how guest sentiment changes over time, compare performance across properties, and connect emerging issues to recommended actions.",
        "The project also changed how I think about designing AI experiences. Users do not necessarily need to understand how a model works, but they do need a reliable mental model of what it will do. Guidance, visible processing, understandable logic, and access to supporting evidence are not secondary details. They are what make an AI-generated result usable and trustworthy. Most importantly, the strongest use cases were not about generating more summaries. They were about supporting decisions.",
        "The value of AI Insights was not simply telling customers what guests had said. It was helping them understand what had changed, why it mattered, and what they should do next.",
      ],
    },
    sectionPlan: [
      { title: "Context", parts: ["context"] },
      { title: "Problem", parts: ["problem"] },
      { title: "Concept", parts: ["research", "insights"] },
      { title: "Design decisions", parts: ["decisions", "development"] },
      { title: "Future direction", parts: ["solution"] },
      { title: "Outcomes", parts: ["outcomes", "learning"] },
    ],
  },
  {
    number: "02",
    title:
      "AI reply enhancement: Consistent brand voice through structured prompting",
    slug: "ai-reply-enhancement-consistent-brand-voice-through-structured-prompting",
    accent: "lavender",
    challenge:
      "AI-generated replies felt generic, overly formal, and inconsistent across languages, leading users to edit nearly 70% of responses.",
    approach:
      "Combined customer feedback, interviews, analytics, and prompt-system analysis to redesign brand voice controls, cultural guardrails, and reply generation.",
    outcome:
      "Created a structured, configurable AI reply experience designed to improve consistency, reduce manual edits, and build trust in automation.",
    facts: {
      overview:
        "A configurable AI reply experience that keeps automated responses on-brand and appropriate across languages.",
      role: "Product Designer",
      timeline: "Customer Alliance · Berlin",
    },
    heroAlt:
      "Placeholder for the AI reply product hero image showing brand-voice controls and a generated response draft.",
    cardImage: "/images/project_brand_voice_config/project_02_brand_voice_re.png",
    cardImageAlt:
      "Homepage screenshot from the AI reply enhancement project.",
    cardImagePosition: "center 70%",
    heroImage: "/images/project_brand_voice_config/project_02_brand_voice_re.png",
    heroImagePosition: "center 65%",
    context: {
      lead: "Making AI review replies worth sending",
      body: [
        "Nearly 70% of AI-generated replies were edited before publication, so improving the model alone was not going to be enough.",
        "Hotel teams use AIRA to respond to guest reviews without having to write every reply from scratch. It should help them communicate efficiently while maintaining the professionalism guests expect from their brand.",
        "In practice, the generated replies often created more work than anticipated. They could be overly formal, repetitive, generic, or unnecessarily long. Quality varied between languages, and some responses used culturally inappropriate forms of address or introduced details that were not present in the review.",
        "With a new generation of language models becoming available, we had an opportunity to improve the feature. But our investigation showed that simply replacing the existing model would not fix the underlying experience. The interface, configuration options, prompt architecture, and rollout strategy all needed to evolve together.",
      ],
    },
    problem: {
      lead: "A first draft that still needed rewriting",
      body: [
        "The AI Reply feature was already useful as a starting point, but users did not consistently trust the result. Analytics showed that nearly 70% of submitted replies were modified before being sent. Customers were using the AI, but still spending time checking its tone, shortening the response, correcting assumptions, or rewriting it to sound more like their hotel.",
      ],
      bodyImage: {
        src: "/images/project_brand_voice_config/project_02_ai_reply_ismodify_log.png",
        alt: "Analytics log showing AI reply modifications, with nearly 70% of replies edited before sending.",
        width: 1487,
        height: 1058,
        maxHeight: 400,
      },
      bodyAfter: [
        "The existing controls did little to resolve this. Selecting a short response did not always produce something noticeably shorter, while formal and informal options behaved inconsistently across languages. Most replies also followed a predictable formula: thank the guest, repeat something from the review, and finish with a generic closing. Even when the wording changed, the structure made each response feel much like the last.",
      ],
      imageRow: [
        {
          src: "/images/project_brand_voice_config/project_02_ai_reply_settings_old.png",
          alt: "The original AI reply settings, with limited tone and length controls.",
        },
        {
          src: "/images/project_brand_voice_config/project_02_ai_reply_editor.png",
          alt: "The AI reply editor showing a generated draft before manual edits.",
        },
      ],
    },
    research: [
      "Customer feedback and support signals",
      "User interviews with reviewers and managers",
      "Product analytics on reply edit rates",
      "Prompt-system and output analysis",
    ],
    researchNarrative: {
      lead: "Looking beyond the edit rate",
      body: [
        "To understand why users were rewriting so much, we brought together feedback from Customer Success, prospect conversations, customer interviews, behavioral analytics, and a review of the existing generation system.",
      ],
      quoteGroup: {
        intro: "Customer said:",
        quotes: [
          "Replies felt too formal and too long.",
          "More control over tone was needed.",
          "Less common languages needed better support.",
          "The system should learn how each brand communicates.",
          "Existing templates should be usable as a structural foundation.",
          "Brand guidelines and examples should be uploadable.",
          "Personalization and professional quality mattered more than speed.",
        ],
      },
      bodyAfter: [
        "The product did not need to generate faster. It needed to earn trust.",
      ],
    },
    insights: [
      {
        title: "Brand voice is specific",
        detail:
          "Teams had a clear sense of their own tone, and anything close-but-generic read as wrong.",
      },
      {
        title: "Language is cultural, not just literal",
        detail:
          "A polite reply in one market sounded stiff or off in another when translated word-for-word.",
      },
      {
        title: "Editing everything breaks trust",
        detail:
          "When users had to rewrite most replies, they stopped trusting the automation altogether.",
      },
    ],
    insightsNarrative: {
      lead: "Formality is not just a tone-setting",
      body: [
        "One of the most emotionally sensitive issues was how the AI addressed guests in different languages. In German, using the informal “Du” instead of the professional “Sie” could make a response feel inappropriate or disrespectful. Similar inconsistencies appeared in Polish and French, while informal Italian performed more reliably.",
        "This showed that formality could not be handled as a universal preference. Communication norms change by language and market, and some of those norms needed to be protected by the system rather than configured by every customer.",
        "We introduced the concept of centralized cultural guardrails. These would provide professional language-specific defaults while still allowing customers to shape the broader personality of their replies.",
      ],
    },
    decisions: [
      {
        title: "Give teams voice controls",
        detail:
          "Structured brand-voice settings let properties define tone instead of accepting a single default.",
      },
      {
        title: "Add cultural guardrails",
        detail:
          "Language-aware rules keep replies appropriate per market rather than translated literally.",
      },
      {
        title: "Structure the prompt, not the wording",
        detail:
          "A structured prompting system produces consistent, on-brand drafts users can approve with light edits.",
      },
    ],
    decisionsNarrative: {
      lead: "Personal without repeating the guest",
      body: [
        "The AI often tried to make a reply feel personal by reusing wording from the original review. This was especially problematic when the review was negative. Instead of acknowledging an issue and moving the response forward, the AI could fixate on the complaint and repeat it back in slightly different words. The reply unintentionally gave the problem more attention.",
        "In other cases, it did the opposite and overlooked specific operational failures, such as missing breakfast items, broken equipment, or a malfunctioning sauna.",
        "A better reply needed to identify the most meaningful detail, acknowledge it naturally, and avoid copying the guest’s phrasing. Personalization should come from relevance, not repetition.",
      ],
    },
    flow: [
      { step: "01", label: "Set brand voice", detail: "Define tone and cultural guardrails" },
      { step: "02", label: "Generate structured draft", detail: "Compose the reply through structured prompting" },
      { step: "03", label: "Approve with light edits", detail: "Confirm an on-brand response quickly" },
    ],
    developmentNarrative: {
      lead: "Grounding every response in what we know",
      body: [
        "Some of the highest-risk responses included facts that the AI could not verify. For example, the system could refer to a spa or gym even when a guest was complaining that the facility did not exist. A confident and well-written response was still harmful when it contained invented information.",
        "Hence, we treated factual grounding as a non-negotiable rule. Replies should not mention amenities, services, causes, actions, or promises unless that information was explicitly available in the review or approved business context.",
        "Brand voice could remain flexible. Accuracy could not.",
      ],
    },
    solution:
      "The final experience pairs brand-voice controls and cultural guardrails with a structured prompting system, producing consistent drafts that teams can approve rather than rewrite.",
    solutionNarrative: {
      lead: "Brand voice without prompt engineering",
      body: [
        "Customers wanted the AI to sound like their hotel, but not every property has a detailed brand document or an established library of previous replies. The existing product attempted to learn from past responses, but the examples were selected without enough contextual relevance. A response to an unrelated review could influence the new output, producing inconsistent results rather than a recognizable voice. Instead of asking every customer to train the system, we designed two clear ways to begin.",
        "Customers who wanted a ready-to-use experience could rely on a professional default configuration. Those with more specific needs could describe their brand voice in their own words. A boutique hotel might ask for warm, conversational replies with short sentences. A luxury property might prefer restrained, polished language without exaggerated enthusiasm. Both could shape the personality of the response without needing to understand how the prompt worked behind the interface.",
      ],
    },
    outcomes: [
      "Designed structured brand-voice controls and cultural guardrails",
      "Reframed reply generation around structured prompting",
      "Targeted fewer manual edits and renewed trust in automation",
    ],
    outcomesNarrative: {
      lead: "Separating personality from policy",
      body: [
        "Brand voice determines how a reply sounds. Policy constraints determine what it is allowed to say. A hotel could choose to be warm, playful, formal, luxurious, or minimal. But the system should still avoid revealing an anonymous guest’s name, inventing information, repeating harmful language, mentioning competitors, or making unsupported promises.",
      ],
      listIntro: "The configuration was therefore divided into separate layers:",
      list: [
        "**The default settings controlled tone, reply length, and signature behavior.**",
        "**A brand description added the individual character of the hotel.**",
        "**Policy constraints and custom rules defined the boundaries that every generated reply needed to respect.**",
      ],
      bodyAfter: [
        "This made the configuration easier for customers to understand and made the resulting behavior easier for the team to test.",
      ],
      bottomImage: {
        src: "/images/project_brand_voice_config/project_02_brand_voice_settings_concept.png",
        alt: "Concept mockup of the brand-voice settings, showing default configuration, brand description, and policy layers.",
        width: 755,
        height: 579,
        maxHeight: 400,
      },
    },
    learning:
      "Structured prompting is a design problem as much as a technical one. Giving people the right controls up front is what makes AI output feel like theirs.",
    learningNarrative: {
      lead: "Designing the system behind the interface",
      body: [
        "The previous prompt had been created for an older generation of language models. Instructions for tone, formality, length, business rules, and response structure competed within the same prompt. This made it difficult to predict which settings the AI would prioritize.",
        "We reorganized the generation system into a structured architecture with distinct sections for the model’s role, personality, goal, success criteria, constraints, output, and stop rules. Each part of the interface could then be mapped to a clear part of the prompt.",
      ],
      bodyImage: {
        src: "/images/project_brand_voice_config/project_02_prompt_structure.png",
        alt: "Diagram of the structured prompt architecture, mapping interface settings to prompt sections.",
        width: 755,
        height: 411,
        maxHeight: 400,
      },
      imageRow: [
        {
          src: "/images/project_brand_voice_config/project_02_brand_voice_config_default.png",
          alt: "The default brand-voice configuration, with a professional ready-to-use setup.",
        },
        {
          src: "/images/project_brand_voice_config/project_02_brand_voice_config_freetext.png",
          alt: "The free-text brand-voice configuration, letting customers describe their voice in their own words.",
        },
      ],
      closing: [
        "The hotel’s brand description informed the personality. Reply length and formatting belonged to the output. Cultural rules and factual grounding belonged to the constraints. Fallback behavior could be defined separately through stop rules. Rather than being a hidden technical detail, the new prompt architecture became part of the product design. It connected what customers selected in the interface to the behavior they expected from the generated reply.",
      ],
    },
    extraSections: [
      {
        title: "Scope",
        narrative: {
          lead: "Keeping people in control",
          body: [
            "Customers were interested in automated replies, but the research showed that they were not yet willing to hand over complete control.",
            "A single culturally inappropriate or factually incorrect response could damage the relationship between a hotel and its guest. Before moving toward autonomous publishing, the system first needed to produce drafts that required substantially less intervention.",
            "Full automatic sending therefore remained outside the scope of the project. The immediate goal was to improve the quality of the handoff between the AI and the person reviewing its work.",
            "Automation would follow trust, not the other way around.",
          ],
        },
      },
      {
        title: "Rollout",
        narrative: {
          lead: "Changing the model without changing everything at once",
          body: [
            "AI behavior can change in unexpected ways when a model is replaced, particularly across languages and sensitive review contexts. To protect existing customers, the new configuration was designed to run separately from the current production system.",
          ],
          cards: [
            {
              title: "Build in parallel",
              detail:
                "The new brand voice experience, prompt structure, default configuration, and centralized constraints were built while the existing model remained active.",
            },
            {
              title: "Pilot with users",
              detail:
                "The system was introduced to internal users and a selected group of customers, whose feedback improved the prompt, interface, multilingual behavior, and quality metrics.",
            },
            {
              title: "Migrate gradually",
              detail:
                "Remaining customers were migrated once the experience proved stable, and the existing configuration was retired once the new version consistently met the standard.",
            },
          ],
        },
      },
      {
        title: "Solution",
        narrative: {
          lead: "A more predictable AI Reply",
          body: [
            "The resulting concept combined a reliable default configuration with optional brand customization and centralized safeguards.",
            "Customers could begin with a professional setup that already accounted for reply length, signatures, tone, cultural formality, and factual grounding. Hotels that needed a more distinctive voice could describe it without changing the rules that protected reply quality.",
            "Behind the interface, the structured prompt architecture created a clearer relationship between each setting and the generated response. Together, these changes moved AIRA away from being a generic text generator and toward becoming a controlled communication system.",
          ],
        },
      },
      {
        title: "Metrics",
        narrative: {
          lead: "Measuring whether trust improves",
          body: [
            "The project was still moving through discovery and phased development, so the final impact could not yet be measured. The primary target was to reduce the percentage of replies edited before publication from nearly 70% to 50% or less. We also aimed to reduce complaints about incorrect formality by at least 80%, halve customer-reported hallucination issues, and increase regular usage of AI Reply across active properties. These measures focused on behavior rather than output volume. Generating more responses would mean little if users still had to rewrite them.",
          ],
        },
      },
      {
        title: "Reflection",
        narrative: {
          lead: "The bigger lesson",
          body: [
            "What initially appeared to be a model-upgrade project became a redesign of the full system surrounding the model.",
            "The quality of an AI experience does not come from the model alone. It is shaped by the instructions it receives, the context available to it, the choices presented to users, the safeguards that cannot be overridden, and the way new behavior is introduced into the product.",
            "The project also reinforced that flexibility and control are not opposites. Strong defaults and clear constraints can give users more confidence to personalize the experience because they know the essential protections remain in place.",
            "Most importantly, I learned to treat trust as something observable. When users edit fewer replies, encounter fewer tone errors, and become more comfortable relying on the result, trust stops being an abstract ambition and becomes something the product can measure.",
          ],
        },
      },
    ],
    sectionPlan: [
      { title: "Context", parts: ["context"] },
      { title: "Problem", parts: ["problem", "research"] },
      { title: "Solution", parts: ["solution", "outcomes", "learning"] },
      { title: "Rollout", parts: [{ extra: 1 }] },
      { title: "Outcomes", parts: [{ extra: 3 }, { extra: 4 }] },
    ],
  },
  {
    number: "03",
    title: "Scalable design system & token architecture",
    slug: "scalable-design-system-and-token-architecture",
    accent: "peach",
    challenge:
      "Inconsistent components, naming, and accessibility standards made the product harder to scale and maintain.",
    approach:
      "Audited the existing UI, defined design tokens and foundations, then built and documented a reusable component library.",
    outcome:
      "Created a shared source of truth that improved consistency, collaboration, and efficiency across design and development.",
    facts: {
      overview:
        "A WCAG-aligned design system and token architecture connecting Figma, Zeroheight, and the codebase.",
      role: "Product Designer",
      timeline: "Customer Alliance · Berlin",
    },
    heroAlt:
      "Placeholder for the design-system product hero image showing tokens, foundations, and a component library.",
    cardImage: "/images/project_design_system/project_03_design_system_re.png",
    cardImageAlt:
      "Homepage screenshot from the scalable design system and token architecture project.",
    cardImagePosition: "center 68%",
    heroImage: "/images/project_design_system/project_03_design_system_re.png",
    heroImagePosition: "center 65%",
    context: {
      lead: "Creating a shared design language",
      body: [
        "How could we make a growing product easier to design, build, and maintain without limiting the teams working on it?",
        "As Customer Alliance’s product grew, so did the number of design decisions behind it. Similar components had been created in different ways, naming conventions were inconsistent, and the Figma library no longer provided a complete picture of what existed in the product.",
        "This made even simple interface decisions harder than they needed to be. Designers had to search for the right component or create new components while developers were left to interpret visual specifications that did not always reflect the implemented product.",
        "I led the creation of a design system to bring these decisions into one shared framework. **The goal was not only to build a cleaner component library, but to establish a common language for how the product should look, behave, and be built.**",
      ],
    },
    problem: {
      lead: "Finding the system hidden in the product",
      body: [
        "My first step was to understand what we already had. I reviewed the existing interfaces, Figma files, component patterns, and company brand guidelines. I looked for repeated solutions, conflicting variants, inconsistent naming, missing states, accessibility issues, and differences between design and implementation.",
        "The audit showed that the component inconsistencies were only a symptom. The larger issue was that foundational decisions such as color, typography, spacing, and component structure that were being made without a shared system. Instead of redesigning individual components one at a time, I decided to rebuild the system from the foundations upward.",
      ],
    },
    research: [
      "UI and component audit",
      "Naming and token inventory",
      "Accessibility (WCAG) review",
      "Alignment sessions with engineers",
    ],
    researchNarrative: {
      lead: "Giving every decision a purpose",
      body: [
        "I began by defining a token architecture for the visual decisions used throughout the product. Rather than applying a raw value such as #3917E5 directly to an interface, I separated the system into three layers:",
      ],
      pyramid: {
        swatch: "#3917E5",
        labelColor: "#202326",
        tiers: [
          { label: "Semantic token", token: "color-background-primary", fill: "#c9cdd2" },
          { label: "Global token", token: "color-blue-600", fill: "#dcdfe3" },
          { label: "Raw value", token: "#3917E5", fill: "#eef0f2" },
        ],
        images: [
          {
            label: "Global colours & tokens",
            hint: "Recommended: 1200 × 720 px",
            src: "/images/project_design_system/project_03_global-colors_new.png",
            alt: "Design system global colours — blue, green, and yellow scales shown alongside the theme variable tokens.",
          },
          {
            label: "Badge component",
            hint: "Recommended: 1200 × 720 px",
            src: "/images/project_design_system/project_03_badge_component_new.png",
            alt: "Badge component documentation showing its variants and states across light and dark themes.",
          },
        ],
      },
      bodyAfter: [
        "The global token described the value, while the semantic token explained how it should be used.",
        "This meant designers no longer needed to remember which shade of blue belonged in a particular context. They could choose a token based on its purpose, while the underlying value could be updated centrally in the future.",
        "The same logic was applied to typography, spacing, border radius, shadows, and motion, creating a consistent foundation for every component that followed.",
      ],
    },
    insights: [
      {
        title: "Naming is the real system",
        detail:
          "Most inconsistency traced back to unclear, duplicated naming rather than missing components.",
      },
      {
        title: "Accessibility can't be a late check",
        detail:
          "Standards had to live in the foundations so every component inherited them by default.",
      },
      {
        title: "One source, three surfaces",
        detail:
          "Design, documentation, and code drifted whenever they were maintained separately.",
      },
    ],
    decisions: [
      {
        title: "Define tokens and foundations first",
        detail:
          "A clear token architecture set color, type, spacing, and state before component work began.",
      },
      {
        title: "Build a documented component library",
        detail:
          "Reusable components shipped with usage guidance so teams applied them consistently.",
      },
      {
        title: "Connect Figma, Zeroheight, and code",
        detail:
          "Linking the three kept the system in sync and resolved inconsistent naming and maintenance issues.",
      },
    ],
    decisionsNarrative: {
      lead: "Building from foundations, not screens",
      body: [
        "With the foundations defined, I began building the component library. The aim was not to support every possible variation. A system with too many options would recreate the same complexity we were trying to remove. Instead, I focused on the variants and states required by real product use cases. Each component followed a consistent structure and naming convention so that designers and developers could understand how it was built before opening it.",
        "Accessibility was considered as part of this process rather than as a final review. Colours, states, behaviours, and component structures needed to work consistently for all users and provide a clearer starting point for meeting accessibility requirements.",
      ],
    },
    flow: [
      { step: "01", label: "Define tokens", detail: "Establish color, type, spacing, and state" },
      { step: "02", label: "Build components", detail: "Create a reusable, accessible library" },
      { step: "03", label: "Document & sync", detail: "Keep Figma, Zeroheight, and code aligned" },
    ],
    developmentNarrative: {
      lead: "Designing for the people building the product",
      body: [
        "A design system has two groups of users: the customers interacting with the final interface and the teams responsible for creating it.",
        "For designers, the system needed to make components easy to find, understand, and adapt without detaching them from the shared foundations. For developers, it needed to clearly communicate component structure, properties, states, and expected behavior.",
        "I therefore aligned the component organization and naming as closely as possible with the way the product would be implemented. This gave design and development a more consistent vocabulary and reduced the number of decisions that needed to be reinterpreted during handoff.",
      ],
    },
    solution:
      "The final system pairs a documented component library with a clear token architecture, kept in sync across Figma, Zeroheight, and the codebase as a single source of truth.",
    solutionNarrative: {
      lead: "Making the rules visible",
      body: [
        "A component library alone would not solve the problem. Without clear guidance, the same components could still be used inconsistently. I documented components as they were developed, covering their purpose, anatomy, variants, states, behaviour, and appropriate use cases. For example, the documentation for the flag component did more than display its visual variations. It explained how the component was constructed, when each variation should be used, and how it should behave within the interface. Writing the documentation also became part of the design process. Whenever a component was difficult to explain, it often revealed that its purpose or structure was not yet clear enough.",
        "The system was maintained in Figma for designers and documented in Zeroheight so developers, product managers, and other stakeholders could access the same guidance without navigating the source design files.",
      ],
      bodyImage: {
        src: "/images/project_design_system/project_03_figma_modal.png",
        alt: "Figma component documentation modal showing structure and guidance for a component.",
        width: 1797,
        height: 571,
      },
      imageRow: [
        {
          src: "/images/project_design_system/project_03_zeroheight_modal.png",
          alt: "Zeroheight component documentation modal showing a component's guidance.",
        },
        {
          src: "/images/project_design_system/project_03_zeroheight_modal_usage.png",
          alt: "Zeroheight documentation modal showing a component's usage guidelines.",
        },
      ],
    },
    solutionExtra: {
      lead: "One source of truth",
      listIntro: "The final system brought together:",
      list: [
        "Design principles and accessibility guidance",
        "Colour and semantic tokens",
        "Typography and spacing rules",
        "Border radius, shadows, and motion",
        "Icons and visual assets",
        "Reusable components and variants",
        "Usage, anatomy, and behaviour documentation",
      ],
      bodyAfter: [
        "More importantly, it created a shared framework for making future decisions. Designers gained a reliable starting point instead of recreating common patterns. Developers received clearer specifications for how components should be structured and behave. Product teams gained a common reference for reviewing new features and discussing interface decisions.",
        "The system also made future visual changes easier to manage. Because components were connected to shared semantic tokens, updates could be made at the system level rather than repeated across individual screens.",
      ],
    },
    outcomes: [
      "Established a shared source of truth across design and development",
      "Improved consistency and accessibility compliance (WCAG)",
      "Streamlined design-to-development handoff and collaboration",
    ],
    learning:
      "A design system is only as strong as its naming and governance. Tokens and documentation are what let it scale without becoming another thing to maintain.",
    learningNarrative: {
      lead: "Continuous by design",
      body: [
        "This project taught me that the most important part of a design system is not the number of components it contains. Its value comes from the decisions it removes, the conversations it simplifies, and the alignment it creates between teams.",
        "It also reinforced the importance of solving foundational questions early. A clear token structure or naming convention may appear small in isolation, but it influences every component and product experience built on top of it.",
        "Most importantly, I learned that a design system should never be considered finished. It is a product that needs to evolve alongside the people, technology, and customer needs it supports.",
      ],
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export interface RubricCriterion {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  label: string;
  summary: string;
  highlights: string[];
  accentColor: string;
}

export interface ArticleStats {
  words: number;
  characters: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
  extractedKeywords: string[];
}

export interface CompetitorStanding {
  rank: number;
  competitor: string;
  match: string;
  articleTitle: string;
  score: string;
  status: string;
  isCurrentUser?: boolean;
}

export const FIXED_AYESHA_SCORE = 92;
export const OPPONENT_GREY_SCORE = 86;

export const COMPETITOR_USER = 'Ayesha Khan';
export const COMPETITOR_OPPONENT = 'Grey Bill Greeth';
export const MATCH_LABEL = 'Match 1';

export const SAMPLE_ARTICLE_TITLE = 'The Architecture of Trust in Modern Digital Journalism';

export const SAMPLE_ARTICLE_BODY = `In an era defined by instantaneous information streams, the credibility of digital journalism depends on disciplined clarity, verifiable sourcing, and thoughtful language. Readers no longer merely scan headlines for breaking developments; they look for analytical depth that transforms fragmented facts into coherent understanding.

Strong article writing begins with intentional wording. Rather than burying insights beneath ornate phrasing, effective writers pair precise verbs with concrete evidence. Transitions bridge complex ideas seamlessly, guiding the audience from foundational context toward forward-looking synthesis without sacrificing nuance or intellectual rigor.

Equally essential is strategic vocabulary. Impressive keywords—such as algorithmic transparency, editorial accountability, cognitive synthesis, and civic resilience—anchor an argument within contemporary discourse. When integrated naturally, these terms elevate readability, strengthen search discoverability, and signal genuine subject-matter mastery.

Ultimately, enduring articles balance analytical authority with human resonance. By pairing structured reasoning with memorable phrasing, a writer earns the rarest asset in modern publishing: sustained reader trust.`;

export const EVALUATION_CRITERIA: RubricCriterion[] = [
  {
    id: 'wording',
    title: 'Good Wording & Diction',
    score: 94,
    maxScore: 100,
    label: 'Strong Phrasing',
    summary:
      'Consistent active voice, natural rhythmic transitions, and clear sentence variety keep the prose crisp and authoritative from opening to conclusion.',
    highlights: [
      'Balanced sentence cadence with zero filler phrases',
      'Precise verbs and clear editorial tone throughout',
      'Smooth paragraph transitions connecting thesis points',
    ],
    accentColor: '#1A73E8',
  },
  {
    id: 'keywords',
    title: 'Impressive Keywords & Vocabulary',
    score: 91,
    maxScore: 100,
    label: 'Rich Terminology',
    summary:
      'High-value domain vocabulary is woven organically into key arguments, elevating semantic depth and topical authority without feeling forced.',
    highlights: [
      'Natural integration of high-impact analytical terms',
      'Distinctive lexical variety across body paragraphs',
      'Strong topical relevance and memorable phrasing',
    ],
    accentColor: '#34A853',
  },
  {
    id: 'structure',
    title: 'Structure & Coherence',
    score: 92,
    maxScore: 100,
    label: 'Well-Organized',
    summary:
      'The article follows a clear three-part editorial arc: an engaging framing hook, evidence-backed middle sections, and a decisive concluding insight.',
    highlights: [
      'Immediate thesis clarity in the opening paragraph',
      'Logical progression across supporting paragraphs',
      'Concluding synthesis ties back to central claim',
    ],
    accentColor: '#FBBC05',
  },
  {
    id: 'engagement',
    title: 'Reader Clarity & Impact',
    score: 91,
    maxScore: 100,
    label: 'Engaging Read',
    summary:
      'Accessible readability paired with persuasive reasoning ensures both general readers and competition judges remain engaged end-to-end.',
    highlights: [
      'High clarity index across multi-clause sentences',
      'Compelling opening and memorable closing takeaway',
      'Consistent audience focus suitable for publication',
    ],
    accentColor: '#EA4335',
  },
];

export const CURATED_IMPRESSIVE_KEYWORDS = [
  'Analytical depth',
  'Intentional wording',
  'Editorial authority',
  'Coherent synthesis',
  'Semantic precision',
  'Reader trust',
];

export const RUBRIC_BANDS = [
  {
    band: '90% – 100%',
    rating: 'Good Article — Distinction Tier',
    description:
      'Demonstrates exceptional wording, impressive keyword mastery, cohesive structure, and publication-ready clarity.',
  },
  {
    band: '80% – 89%',
    rating: 'Proficient Entry',
    description:
      'Well-structured writing with solid vocabulary and clear arguments, though minor transitions or phrasing can be sharpened.',
  },
  {
    band: '70% – 79%',
    rating: 'Developing Draft',
    description:
      'Conveys the main idea effectively but relies on repetitive phrasing or uneven paragraph pacing.',
  },
];

export const MATCH_STANDINGS: CompetitorStanding[] = [
  {
    rank: 1,
    competitor: 'Ayesha Khan',
    match: 'Match 1',
    articleTitle: 'Current Submission',
    score: '92%',
    status: 'Leading Match 1',
    isCurrentUser: true,
  },
  {
    rank: 2,
    competitor: 'Grey Bill Greeth',
    match: 'Match 1',
    articleTitle: 'Search Patterns & Public Knowledge',
    score: '86%',
    status: 'Completed Entry',
  },
  {
    rank: 3,
    competitor: 'Elena Rostova',
    match: 'Match 2',
    articleTitle: 'Signal Over Noise in Science Media',
    score: '89%',
    status: 'Match 2 Winner',
  },
  {
    rank: 4,
    competitor: 'Marcus Vance',
    match: 'Match 2',
    articleTitle: 'Civic Design for Open Information',
    score: '84%',
    status: 'Completed Entry',
  },
];

const STOP_WORDS = new Set([
  'about', 'above', 'after', 'again', 'against', 'all', 'also', 'although', 'always', 'among',
  'an', 'and', 'another', 'any', 'are', 'around', 'as', 'at', 'be', 'because', 'been', 'before',
  'being', 'below', 'between', 'both', 'but', 'by', 'can', 'could', 'did', 'do', 'does', 'doing',
  'down', 'during', 'each', 'either', 'else', 'enough', 'even', 'every', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'however', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just',
  'keep', 'less', 'like', 'likely', 'made', 'make', 'many', 'may', 'me', 'might', 'more', 'most',
  'much', 'must', 'my', 'myself', 'near', 'never', 'new', 'next', 'no', 'nor', 'not', 'now', 'of',
  'off', 'often', 'on', 'once', 'one', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out',
  'over', 'own', 'perhaps', 'rather', 'really', 'same', 'see', 'several', 'she', 'should', 'since',
  'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then',
  'there', 'these', 'they', 'this', 'those', 'though', 'through', 'throughout', 'thus', 'to',
  'too', 'under', 'until', 'up', 'upon', 'us', 'use', 'used', 'using', 'very', 'was', 'way', 'we',
  'well', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with',
  'within', 'without', 'would', 'yet', 'you', 'your', 'yours', 'yourself',
]);

export function analyzeArticleText(text: string): ArticleStats {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      words: 0,
      characters: 0,
      sentences: 0,
      paragraphs: 0,
      readingMinutes: 0,
      extractedKeywords: [],
    };
  }

  const wordMatches = trimmed.match(/[A-Za-z0-9'-]+/g) || [];
  const words = wordMatches.length;
  const characters = trimmed.length;
  const sentences = Math.max(
    1,
    trimmed.split(/[.!?]+/).filter((part) => part.trim().length > 0).length
  );
  const paragraphs = Math.max(
    1,
    trimmed.split(/\n\s*\n/).filter((part) => part.trim().length > 0).length
  );
  const readingMinutes = Math.max(1, Math.ceil(words / 200));

  const frequency = new Map<string, number>();
  for (const rawWord of wordMatches) {
    const clean = rawWord.toLowerCase().replace(/^['-]+|['-]+$/g, '');
    if (clean.length >= 6 && !STOP_WORDS.has(clean) && !/^\d+$/.test(clean)) {
      frequency.set(clean, (frequency.get(clean) || 0) + 1);
    }
  }

  const sorted = Array.from(frequency.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return b[0].length - a[0].length;
    })
    .slice(0, 6)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));

  return {
    words,
    characters,
    sentences,
    paragraphs,
    readingMinutes,
    extractedKeywords: sorted,
  };
}

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

export interface MatchConfig {
  id: 'match1' | 'match2' | 'match3';
  label: string;
  bracketSubtitle: string;
  user: string;
  opponent: string;
  opponentArticleTitle: string;
  userScore: number;
  opponentScore: number;
  sampleTitle: string;
  sampleBody: string;
  criteria: RubricCriterion[];
  curatedKeywords: string[];
}

export interface CompetitorStanding {
  rank: number;
  competitor: string;
  match: string;
  articleTitle: string;
  score: string;
  status: string;
  isMatch1User?: boolean;
  isMatch2User?: boolean;
  isMatch3User?: boolean;
  isMatch3Opponent?: boolean;
}

export const COMPETITOR_USER = 'Ayesha Khan';

export const MATCH_1_OPPONENT = 'Grey Bill Greeth';
export const MATCH_1_USER_SCORE = 92;
export const MATCH_1_OPPONENT_SCORE = 86;

export const MATCH_2_OPPONENT = 'Cheu Mingi';
export const MATCH_2_USER_SCORE = 91;
export const MATCH_2_OPPONENT_SCORE = 90;

export const MATCH_3_OPPONENT = 'Adelle Charles';
export const MATCH_3_USER_SCORE = 97;
export const MATCH_3_OPPONENT_SCORE = 96;

export const MATCH_1_CONFIG: MatchConfig = {
  id: 'match1',
  label: 'Match 1',
  bracketSubtitle: 'Round 1 · Completed Bracket',
  user: COMPETITOR_USER,
  opponent: MATCH_1_OPPONENT,
  opponentArticleTitle: 'Search Patterns & Public Knowledge',
  userScore: MATCH_1_USER_SCORE,
  opponentScore: MATCH_1_OPPONENT_SCORE,
  sampleTitle: 'The Architecture of Trust in Modern Digital Journalism',
  sampleBody: `In an era defined by instantaneous information streams, the credibility of digital journalism depends on disciplined clarity, verifiable sourcing, and thoughtful language. Readers no longer merely scan headlines for breaking developments; they look for analytical depth that transforms fragmented facts into coherent understanding.

Strong article writing begins with intentional wording. Rather than burying insights beneath ornate phrasing, effective writers pair precise verbs with concrete evidence. Transitions bridge complex ideas seamlessly, guiding the audience from foundational context toward forward-looking synthesis without sacrificing nuance or intellectual rigor.

Equally essential is strategic vocabulary. Impressive keywords—such as algorithmic transparency, editorial accountability, cognitive synthesis, and civic resilience—anchor an argument within contemporary discourse. When integrated naturally, these terms elevate readability, strengthen search discoverability, and signal genuine subject-matter mastery.

Ultimately, enduring articles balance analytical authority with human resonance. By pairing structured reasoning with memorable phrasing, a writer earns the rarest asset in modern publishing: sustained reader trust.`,
  criteria: [
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
  ],
  curatedKeywords: [
    'Analytical depth',
    'Intentional wording',
    'Editorial authority',
    'Coherent synthesis',
    'Semantic precision',
    'Reader trust',
  ],
};

export const MATCH_2_CONFIG: MatchConfig = {
  id: 'match2',
  label: 'Match 2',
  bracketSubtitle: 'Quarterfinal · Completed Bracket',
  user: COMPETITOR_USER,
  opponent: MATCH_2_OPPONENT,
  opponentArticleTitle: 'Civic Protocols for Open Knowledge',
  userScore: MATCH_2_USER_SCORE,
  opponentScore: MATCH_2_OPPONENT_SCORE,
  sampleTitle: 'Designing Humane Intelligence for Everyday Civic Systems',
  sampleBody: `As automated tools become woven into public infrastructure, the measure of technological progress is shifting from raw speed to human legibility. Communities thrive when digital systems explain their reasoning clearly, respect local context, and empower citizens rather than obscuring decisions behind opaque interfaces.

Compelling editorial writing captures this transformation through measured wording. Every sentence should carry deliberate weight—replacing vague abstractions with concrete civic outcomes, balanced evidence, and disciplined transitions that invite critical reflection.

Thoughtful terminology further sharpens an article's persuasive reach. Impressive keywords—such as civic resilience, algorithmic clarity, institutional accountability, and participatory design—ground complex policy debates in clear language readers immediately recognize and remember.

When writers unite clear structure with principled language, they illuminate how innovation serves everyday people. That synthesis of precision and empathy defines enduring modern journalism.`,
  criteria: [
    {
      id: 'wording',
      title: 'Good Wording & Diction',
      score: 92,
      maxScore: 100,
      label: 'Strong Phrasing',
      summary:
        'Poised editorial phrasing, active verbs, and clean sentence pacing establish clear authority while maintaining natural readability.',
      highlights: [
        'Crisp, purposeful phrasing with zero redundant clauses',
        'Consistent tone balanced between analysis and accessibility',
        'Measured transitions linking thesis claims smoothly',
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
        'Well-chosen topical keywords reinforce thematic depth and conceptual clarity without interrupting the natural flow of the prose.',
      highlights: [
        'High-precision domain vocabulary anchored in context',
        'Strong lexical diversity across supporting arguments',
        'Memorable conceptual terms that strengthen recall',
      ],
      accentColor: '#34A853',
    },
    {
      id: 'structure',
      title: 'Structure & Coherence',
      score: 90,
      maxScore: 100,
      label: 'Well-Organized',
      summary:
        'Clean paragraph architecture leads readers smoothly from opening framing through analytical proof to a resonant final conclusion.',
      highlights: [
        'Clear thesis anchor established in the lead paragraph',
        'Cohesive progression across body paragraphs',
        'Decisive closing synthesis reinforcing the central argument',
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
        'Persuasive clarity and vivid real-world framing sustain reader attention and satisfy competition rubric standards.',
      highlights: [
        'Immediate readability across complex ideas',
        'Thoughtful hook and memorable concluding statement',
        'Publication-ready polish and clear audience focus',
      ],
      accentColor: '#EA4335',
    },
  ],
  curatedKeywords: [
    'Civic resilience',
    'Algorithmic clarity',
    'Empathetic design',
    'Structured reasoning',
    'Public accountability',
    'Lasting impact',
  ],
};

export const MATCH_3_CONFIG: MatchConfig = {
  id: 'match3',
  label: 'Match 3',
  bracketSubtitle: 'Semifinal Editorial Bracket',
  user: COMPETITOR_USER,
  opponent: MATCH_3_OPPONENT,
  opponentArticleTitle: 'Precision Editorial Craft in the Age of Discovery',
  userScore: MATCH_3_USER_SCORE,
  opponentScore: MATCH_3_OPPONENT_SCORE,
  sampleTitle: 'Why Intentional Language Shapes the Future of Open Discovery',
  sampleBody: `Great writing has always served as civilization's clearest lens—turning sprawling complexity into shared understanding. As knowledge platforms scale across languages and disciplines, the enduring hallmark of exceptional journalism remains human precision: choosing the exact word, testing every premise, and honoring the reader's intelligence.

Commanding wording elevates an argument from informative to unforgettable. Rather than padding paragraphs with predictable clichés, master essayists weave rhythmic syntax with concrete illustration. Every transition earns its place, advancing a cohesive narrative arc where evidence and insight reinforce one another seamlessly.

Equally decisive is lexical sophistication. Impressive keywords—such as epistemic clarity, deliberative synthesis, cultural stewardship, and intellectual rigor—anchor abstract concepts in vivid, memorable phrasing. Used judiciously, specialized vocabulary sharpens search relevance while preserving effortless readability.

When clarity, cadence, and substance converge, an article transcends fleeting commentary. It becomes a durable reference point—proof that disciplined writing remains the cornerstone of meaningful discovery.`,
  criteria: [
    {
      id: 'wording',
      title: 'Good Wording & Diction',
      score: 98,
      maxScore: 100,
      label: 'Exemplary Phrasing',
      summary:
        'Commanding editorial voice with effortless cadence, vivid active verbs, and crystal-clear transitions from opening thesis to closing synthesis.',
      highlights: [
        'Distinctive, publication-grade phrasing throughout every paragraph',
        'Zero filler clauses; high rhetorical precision and rhythm',
        'Seamless transitions connecting evidence to thesis conclusions',
      ],
      accentColor: '#1A73E8',
    },
    {
      id: 'keywords',
      title: 'Impressive Keywords & Vocabulary',
      score: 97,
      maxScore: 100,
      label: 'Exceptional Lexicon',
      summary:
        'High-impact topical vocabulary is integrated seamlessly into arguments, achieving rare semantic precision and memorable conceptual depth.',
      highlights: [
        'Standout conceptual terminology anchored in clear context',
        'Rich lexical diversity across every supporting section',
        'Strong search discoverability paired with natural readability',
      ],
      accentColor: '#34A853',
    },
    {
      id: 'structure',
      title: 'Structure & Coherence',
      score: 97,
      maxScore: 100,
      label: 'Masterful Arc',
      summary:
        'Architecturally sound essay progression with an arresting lead, tightly reasoned body paragraphs, and a resonant, decisive conclusion.',
      highlights: [
        'Compelling opening framing that establishes immediate stakes',
        'Balanced, disciplined paragraph proportions and flow',
        'Closing synthesis ties thematic threads cleanly together',
      ],
      accentColor: '#FBBC05',
    },
    {
      id: 'engagement',
      title: 'Reader Clarity & Impact',
      score: 96,
      maxScore: 100,
      label: 'Outstanding Impact',
      summary:
        'Balances intellectual depth with effortless accessibility, leaving a lasting impression worthy of the competition semifinal.',
      highlights: [
        'Sustained reader momentum from first sentence to last',
        'Memorable central takeaway with real editorial authority',
        'Meets highest Google Article Competition distinction standards',
      ],
      accentColor: '#EA4335',
    },
  ],
  curatedKeywords: [
    'Epistemic clarity',
    'Deliberative synthesis',
    'Intellectual rigor',
    'Cultural stewardship',
    'Rhetorical precision',
    'Durable insight',
  ],
};

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
    competitor: COMPETITOR_USER,
    match: 'Match 3',
    articleTitle: 'Current Match 3 Submission',
    score: `${MATCH_3_USER_SCORE}%`,
    status: 'Winner · Match 3',
    isMatch3User: true,
  },
  {
    rank: 2,
    competitor: MATCH_3_OPPONENT,
    match: 'Match 3',
    articleTitle: MATCH_3_CONFIG.opponentArticleTitle,
    score: `${MATCH_3_OPPONENT_SCORE}%`,
    status: 'Submitted · Target Score',
    isMatch3Opponent: true,
  },
  {
    rank: 3,
    competitor: COMPETITOR_USER,
    match: 'Match 1',
    articleTitle: MATCH_1_CONFIG.sampleTitle,
    score: `${MATCH_1_USER_SCORE}%`,
    status: 'Winner · Match 1',
    isMatch1User: true,
  },
  {
    rank: 4,
    competitor: COMPETITOR_USER,
    match: 'Match 2',
    articleTitle: MATCH_2_CONFIG.sampleTitle,
    score: `${MATCH_2_USER_SCORE}%`,
    status: 'Winner · Match 2',
    isMatch2User: true,
  },
  {
    rank: 5,
    competitor: MATCH_2_OPPONENT,
    match: 'Match 2',
    articleTitle: MATCH_2_CONFIG.opponentArticleTitle,
    score: `${MATCH_2_OPPONENT_SCORE}%`,
    status: 'Completed Entry',
  },
  {
    rank: 6,
    competitor: MATCH_1_OPPONENT,
    match: 'Match 1',
    articleTitle: MATCH_1_CONFIG.opponentArticleTitle,
    score: `${MATCH_1_OPPONENT_SCORE}%`,
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

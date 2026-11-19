import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Award, CheckCircle2, Clock, Download, Sparkles, Trophy } from 'lucide-react';
import {
  analyzeArticleText,
  MATCH_1_OPPONENT,
  MATCH_1_OPPONENT_SCORE,
  MATCH_1_USER_SCORE,
  MATCH_2_OPPONENT,
  MATCH_2_OPPONENT_SCORE,
  MATCH_2_USER_SCORE,
  MatchConfig,
} from '../data/competitionData';

export type EvaluationStage = 'idle' | 'evaluating_user' | 'evaluating_opponent' | 'completed';

interface ScoreResultPanelProps {
  match: MatchConfig;
  stage: Exclude<EvaluationStage, 'idle'>;
  remainingSeconds: number;
  stageDurationSeconds: number;
  title: string;
  body: string;
  submittedAt: string;
  onViewStandings: () => void;
}

function formatCountdown(totalSeconds: number): string {
  const clamped = Math.max(0, Math.ceil(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function useAnimatedValue(target: number, active: boolean, durationMs = 1800): number {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, active, durationMs, prefersReducedMotion]);

  return value;
}

const SLOW_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ScoreResultPanel: React.FC<ScoreResultPanelProps> = ({
  match,
  stage,
  remainingSeconds,
  stageDurationSeconds,
  title,
  body,
  submittedAt,
  onViewStandings,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const stats = analyzeArticleText(body);
  const displayTitle = title.trim() || match.sampleTitle;

  const detectedKeywords =
    stats.extractedKeywords.length >= 3 ? stats.extractedKeywords : match.curatedKeywords;

  const userScoreRevealed = stage === 'evaluating_opponent' || stage === 'completed';
  const opponentRevealed = stage === 'completed';

  const animatedUserScore = useAnimatedValue(match.userScore, userScoreRevealed, 1800);
  const animatedOpponentScore = useAnimatedValue(match.opponentScore, opponentRevealed, 1800);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const targetStrokeOffset = circumference * (1 - match.userScore / 100);

  const stageProgressPct = Math.min(
    100,
    Math.max(
      0,
      ((stageDurationSeconds - remainingSeconds) / Math.max(1, stageDurationSeconds)) * 100
    )
  );

  const handleDownloadReport = () => {
    const matchOutcomeLine =
      stage === 'completed'
        ? `Match Outcome: ${match.user} (${match.userScore}%) defeats ${match.opponent} (${match.opponentScore}%) — ${match.user} Wins ${match.label}!`
        : `Match Outcome: ${match.opponent} score & ${match.label} winning message pending (${formatCountdown(remainingSeconds)} remaining)`;

    const reportLines = [
      'GOOGLE ARTICLE WRITING COMPETITION — OFFICIAL SCORE REPORT',
      '=========================================================',
      `Match: ${match.label} (${match.user} vs ${match.opponent})`,
      `Match 1 Record: ${match.user} (${MATCH_1_USER_SCORE}%) vs ${MATCH_1_OPPONENT} (${MATCH_1_OPPONENT_SCORE}%) — Winner: ${match.user}`,
      `Match 2 Record: ${match.user} (${MATCH_2_USER_SCORE}%) vs ${MATCH_2_OPPONENT} (${MATCH_2_OPPONENT_SCORE}%) — Winner: ${match.user}`,
      `Competitor: ${match.user}`,
      `Article Title: ${displayTitle}`,
      `Submitted At: ${submittedAt}`,
      '',
      `FINAL SCORE: ${match.userScore}% — Good Article`,
      matchOutcomeLine,
      '',
      'CRITERIA BREAKDOWN:',
      ...match.criteria.map(
        (c) => `- ${c.title}: ${c.score}% (${c.label}) — ${c.summary}`
      ),
      '',
      `Word Count: ${stats.words} words | Sentences: ${stats.sentences} | Paragraphs: ${stats.paragraphs}`,
      `Impressive Keywords Highlighted: ${detectedKeywords.join(', ')}`,
    ];

    const blob = new Blob([reportLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ayesha-khan-${match.id}-${match.userScore}-percent-report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Stage 1: 2-minute evaluation delay before revealing Ayesha Khan's score (opponent score stays hidden)
  if (stage === 'evaluating_user') {
    return (
      <motion.section
        aria-labelledby="evaluating-user-heading"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: SLOW_EASE }}
        className="mx-auto mt-8 w-full max-w-4xl"
      >
        <div className="rounded-2xl border border-[#DADCE0] bg-white p-6 sm:p-8 shadow-[0_1px_6px_rgba(32,33,36,0.08)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#1A73E8]">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>Step 1 of 2 · {match.label} Article Review in Progress</span>
                <span aria-hidden="true" className="text-[#5F6368]">·</span>
                <span className="text-[#5F6368]">{submittedAt}</span>
              </div>

              <h2
                id="evaluating-user-heading"
                className="font-display text-2xl font-bold text-[#202124] tracking-tight"
              >
                Evaluating {match.user}&rsquo;s {match.label} Article
              </h2>

              <p className="text-sm text-[#5F6368] max-w-xl leading-relaxed">
                Checking wording quality, impressive keywords, paragraph coherence, and editorial
                clarity for &ldquo;{displayTitle}&rdquo;. Your percentage score will transition in
                gently once the 2-minute review completes.
              </p>
            </div>

            <div className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] px-5 py-4 text-center shrink-0 min-w-[148px]">
              <div className="text-xs font-medium text-[#5F6368]">Score reveals in</div>
              <div className="mt-1 font-mono text-3xl font-bold text-[#1A73E8] tabular-nums">
                {formatCountdown(remainingSeconds)}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-[#5F6368] mb-2">
              <span>Analyzing wording, keywords, and structure ({stats.words} words)</span>
              <span className="font-mono tabular-nums">{Math.round(stageProgressPct)}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E8EAED]">
              <div
                className="h-full rounded-full bg-[#1A73E8] transition-[width] duration-300"
                style={{ width: `${stageProgressPct}%` }}
              />
            </div>
          </div>

          <div className="mt-6 border-t border-[#F1F3F4] pt-4 text-xs text-[#5F6368]">
            <span>
              Submission locked for {match.label} · After {match.user}&rsquo;s percentage appears,{' '}
              {match.opponent}&rsquo;s score and the winning message will reveal after 2 additional
              minutes.
            </span>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <section
      aria-labelledby="evaluation-result-heading"
      className="mx-auto mt-8 w-full max-w-4xl space-y-6"
    >
      {/* Winning Message Banner — slowly expands & fades in after both 2-minute delays complete */}
      <AnimatePresence>
        {stage === 'completed' && (
          <motion.div
            key="winning-announcement"
            role="status"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, height: 0, y: 12, overflow: 'hidden' }
            }
            animate={{ opacity: 1, height: 'auto', y: 0, overflow: 'visible' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 1.35, delay: 0.9, ease: SLOW_EASE }}
          >
            <div className="rounded-2xl border border-[#CEEAD6] bg-[#E6F4EA] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#34A853] text-white">
                  <Trophy className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#137333]">
                    Official {match.label} Winning Announcement
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
                    Congratulations, {match.user}! You Won {match.label} ({match.userScore}% vs{' '}
                    {match.opponentScore}%)
                  </h3>
                  <p className="mt-1 text-sm text-[#3C4043]">
                    {match.user} defeated {match.opponent} by a +
                    {match.userScore - match.opponentScore}% margin with superior wording and
                    impressive keyword depth.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onViewStandings}
                className="rounded-md bg-[#137333] px-4 py-2 text-sm font-medium text-white hover:bg-[#0D652D] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#137333]"
              >
                View Standings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Score Summary Card — slowly transitions in after Delay 1 */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.15, ease: SLOW_EASE }}
        className="rounded-2xl border border-[#DADCE0] bg-white p-6 sm:p-8 shadow-[0_1px_6px_rgba(32,33,36,0.08)]"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left: Slowly animating Score Gauge + Verdict */}
          <div className="flex items-center gap-6">
            <div className="relative h-32 w-32 shrink-0 flex items-center justify-center">
              <svg
                className="h-32 w-32 -rotate-90"
                viewBox="0 0 120 120"
                role="img"
                aria-label={`${match.userScore} percent score gauge`}
              >
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#E8EAED"
                  strokeWidth="10"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#34A853"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={prefersReducedMotion ? false : { strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: targetStrokeOffset }}
                  transition={{ duration: 1.8, ease: SLOW_EASE }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-display text-3xl font-bold text-[#202124] tabular-nums">
                  {animatedUserScore}%
                </span>
                <span className="text-[11px] font-medium text-[#137333]">Score</span>
              </div>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.45, ease: SLOW_EASE }}
              className="min-w-0"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#137333]">
                <CheckCircle2 className="h-4 w-4 text-[#34A853]" aria-hidden="true" />
                <span>{match.label} Evaluation Complete</span>
                <span aria-hidden="true" className="text-[#5F6368]">·</span>
                <span className="text-[#5F6368]">{submittedAt}</span>
              </div>

              <h2
                id="evaluation-result-heading"
                className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight"
              >
                {animatedUserScore}% — Good Article
              </h2>

              <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-[#5F6368] max-w-xl">
                Strong editorial submission by{' '}
                <span className="font-semibold text-[#202124]">{match.user}</span>. Recognized for
                good wording, impressive keywords, cohesive structure, and crisp reader clarity.
              </p>
            </motion.div>
          </div>

          {/* Right: Download Report Action */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: SLOW_EASE }}
            className="flex flex-wrap md:flex-col items-stretch sm:items-center md:items-end gap-2.5 shrink-0"
          >
            <button
              type="button"
              onClick={handleDownloadReport}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#DADCE0] bg-white px-4 py-2 text-sm font-medium text-[#1A73E8] hover:bg-[#F8F9FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Report
            </button>
          </motion.div>
        </div>

        {/* Head-to-Head Comparison (Opponent % and winning message wait 2 more minutes) */}
        <div className="mt-8 border-t border-[#F1F3F4] pt-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 className="font-display text-sm font-semibold text-[#202124] flex items-center gap-2">
              <Award className="h-4 w-4 text-[#FBBC05]" aria-hidden="true" />
              {match.label} Head-to-Head Result
            </h3>
            <button
              type="button"
              onClick={onViewStandings}
              className="text-xs font-medium text-[#1A73E8] hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              View Full Standings
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Ayesha Khan Card */}
            <div className="rounded-xl border border-[#D2E3FC] bg-[#F8FBFF] p-4">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-[#202124]">{match.user}</span>
                <span className="font-mono font-semibold text-[#137333] tabular-nums">
                  {stage === 'completed'
                    ? `${animatedUserScore}% · Winner`
                    : `${animatedUserScore}% · Evaluated`}
                </span>
              </div>
              <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[#E8EAED]">
                <motion.div
                  className="h-full rounded-full bg-[#34A853]"
                  initial={prefersReducedMotion ? false : { width: '0%' }}
                  animate={{ width: `${match.userScore}%` }}
                  transition={{ duration: 1.8, ease: SLOW_EASE }}
                />
              </div>
            </div>

            {/* Opponent Card: either 2-min countdown or slow-revealed score */}
            {stage === 'evaluating_opponent' ? (
              <div className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-4">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium text-[#202124]">{match.opponent}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#1A73E8] tabular-nums">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Reveals in {formatCountdown(remainingSeconds)}
                  </span>
                </div>
                <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[#E8EAED]">
                  <div
                    className="h-full rounded-full bg-[#FBBC05] transition-[width] duration-300"
                    style={{ width: `${stageProgressPct}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[#5F6368]">
                  Reviewing {match.opponent}&rsquo;s percentage and preparing the official{' '}
                  {match.label} winning message.
                </p>
              </div>
            ) : (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, ease: SLOW_EASE }}
                className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-4"
              >
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium text-[#3C4043]">{match.opponent}</span>
                  <span className="font-mono font-medium text-[#5F6368] tabular-nums">
                    {animatedOpponentScore}% · Opponent
                  </span>
                </div>
                <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[#E8EAED]">
                  <motion.div
                    className="h-full rounded-full bg-[#4285F4]"
                    initial={prefersReducedMotion ? false : { width: '0%' }}
                    animate={{ width: `${match.opponentScore}%` }}
                    transition={{ duration: 1.8, delay: 0.2, ease: SLOW_EASE }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Previous Matches Reference Strip */}
          {match.id === 'match3' && (
            <div className="mt-4 rounded-xl border border-[#E8EAED] bg-[#F8F9FA] px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#5F6368]">
              <span>
                <span className="font-semibold text-[#202124]">Last Matches:</span>{' '}
                Match 1 ({match.user} {MATCH_1_USER_SCORE}% vs {MATCH_1_OPPONENT}{' '}
                {MATCH_1_OPPONENT_SCORE}%) · Match 2 ({match.user} {MATCH_2_USER_SCORE}% vs{' '}
                {MATCH_2_OPPONENT} {MATCH_2_OPPONENT_SCORE}%)
              </span>
              <span className="font-medium text-[#137333]">2–0 Record · {match.user}</span>
            </div>
          )}

          {match.id === 'match2' && (
            <div className="mt-4 rounded-xl border border-[#E8EAED] bg-[#F8F9FA] px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#5F6368]">
              <span>
                <span className="font-semibold text-[#202124]">Previous Result (Match 1):</span>{' '}
                {match.user} ({MATCH_1_USER_SCORE}%) vs {MATCH_1_OPPONENT} ({MATCH_1_OPPONENT_SCORE}
                %)
              </span>
              <span className="font-medium text-[#137333]">Winner: {match.user}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Detailed Evaluation Criteria Grid — gently staggered slow reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {match.criteria.map((criterion, index) => (
          <motion.div
            key={criterion.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.45 + index * 0.25, ease: SLOW_EASE }}
            className="rounded-2xl border border-[#DADCE0] bg-white p-6"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-base font-semibold text-[#202124]">
                {criterion.title}
              </h3>
              <span className="font-mono text-base font-semibold text-[#202124] tabular-nums shrink-0">
                {criterion.score}%
              </span>
            </div>

            <div className="mt-1 text-xs font-medium text-[#5F6368]">
              Rating: {criterion.label}
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F3F4]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: criterion.accentColor }}
                initial={prefersReducedMotion ? false : { width: '0%' }}
                animate={{ width: `${criterion.score}%` }}
                transition={{ duration: 1.4, delay: 0.6 + index * 0.25, ease: SLOW_EASE }}
              />
            </div>

            <p className="mt-3.5 text-sm leading-relaxed text-[#3C4043]">{criterion.summary}</p>

            <ul className="mt-3.5 space-y-1.5 border-t border-[#F1F3F4] pt-3 text-xs text-[#5F6368]">
              {criterion.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#34A853] font-semibold" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Impressive Keywords & Article Statistics — fades in calmly after criteria cards */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.45, ease: SLOW_EASE }}
        className="rounded-2xl border border-[#DADCE0] bg-white p-6 sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-semibold text-[#202124] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#4285F4]" aria-hidden="true" />
              Impressive Keywords &amp; Wording Highlights
            </h3>
            <p className="mt-1 text-sm text-[#5F6368]">
              Key vocabulary and editorial metrics observed in &ldquo;{displayTitle}&rdquo;
            </p>
          </div>
          <div className="font-mono text-xs text-[#5F6368] tabular-nums">
            {stats.words} words · {stats.sentences} sentences · {stats.readingMinutes} min read
          </div>
        </div>

        {/* Structured grid (no pill capsules) */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {detectedKeywords.map((keyword, idx) => (
            <motion.div
              key={`${keyword}-${idx}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 + idx * 0.12, ease: SLOW_EASE }}
              className="rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-3.5 py-2.5 flex items-center justify-between gap-2"
            >
              <span className="text-sm font-medium text-[#202124] truncate">{keyword}</span>
              <span className="text-[11px] font-mono text-[#137333] shrink-0">Strong</span>
            </motion.div>
          ))}
        </div>

        {/* Submitted Article Text Snapshot */}
        <div className="mt-6 border-t border-[#F1F3F4] pt-5">
          <div className="text-xs font-medium text-[#5F6368] mb-2">
            Submitted Article Copy — {match.user} ({match.label})
          </div>
          <div className="rounded-xl border border-[#E8EAED] bg-[#F8F9FA] p-4 max-h-56 overflow-y-auto text-sm leading-relaxed text-[#3C4043] whitespace-pre-line">
            {body}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

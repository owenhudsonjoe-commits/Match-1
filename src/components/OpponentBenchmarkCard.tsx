import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { MatchConfig } from '../data/competitionData';

interface OpponentBenchmarkCardProps {
  match: MatchConfig;
}

export const OpponentBenchmarkCard: React.FC<OpponentBenchmarkCardProps> = ({ match }) => {
  return (
    <section
      aria-labelledby="opponent-benchmark-heading"
      className="mx-auto mb-6 w-full max-w-4xl"
    >
      <div className="rounded-2xl border border-[#DADCE0] bg-[#F8F9FA] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium text-[#1A73E8]">
              <CheckCircle2 className="h-4 w-4 text-[#1A73E8]" aria-hidden="true" />
              <span>{match.label} Opponent Result Posted</span>
              <span aria-hidden="true" className="text-[#5F6368]">·</span>
              <span className="text-[#5F6368]">{match.bracketSubtitle}</span>
            </div>

            <h2
              id="opponent-benchmark-heading"
              className="mt-1 font-display text-lg sm:text-xl font-bold text-[#202124] tracking-tight"
            >
              {match.opponent} scored {match.opponentScore}% in {match.label}
            </h2>

            <p className="mt-1 text-sm text-[#5F6368]">
              Submitted &ldquo;{match.opponentArticleTitle}&rdquo;. Now{' '}
              <span className="font-medium text-[#202124]">{match.user}</span> must write or paste
              her article below to beat {match.opponentScore}%.
            </p>
          </div>

          <div className="rounded-xl border border-[#DADCE0] bg-white px-5 py-3 text-center shrink-0 min-w-[136px]">
            <div className="text-xs font-medium text-[#5F6368]">{match.opponent}</div>
            <div className="mt-0.5 font-mono text-3xl font-bold text-[#202124] tabular-nums">
              {match.opponentScore}%
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5F6368] mb-1.5">
            <span>
              {match.opponent} ({match.opponentScore}%) vs {match.user} (Awaiting Submission)
            </span>
            <span className="font-mono tabular-nums">Target to Beat: {match.opponentScore}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8EAED]">
            <div
              className="h-full rounded-full bg-[#4285F4]"
              style={{ width: `${match.opponentScore}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

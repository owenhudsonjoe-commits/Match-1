import React from 'react';
import {
  COMPETITOR_OPPONENT,
  COMPETITOR_USER,
  FIXED_AYESHA_SCORE,
  MATCH_STANDINGS,
  RUBRIC_BANDS,
} from '../data/competitionData';
import { EvaluationStage } from './ScoreResultPanel';

interface RubricPanelProps {
  onBackToMatch: () => void;
}

export const RubricPanel: React.FC<RubricPanelProps> = ({ onBackToMatch }) => {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-6">
      <div className="rounded-2xl border border-[#DADCE0] bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F1F3F4] pb-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#202124] tracking-tight">
              Official Competition Scoring Rubric
            </h2>
            <p className="mt-1 text-sm text-[#5F6368]">
              How Google Article Competition judges grade wording, impressive keywords, and structure.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToMatch}
            className="rounded-md bg-[#1A73E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1557B0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
          >
            Back to Match 1
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {RUBRIC_BANDS.map((tier) => (
            <div
              key={tier.band}
              className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="font-display text-base font-semibold text-[#202124]">
                  {tier.rating}
                </div>
                <p className="mt-1 text-sm text-[#5F6368] max-w-2xl">{tier.description}</p>
              </div>
              <div className="font-mono text-lg font-bold text-[#1A73E8] tabular-nums shrink-0">
                {tier.band}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface StandingsPanelProps {
  stage: EvaluationStage;
  articleTitle: string;
  onBackToMatch: () => void;
}

export const StandingsPanel: React.FC<StandingsPanelProps> = ({
  stage,
  articleTitle,
  onBackToMatch,
}) => {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-[#DADCE0] bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F1F3F4] pb-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#202124] tracking-tight">
              Competition Standings — Round 1
            </h2>
            <p className="mt-1 text-sm text-[#5F6368]">
              Match 1 features {COMPETITOR_USER} vs {COMPETITOR_OPPONENT}.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToMatch}
            className="rounded-md bg-[#1A73E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1557B0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
          >
            Back to Match 1
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DADCE0] text-xs font-medium text-[#5F6368]">
                <th className="py-3 pr-4">Rank</th>
                <th className="py-3 pr-4">Competitor</th>
                <th className="py-3 pr-4">Match</th>
                <th className="py-3 pr-4">Article Title</th>
                <th className="py-3 pr-4 text-right">Score</th>
                <th className="py-3 pl-4">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F4] text-sm">
              {MATCH_STANDINGS.map((row) => {
                const isUser = Boolean(row.isCurrentUser);
                const isOpponent = row.competitor === COMPETITOR_OPPONENT;

                let resolvedTitle = row.articleTitle;
                let resolvedScore = row.score;
                let resolvedStatus = row.status;

                if (isUser) {
                  resolvedTitle =
                    articleTitle.trim() ||
                    (stage !== 'idle' ? 'Submitted Match 1 Entry' : 'Awaiting Submission');
                  if (stage === 'idle') {
                    resolvedScore = 'Pending';
                    resolvedStatus = 'Ready to Submit';
                  } else if (stage === 'evaluating_user') {
                    resolvedScore = 'Evaluating...';
                    resolvedStatus = 'Review in Progress';
                  } else if (stage === 'evaluating_opponent') {
                    resolvedScore = `${FIXED_AYESHA_SCORE}%`;
                    resolvedStatus = 'Evaluated';
                  } else {
                    resolvedScore = `${FIXED_AYESHA_SCORE}%`;
                    resolvedStatus = 'Winner · Match 1';
                  }
                } else if (isOpponent) {
                  if (stage === 'idle') {
                    resolvedScore = 'Pending';
                    resolvedStatus = 'Awaiting Match 1';
                  } else if (stage === 'evaluating_user' || stage === 'evaluating_opponent') {
                    resolvedScore = 'Evaluating...';
                    resolvedStatus = 'Review in Progress';
                  } else {
                    resolvedScore = row.score;
                    resolvedStatus = row.status;
                  }
                }

                return (
                  <tr key={row.competitor} className={isUser ? 'bg-[#F8FBFF]' : 'bg-white'}>
                    <td className="py-3.5 pr-4 font-mono text-[#5F6368] tabular-nums">
                      #{row.rank}
                    </td>
                    <td className="py-3.5 pr-4 font-semibold text-[#202124] whitespace-nowrap">
                      {row.competitor}
                    </td>
                    <td className="py-3.5 pr-4 text-[#5F6368] whitespace-nowrap">{row.match}</td>
                    <td className="py-3.5 pr-4 text-[#3C4043] max-w-xs truncate">
                      {resolvedTitle}
                    </td>
                    <td className="py-3.5 pr-4 text-right font-mono font-semibold text-[#202124] tabular-nums whitespace-nowrap">
                      {resolvedScore}
                    </td>
                    <td
                      className={`py-3.5 pl-4 text-xs font-medium whitespace-nowrap ${
                        isUser && (stage === 'evaluating_opponent' || stage === 'completed')
                          ? 'text-[#137333]'
                          : 'text-[#5F6368]'
                      }`}
                    >
                      {resolvedStatus}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

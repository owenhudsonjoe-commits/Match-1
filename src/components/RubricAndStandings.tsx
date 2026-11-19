import React from 'react';
import {
  COMPETITOR_USER,
  MATCH_1_OPPONENT,
  MATCH_1_OPPONENT_SCORE,
  MATCH_1_USER_SCORE,
  MATCH_2_OPPONENT,
  MATCH_2_OPPONENT_SCORE,
  MATCH_2_USER_SCORE,
  MATCH_3_OPPONENT,
  MATCH_3_USER_SCORE,
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
            Back to Match 3
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
  match3Stage: EvaluationStage;
  match3ArticleTitle: string;
  onBackToMatch: () => void;
}

export const StandingsPanel: React.FC<StandingsPanelProps> = ({
  match3Stage,
  match3ArticleTitle,
  onBackToMatch,
}) => {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-[#DADCE0] bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F1F3F4] pb-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#202124] tracking-tight">
              Competition Standings — Matches 1, 2 &amp; 3
            </h2>
            <p className="mt-1 text-sm text-[#5F6368]">
              Match 1 ({COMPETITOR_USER} {MATCH_1_USER_SCORE}% vs {MATCH_1_OPPONENT}{' '}
              {MATCH_1_OPPONENT_SCORE}%), Match 2 ({COMPETITOR_USER} {MATCH_2_USER_SCORE}% vs{' '}
              {MATCH_2_OPPONENT} {MATCH_2_OPPONENT_SCORE}%), and Match 3 ({COMPETITOR_USER} vs{' '}
              {MATCH_3_OPPONENT}).
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToMatch}
            className="rounded-md bg-[#1A73E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1557B0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
          >
            Back to Match 3
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
                const isMatch1User = Boolean(row.isMatch1User);
                const isMatch2User = Boolean(row.isMatch2User);
                const isMatch3User = Boolean(row.isMatch3User);
                const isMatch3Opponent = Boolean(row.isMatch3Opponent);

                let resolvedTitle = row.articleTitle;
                let resolvedScore = row.score;
                let resolvedStatus = row.status;

                if (isMatch3User) {
                  resolvedTitle =
                    match3ArticleTitle.trim() ||
                    (match3Stage !== 'idle'
                      ? 'Submitted Match 3 Entry'
                      : 'Awaiting Submission');
                  if (match3Stage === 'idle') {
                    resolvedScore = 'Pending';
                    resolvedStatus = 'Ready to Submit';
                  } else if (match3Stage === 'evaluating_user') {
                    resolvedScore = 'Evaluating...';
                    resolvedStatus = 'Review in Progress';
                  } else if (match3Stage === 'evaluating_opponent') {
                    resolvedScore = `${MATCH_3_USER_SCORE}%`;
                    resolvedStatus = 'Evaluated';
                  } else {
                    resolvedScore = `${MATCH_3_USER_SCORE}%`;
                    resolvedStatus = 'Winner · Match 3';
                  }
                } else if (isMatch3Opponent) {
                  if (match3Stage === 'idle') {
                    resolvedScore = 'Pending';
                    resolvedStatus = 'Awaiting Match 3';
                  } else if (
                    match3Stage === 'evaluating_user' ||
                    match3Stage === 'evaluating_opponent'
                  ) {
                    resolvedScore = 'Evaluating...';
                    resolvedStatus = 'Review in Progress';
                  } else {
                    resolvedScore = row.score;
                    resolvedStatus = row.status;
                  }
                }

                const highlightWinner =
                  isMatch1User ||
                  isMatch2User ||
                  (isMatch3User &&
                    (match3Stage === 'evaluating_opponent' || match3Stage === 'completed'));

                return (
                  <tr
                    key={`${row.match}-${row.competitor}`}
                    className={
                      isMatch1User || isMatch2User || isMatch3User ? 'bg-[#F8FBFF]' : 'bg-white'
                    }
                  >
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
                        highlightWinner ? 'text-[#137333]' : 'text-[#5F6368]'
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

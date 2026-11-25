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
  MATCH_3_OPPONENT_SCORE,
  MATCH_3_USER_SCORE,
  MATCH_4_OPPONENT,
  MATCH_4_OPPONENT_SCORE,
  MATCH_4_USER_SCORE,
  MATCH_5_OPPONENT,
  MATCH_5_OPPONENT_SCORE,
  MATCH_5_USER_SCORE,
  MATCH_6_OPPONENT,
  MATCH_6_USER_SCORE,
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
            Back to Match 6
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
  match6Stage: EvaluationStage;
  match6ArticleTitle: string;
  onBackToMatch: () => void;
}

export const StandingsPanel: React.FC<StandingsPanelProps> = ({
  match6Stage,
  match6ArticleTitle,
  onBackToMatch,
}) => {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-[#DADCE0] bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F1F3F4] pb-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#202124] tracking-tight">
              Competition Standings — Matches 1 to 6 (Quarterfinal)
            </h2>
            <p className="mt-1 text-sm text-[#5F6368]">
              M1 ({MATCH_1_USER_SCORE}% vs {MATCH_1_OPPONENT} {MATCH_1_OPPONENT_SCORE}%), M2 (
              {MATCH_2_USER_SCORE}% vs {MATCH_2_OPPONENT} {MATCH_2_OPPONENT_SCORE}%), M3 (
              {MATCH_3_USER_SCORE}% vs {MATCH_3_OPPONENT} {MATCH_3_OPPONENT_SCORE}%), M4 (
              {MATCH_4_USER_SCORE}% vs {MATCH_4_OPPONENT} {MATCH_4_OPPONENT_SCORE}%), M5 (
              {MATCH_5_USER_SCORE}% vs {MATCH_5_OPPONENT} {MATCH_5_OPPONENT_SCORE}%), and M6 QF (
              {COMPETITOR_USER} vs {MATCH_6_OPPONENT}).
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToMatch}
            className="rounded-md bg-[#1A73E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1557B0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
          >
            Back to Match 6
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
                const isPreviousUserWin =
                  Boolean(row.isMatch1User) ||
                  Boolean(row.isMatch2User) ||
                  Boolean(row.isMatch3User) ||
                  Boolean(row.isMatch4User) ||
                  Boolean(row.isMatch5User);
                const isMatch6User = Boolean(row.isMatch6User);
                const isMatch6Opponent = Boolean(row.isMatch6Opponent);

                let resolvedTitle = row.articleTitle;
                let resolvedScore = row.score;
                let resolvedStatus = row.status;

                if (isMatch6User) {
                  resolvedTitle =
                    match6ArticleTitle.trim() ||
                    (match6Stage !== 'idle'
                      ? 'Submitted Match 6 Entry'
                      : 'Awaiting Submission');
                  if (match6Stage === 'idle') {
                    resolvedScore = 'Pending';
                    resolvedStatus = 'Ready to Submit';
                  } else if (match6Stage === 'evaluating_user') {
                    resolvedScore = 'Evaluating...';
                    resolvedStatus = 'Review in Progress';
                  } else if (match6Stage === 'evaluating_opponent') {
                    resolvedScore = `${MATCH_6_USER_SCORE}%`;
                    resolvedStatus = 'Evaluated';
                  } else {
                    resolvedScore = `${MATCH_6_USER_SCORE}%`;
                    resolvedStatus = 'Winner · Match 6';
                  }
                } else if (isMatch6Opponent) {
                  if (match6Stage === 'idle') {
                    resolvedScore = 'Pending';
                    resolvedStatus = 'Awaiting Match 6';
                  } else if (
                    match6Stage === 'evaluating_user' ||
                    match6Stage === 'evaluating_opponent'
                  ) {
                    resolvedScore = 'Evaluating...';
                    resolvedStatus = 'Review in Progress';
                  } else {
                    resolvedScore = row.score;
                    resolvedStatus = row.status;
                  }
                }

                const highlightWinner =
                  isPreviousUserWin ||
                  (isMatch6User &&
                    (match6Stage === 'evaluating_opponent' || match6Stage === 'completed'));

                return (
                  <tr
                    key={`${row.match}-${row.competitor}`}
                    className={isPreviousUserWin || isMatch6User ? 'bg-[#F8FBFF]' : 'bg-white'}
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

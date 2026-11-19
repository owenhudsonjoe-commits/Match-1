import React from 'react';
import {
  COMPETITOR_USER,
  MATCH_1_OPPONENT,
  MATCH_1_OPPONENT_SCORE,
  MATCH_1_USER_SCORE,
  MATCH_2_OPPONENT,
  MATCH_2_OPPONENT_SCORE,
  MATCH_2_USER_SCORE,
  MatchConfig,
} from '../data/competitionData';

interface GoogleWordmarkProps {
  activeMatch: MatchConfig;
}

export const GoogleWordmark: React.FC<GoogleWordmarkProps> = ({ activeMatch }) => {
  return (
    <section className="pt-8 pb-6 text-center">
      {/* Big Google Title */}
      <h1
        className="font-display text-6xl sm:text-7xl md:text-[5.25rem] font-bold tracking-tight leading-none select-none"
        aria-label="Google"
      >
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </h1>

      <p className="mt-3 font-display text-xl sm:text-2xl font-medium text-[#202124] tracking-tight">
        Article Writing Competition
      </p>

      {/* Clean unboxed active matchup metadata */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:text-base text-[#5F6368]">
        <span className="font-semibold text-[#1A73E8]">{activeMatch.label}</span>
        <span aria-hidden="true">·</span>
        <span className="font-semibold text-[#202124]">{activeMatch.user}</span>
        <span className="text-[#5F6368]">vs</span>
        <span className="font-medium text-[#202124]">{activeMatch.opponent}</span>
        <span aria-hidden="true">·</span>
        <span>{activeMatch.bracketSubtitle}</span>
      </div>

      {/* Previous Matches Score Record (Match 1 & Match 2) */}
      <div className="mt-3 mx-auto inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-xl border border-[#DADCE0] bg-[#F8F9FA] px-4 py-2 text-xs sm:text-sm text-[#3C4043]">
        <span className="font-semibold text-[#202124]">Previous Matches:</span>
        <span className="font-mono tabular-nums">
          <span className="font-semibold text-[#202124]">Match 1:</span>{' '}
          <span className="font-medium text-[#137333]">
            {COMPETITOR_USER} {MATCH_1_USER_SCORE}%
          </span>{' '}
          <span className="text-[#5F6368]">vs</span>{' '}
          <span className="text-[#5F6368]">
            {MATCH_1_OPPONENT} {MATCH_1_OPPONENT_SCORE}%
          </span>
        </span>
        <span aria-hidden="true" className="text-[#DADCE0]">|</span>
        <span className="font-mono tabular-nums">
          <span className="font-semibold text-[#202124]">Match 2:</span>{' '}
          <span className="font-medium text-[#137333]">
            {COMPETITOR_USER} {MATCH_2_USER_SCORE}%
          </span>{' '}
          <span className="text-[#5F6368]">vs</span>{' '}
          <span className="text-[#5F6368]">
            {MATCH_2_OPPONENT} {MATCH_2_OPPONENT_SCORE}%
          </span>
        </span>
      </div>
    </section>
  );
};

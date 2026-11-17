import React from 'react';
import {
  COMPETITOR_OPPONENT,
  COMPETITOR_USER,
  MATCH_LABEL,
} from '../data/competitionData';

export const GoogleWordmark: React.FC = () => {
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

      {/* Clean unboxed Match 1 matchup metadata */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:text-base text-[#5F6368]">
        <span className="font-semibold text-[#1A73E8]">{MATCH_LABEL}</span>
        <span aria-hidden="true">·</span>
        <span className="font-semibold text-[#202124]">{COMPETITOR_USER}</span>
        <span className="text-[#5F6368]">vs</span>
        <span className="font-medium text-[#202124]">{COMPETITOR_OPPONENT}</span>
        <span aria-hidden="true">·</span>
        <span>Editorial Essay Bracket</span>
      </div>
    </section>
  );
};

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
  MATCH_6_OPPONENT_SCORE,
  MATCH_6_USER_SCORE,
  MatchConfig,
} from '../data/competitionData';

interface GoogleWordmarkProps {
  activeMatch: MatchConfig;
}

export const GoogleWordmark: React.FC<GoogleWordmarkProps> = ({ activeMatch }) => {
  const previousMatches = [
    {
      label: 'Match 1 · R16',
      userScore: MATCH_1_USER_SCORE,
      opponent: MATCH_1_OPPONENT,
      opponentScore: MATCH_1_OPPONENT_SCORE,
    },
    {
      label: 'Match 2 · R16',
      userScore: MATCH_2_USER_SCORE,
      opponent: MATCH_2_OPPONENT,
      opponentScore: MATCH_2_OPPONENT_SCORE,
    },
    {
      label: 'Match 3 · R16',
      userScore: MATCH_3_USER_SCORE,
      opponent: MATCH_3_OPPONENT,
      opponentScore: MATCH_3_OPPONENT_SCORE,
    },
    {
      label: 'Match 4 · R16',
      userScore: MATCH_4_USER_SCORE,
      opponent: MATCH_4_OPPONENT,
      opponentScore: MATCH_4_OPPONENT_SCORE,
    },
    {
      label: 'Match 5 · R16',
      userScore: MATCH_5_USER_SCORE,
      opponent: MATCH_5_OPPONENT,
      opponentScore: MATCH_5_OPPONENT_SCORE,
    },
    {
      label: 'Match 6 · QF',
      userScore: MATCH_6_USER_SCORE,
      opponent: MATCH_6_OPPONENT,
      opponentScore: MATCH_6_OPPONENT_SCORE,
    },
  ];

  const isSemifinalActive = activeMatch.id === 'match7';

  return (
    <section className="pt-8 pb-6 text-center">
      {/* Unboxed Stage Kicker */}
      <div className="mb-2.5 flex items-center justify-center gap-2 text-xs font-medium text-[#5F6368]">
        <span className="font-semibold text-[#B06000]">
          {isSemifinalActive ? 'Semifinal Stage' : activeMatch.label}
        </span>
        <span aria-hidden="true">·</span>
        <span>
          {isSemifinalActive ? 'Final Four Editorial Bracket' : activeMatch.bracketSubtitle}
        </span>
      </div>

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

      {/* Elevated Semifinal Matchup Header Card */}
      <div className="mt-5 mx-auto max-w-2xl rounded-2xl border border-[#DADCE0] bg-white px-5 py-3.5 shadow-[0_1px_4px_rgba(32,33,36,0.06)]">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium text-[#5F6368]">
          <span className="font-semibold text-[#1A73E8]">{activeMatch.label}</span>
          <span aria-hidden="true">·</span>
          <span>{activeMatch.bracketSubtitle}</span>
          {isSemifinalActive && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#137333] font-medium">6–0 Unbeaten Run</span>
            </>
          )}
        </div>

        <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base sm:text-lg">
          <span className="font-display font-bold text-[#202124]">{activeMatch.user}</span>
          <span className="font-mono text-xs font-semibold text-[#B06000]">vs</span>
          <span className="font-display font-semibold text-[#3C4043]">{activeMatch.opponent}</span>
        </div>
      </div>

      {/* Last Matches Score Ledger (Round of 16 & Quarterfinal: Matches 1–6) */}
      <div className="mt-3.5 mx-auto max-w-5xl rounded-2xl border border-[#E8EAED] bg-[#F8F9FA]/90 px-4 py-3 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2.5 border-b border-[#E8EAED] text-xs">
          <span className="font-semibold text-[#202124]">
            Last Matches Score Record (Round of 16 &amp; Quarterfinal)
          </span>
          <span className="font-mono text-[#137333] font-medium tabular-nums">
            Ayesha Khan · 6 Wins · 0 Losses
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2 text-xs">
          {previousMatches.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-2 py-0.5 font-mono tabular-nums"
            >
              <span className="text-[#5F6368] shrink-0">{item.label}</span>
              <span className="truncate text-right">
                <span className="font-semibold text-[#137333]">
                  {COMPETITOR_USER.split(' ')[0]} {item.userScore}%
                </span>{' '}
                <span className="text-[#80868B]">vs</span>{' '}
                <span className="text-[#3C4043]">
                  {item.opponent} {item.opponentScore}%
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

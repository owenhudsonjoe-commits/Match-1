import React from 'react';

export type ActiveTab = 'match6' | 'history' | 'rubric' | 'standings';

interface TopBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  hasSubmittedMatch6: boolean;
  onFocusEditor: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  hasSubmittedMatch6,
  onFocusEditor,
}) => {
  return (
    <header className="w-full border-b border-[#DADCE0] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('match6')}
          className="font-display text-lg font-semibold tracking-tight text-[#202124] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 rounded-sm"
        >
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
          <span className="ml-1.5 font-medium text-[#5F6368]">Articles</span>
        </button>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          <button
            type="button"
            onClick={() => onSelectTab('match6')}
            className={`whitespace-nowrap shrink-0 cursor-pointer py-1 transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 ${
              activeTab === 'match6'
                ? 'border-[#1A73E8] text-[#1A73E8]'
                : 'border-transparent text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            Match 6
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('history')}
            className={`whitespace-nowrap shrink-0 cursor-pointer py-1 transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 ${
              activeTab === 'history'
                ? 'border-[#1A73E8] text-[#1A73E8]'
                : 'border-transparent text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            Last Matches
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('rubric')}
            className={`whitespace-nowrap shrink-0 cursor-pointer py-1 transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 ${
              activeTab === 'rubric'
                ? 'border-[#1A73E8] text-[#1A73E8]'
                : 'border-transparent text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            Scoring Rubric
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('standings')}
            className={`whitespace-nowrap shrink-0 cursor-pointer py-1 transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 ${
              activeTab === 'standings'
                ? 'border-[#1A73E8] text-[#1A73E8]'
                : 'border-transparent text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            Standings
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          {hasSubmittedMatch6 ? (
            <button
              type="button"
              onClick={() => onSelectTab('standings')}
              className="rounded-md bg-[#1A73E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1557B0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2"
            >
              View Standings
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onSelectTab('match6');
                onFocusEditor();
              }}
              className="rounded-md bg-[#1A73E8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1557B0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2"
            >
              Write Entry
            </button>
          )}
        </div>
      </div>

      {/* Mobile navigation fallback for narrow viewports */}
      <div className="flex md:hidden items-center gap-5 overflow-x-auto border-t border-[#F1F3F4] px-6 py-2.5 text-sm font-medium">
        <button
          type="button"
          onClick={() => onSelectTab('match6')}
          className={`whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'match6' ? 'text-[#1A73E8]' : 'text-[#5F6368]'
          }`}
        >
          Match 6
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('history')}
          className={`whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'history' ? 'text-[#1A73E8]' : 'text-[#5F6368]'
          }`}
        >
          Last Matches
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('rubric')}
          className={`whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'rubric' ? 'text-[#1A73E8]' : 'text-[#5F6368]'
          }`}
        >
          Scoring Rubric
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('standings')}
          className={`whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'standings' ? 'text-[#1A73E8]' : 'text-[#5F6368]'
          }`}
        >
          Standings
        </button>
      </div>
    </header>
  );
};

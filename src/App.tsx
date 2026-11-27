import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArticleEditor } from './components/ArticleEditor';
import { GoogleWordmark } from './components/GoogleWordmark';
import { RubricPanel, StandingsPanel } from './components/RubricAndStandings';
import { EvaluationStage, ScoreResultPanel } from './components/ScoreResultPanel';
import { ActiveTab, TopBar } from './components/TopBar';
import {
  MATCH_1_CONFIG,
  MATCH_1_OPPONENT_SCORE,
  MATCH_1_USER_SCORE,
  MATCH_2_CONFIG,
  MATCH_2_OPPONENT_SCORE,
  MATCH_2_USER_SCORE,
  MATCH_3_CONFIG,
  MATCH_3_OPPONENT_SCORE,
  MATCH_3_USER_SCORE,
  MATCH_4_CONFIG,
  MATCH_4_OPPONENT_SCORE,
  MATCH_4_USER_SCORE,
  MATCH_5_CONFIG,
  MATCH_5_OPPONENT_SCORE,
  MATCH_5_USER_SCORE,
  MATCH_6_CONFIG,
  MATCH_6_OPPONENT_SCORE,
  MATCH_6_USER_SCORE,
  MATCH_7_CONFIG,
} from './data/competitionData';

const USER_EVAL_DELAY_SECONDS = 120; // 2 minutes to show user's 92% score
const OPPONENT_EVAL_DELAY_SECONDS = 120; // 2 more minutes to show Kevin Foster 90% & winning message

type HistoryMatchId = 'match6' | 'match5' | 'match4' | 'match3' | 'match2' | 'match1';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<ActiveTab>('match7');
  const [selectedHistoryMatch, setSelectedHistoryMatch] = useState<HistoryMatchId>('match6');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');

  const [submittedTitle, setSubmittedTitle] = useState('');
  const [submittedBody, setSubmittedBody] = useState('');
  const [submittedAt, setSubmittedAt] = useState('');
  const [submissionTimestampMs, setSubmissionTimestampMs] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const totalWaitSeconds = USER_EVAL_DELAY_SECONDS + OPPONENT_EVAL_DELAY_SECONDS;
  const elapsedSeconds =
    submissionTimestampMs !== null ? Math.max(0, (nowMs - submissionTimestampMs) / 1000) : 0;

  let match7Stage: EvaluationStage = 'idle';
  let remainingSeconds = 0;
  let stageDurationSeconds = USER_EVAL_DELAY_SECONDS;

  if (submissionTimestampMs !== null) {
    if (elapsedSeconds < USER_EVAL_DELAY_SECONDS) {
      match7Stage = 'evaluating_user';
      remainingSeconds = USER_EVAL_DELAY_SECONDS - elapsedSeconds;
      stageDurationSeconds = USER_EVAL_DELAY_SECONDS;
    } else if (elapsedSeconds < totalWaitSeconds) {
      match7Stage = 'evaluating_opponent';
      remainingSeconds = totalWaitSeconds - elapsedSeconds;
      stageDurationSeconds = OPPONENT_EVAL_DELAY_SECONDS;
    } else {
      match7Stage = 'completed';
      remainingSeconds = 0;
      stageDurationSeconds = OPPONENT_EVAL_DELAY_SECONDS;
    }
  }

  const hasSubmittedMatch7 = match7Stage !== 'idle';

  useEffect(() => {
    if (submissionTimestampMs === null || match7Stage === 'completed') {
      return;
    }

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [submissionTimestampMs, match7Stage]);

  const handleFocusEditor = () => {
    if (hasSubmittedMatch7) return;
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const handleSubmitArticle = () => {
    if (hasSubmittedMatch7) return;
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setSubmittedTitle(articleTitle);
    setSubmittedBody(articleBody);
    setSubmittedAt(`Submitted today at ${formattedTime}`);
    const ts = Date.now();
    setSubmissionTimestampMs(ts);
    setNowMs(ts);

    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const historyMatchConfig =
    selectedHistoryMatch === 'match1'
      ? MATCH_1_CONFIG
      : selectedHistoryMatch === 'match2'
        ? MATCH_2_CONFIG
        : selectedHistoryMatch === 'match3'
          ? MATCH_3_CONFIG
          : selectedHistoryMatch === 'match4'
            ? MATCH_4_CONFIG
            : selectedHistoryMatch === 'match5'
              ? MATCH_5_CONFIG
              : MATCH_6_CONFIG;

  const activeWordmarkMatch = activeTab === 'history' ? historyMatchConfig : MATCH_7_CONFIG;

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_80%_420px_at_50%_0%,rgba(26,115,232,0.045)_0%,rgba(251,188,5,0.03)_42%,#ffffff_100%)] text-[#202124]">
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        hasSubmittedMatch7={hasSubmittedMatch7}
        onFocusEditor={handleFocusEditor}
      />

      <main className="flex-1 px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <GoogleWordmark activeMatch={activeWordmarkMatch} />

          {activeTab === 'match7' && (
            <>
              <AnimatePresence initial={false}>
                {!hasSubmittedMatch7 && (
                  <motion.div
                    key="article-editor-wrapper"
                    initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, height: 0, overflow: 'hidden' }
                    }
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ArticleEditor
                      match={MATCH_7_CONFIG}
                      title={articleTitle}
                      body={articleBody}
                      onChangeTitle={setArticleTitle}
                      onChangeBody={setArticleBody}
                      onSubmit={handleSubmitArticle}
                      textareaRef={textareaRef}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {match7Stage !== 'idle' && (
                <div ref={resultRef} className="scroll-mt-6">
                  <ScoreResultPanel
                    match={MATCH_7_CONFIG}
                    stage={match7Stage}
                    remainingSeconds={remainingSeconds}
                    stageDurationSeconds={stageDurationSeconds}
                    title={submittedTitle}
                    body={submittedBody}
                    submittedAt={submittedAt}
                    onViewStandings={() => setActiveTab('standings')}
                  />
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <div className="mx-auto w-full max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#DADCE0] bg-[#F8F9FA] p-4">
                <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#E8EAED] p-1">
                  <button
                    type="button"
                    onClick={() => setSelectedHistoryMatch('match6')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedHistoryMatch === 'match6'
                        ? 'bg-white text-[#202124] shadow-sm'
                        : 'text-[#5F6368] hover:text-[#202124]'
                    }`}
                  >
                    Match 6 ({MATCH_6_USER_SCORE}% vs {MATCH_6_OPPONENT_SCORE}%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHistoryMatch('match5')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedHistoryMatch === 'match5'
                        ? 'bg-white text-[#202124] shadow-sm'
                        : 'text-[#5F6368] hover:text-[#202124]'
                    }`}
                  >
                    Match 5 ({MATCH_5_USER_SCORE}% vs {MATCH_5_OPPONENT_SCORE}%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHistoryMatch('match4')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedHistoryMatch === 'match4'
                        ? 'bg-white text-[#202124] shadow-sm'
                        : 'text-[#5F6368] hover:text-[#202124]'
                    }`}
                  >
                    Match 4 ({MATCH_4_USER_SCORE}% vs {MATCH_4_OPPONENT_SCORE}%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHistoryMatch('match3')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedHistoryMatch === 'match3'
                        ? 'bg-white text-[#202124] shadow-sm'
                        : 'text-[#5F6368] hover:text-[#202124]'
                    }`}
                  >
                    Match 3 ({MATCH_3_USER_SCORE}% vs {MATCH_3_OPPONENT_SCORE}%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHistoryMatch('match2')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedHistoryMatch === 'match2'
                        ? 'bg-white text-[#202124] shadow-sm'
                        : 'text-[#5F6368] hover:text-[#202124]'
                    }`}
                  >
                    Match 2 ({MATCH_2_USER_SCORE}% vs {MATCH_2_OPPONENT_SCORE}%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHistoryMatch('match1')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedHistoryMatch === 'match1'
                        ? 'bg-white text-[#202124] shadow-sm'
                        : 'text-[#5F6368] hover:text-[#202124]'
                    }`}
                  >
                    Match 1 ({MATCH_1_USER_SCORE}% vs {MATCH_1_OPPONENT_SCORE}%)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('match7')}
                  className="rounded-md bg-[#1A73E8] px-4 py-2 text-xs font-medium text-white hover:bg-[#1557B0] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Back to Match 7
                </button>
              </div>

              <ScoreResultPanel
                key={historyMatchConfig.id}
                match={historyMatchConfig}
                stage="completed"
                remainingSeconds={0}
                stageDurationSeconds={USER_EVAL_DELAY_SECONDS}
                title={historyMatchConfig.sampleTitle}
                body={historyMatchConfig.sampleBody}
                submittedAt={`Completed in ${historyMatchConfig.label}`}
                onViewStandings={() => setActiveTab('standings')}
              />
            </div>
          )}

          {activeTab === 'rubric' && (
            <RubricPanel onBackToMatch={() => setActiveTab('match7')} />
          )}

          {activeTab === 'standings' && (
            <StandingsPanel
              match7Stage={match7Stage}
              match7ArticleTitle={submittedTitle || articleTitle}
              onBackToMatch={() => setActiveTab('match7')}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-[#DADCE0] bg-[#F8F9FA]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-xs text-[#5F6368]">
          <div>
            Google Article Writing Competition · M1 ({MATCH_1_USER_SCORE}% vs{' '}
            {MATCH_1_OPPONENT_SCORE}%) · M2 ({MATCH_2_USER_SCORE}% vs {MATCH_2_OPPONENT_SCORE}%) ·
            M3 ({MATCH_3_USER_SCORE}% vs {MATCH_3_OPPONENT_SCORE}%) · M4 ({MATCH_4_USER_SCORE}% vs{' '}
            {MATCH_4_OPPONENT_SCORE}%) · M5 ({MATCH_5_USER_SCORE}% vs {MATCH_5_OPPONENT_SCORE}%) ·
            M6 QF ({MATCH_6_USER_SCORE}% vs {MATCH_6_OPPONENT_SCORE}%) · M7 SF (
            {MATCH_7_CONFIG.user} vs {MATCH_7_CONFIG.opponent})
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setActiveTab('match7')}
              className="hover:text-[#202124] cursor-pointer"
            >
              Match 7
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className="hover:text-[#202124] cursor-pointer"
            >
              Last Matches
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rubric')}
              className="hover:text-[#202124] cursor-pointer"
            >
              Scoring Rubric
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('standings')}
              className="hover:text-[#202124] cursor-pointer"
            >
              Match Standings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

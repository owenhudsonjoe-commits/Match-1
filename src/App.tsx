import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArticleEditor } from './components/ArticleEditor';
import { GoogleWordmark } from './components/GoogleWordmark';
import { OpponentBenchmarkCard } from './components/OpponentBenchmarkCard';
import { RubricPanel, StandingsPanel } from './components/RubricAndStandings';
import { EvaluationStage, ScoreResultPanel } from './components/ScoreResultPanel';
import { ActiveTab, TopBar } from './components/TopBar';
import {
  COMPETITOR_USER,
  MATCH_1_CONFIG,
  MATCH_1_OPPONENT,
  MATCH_1_OPPONENT_SCORE,
  MATCH_1_USER_SCORE,
  MATCH_2_CONFIG,
} from './data/competitionData';

const USER_EVAL_DELAY_SECONDS = 120; // 2 minutes to show user's 91% score
const OPPONENT_EVAL_DELAY_SECONDS = 120; // 2 more minutes to show opponent % & winning message

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<ActiveTab>('match2');
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

  let match2Stage: EvaluationStage = 'idle';
  let remainingSeconds = 0;
  let stageDurationSeconds = USER_EVAL_DELAY_SECONDS;

  if (submissionTimestampMs !== null) {
    if (elapsedSeconds < USER_EVAL_DELAY_SECONDS) {
      match2Stage = 'evaluating_user';
      remainingSeconds = USER_EVAL_DELAY_SECONDS - elapsedSeconds;
      stageDurationSeconds = USER_EVAL_DELAY_SECONDS;
    } else if (elapsedSeconds < totalWaitSeconds) {
      match2Stage = 'evaluating_opponent';
      remainingSeconds = totalWaitSeconds - elapsedSeconds;
      stageDurationSeconds = OPPONENT_EVAL_DELAY_SECONDS;
    } else {
      match2Stage = 'completed';
      remainingSeconds = 0;
      stageDurationSeconds = OPPONENT_EVAL_DELAY_SECONDS;
    }
  }

  const hasSubmittedMatch2 = match2Stage !== 'idle';

  useEffect(() => {
    if (submissionTimestampMs === null || match2Stage === 'completed') {
      return;
    }

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [submissionTimestampMs, match2Stage]);

  const handleFocusEditor = () => {
    if (hasSubmittedMatch2) return;
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const handleSubmitArticle = () => {
    if (hasSubmittedMatch2) return;
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

  const activeWordmarkMatch = activeTab === 'match1' ? MATCH_1_CONFIG : MATCH_2_CONFIG;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202124]">
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        hasSubmittedMatch2={hasSubmittedMatch2}
        onFocusEditor={handleFocusEditor}
      />

      <main className="flex-1 px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <GoogleWordmark activeMatch={activeWordmarkMatch} />

          {activeTab === 'match2' && (
            <>
              <AnimatePresence initial={false}>
                {!hasSubmittedMatch2 && (
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
                    <OpponentBenchmarkCard match={MATCH_2_CONFIG} />
                    <ArticleEditor
                      match={MATCH_2_CONFIG}
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

              {match2Stage !== 'idle' && (
                <div ref={resultRef} className="scroll-mt-6">
                  <ScoreResultPanel
                    match={MATCH_2_CONFIG}
                    stage={match2Stage}
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

          {activeTab === 'match1' && (
            <ScoreResultPanel
              match={MATCH_1_CONFIG}
              stage="completed"
              remainingSeconds={0}
              stageDurationSeconds={USER_EVAL_DELAY_SECONDS}
              title={MATCH_1_CONFIG.sampleTitle}
              body={MATCH_1_CONFIG.sampleBody}
              submittedAt="Completed in Match 1"
              onViewStandings={() => setActiveTab('standings')}
            />
          )}

          {activeTab === 'rubric' && (
            <RubricPanel onBackToMatch={() => setActiveTab('match2')} />
          )}

          {activeTab === 'standings' && (
            <StandingsPanel
              match2Stage={match2Stage}
              match2ArticleTitle={submittedTitle || articleTitle}
              onBackToMatch={() => setActiveTab('match2')}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-[#DADCE0] bg-[#F8F9FA]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-xs text-[#5F6368]">
          <div>
            Google Article Writing Competition · Match 1 ({COMPETITOR_USER} {MATCH_1_USER_SCORE}% vs{' '}
            {MATCH_1_OPPONENT} {MATCH_1_OPPONENT_SCORE}%) · Match 2 ({MATCH_2_CONFIG.user} vs{' '}
            {MATCH_2_CONFIG.opponent})
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setActiveTab('match2')}
              className="hover:text-[#202124] cursor-pointer"
            >
              Match 2
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('match1')}
              className="hover:text-[#202124] cursor-pointer"
            >
              Match 1
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

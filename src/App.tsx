import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArticleEditor } from './components/ArticleEditor';
import { GoogleWordmark } from './components/GoogleWordmark';
import { RubricPanel, StandingsPanel } from './components/RubricAndStandings';
import { EvaluationStage, ScoreResultPanel } from './components/ScoreResultPanel';
import { ActiveTab, TopBar } from './components/TopBar';
import { COMPETITOR_OPPONENT, COMPETITOR_USER, MATCH_LABEL } from './data/competitionData';

const USER_EVAL_DELAY_SECONDS = 120; // 2 minutes to show user's 92% score
const OPPONENT_EVAL_DELAY_SECONDS = 120; // 2 more minutes to show opponent % & winning message

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<ActiveTab>('compete');
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

  let evaluationStage: EvaluationStage = 'idle';
  let remainingSeconds = 0;
  let stageDurationSeconds = USER_EVAL_DELAY_SECONDS;

  if (submissionTimestampMs !== null) {
    if (elapsedSeconds < USER_EVAL_DELAY_SECONDS) {
      evaluationStage = 'evaluating_user';
      remainingSeconds = USER_EVAL_DELAY_SECONDS - elapsedSeconds;
      stageDurationSeconds = USER_EVAL_DELAY_SECONDS;
    } else if (elapsedSeconds < totalWaitSeconds) {
      evaluationStage = 'evaluating_opponent';
      remainingSeconds = totalWaitSeconds - elapsedSeconds;
      stageDurationSeconds = OPPONENT_EVAL_DELAY_SECONDS;
    } else {
      evaluationStage = 'completed';
      remainingSeconds = 0;
      stageDurationSeconds = OPPONENT_EVAL_DELAY_SECONDS;
    }
  }

  const hasSubmitted = evaluationStage !== 'idle';

  useEffect(() => {
    if (submissionTimestampMs === null || evaluationStage === 'completed') {
      return;
    }

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [submissionTimestampMs, evaluationStage]);

  const handleFocusEditor = () => {
    if (hasSubmitted) return;
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const handleSubmitArticle = () => {
    if (hasSubmitted) return;
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202124]">
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        hasSubmitted={hasSubmitted}
        onFocusEditor={handleFocusEditor}
      />

      <main className="flex-1 px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <GoogleWordmark />

          {activeTab === 'compete' && (
            <>
              <AnimatePresence initial={false}>
                {!hasSubmitted && (
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

              {evaluationStage !== 'idle' && (
                <div ref={resultRef} className="scroll-mt-6">
                  <ScoreResultPanel
                    stage={evaluationStage}
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

          {activeTab === 'rubric' && (
            <RubricPanel onBackToMatch={() => setActiveTab('compete')} />
          )}

          {activeTab === 'standings' && (
            <StandingsPanel
              stage={evaluationStage}
              articleTitle={submittedTitle || articleTitle}
              onBackToMatch={() => setActiveTab('compete')}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-[#DADCE0] bg-[#F8F9FA]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-xs text-[#5F6368]">
          <div>
            Google Article Writing Competition · {MATCH_LABEL}: {COMPETITOR_USER} vs{' '}
            {COMPETITOR_OPPONENT}
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setActiveTab('compete')}
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

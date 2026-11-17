import React, { useState } from 'react';
import { ClipboardPaste, FileText, RotateCcw, Search, Send } from 'lucide-react';
import {
  analyzeArticleText,
  COMPETITOR_OPPONENT,
  COMPETITOR_USER,
  SAMPLE_ARTICLE_BODY,
  SAMPLE_ARTICLE_TITLE,
} from '../data/competitionData';

interface ArticleEditorProps {
  title: string;
  body: string;
  onChangeTitle: (value: string) => void;
  onChangeBody: (value: string) => void;
  onSubmit: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({
  title,
  body,
  onChangeTitle,
  onChangeBody,
  onSubmit,
  textareaRef,
}) => {
  const [notice, setNotice] = useState<string | null>(null);
  const stats = analyzeArticleText(body);

  const handlePasteFromClipboard = async () => {
    setNotice(null);
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const clipText = await navigator.clipboard.readText();
        if (clipText.trim()) {
          onChangeBody(clipText);
          setNotice('Pasted article text from your clipboard.');
          textareaRef.current?.focus();
          return;
        }
        setNotice('Your clipboard is empty. Copy an article first or type directly below.');
      } else {
        setNotice('Press Ctrl+V (or Cmd+V) directly inside the paste box below.');
        textareaRef.current?.focus();
      }
    } catch {
      setNotice('Clipboard permission was blocked. Use Ctrl+V or Cmd+V inside the paste box below.');
      textareaRef.current?.focus();
    }
  };

  const handleLoadSample = () => {
    setNotice(null);
    if (!title.trim()) {
      onChangeTitle(SAMPLE_ARTICLE_TITLE);
    }
    onChangeBody(SAMPLE_ARTICLE_BODY);
    textareaRef.current?.focus();
  };

  const handleClear = () => {
    setNotice(null);
    onChangeTitle('');
    onChangeBody('');
    textareaRef.current?.focus();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) {
      setNotice('Please write or paste your article before submitting.');
      textareaRef.current?.focus();
      return;
    }
    setNotice(null);
    onSubmit();
  };

  return (
    <section aria-labelledby="paste-section-heading" className="mx-auto w-full max-w-4xl">
      <form
        onSubmit={handleFormSubmit}
        className="rounded-3xl border border-[#DADCE0] bg-white shadow-[0_1px_6px_rgba(32,33,36,0.10)] transition-shadow focus-within:shadow-[0_2px_10px_rgba(32,33,36,0.16)] focus-within:border-[#C6C9CE]"
      >
        {/* Google Search-Bar Style Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F1F3F4] px-6 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <Search className="h-5 w-5 shrink-0 text-[#4285F4]" aria-hidden="true" />
            <div className="min-w-0">
              <h2
                id="paste-section-heading"
                className="font-display text-base font-semibold text-[#202124] truncate"
              >
                Article Paste &amp; Writing Workspace
              </h2>
              <p className="text-xs text-[#5F6368] truncate">
                Writer: <span className="font-medium text-[#202124]">{COMPETITOR_USER}</span>
                <span aria-hidden="true"> · </span>
                Opponent: {COMPETITOR_OPPONENT}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePasteFromClipboard}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-3 py-1.5 text-xs font-medium text-[#3C4043] hover:bg-[#F1F3F4] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
            >
              <ClipboardPaste className="h-3.5 w-3.5 text-[#1A73E8]" aria-hidden="true" />
              Paste from Clipboard
            </button>
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DADCE0] bg-white px-3 py-1.5 text-xs font-medium text-[#3C4043] hover:bg-[#F8F9FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
            >
              <FileText className="h-3.5 w-3.5 text-[#34A853]" aria-hidden="true" />
              Use Sample Article
            </button>
          </div>
        </div>

        {/* Article Headline Input */}
        <div className="border-b border-[#F1F3F4] px-6 py-3.5">
          <label htmlFor="article-title-input" className="sr-only">
            Article Title
          </label>
          <input
            id="article-title-input"
            type="text"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="Enter your article headline (optional)..."
            className="w-full bg-transparent font-display text-lg sm:text-xl font-semibold text-[#202124] placeholder:text-[#80868B] focus:outline-none"
          />
        </div>

        {/* Main Paste & Write Textarea */}
        <div className="px-6 py-4">
          <label htmlFor="article-paste-area" className="sr-only">
            Write or paste your article here
          </label>
          <textarea
            ref={textareaRef}
            id="article-paste-area"
            rows={11}
            value={body}
            onChange={(e) => {
              onChangeBody(e.target.value);
              if (notice) setNotice(null);
            }}
            placeholder="Ayesha Khan — write or paste your Match 1 competition article here (Ctrl+V / Cmd+V)..."
            className="w-full resize-y bg-transparent text-[15px] leading-[1.7] text-[#202124] placeholder:text-[#80868B] focus:outline-none min-h-[260px]"
          />
        </div>

        {/* Inline Validation / Clipboard Feedback */}
        {notice && (
          <div
            role="status"
            className="mx-6 mb-3 rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-4 py-2.5 text-sm text-[#3C4043]"
          >
            {notice}
          </div>
        )}

        {/* Google-Style Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#F1F3F4] bg-[#F8F9FA] rounded-b-3xl px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5F6368] font-mono tabular-nums">
            <span>{stats.words} words</span>
            <span aria-hidden="true">·</span>
            <span>{stats.characters} characters</span>
            <span aria-hidden="true">·</span>
            <span>{stats.paragraphs} paragraphs</span>
            <span aria-hidden="true">·</span>
            <span>{stats.readingMinutes} min read</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {body.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#DADCE0] bg-white px-4 py-2 text-sm font-medium text-[#3C4043] hover:bg-[#F1F3F4] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8]"
              >
                <RotateCcw className="h-4 w-4 text-[#5F6368]" aria-hidden="true" />
                Clear
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-[#1A73E8] px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#1557B0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Submit Article
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

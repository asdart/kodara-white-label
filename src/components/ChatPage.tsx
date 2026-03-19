import { useState, useRef, useEffect, useCallback } from 'react';
import ChatInput from './ChatInput';
import { PenSparkleIcon, SuggestionArrowIcon, CopyIcon, ThumbsUpIcon, ThumbsDownIcon, VoiceIcon, FeedbackChatIcon, MicIcon, PauseIcon, PlayIcon, ArrowDownIcon } from './Icons';
import { streamChat, type ChatMessage as APIChatMessage } from '../services/openai';
import type { ThinkingStepsConfig } from './SuggestionCards';

/* ── Types ── */
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

interface ChatPageProps {
  initialMessage?: string;
  simulatedResponse?: string;
  simulatedSteps?: ThinkingStepsConfig;
  simulatedImage?: string;
  onNewTask?: () => void;
}

/* ── Helpers ── */
function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return date.toLocaleDateString();
}

/**
 * Extract selectable options from AI response content.
 * Detects numbered lists (1. Option / 1) Option) and bullet lists (- Option / * Option).
 * Returns an empty array when no options are found.
 */
function extractOptions(content: string): string[] {
  const lines = content.split('\n').map((l) => l.trim()).filter(Boolean);
  const options: string[] = [];

  for (const line of lines) {
    // Match numbered lists: "1. Foo", "2) Bar", etc.
    const numbered = line.match(/^\d+[.)]\s+(.+)/);
    if (numbered) {
      options.push(numbered[1].replace(/\*\*/g, '').trim());
      continue;
    }
    // Match bullet lists: "- Foo", "* Bar"
    const bullet = line.match(/^[-*•]\s+(.+)/);
    if (bullet) {
      options.push(bullet[1].replace(/\*\*/g, '').trim());
    }
  }

  // Only treat as selectable options if there are 2–8 items
  return options.length >= 2 && options.length <= 8 ? options : [];
}

/* ── Rich content renderer (supports markdown pipe tables + roadmap blocks) ── */

interface RoadmapStage {
  title: string;
  timeline: string;
  description: string;
  milestone: string;
}

type ContentBlock =
  | { type: 'text'; value: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'roadmap'; stages: RoadmapStage[]; closed: boolean };

function parseContentBlocks(text: string): ContentBlock[] {
  const lines = text.split('\n');
  const blocks: ContentBlock[] = [];
  let textBuffer: string[] = [];
  let i = 0;

  const flushText = () => {
    if (textBuffer.length > 0) {
      blocks.push({ type: 'text', value: textBuffer.join('\n') });
      textBuffer = [];
    }
  };

  const parsePipeRow = (line: string): string[] =>
    line.split('|').slice(1, -1).map((c) => c.trim());

  const isSeparator = (line: string): boolean =>
    /^\|[\s-:|]+\|$/.test(line.trim());

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '[ROADMAP]') {
      flushText();
      i++;
      const stages: RoadmapStage[] = [];
      while (i < lines.length && lines[i].trim() !== '[/ROADMAP]') {
        const parts = lines[i].split('|').map((s) => s.trim());
        if (parts.length >= 4) {
          stages.push({ title: parts[0], timeline: parts[1], description: parts[2], milestone: parts[3] });
        }
        i++;
      }
      const closed = i < lines.length && lines[i].trim() === '[/ROADMAP]';
      if (closed) i++;
      blocks.push({ type: 'roadmap', stages, closed });
    } else if (
      line.trim().startsWith('|') &&
      line.trim().endsWith('|') &&
      i + 1 < lines.length &&
      isSeparator(lines[i + 1])
    ) {
      flushText();
      const headers = parsePipeRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        rows.push(parsePipeRow(lines[i]));
        i++;
      }
      blocks.push({ type: 'table', headers, rows });
    } else {
      textBuffer.push(line);
      i++;
    }
  }
  flushText();
  return blocks;
}

const tableCellStyle: React.CSSProperties = {
  fontFamily: 'var(--font-primary)',
  fontSize: 'var(--body-3-size)',
  lineHeight: 'var(--body-3-line)',
  letterSpacing: 'var(--body-3-spacing)',
  color: 'var(--alpha-light-900)',
  padding: '12px 16px',
  borderBottom: '1px solid var(--alpha-light-100)',
};

const tableHeaderStyle: React.CSSProperties = {
  ...tableCellStyle,
  fontWeight: 600,
  color: 'var(--alpha-light-600)',
  fontSize: 'var(--body-4-size)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  background: 'var(--alpha-dark-300)',
};

const SKELETON_WIDTHS = [
  ['40%', '70%', '60%'],
  ['55%', '50%', '75%'],
  ['35%', '65%', '55%'],
  ['50%', '45%', '70%'],
  ['45%', '60%', '50%'],
  ['60%', '55%', '65%'],
  ['38%', '72%', '48%'],
];

function SkeletonRow({ cols, index, isLast }: { cols: number; index: number; isLast: boolean }) {
  const pick = SKELETON_WIDTHS[index % SKELETON_WIDTHS.length];
  return (
    <tr style={{ opacity: 1 - index * 0.08 }}>
      {Array.from({ length: cols }, (_, ci) => (
        <td
          key={ci}
          style={{
            ...tableCellStyle,
            borderBottom: isLast ? 'none' : tableCellStyle.borderBottom,
          }}
        >
          <div
            className="skeleton-bar"
            style={{
              width: pick[ci % pick.length] || '50%',
              height: '14px',
              animationDelay: `${(index * cols + ci) * 80}ms`,
            }}
          />
        </td>
      ))}
    </tr>
  );
}

function RoadmapSkeleton({ count, total }: { count: number; total: number }) {
  const remaining = Math.max(total - count, 0);
  if (remaining <= 0) return null;
  return (
    <>
      {Array.from({ length: remaining }, (_, si) => (
        <div key={`rskel-${si}`} className="flex" style={{ gap: '20px', opacity: 1 - si * 0.15 }}>
          <div className="flex flex-col items-center" style={{ width: '40px', flexShrink: 0 }}>
            <div className="skeleton-bar" style={{ width: '14px', height: '14px', borderRadius: '50%', animationDelay: `${si * 150}ms` }} />
            {si < remaining - 1 && (
              <div className="skeleton-bar" style={{ width: '2px', flex: 1, minHeight: '60px', borderRadius: '1px', animationDelay: `${si * 150 + 50}ms` }} />
            )}
          </div>
          <div className="flex flex-col" style={{ gap: '6px', paddingBottom: '28px', flex: 1 }}>
            <div className="skeleton-bar" style={{ width: '30%', height: '12px', animationDelay: `${si * 150 + 30}ms` }} />
            <div className="skeleton-bar" style={{ width: '55%', height: '16px', animationDelay: `${si * 150 + 60}ms` }} />
            <div className="skeleton-bar" style={{ width: '80%', height: '12px', animationDelay: `${si * 150 + 90}ms` }} />
          </div>
        </div>
      ))}
    </>
  );
}

function RoadmapChart({ stages, isStreaming, totalStages, closed }: { stages: RoadmapStage[]; isStreaming: boolean; totalStages: number; closed: boolean }) {
  return (
    <div
      style={{
        margin: '16px 0',
        borderRadius: '16px',
        border: '1px solid var(--alpha-light-100)',
        background: 'var(--alpha-dark-300)',
        padding: '24px 20px',
      }}
    >
      {stages.map((stage, si) => {
        const isLast = si === stages.length - 1 && closed;
        return (
          <div key={si} className="roadmap-stage-enter flex" style={{ gap: '20px', animationDelay: `${si * 60}ms` }}>
            {/* Timeline rail */}
            <div className="flex flex-col items-center" style={{ width: '40px', flexShrink: 0 }}>
              {/* Node */}
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'var(--color-pelorous-600)',
                  border: '3px solid var(--color-pelorous-50)',
                  boxShadow: '0 0 0 1px var(--color-pelorous-600)',
                  flexShrink: 0,
                  marginTop: '3px',
                }}
              />
              {/* Connector line */}
              {!isLast && (
                <div
                  className="roadmap-line-draw"
                  style={{
                    width: '2px',
                    flex: 1,
                    minHeight: '20px',
                    background: 'linear-gradient(180deg, var(--color-pelorous-600) 0%, var(--alpha-light-100) 100%)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: isLast ? '0' : '28px', flex: 1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '11px',
                  fontWeight: 600,
                  lineHeight: '16px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-pelorous-600)',
                }}
              >
                {stage.timeline}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--body-3-size)',
                  lineHeight: 'var(--body-3-line)',
                  fontWeight: 600,
                  color: 'var(--alpha-light-900)',
                  margin: '4px 0 6px',
                }}
              >
                {stage.title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--body-3-size)',
                  lineHeight: '24px',
                  color: 'var(--alpha-light-600)',
                  margin: 0,
                }}
              >
                {stage.description}
              </p>
              {/* Milestone badge */}
              <div
                style={{
                  marginTop: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(0,139,167,0.06)',
                  border: '1px solid rgba(0,139,167,0.1)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.667 3.5L5.25 9.917 2.333 7" stroke="var(--color-pelorous-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--body-4-size)',
                    lineHeight: 'var(--body-4-line)',
                    fontWeight: 500,
                    color: 'var(--color-pelorous-600)',
                  }}
                >
                  {stage.milestone}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      {isStreaming && !closed && (
        <RoadmapSkeleton count={stages.length} total={totalStages} />
      )}
    </div>
  );
}

function RichContent({ content, isStreaming, totalTableRows, totalRoadmapStages }: { content: string; isStreaming: boolean; totalTableRows?: number; totalRoadmapStages?: number }) {
  const blocks = parseContentBlocks(content);
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'text') {
          return (
            <div key={i}>
              {i > 0 && <div className="chat-divider" />}
              <p
                className="whitespace-pre-wrap"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--body-3-size)',
                  lineHeight: '28px',
                  letterSpacing: 'var(--body-3-spacing)',
                  color: 'var(--alpha-light-900)',
                }}
              >
                {block.value}
                {isStreaming && i === blocks.length - 1 && <span className="typing-cursor" />}
              </p>
            </div>
          );
        }

        if (block.type === 'roadmap') {
          return (
            <div key={i}>
              {i > 0 && <div className="chat-divider" />}
              <RoadmapChart
                stages={block.stages}
                closed={block.closed}
                isStreaming={isStreaming}
                totalStages={totalRoadmapStages ?? block.stages.length}
              />
            </div>
          );
        }

        // table block
        const isLastBlock = i === blocks.length - 1;
        const expectedTotal = totalTableRows ?? 0;
        const loadedCount = block.rows.length;
        const skeletonCount = isStreaming && isLastBlock ? Math.max(expectedTotal - loadedCount, 0) : 0;
        const totalVisible = loadedCount + skeletonCount;

        return (
          <div key={i}>
            {i > 0 && <div className="chat-divider" />}
            <div
              style={{
                margin: '16px 0',
                borderRadius: '12px',
                border: '1px solid var(--alpha-light-100)',
                overflow: 'hidden',
              }}
            >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {block.headers.map((h, hi) => (
                    <th key={hi} style={{ ...tableHeaderStyle, textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="table-row-enter">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          ...tableCellStyle,
                          fontWeight: ci === 0 ? 600 : 400,
                          borderBottom: ri === totalVisible - 1 ? 'none' : tableCellStyle.borderBottom,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
                {Array.from({ length: skeletonCount }, (_, si) => (
                  <SkeletonRow
                    key={`skel-${si}`}
                    cols={block.headers.length}
                    index={si}
                    isLast={si === skeletonCount - 1 && loadedCount + si === totalVisible - 1}
                  />
                ))}
              </tbody>
            </table>
            </div>
          </div>
        );
      })}
    </>
  );
}

/* ── Sub-components ── */

/** User message — right-aligned bubble, max 480px (Figma 6:346) */
function UserBubble({ content, imageUrl }: { content: string; imageUrl?: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-end" style={{ gap: '16px' }}>
      {imageUrl && (
        <div
          className="chat-bubble-enter"
          style={{
            maxWidth: '320px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'var(--alpha-light-25)',
          }}
        >
          {!imgError ? (
            <img
              src={imageUrl}
              alt="Meal photo"
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                display: 'block',
              }}
            />
          ) : (
            <div
              className="flex items-center justify-center"
              style={{
                width: '100%',
                aspectRatio: '4 / 3',
                background: 'linear-gradient(145deg, #e8f5e9 0%, #fff8e1 50%, #ffecb3 100%)',
              }}
            >
              <span style={{ fontSize: '48px' }}>🥗</span>
            </div>
          )}
        </div>
      )}
      <div
        className="chat-bubble-enter backdrop-blur-[4px]"
        style={{
          maxWidth: '480px',
          padding: '16px',
          borderRadius: '16px',
          background: 'var(--alpha-dark-300)',
          border: '1px solid var(--alpha-light-50)',
        }}
      >
        <p
          className="font-medium whitespace-pre-wrap"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--body-3-size)',
            lineHeight: 'var(--body-3-line)',
            letterSpacing: 'var(--body-3-spacing)',
            color: 'var(--alpha-light-900)',
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
}

/** Action icons shown below each completed assistant message (Figma 1129:12190) */
function MessageActionBar({ content, onVoice, isSpeaking }: { content: string; onVoice: () => void; isSpeaking: boolean }) {
  const [liked, setLiked] = useState<'up' | 'down' | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleLike = () => setLiked((prev) => (prev === 'up' ? null : 'up'));
  const handleDislike = () => setLiked((prev) => (prev === 'down' ? null : 'down'));

  const handleFeedback = () => {
    console.log('Send feedback for:', content.slice(0, 60));
  };

  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    border: 'none',
    background: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '20px',
    height: '20px',
    transition: 'opacity 150ms ease-out',
  };

  return (
    <div className="flex items-center" style={{ gap: '3px', marginTop: '12px' }}>
      {/* Copy */}
      <button
        style={{ ...btnStyle, opacity: copied ? 1 : undefined }}
        className="hover:opacity-70"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy'}
      >
        <CopyIcon className="w-5 h-5" color={copied ? 'var(--color-pelorous-600)' : 'var(--alpha-light-600)'} />
      </button>

      {/* Like */}
      <button
        style={btnStyle}
        className="hover:opacity-70"
        onClick={handleLike}
        title="Like"
      >
        <ThumbsUpIcon className="w-5 h-5" color={liked === 'up' ? 'var(--color-pelorous-600)' : 'var(--alpha-light-600)'} />
      </button>

      {/* Dislike */}
      <button
        style={btnStyle}
        className="hover:opacity-70"
        onClick={handleDislike}
        title="Dislike"
      >
        <ThumbsDownIcon className="w-5 h-5" color={liked === 'down' ? 'var(--color-pelorous-600)' : 'var(--alpha-light-600)'} />
      </button>

      {/* Voice */}
      <button
        style={btnStyle}
        className="hover:opacity-70"
        onClick={onVoice}
        title={isSpeaking ? 'Stop' : 'Read aloud'}
      >
        <VoiceIcon className="w-5 h-5" color={isSpeaking ? 'var(--color-pelorous-600)' : 'var(--alpha-light-600)'} />
      </button>

      {/* Send feedback */}
      <button
        style={btnStyle}
        className="hover:opacity-70"
        onClick={handleFeedback}
        title="Send feedback"
      >
        <FeedbackChatIcon className="w-5 h-5" color="var(--alpha-light-600)" />
      </button>
    </div>
  );
}

/** Audio waveform visualisation bars (Figma 1226:5601) — animates when playing */
function WaveformBars({ progress, isPlaying }: { progress: number; isPlaying: boolean }) {
  const barCount = 31;
  return (
    <div className="flex items-center" style={{ gap: '2px', height: '16px' }}>
      {Array.from({ length: barCount }, (_, i) => {
        const pct = i / (barCount - 1);
        const isPlayed = pct <= progress;
        return (
          <div
            key={i}
            className={isPlaying ? 'waveform-bar' : ''}
            style={{
              width: '2px',
              borderRadius: '1px',
              background: isPlayed ? 'var(--alpha-light-600)' : 'var(--alpha-light-200)',
              transition: 'background 100ms ease-out',
              height: isPlaying ? undefined : `${3 + Math.random() * 2}px`,
              animationDelay: isPlaying ? `${i * 40}ms` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

const SPEED_OPTIONS = [1, 1.25, 1.5, 2] as const;

/** Dropdown speed picker for the audio player */
function SpeedPicker({ rate, onRateChange }: { rate: number; onRateChange: (r: number) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler); };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        className="shrink-0 hover:opacity-70 transition-opacity"
        onClick={() => setOpen((v) => !v)}
        title="Playback speed"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px 6px',
          border: '1px solid var(--alpha-light-100)',
          borderRadius: '6px',
          background: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-primary)',
          fontSize: '11px',
          fontWeight: 600,
          lineHeight: '16px',
          color: 'var(--alpha-light-600)',
          whiteSpace: 'nowrap',
        }}
      >
        {rate}x
      </button>

      {open && (
        <div
          className="plus-dropdown absolute z-[9999] flex flex-col"
          style={{
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '56px',
            padding: '4px',
            borderRadius: '10px',
            background: 'var(--alpha-dark-600)',
            backdropFilter: 'blur(4px)',
            border: '1px solid var(--alpha-light-100)',
            boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.08)',
            transformOrigin: 'bottom center',
          }}
        >
          {SPEED_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => { onRateChange(opt); setOpen(false); }}
              className="plus-dropdown-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '28px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)',
                fontSize: '12px',
                fontWeight: opt === rate ? 700 : 500,
                lineHeight: '16px',
                color: opt === rate ? 'var(--color-pelorous-600)' : 'var(--alpha-light-600)',
                padding: 0,
              }}
            >
              {opt}x
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Floating audio player above the input (Figma 1226:5592) */
function AudioPlayer({
  isPlaying,
  onPause,
  elapsed,
  duration,
  volume,
  onVolumeChange,
  rate,
  onRateChange,
}: {
  isPlaying: boolean;
  onPause: () => void;
  elapsed: number;
  duration: number;
  volume: number;
  onVolumeChange: (v: number) => void;
  rate: number;
  onRateChange: (r: number) => void;
}) {
  const progress = duration > 0 ? elapsed / duration : 0;

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="audio-player-enter flex items-center"
      style={{
        height: '36px',
        paddingLeft: '12px',
        paddingRight: '12px',
        borderRadius: '24px',
        background: 'var(--color-white)',
        border: '1px solid var(--alpha-light-100)',
        boxShadow:
          '0px 4px 12px 0px rgba(0,0,0,0.06), 0px 1px 3px 0px rgba(0,0,0,0.04)',
        gap: '12px',
      }}
    >
      {/* Mic icon */}
      <MicIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />

      {/* Waveform + time */}
      <div className="flex items-center" style={{ gap: '12px' }}>
        <WaveformBars progress={progress} isPlaying={isPlaying} />
        <span
          className="font-medium shrink-0"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--body-3-size)',
            lineHeight: 'var(--body-3-line)',
            color: 'var(--alpha-light-900)',
            minWidth: '32px',
          }}
        >
          {fmt(elapsed)}
        </span>

        {/* Speed toggle with dropdown */}
        <SpeedPicker rate={rate} onRateChange={onRateChange} />
      </div>

      {/* Volume icon + slider */}
      <div className="flex items-center shrink-0" style={{ gap: '4px' }}>
        <VoiceIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="audio-volume-slider"
        />
      </div>

      {/* Pause / Stop button */}
      <button
        className="shrink-0 hover:opacity-70 transition-opacity"
        onClick={onPause}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          padding: 0,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <PauseIcon className="w-5 h-5" color="var(--alpha-light-600)" />
        ) : (
          <PlayIcon className="w-5 h-5" color="var(--alpha-light-600)" />
        )}
      </button>
    </div>
  );
}

/* ── Thinking Steps — agentic processing indicator ── */

type StepStatus = 'idle' | 'pending' | 'active' | 'done';

interface ThinkingSubStepDisplay {
  label: string;
  status: StepStatus;
}

interface ThinkingStepDisplay {
  label: string;
  status: StepStatus;
  isSkill: boolean;
  children: ThinkingSubStepDisplay[];
}

function ThinkingStepIcon({ status, isSkill }: { status: StepStatus; isSkill?: boolean }) {
  const isDone = status === 'done';
  const isActive = status === 'active';
  const isPending = status === 'pending';

  const color = isSkill ? 'var(--color-skill-green)' : 'var(--alpha-light-400)';
  const checkColor = isSkill ? '#fff' : 'var(--alpha-light-600)';

  return (
    <div style={{ width: '20px', height: '20px', flexShrink: 0, position: 'relative' }}>
      {/* Pending: small gray dot */}
      <div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: isPending ? 1 : 0, transition: 'opacity 400ms ease',
        }}
      >
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--alpha-light-100)' }} />
      </div>

      {/* Active spinner + Done check transition */}
      <svg
        width="20" height="20" viewBox="0 0 20 20" fill="none"
        style={{
          position: 'absolute', inset: 0,
          opacity: isActive || isDone ? 1 : 0,
          transition: 'opacity 400ms ease',
        }}
      >
        {/* Skill done: filled green background */}
        {isSkill && (
          <circle
            cx="10" cy="10" r="10"
            fill="var(--color-skill-green)"
            style={{
              opacity: isDone ? 1 : 0,
              transform: isDone ? 'scale(1)' : 'scale(0)',
              transformOrigin: 'center',
              transition: 'opacity 400ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        )}

        {/* Spinning circle track (active) */}
        <circle
          cx="10" cy="10" r="8"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="50.27"
          strokeDashoffset={isDone ? '0' : '37.7'}
          style={{
            transformOrigin: 'center',
            animation: isActive ? 'thinking-spinner-rotate 1s linear infinite' : 'none',
            opacity: isActive ? 1 : 0,
            transition: 'opacity 300ms ease, stroke-dashoffset 400ms ease',
          }}
        />

        {/* Non-skill done: small filled dot */}
        {!isSkill && (
          <circle
            cx="10" cy="10" r="3"
            fill="var(--alpha-light-600)"
            style={{
              opacity: isDone ? 1 : 0,
              transform: isDone ? 'scale(1)' : 'scale(0)',
              transformOrigin: 'center',
              transition: 'opacity 300ms ease 150ms, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1) 150ms',
            }}
          />
        )}

        {/* Checkmark (draws in on done) */}
        {isSkill && (
          <path
            d="M6 10.5L8.75 13.25L14 7"
            stroke={checkColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="14"
            strokeDashoffset={isDone ? '0' : '14'}
            style={{
              transition: 'stroke-dashoffset 400ms ease 200ms',
            }}
          />
        )}
      </svg>
    </div>
  );
}

function ThinkingStepsDisplay({ steps, header }: { steps: ThinkingStepDisplay[]; header?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const allDone = steps.length > 0 && steps.every((s) => s.status === 'done');
  const prevAllDoneRef = useRef(false);

  useEffect(() => {
    if (allDone && !prevAllDoneRef.current) {
      const timer = setTimeout(() => setCollapsed(true), 2000);
      prevAllDoneRef.current = true;
      return () => clearTimeout(timer);
    }
  }, [allDone]);

  if (steps.length === 0) return null;

  const hasVisibleSteps = steps.some((s) => s.status !== 'pending');

  return (
    <div className="thinking-steps-display" style={{ marginBottom: '14px' }}>
      {/* Header — always visible */}
      {header && (
        <div className="thinking-step-enter">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: allDone ? 'pointer' : 'default',
              paddingBottom: hasVisibleSteps && !collapsed ? '16px' : '0',
              transition: 'padding 400ms ease',
            }}
            onClick={allDone ? () => setCollapsed((c) => !c) : undefined}
          >
            {allDone && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  flexShrink: 0,
                  transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 300ms ease',
                }}
              >
                <path d="M3.5 4.5L6 7L8.5 4.5" stroke="var(--alpha-light-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ height: '3px' }} />
              </svg>
            )}
            <span
              className={!allDone ? 'thinking-shimmer-text' : undefined}
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--body-3-size)',
                lineHeight: 'var(--body-3-line)',
                color: 'var(--alpha-light-600)',
                WebkitTextFillColor: !allDone ? 'transparent' : undefined,
                fontWeight: 500,
                transition: 'color 500ms ease, -webkit-text-fill-color 500ms ease',
              }}
            >
              {header}
            </span>
          </div>
        </div>
      )}

      {/* Collapsible steps body */}
      <div className={`thinking-steps-body${collapsed ? ' thinking-steps-collapsed' : ''}`}>
        <div style={{ paddingLeft: '1px' }}>
          {steps.map((step, si) => {
            if (step.status === 'pending') return null;
            return (
              <div key={si} className="thinking-step-enter" style={{ animationDelay: `${si * 250}ms`, paddingBottom: '12px' }}>
                {/* Top-level step row */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <ThinkingStepIcon status={step.status} isSkill={step.isSkill} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: 'var(--body-3-size)',
                        lineHeight: 'var(--body-3-line)',
                        color: step.isSkill
                          ? 'var(--color-skill-green)'
                          : step.status === 'done' || step.status === 'active'
                            ? 'var(--alpha-light-600)'
                            : 'var(--alpha-light-200)',
                        fontWeight: step.isSkill ? 600 : 500,
                        transition: 'color 500ms ease',
                      }}
                    >
                      {step.label}
                    </span>
                    {step.status === 'done' && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M2.5 6L4.75 8.25L9.5 3.5" stroke="var(--alpha-light-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Sub-steps with vertical bar indent + bullets */}
                {step.children.length > 0 && (
                  <div style={{ paddingLeft: '9px', marginTop: '8px' }}>
                    {step.children.map((sub, ci) => {
                      if (sub.status === 'pending') return null;
                      return (
                        <div
                          key={ci}
                          style={{
                            display: 'flex',
                            gap: '20px',
                            animationDelay: `${(si * 2 + ci) * 150}ms`,
                          }}
                        >
                          <div
                            className="thinking-step-line-grow"
                            style={{
                              width: '1px',
                              flexShrink: 0,
                              borderRadius: '2px',
                              background: 'var(--alpha-light-100)',
                              height: '24px',
                              animationDelay: `${(si * 2 + ci) * 150}ms`,
                            }}
                          />
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1 }}>
                            <div
                              className="thinking-step-enter"
                              style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                flexShrink: 0,
                                background: 'var(--alpha-light-400)',
                                animationDelay: `${(si * 2 + ci) * 150}ms`,
                              }}
                            />
                            <span
                              className="thinking-step-enter"
                              style={{
                                position: 'relative',
                                fontFamily: 'var(--font-primary)',
                                fontSize: 'var(--body-3-size)',
                                lineHeight: '24px',
                                color: 'var(--alpha-light-600)',
                                fontWeight: 400,
                                transition: 'color 500ms ease',
                                animationDelay: `${(si * 2 + ci) * 150}ms`,
                              }}
                            >
                              {sub.label}
                              <span
                                aria-hidden
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  height: '1px',
                                  background: 'var(--alpha-light-600)',
                                  width: !step.isSkill && sub.status === 'done' ? '100%' : '0%',
                                  transition: 'width 400ms ease',
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {/* Final "Done" step — appears after all steps complete */}
          {allDone && (
            <div className="thinking-step-enter" style={{ animationDelay: `${steps.length * 250}ms` }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="var(--alpha-light-200)" strokeWidth="1.5" />
                    <path d="M6 10.5L8.75 13.25L14 7" stroke="var(--alpha-light-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--body-3-size)',
                    lineHeight: 'var(--body-3-line)',
                    color: 'var(--alpha-light-600)',
                    fontWeight: 600,
                  }}
                >
                  Done
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** AI response — avatar row + indented body text + suggestion chips (Figma 18:622) */
function AssistantMessage({
  content,
  timestamp,
  isStreaming,
  totalTableRows,
  totalRoadmapStages,
  thinkingSteps,
  thinkingHeader,
  onChipClick,
  onVoice,
  isSpeaking,
}: {
  content: string;
  timestamp: Date;
  isStreaming: boolean;
  totalTableRows?: number;
  totalRoadmapStages?: number;
  thinkingSteps?: ThinkingStepDisplay[];
  thinkingHeader?: string;
  onChipClick?: (label: string) => void;
  onVoice: () => void;
  isSpeaking: boolean;
}) {
  return (
    <div className="chat-bubble-enter flex flex-col" style={{ gap: '14px' }}>
      {/* Avatar + name + time */}
      <div className="flex items-center" style={{ gap: '10px' }}>
        <div
          className="shrink-0 flex items-center justify-center"
          style={{ width: '18px' }}
        >
          <div
            className="shrink-0 overflow-hidden"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-pelorous-50)',
              border: '1px solid var(--alpha-light-50)',
            }}
          />
        </div>
        <span
          className="font-medium"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--body-3-size)',
            lineHeight: 'var(--body-3-line)',
            letterSpacing: 'var(--body-3-spacing)',
            color: 'var(--alpha-light-900)',
          }}
        >
          Leanne
        </span>
        <span
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--body-4-size)',
            lineHeight: 'var(--body-4-line)',
            color: 'var(--alpha-light-400)',
          }}
        >
          · {formatTime(timestamp)}
        </span>
      </div>

      {/* Body text */}
      <div>
        {thinkingSteps && thinkingSteps.length > 0 && (
          <ThinkingStepsDisplay steps={thinkingSteps} header={thinkingHeader} />
        )}
        {thinkingSteps && thinkingSteps.length > 0 && content && (
          <div className="chat-divider" />
        )}
        {content ? (
          <RichContent content={content} isStreaming={isStreaming} totalTableRows={totalTableRows} totalRoadmapStages={totalRoadmapStages} />
        ) : isStreaming && !(thinkingSteps && thinkingSteps.length > 0 && !thinkingSteps.every((s) => s.status === 'done')) ? (
          <div className="typing-indicator">
            <span />
            <span />
            <span />
          </div>
        ) : null}

        {/* Suggestion chips — shown only when the AI response contains selectable options */}
        {content && !isStreaming && onChipClick && extractOptions(content).length > 0 && (
          <div className="flex flex-col" style={{ gap: '6px', marginTop: '16px' }}>
            {extractOptions(content).map(
              (label) => (
                <button
                  key={label}
                  className="flex items-center cursor-pointer hover:opacity-80 transition-opacity self-start backdrop-blur-[4px]"
                  onClick={() => onChipClick(label)}
                  style={{
                    gap: '6px',
                    paddingLeft: '12px',
                    paddingRight: '16px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    borderRadius: '12px',
                    background: 'var(--alpha-light-50)',
                    border: '1px solid var(--alpha-light-50)',
                    cursor: 'pointer',
                    maxWidth: '480px',
                  }}
                >
                  <div
                    className="shrink-0"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <SuggestionArrowIcon
                      className="w-5 h-5"
                      color="var(--alpha-light-900)"
                    />
                  </div>
                  <span
                    className="font-medium whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--body-3-size)',
                      lineHeight: 'var(--body-3-line)',
                      letterSpacing: 'var(--body-3-spacing)',
                      color: 'var(--alpha-light-900)',
                    }}
                  >
                    {label}
                  </span>
                </button>
              ),
            )}
          </div>
        )}

        {/* Action icons — shown after streaming completes */}
        {content && !isStreaming && <MessageActionBar content={content} onVoice={onVoice} isSpeaking={isSpeaking} />}
      </div>
    </div>
  );
}

/* ── Main Component ── */

function countStructuredElements(text: string): { tableRows: number; roadmapStages: number } {
  const blocks = parseContentBlocks(text);
  let tableRows = 0;
  let roadmapStages = 0;
  for (const b of blocks) {
    if (b.type === 'table' && !tableRows) tableRows = b.rows.length;
    if (b.type === 'roadmap' && !roadmapStages) roadmapStages = b.stages.length;
  }
  return { tableRows, roadmapStages };
}

export default function ChatPage({ initialMessage, simulatedResponse, simulatedSteps, simulatedImage, onNewTask }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [totalTableRows, setTotalTableRows] = useState(0);
  const [totalRoadmapStages, setTotalRoadmapStages] = useState(0);
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStepDisplay[]>([]);
  const [thinkingHeader, setThinkingHeader] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const messagesRef = useRef<Message[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const cancelledRef = useRef(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  // Voice / audio player state
  const [voiceContent, setVoiceContent] = useState<string | null>(null);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [voiceElapsed, setVoiceElapsed] = useState(0);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [voiceVolume, setVoiceVolume] = useState(0.8);
  const [voiceRate, setVoiceRate] = useState(1);
  const voiceTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voiceIdRef = useRef(0); // incremented on each new speak to ignore stale callbacks

  const clearTimer = useCallback(() => {
    if (voiceTimerRef.current) {
      clearInterval(voiceTimerRef.current);
      voiceTimerRef.current = null;
    }
  }, []);

  const stopVoice = useCallback(() => {
    voiceIdRef.current += 1; // invalidate any pending callbacks
    window.speechSynthesis.cancel();
    clearTimer();
    setVoicePlaying(false);
    setVoiceContent(null);
    setVoiceElapsed(0);
    setVoiceDuration(0);
  }, [clearTimer]);

  const speakText = useCallback((text: string, vol: number, spd: number, resumeElapsed = 0) => {
    window.speechSynthesis.cancel();
    clearTimer();

    const id = ++voiceIdRef.current;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = vol;
    utterance.rate = spd;

    const wordCount = text.split(/\s+/).length;
    const estDuration = Math.max(wordCount / 2.5 / spd, 2);
    setVoiceDuration(estDuration);
    setVoiceElapsed(resumeElapsed);
    setVoiceContent(text);
    setVoicePlaying(true);

    const startTime = Date.now() - resumeElapsed * 1000;
    voiceTimerRef.current = setInterval(() => {
      setVoiceElapsed(Math.min((Date.now() - startTime) / 1000, estDuration));
    }, 250);

    utterance.onend = () => {
      if (voiceIdRef.current !== id) return; // stale — ignore
      clearTimer();
      setVoicePlaying(false);
      setVoiceContent(null);
    };
    utterance.onerror = () => {
      if (voiceIdRef.current !== id) return; // stale — ignore
      clearTimer();
      setVoicePlaying(false);
      setVoiceContent(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [clearTimer]);

  const startVoice = useCallback((text: string) => {
    // Toggle off if same text is already playing
    if (voiceContent === text) {
      stopVoice();
      return;
    }
    speakText(text, voiceVolume, voiceRate);
  }, [voiceContent, voiceVolume, voiceRate, stopVoice, speakText]);

  // Volume slider: just store the value. Restart speech at new volume.
  const handleVolumeChange = useCallback((v: number) => {
    setVoiceVolume(v);
    if (!voiceContent) return;
    speakText(voiceContent, v, voiceRate, voiceElapsed);
  }, [voiceContent, voiceRate, voiceElapsed, speakText]);

  const handleRateChange = useCallback((r: number) => {
    setVoiceRate(r);
    if (!voiceContent) return;
    speakText(voiceContent, voiceVolume, r, voiceElapsed);
  }, [voiceContent, voiceVolume, voiceElapsed, speakText]);

  const handleVoicePause = useCallback(() => {
    if (voicePlaying) {
      window.speechSynthesis.pause();
      setVoicePlaying(false);
      clearTimer();
    } else {
      window.speechSynthesis.resume();
      setVoicePlaying(true);
      const startTime = Date.now() - voiceElapsed * 1000;
      const estDuration = voiceDuration;
      voiceTimerRef.current = setInterval(() => {
        setVoiceElapsed(Math.min((Date.now() - startTime) / 1000, estDuration));
      }, 250);
    }
  }, [voicePlaying, voiceElapsed, voiceDuration, clearTimer]);

  // Keep ref in sync for closures
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const onScroll = () => {
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollDown(distanceFromBottom > 120);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    cancelledRef.current = true;
    setIsStreaming(false);
    setThinkingSteps([]);
    setThinkingHeader(undefined);
    setTotalTableRows(0);
    setTotalRoadmapStages(0);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    cancelledRef.current = false;
    const controller = new AbortController();
    abortRef.current = controller;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const allPrevMessages = messagesRef.current;
    const apiMessages: APIChatMessage[] = [
      ...allPrevMessages.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: text },
    ];

    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsStreaming(true);

    try {
      let fullContent = '';
      for await (const chunk of streamChat(apiMessages, controller.signal)) {
        fullContent += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: fullContent,
          };
          return updated;
        });
      }
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error('Chat error:', error);
      const errMessage =
        error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.';
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: errMessage,
        };
        return updated;
      });
    } finally {
      abortRef.current = null;
      setIsStreaming(false);
    }
  }, []);

  const simulateTyping = useCallback(async (question: string, answer: string, stepsConfig?: ThinkingStepsConfig, imageUrl?: string) => {
    cancelledRef.current = false;
    const userMsg: Message = { role: 'user', content: question, timestamp: new Date(), imageUrl };
    const assistantMsg: Message = { role: 'assistant', content: '', timestamp: new Date() };
    setMessages([userMsg, assistantMsg]);
    const counts = countStructuredElements(answer);
    setTotalTableRows(counts.tableRows);
    setTotalRoadmapStages(counts.roadmapStages);
    setIsStreaming(true);

    const wait = (ms: number) => new Promise<void>((resolve) => {
      const id = setTimeout(resolve, ms);
      const check = setInterval(() => {
        if (cancelledRef.current) { clearTimeout(id); clearInterval(check); resolve(); }
      }, 50);
    });

    if (stepsConfig && stepsConfig.steps.length > 0) {
      setThinkingHeader(stepsConfig.header);

      const allSteps: ThinkingStepDisplay[] = stepsConfig.steps.map((s, i) => ({
        label: s.label,
        status: (i === 0 ? 'active' : 'pending') as StepStatus,
        isSkill: i === 0,
        children: (s.children ?? []).map((c) => ({ label: c, status: 'pending' as StepStatus })),
      }));
      setThinkingSteps(allSteps);

      await wait(800);

      for (let si = 0; si < stepsConfig.steps.length && !cancelledRef.current; si++) {
        const step = stepsConfig.steps[si];
        const children = step.children ?? [];

        setThinkingSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < si ? 'done' : idx === si ? 'active' : 'pending',
            children: s.children.map((c) => ({
              ...c,
              status: idx < si ? 'done' : c.status,
            })),
          })),
        );
        await wait(600 + Math.random() * 400);

        for (let ci = 0; ci < children.length && !cancelledRef.current; ci++) {
          setThinkingSteps((prev) =>
            prev.map((s, idx) => {
              if (idx !== si) return s;
              return {
                ...s,
                children: s.children.map((c, cIdx) => ({
                  ...c,
                  status: cIdx < ci ? 'done' : cIdx === ci ? 'active' : 'pending',
                })),
              };
            }),
          );
          await wait(800 + Math.random() * 600);
        }

        if (cancelledRef.current) break;

        setThinkingSteps((prev) =>
          prev.map((s, idx) => {
            if (idx !== si) return s;
            return {
              ...s,
              status: 'done' as StepStatus,
              children: s.children.map((c) => ({ ...c, status: 'done' as StepStatus })),
            };
          }),
        );
        await wait(300);
      }
      if (!cancelledRef.current) await wait(600);
    }

    if (cancelledRef.current) return;

    const lines = answer.split('\n');
    let accumulated = '';
    let inRoadmap = false;

    const flush = (text: string) => {
      accumulated = text;
      const snap = accumulated;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], content: snap };
        return updated;
      });
    };

    for (let li = 0; li < lines.length && !cancelledRef.current; li++) {
      const line = lines[li];
      const trimmed = line.trim();
      const isTableLine = trimmed.startsWith('|') && trimmed.endsWith('|');
      const isTableSep = /^\|[\s-:|]+\|$/.test(trimmed);

      if (trimmed === '[ROADMAP]') {
        inRoadmap = true;
        flush(accumulated + (li > 0 ? '\n' : '') + line);
        await wait(100);
      } else if (trimmed === '[/ROADMAP]') {
        inRoadmap = false;
        flush(accumulated + (li > 0 ? '\n' : '') + line);
        await wait(60);
      } else if (inRoadmap) {
        flush(accumulated + '\n' + line);
        await wait(500 + Math.random() * 200);
      } else if (isTableLine || isTableSep) {
        flush(accumulated + (li > 0 ? '\n' : '') + line);
        await wait(isTableSep ? 60 : 350 + Math.random() * 150);
      } else {
        const prefix = li > 0 ? '\n' : '';
        const words = line.split(/(\s+)/);
        for (let wi = 0; wi < words.length && !cancelledRef.current; wi++) {
          const leading = wi === 0 ? prefix : '';
          flush(accumulated + leading + words[wi]);
          await wait(18 + Math.random() * 22);
        }
      }
    }
    if (!cancelledRef.current) {
      setTotalTableRows(0);
      setTotalRoadmapStages(0);
      setIsStreaming(false);
    }
  }, []);

  // Send initial message on mount
  useEffect(() => {
    if (initialMessage && !hasInitialized.current) {
      hasInitialized.current = true;
      if (simulatedResponse) {
        simulateTyping(initialMessage, simulatedResponse, simulatedSteps, simulatedImage);
      } else {
        sendMessage(initialMessage);
      }
    }
  }, [initialMessage, simulatedResponse, simulatedSteps, simulatedImage, sendMessage, simulateTyping]);

  // Is this the first AI response (show chips only on last assistant message)?
  const lastAssistantIdx = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') return i;
    }
    return -1;
  })();

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 relative h-full overflow-hidden">
      {/* ── Top bar — matches home view top bar ── */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{
          paddingTop: '20px',
          paddingBottom: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
          minHeight: '56px',
          background: 'var(--alpha-dark-800)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          className="flex gap-1.5 items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onNewTask}
        >
          <PenSparkleIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
          <span
            className="font-medium whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--body-3-size)',
              lineHeight: 'var(--body-3-line)',
              letterSpacing: 'var(--body-3-spacing)',
              color: 'var(--alpha-light-600)',
            }}
          >
            New task
          </span>
        </div>
      </div>

      {/* ── Messages scroll area — extends behind the input ── */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto min-h-0 smooth-scroll flex flex-col items-center"
        style={{ paddingTop: '24px', paddingBottom: '124px' }}
      >
        <div
          className="flex flex-col w-full"
          style={{
            maxWidth: '704px',
            paddingLeft: '8px',
            paddingRight: '8px',
            gap: '32px',
          }}
        >
          {messages.map((msg, i) =>
            msg.role === 'user' ? (
              <UserBubble key={i} content={msg.content} imageUrl={msg.imageUrl} />
            ) : (
              <AssistantMessage
                key={i}
                content={msg.content}
                timestamp={msg.timestamp}
                isStreaming={isStreaming && i === messages.length - 1}
                totalTableRows={isStreaming && i === messages.length - 1 ? totalTableRows : undefined}
                totalRoadmapStages={isStreaming && i === messages.length - 1 ? totalRoadmapStages : undefined}
                thinkingSteps={i === messages.length - 1 ? thinkingSteps : undefined}
                thinkingHeader={i === messages.length - 1 ? thinkingHeader : undefined}
                onChipClick={
                  i === lastAssistantIdx && !isStreaming
                    ? (label) => sendMessage(label)
                    : undefined
                }
                onVoice={() => startVoice(msg.content)}
                isSpeaking={voiceContent === msg.content && voicePlaying}
              />
            ),
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Bottom overlay: audio player + input (floats over scroll area) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-end pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {/* ── Fade gradient ── */}
        <div
          className="w-full pointer-events-none"
          style={{
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, white)',
          }}
        />
        {/* ── Audio player — floats above input when voice is active ── */}
        {voiceContent && (
          <div className="flex justify-center pointer-events-auto" style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '8px' }}>
            <AudioPlayer
              isPlaying={voicePlaying}
              onPause={handleVoicePause}
              elapsed={voiceElapsed}
              duration={voiceDuration}
              volume={voiceVolume}
              onVolumeChange={handleVolumeChange}
              rate={voiceRate}
              onRateChange={handleRateChange}
            />
          </div>
        )}

        <div
          className="flex flex-col items-center w-full relative pointer-events-auto"
          style={{
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingBottom: '19px',
            paddingTop: '8px',
            background: 'white',
          }}
        >
          {/* ── Scroll-to-bottom button (absolute, above input) ── */}
          {showScrollDown && (
            <button
              onClick={scrollToBottom}
              className="scroll-to-bottom-btn"
              aria-label="Scroll to bottom"
            >
              <ArrowDownIcon className="w-5 h-5" color="var(--alpha-light-400)" />
            </button>
          )}
          <div className="w-full" style={{ maxWidth: '704px' }}>
            <ChatInput
              onSubmit={sendMessage}
              disabled={isStreaming}
              onStop={isStreaming ? stopStreaming : undefined}
              placeholder="How can I help you today?"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

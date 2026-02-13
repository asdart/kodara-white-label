import { useState, useRef, useEffect, useCallback } from 'react';
import ChatInput from './ChatInput';
import { PenSparkleIcon, SuggestionArrowIcon, CopyIcon, ThumbsUpIcon, ThumbsDownIcon, VoiceIcon, FeedbackChatIcon, MicIcon, PauseIcon, PlayIcon } from './Icons';
import { streamChat, type ChatMessage as APIChatMessage } from '../services/openai';

/* ── Types ── */
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPageProps {
  initialMessage?: string;
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

/* ── Sub-components ── */

/** User message — right-aligned bubble, max 480px (Figma 6:346) */
function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
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
  onClose,
  elapsed,
  duration,
  volume,
  onVolumeChange,
  rate,
  onRateChange,
}: {
  isPlaying: boolean;
  onPause: () => void;
  onClose: () => void;
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

/** AI response — avatar row + indented body text + suggestion chips (Figma 18:622) */
function AssistantMessage({
  content,
  timestamp,
  isStreaming,
  onChipClick,
  onVoice,
  isSpeaking,
}: {
  content: string;
  timestamp: Date;
  isStreaming: boolean;
  onChipClick?: (label: string) => void;
  onVoice: () => void;
  isSpeaking: boolean;
}) {
  return (
    <div className="chat-bubble-enter flex flex-col" style={{ gap: '8px' }}>
      {/* Avatar + name + time — 24px avatar, 8px gap (Figma 18:631) */}
      <div className="flex items-center" style={{ gap: '8px' }}>
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

      {/* Body text — indented 32px to align with name (24px avatar + 8px gap) */}
      <div style={{ paddingLeft: '32px' }}>
        {content ? (
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
            {content}
            {isStreaming && <span className="typing-cursor" />}
          </p>
        ) : isStreaming ? (
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

export default function ChatPage({ initialMessage, onNewTask }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const messagesRef = useRef<Message[]>([]);

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

  const sendMessage = useCallback(async (text: string) => {
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
      for await (const chunk of streamChat(apiMessages)) {
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
      console.error('Chat error:', error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: 'Sorry, I encountered an error. Please try again.',
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }, []);

  // Send initial message on mount
  useEffect(() => {
    if (initialMessage && !hasInitialized.current) {
      hasInitialized.current = true;
      sendMessage(initialMessage);
    }
  }, [initialMessage, sendMessage]);

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

      {/* ── Messages scroll area ── */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto min-h-0 smooth-scroll flex flex-col items-center"
        style={{ paddingTop: '24px', paddingBottom: '16px' }}
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
              <UserBubble key={i} content={msg.content} />
            ) : (
              <AssistantMessage
                key={i}
                content={msg.content}
                timestamp={msg.timestamp}
                isStreaming={isStreaming && i === messages.length - 1}
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

      {/* ── Audio player — floats above input when voice is active ── */}
      {voiceContent && (
        <div className="shrink-0 flex justify-center" style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '8px' }}>
          <AudioPlayer
            isPlaying={voicePlaying}
            onPause={handleVoicePause}
            onClose={stopVoice}
            elapsed={voiceElapsed}
            duration={voiceDuration}
            volume={voiceVolume}
            onVolumeChange={handleVolumeChange}
            rate={voiceRate}
            onRateChange={handleRateChange}
          />
        </div>
      )}

      {/* ── Bottom input — Figma: centered 704px, ~19px from bottom ── */}
      <div
        className="shrink-0 flex flex-col items-center"
        style={{
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '19px',
          paddingTop: '8px',
        }}
      >
        <div className="w-full" style={{ maxWidth: '704px' }}>
          <ChatInput
            onSubmit={sendMessage}
            disabled={isStreaming}
            placeholder="How can I help you today?"
          />
        </div>
      </div>
    </div>
  );
}

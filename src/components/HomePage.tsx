import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  HouseIcon,
  CalendarIcon,
  PlusIcon,
  ArrowUpIcon,
  MicIcon,
  DotsVerticalIcon,
  PlayIcon,
  XMarkIcon,
  SparkleNavIcon,
  HamburgerIcon,
  ChecklistIcon,
  DocumentPenIcon,
  MarkAsDoneIcon,
} from './Icons';
import { GENERATE_ANGLES_PROMPT } from './SuggestionCards';

export interface HomePageProps {
  userName?: string;
  onCollapsedInputClick?: () => void;
  onSeeAllTasks?: () => void;
  /** Launch the chat with a pre-baked simulated conversation (e.g. "Generate angles" task). */
  onStartSimulatedChat?: (message: string, taskTitle?: string, taskId?: string) => void;
  /** Mobile-only — opens the sidebar drawer when the hamburger icon is tapped. */
  onMobileMenuClick?: () => void;
  /** Task IDs that were marked done from a chat session (persisted across navigation). */
  externalDoneTasks?: string[];
}

interface Task {
  id: string;
  description: string;
  /** When true, shows "Check-in" action (daily check-in flow). */
  checkIn?: boolean;
  /** When true, shows "Mark as done" action. */
  markAsDone?: boolean;
  /** When true, shows sparkle + "Generate new angles" action. */
  generateAngles?: boolean;
  /** Set after a successful check-in submit. Strikethrough text + shows "Edit". */
  done?: boolean;
  /** Last submitted check-in value, prefilled when re-opening the modal via Edit. */
  checkInValue?: string;
  /** Override the default action label for this task type. */
  actionLabel?: string;
  /** When true, renders the brand-highlighted "Start here" card (Figma node 3976:11924). */
  highlighted?: boolean;
}

interface OverdueTask extends Task {
  dueLabel: string;
}

/**
 * A/B test toggle for how the first ("Start here") task is highlighted:
 *  - `border`    → animated shiny conic-gradient border (current default)
 *  - `spotlight` → dimmed (dark) full-screen overlay with a cut-out + callout
 *  - `overlay`   → light blurred scrim with a cut-out, animated border ring,
 *                  and a tooltip (Figma node 4063:11992)
 *  - `guide`     → animated border on the card + a guide tooltip that loads in
 *                  after the page settles (Figma node 4063:12178)
 *  - `none`      → no special highlight
 */
type HighlightVersion = 'border' | 'spotlight' | 'overlay' | 'guide' | 'none';

/**
 * Overdue tasks are no longer surfaced on Home per the updated dashboard design
 * (Figma node 3976:11697). The data + card component are kept intact so the
 * section can be re-enabled by flipping this flag.
 */
const SHOW_OVERDUE = false;

const OVERDUE_TASKS: OverdueTask[] = [
  {
    id: 'overdue-1',
    dueLabel: '29 Apr',
    description: 'Refresh your ads before they stop converting',
    generateAngles: true,
  },
];

const INITIAL_TODAY_TASKS: Task[] = [
  {
    id: 'today-1',
    description: "Daily check-in - What is your today\u2019s revenue?",
    checkIn: true,
    highlighted: true,
  },
  {
    id: 'today-2',
    description: 'Identify Your Most Profitable Offer',
    generateAngles: true,
    actionLabel: 'Find weak spots',
  },
  {
    id: 'today-3',
    description:
      'Launch first batch of 4-6 new ad creatives in one ad set per platform with broad targeting',
    generateAngles: true,
    actionLabel: 'Find weak spots',
  },
];

function getTimeOfDayGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Good night';
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="home-section-label font-medium whitespace-nowrap"
      style={{
        fontFamily: 'var(--font-primary)',
        fontSize: 'var(--label-2-size)',
        lineHeight: 'var(--label-2-line)',
        letterSpacing: 'var(--body-3-spacing)',
        color: 'var(--text-primary)',
      }}
    >
      {children}
    </span>
  );
}

/**
 * Inline task action — icon (24×24) + label, rendered beneath the description.
 * Always visible on all screen sizes (matches Figma WL/Home node 3024:18903).
 */
function TaskInlineAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="home-task-card__label flex items-center"
      aria-hidden
      style={{ gap: '4px' }}
    >
      <span
        className="flex items-center justify-center shrink-0"
        style={{ width: '24px', height: '24px' }}
      >
        {icon}
      </span>
      <span
        className="font-medium whitespace-nowrap"
        style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 'var(--body-3-size)',
          lineHeight: 'var(--body-3-line)',
          letterSpacing: 'var(--body-3-spacing)',
          color: 'var(--alpha-brand-700)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Returns the inline action element matching the task variant. */
function getTaskAction(task: Task): React.ReactNode {
  // markAsDone done state: keep the same icon, swap label to "Undone"
  if (task.markAsDone && task.done) {
    return <TaskInlineAction icon={<MarkAsDoneIcon className="w-6 h-6" color="var(--alpha-brand-700)" />} label="Undone" />;
  }
  // All other done states: pencil icon + "Edit"
  if (task.done) {
    return <TaskInlineAction icon={<DocumentPenIcon className="w-6 h-6" color="var(--alpha-brand-700)" />} label={task.actionLabel ?? 'Edit'} />;
  }
  if (task.checkIn) {
    return <TaskInlineAction icon={<ChecklistIcon className="w-6 h-6" color="var(--alpha-brand-700)" />} label={task.actionLabel ?? 'Check in'} />;
  }
  if (task.markAsDone) {
    return <TaskInlineAction icon={<MarkAsDoneIcon className="w-6 h-6" color="var(--alpha-brand-700)" />} label={task.actionLabel ?? 'Mark as done'} />;
  }
  if (task.generateAngles) {
    return <TaskInlineAction icon={<SparkleNavIcon className="w-6 h-6" color="var(--alpha-brand-700)" />} label={task.actionLabel ?? 'Generate new angles'} />;
  }
  return <TaskInlineAction icon={<PlayIcon color="var(--alpha-brand-700)" />} label={task.actionLabel ?? 'Start task'} />;
}

function OverdueTaskCard({
  task,
  animationDelay,
  onClick,
}: {
  task: OverdueTask;
  animationDelay: number;
  onClick?: () => void;
}) {
  return (
    <div
      className="chat-card-enter w-full"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <button
        type="button"
        onClick={onClick}
        className={`home-task-card home-task-card--overdue w-full text-left cursor-pointer${task.done ? ' home-task-card--done' : ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '12px',
          padding: '20px',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Date pill + description */}
        <div className="flex flex-col items-start" style={{ gap: '8px' }}>
          <div
            className="flex items-center"
            style={{
              gap: '2px',
              paddingLeft: '4px',
              paddingRight: '6px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '24px',
              background: 'var(--color-red-50)',
            }}
          >
            <span className="flex items-center justify-center shrink-0" style={{ width: '16px', height: '16px' }}>
              <CalendarIcon color="var(--color-red-900)" />
            </span>
            <span
              className="font-medium whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--body-4-size)',
                lineHeight: 'var(--body-4-line)',
                letterSpacing: 'var(--body-3-spacing)',
                color: 'var(--color-red-900)',
              }}
            >
              {task.dueLabel}
            </span>
          </div>
          <p
            className="home-task-card__text font-medium"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--body-3-size)',
              lineHeight: 'var(--body-3-line)',
              letterSpacing: 'var(--body-3-spacing)',
              textDecoration: task.done ? 'line-through' : undefined,
            }}
          >
            {task.description}
          </p>
        </div>

        {/* Inline action — always visible */}
        {getTaskAction(task)}
      </button>
    </div>
  );
}

function TodayTaskCard({
  task,
  animationDelay,
  onClick,
  highlightVariant = 'border',
  cardRef,
}: {
  task: Task;
  animationDelay: number;
  onClick?: () => void;
  highlightVariant?: HighlightVersion;
  cardRef?: React.Ref<HTMLDivElement>;
}) {
  const showShinyBorder =
    task.highlighted &&
    (highlightVariant === 'border' || highlightVariant === 'guide');
  return (
    <div
      className="chat-card-enter w-full"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div ref={cardRef} className={showShinyBorder ? 'shiny-card' : undefined}>
      <button
        type="button"
        onClick={onClick}
        className={`home-task-card w-full text-left cursor-pointer${task.done ? ' home-task-card--done' : ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '12px',
          padding: '20px',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
        }}
      >
        {task.highlighted && (
          <span
            className="home-task-card__badge inline-flex items-center self-start font-medium whitespace-nowrap"
            style={{
              padding: '4px 10px',
              borderRadius: '8px',
              fontFamily: 'var(--font-primary)',
              fontSize: '12px',
              lineHeight: 'normal',
              color: 'var(--color-white)',
            }}
          >
            Start here
          </span>
        )}

        <p
          className="home-task-card__text font-medium"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--body-3-size)',
            lineHeight: 'var(--body-3-line)',
            letterSpacing: 'var(--body-3-spacing)',
            textDecoration: task.done ? 'line-through' : undefined,
          }}
        >
          {task.description}
        </p>

        {/* Inline action — always visible */}
        {getTaskAction(task)}
      </button>
      </div>
    </div>
  );
}

/**
 * Collapsed chat input — matches Figma node 3024:18972 (`GlobalInputText` with `collapsed=true`).
 * Visually mimics the chat input at rest, but acts as a single CTA button that hands off
 * composition to the dedicated New task screen. Used here because the chat input is a
 * secondary action on Home, so it should not occupy primary input affordance.
 */
function CollapsedChatInput({ onClick }: { onClick?: () => void }) {
  const placeholder = 'Describe how your mentor can you help you today...';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={placeholder}
      className="block relative cursor-pointer"
      style={{
        width: '100%',
        height: '48px',
        padding: 0,
        textAlign: 'left',
        background: 'var(--color-white)',
        border: '1px solid var(--alpha-light-100)',
        borderRadius: '24px',
        boxShadow:
          '0px 22px 6px 0px rgba(0,0,0,0), 0px 14px 6px 0px rgba(0,0,0,0), 0px 8px 5px 0px rgba(0,0,0,0.01), 0px 4px 4px 0px rgba(0,0,0,0.02), 0px 1px 2px 0px rgba(0,0,0,0.02)',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--alpha-light-200)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--alpha-light-100)';
      }}
    >
      {/* Plus icon — left, vertically centered (Figma: bottom 13px, 20×20 icon → 14px from top) */}
      <span
        className="absolute flex items-center justify-center"
        style={{ left: '13px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px' }}
      >
        <PlusIcon className="w-5 h-5" color="var(--alpha-light-600)" />
      </span>

      {/* Placeholder */}
      <span
        className="absolute whitespace-nowrap"
        style={{
          left: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-primary)',
          fontWeight: 'var(--weight-regular)',
          fontSize: 'var(--body-3-size)',
          lineHeight: 'var(--body-3-line)',
          letterSpacing: 'var(--body-3-spacing)',
          color: 'var(--alpha-light-600)',
        }}
      >
        {placeholder}
      </span>

      {/* Right container — button group + arrow up */}
      <span
        className="absolute flex items-center"
        style={{ right: '5px', top: '50%', transform: 'translateY(-50%)', gap: '6px' }}
      >
        {/* Dots + Mic button group */}
        <span
          className="flex items-center overflow-hidden"
          style={{
            background: 'var(--color-neutral-50)',
            borderRadius: '999px',
          }}
        >
          {/* Dots vertical (rotated 90° for horizontal dots) */}
          <span className="flex items-start" style={{ padding: '8px' }}>
            <span style={{ display: 'inline-flex', transform: 'rotate(90deg)' }}>
              <DotsVerticalIcon className="w-5 h-5" color="var(--alpha-light-600)" />
            </span>
          </span>
          {/* Mic button (white pill) */}
          <span
            className="flex items-start"
            style={{
              padding: '8px',
              background: 'var(--color-white)',
              border: '1px solid var(--alpha-light-100)',
              borderRadius: '24px',
              boxShadow:
                '0px 8px 5px 0px rgba(0,0,0,0.01), 0px 4px 4px 0px rgba(0,0,0,0.02), 0px 1px 2px 0px rgba(0,0,0,0.02)',
            }}
          >
            <MicIcon className="w-5 h-5" color="var(--alpha-light-600)" />
          </span>
        </span>

        {/* Send / arrow up button */}
        <span
          className="flex items-center justify-center"
          style={{
            padding: '8px',
            borderRadius: '999px',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, var(--alpha-light-200) 100%), #ffffff',
            boxShadow:
              '0px 2px 1px -1px rgba(0,0,0,0.08), inset 0px 0px 3px 0px var(--alpha-light-300)',
          }}
        >
          <ArrowUpIcon className="w-5 h-5" color="var(--alpha-light-600)" />
        </span>
      </span>
    </button>
  );
}

/**
 * Mobile bottom chat bar — matches Figma node 2953:12513 (`Bottom container`).
 * Renders as two side-by-side pills:
 *   1. A 52×52 circular `+` button (Figma node 2953:12531 `Chat button`).
 *   2. A 52px-tall capsule input (`Text Field_mobile`, node 2953:12533) with
 *      a placeholder, mic button on the right, and a gradient send pill.
 * The whole strip is a CTA — tapping anywhere hands off composition to the
 * dedicated New task screen, mirroring the desktop `CollapsedChatInput`.
 */
function MobileBottomChatBar({ onClick }: { onClick?: () => void }) {
  const placeholder = 'Ask Leanne AI...';

  return (
    <div className="flex items-center w-full" style={{ gap: '6px' }}>
      {/* Plus button — 52×52 circular, white pill, matches `Chat button` */}
      <button
        type="button"
        onClick={onClick}
        aria-label="Compose new task"
        className="flex items-center justify-center shrink-0 cursor-pointer"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-white)',
          border: '1px solid var(--alpha-light-100)',
          boxShadow:
            '0px 8px 5px 0px rgba(0,0,0,0.01), 0px 4px 4px 0px rgba(0,0,0,0.02), 0px 1px 2px 0px rgba(0,0,0,0.02)',
        }}
      >
        <PlusIcon className="w-5 h-5" color="var(--alpha-light-600)" />
      </button>

      {/* Capsule input — placeholder + mic + send. Visually a single field
       *  but actually a button that delegates to the New task screen. */}
      <button
        type="button"
        onClick={onClick}
        aria-label={placeholder}
        className="flex items-center cursor-pointer text-left"
        style={{
          flex: '1 0 0',
          minWidth: 0,
          height: '52px',
          paddingLeft: '20px',
          paddingRight: '6px',
          gap: '12px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-white)',
          border: '1px solid var(--alpha-light-100)',
          boxShadow:
            '0px 8px 5px 0px rgba(0,0,0,0.01), 0px 4px 4px 0px rgba(0,0,0,0.02), 0px 1px 2px 0px rgba(0,0,0,0.02)',
        }}
      >
        <span
          className="truncate"
          style={{
            flex: '1 0 0',
            minWidth: 0,
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--weight-regular)',
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '-0.15px',
            color: 'var(--alpha-light-600)',
          }}
        >
          {placeholder}
        </span>

        <span
          className="flex items-center justify-center shrink-0"
          style={{ width: '40px', height: '40px' }}
        >
          <MicIcon className="w-5 h-5" color="var(--alpha-light-600)" />
        </span>

        <span
          className="flex items-center justify-center shrink-0"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-full)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, var(--alpha-light-200) 100%), var(--color-white)',
            boxShadow:
              '0px 2px 1px -1px rgba(0,0,0,0.08), inset 0px 0px 3px 0px var(--alpha-light-300)',
          }}
        >
          <ArrowUpIcon className="w-5 h-5" color="var(--alpha-light-600)" />
        </span>
      </button>
    </div>
  );
}

/**
 * Daily check-in modal — matches Figma node 3078:13028.
 * Shows on click of any `task.checkIn` row; collects today's revenue and submits.
 * When `initialValue` is provided, the modal is in "edit" mode and prefills the input.
 */
function CheckInModal({
  onClose,
  onSubmit,
  initialValue = '',
}: {
  onClose: () => void;
  onSubmit: (revenue: string) => void;
  initialValue?: string;
}) {
  const [closing, setClosing] = useState(false);
  const [revenue, setRevenue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => setClosing(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(revenue.trim());
    setClosing(true);
  };

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setClosing(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className={`connector-modal-overlay ${closing ? 'closing' : ''}`}
      onClick={handleClose}
      onAnimationEnd={() => {
        if (closing) onClose();
      }}
      role="presentation"
    >
      <form
        className={`connector-modal ${closing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkin-modal-title"
        style={{
          width: '100%',
          maxWidth: '480px',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          background: 'var(--surface-elevated)',
          backdropFilter: 'blur(10px)',
          boxShadow:
            '0px 3px 6px 0px rgba(0,0,0,0.04), 0px 11px 11px 0px rgba(0,0,0,0.03), 0px 24px 15px 0px rgba(0,0,0,0.02), 0px 43px 17px 0px rgba(0,0,0,0.01), 0px 67px 19px 0px rgba(0,0,0,0)',
          position: 'relative',
          padding: '24px',
        }}
      >
        {/* Title */}
        <h2
          id="checkin-modal-title"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--heading-h6-size)',
            lineHeight: 'var(--heading-h6-line)',
            letterSpacing: 'var(--heading-h1-spacing)',
            fontWeight: 600,
            color: 'var(--alpha-light-900)',
            margin: 0,
          }}
        >
          Daily check-in
        </h2>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '28px',
            height: '28px',
            borderRadius: '999px',
            background: 'var(--close-btn-bg)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <XMarkIcon className="w-5 h-5" color="var(--alpha-light-600)" />
        </button>

        {/* Form field */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
          <label
            htmlFor="checkin-revenue-input"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--body-3-size)',
              lineHeight: 'var(--body-3-line)',
              letterSpacing: 'var(--body-3-spacing)',
              fontWeight: 500,
              color: 'var(--alpha-light-900)',
            }}
          >
            What is your today&rsquo;s revenue?
          </label>

          <input
            ref={inputRef}
            id="checkin-revenue-input"
            type="text"
            inputMode="decimal"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Add revenue here"
            autoComplete="off"
            style={{
              width: '100%',
              height: '36px',
              padding: '8px 12px',
              borderRadius: '8px',
              border: `1px solid ${focused ? 'var(--alpha-light-300)' : 'var(--alpha-light-100)'}`,
              background: 'var(--color-white)',
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--body-3-size)',
              lineHeight: 'var(--body-3-line)',
              letterSpacing: 'var(--body-3-spacing)',
              color: 'var(--alpha-light-900)',
              outline: 'none',
              transition: 'border-color 150ms ease, box-shadow 150ms ease',
              boxShadow: focused ? '0 0 0 3px rgba(26,26,26,0.06)' : 'none',
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="connector-modal-btn"
          style={{ marginTop: '16px', height: '36px', padding: '8px 20px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--body-3-size)',
              lineHeight: 'var(--body-3-line)',
              letterSpacing: 'var(--body-3-spacing)',
              fontWeight: 500,
              color: 'var(--color-white)',
            }}
          >
            Submit
          </span>
        </button>
      </form>
    </div>
  );
}

/**
 * A/B test control — lets the user switch how the "Start here" card is
 * highlighted so we can compare which version performs best. Rendered in the
 * top-right of the Home top bar.
 */
function HighlightVersionSelect({
  value,
  onChange,
}: {
  value: HighlightVersion;
  onChange: (v: HighlightVersion) => void;
}) {
  return (
    <select
      aria-label="Highlight style"
      value={value}
      onChange={(e) => onChange(e.target.value as HighlightVersion)}
      className="cursor-pointer"
      style={{
        fontFamily: 'var(--font-primary)',
        fontSize: 'var(--body-3-size)',
        lineHeight: 'var(--body-3-line)',
        letterSpacing: 'var(--body-3-spacing)',
        color: 'var(--alpha-light-900)',
        background: 'var(--color-white)',
        border: '1px solid var(--alpha-light-100)',
        borderRadius: '10px',
        padding: '6px 10px',
        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.04)',
      }}
    >
      <option value="border">Border animation</option>
      <option value="spotlight">Spotlight overlay</option>
      <option value="overlay">Light overlay + border</option>
      <option value="guide">Border + guide tooltip</option>
      <option value="none">No highlight</option>
    </select>
  );
}

/**
 * Tracks a target element's viewport rect with a rAF loop, re-rendering only
 * when the rect actually changes. Keeps overlays glued to the target through
 * the card entrance animation, scrolling, and window resizes.
 */
function useTrackedRect(targetRef: React.RefObject<HTMLElement | null>) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    let raf = 0;
    let prevKey = '';
    const tick = () => {
      const el = targetRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const key = `${r.top}|${r.left}|${r.width}|${r.height}`;
        if (key !== prevKey) {
          prevKey = key;
          setRect(r);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetRef]);

  return rect;
}

/**
 * Spotlight highlight — dims the whole screen except a cut-out around the
 * target card and points to it with a bouncing "Click and start here" callout.
 */
function SpotlightHighlight({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const rect = useTrackedRect(targetRef);
  if (!rect) return null;

  const pad = 6;
  const top = rect.top - pad;
  const left = rect.left - pad;
  const width = rect.width + pad * 2;
  const height = rect.height + pad * 2;

  return (
    <div className="spotlight-overlay" aria-hidden="true">
      <div className="spotlight-hole" style={{ top, left, width, height }} />
      <div
        className="spotlight-callout"
        style={{ top: top + height + 14, left: left + width / 2 }}
      >
        <span className="spotlight-callout__arrow" />
        <span className="spotlight-callout__bubble">Click and start here</span>
      </div>
    </div>
  );
}

/**
 * Light-overlay highlight (Figma node 4063:11992) — a blurred light scrim with
 * a rounded rectangular hole cut out over the target card (via clip-path), the
 * shiny animated border ring around it, and a dark tooltip pointing up to the
 * card. The scrim is pointer-events:none so the card stays clickable.
 */
function OverlayBorderHighlight({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const rect = useTrackedRect(targetRef);
  if (!rect) return null;

  const gap = 8;
  const x = rect.left - gap;
  const y = rect.top - gap;
  const w = rect.width + gap * 2;
  const h = rect.height + gap * 2;

  // Panels are rendered as top-level fixed elements (not wrapped in an
  // opacity-animated container) so that backdrop-filter is never trapped
  // inside an isolated compositing layer.
  return (
    <>
      {/* Top */}
      <div aria-hidden className="overlay-panel" style={{ top: 0, left: 0, right: 0, height: y }} />
      {/* Bottom */}
      <div aria-hidden className="overlay-panel" style={{ top: y + h, left: 0, right: 0, bottom: 0 }} />
      {/* Left */}
      <div aria-hidden className="overlay-panel" style={{ top: y, left: 0, width: x, height: h }} />
      {/* Right */}
      <div aria-hidden className="overlay-panel" style={{ top: y, left: x + w, right: 0, height: h }} />

      {/* Animated border ring */}
      <div
        aria-hidden
        className="overlay-spotlight__ring"
        style={{ top: y, left: x, width: w, height: h }}
      />

      {/* Tooltip */}
      <div
        className="overlay-spotlight__tooltip"
        style={{ top: y + h + 12, left: x + w / 2 }}
      >
        <span className="overlay-spotlight__tooltip-tail" />
        <span className="overlay-spotlight__tooltip-bubble">
          Click on your first task
        </span>
      </div>
    </>
  );
}

/**
 * Guide-tooltip highlight (Figma node 4063:12178) — no scrim; the card keeps
 * its shiny animated border, and a dark tooltip pops in after the page's
 * entrance animations finish, anchored below the card with a small stem.
 * Dismissible via its close button.
 */
function GuideTooltipHighlight({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const rect = useTrackedRect(targetRef);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Reveal only once the card entrance animations have settled.
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (!rect || !ready || dismissed) return null;

  return (
    <div
      className="guide-tooltip"
      style={{ top: rect.bottom - 4, left: rect.left + 40 }}
    >
      <span className="guide-tooltip__connector">
        <span className="guide-tooltip__dot" />
        <span className="guide-tooltip__stem" />
      </span>
      <div className="guide-tooltip__box">
        <div className="guide-tooltip__head">
          <span className="guide-tooltip__title">Begin with the first task</span>
          <button
            type="button"
            className="guide-tooltip__close"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss tip"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10.5759 11.423C10.6927 11.5406 10.8463 11.599 10.9999 11.599H11.0007C11.1543 11.599 11.3079 11.5398 11.4247 11.423C11.6591 11.1886 11.6591 10.8086 11.4247 10.5742L8.84954 7.99903L11.4247 5.42382C11.6591 5.18942 11.6591 4.80942 11.4247 4.57502C11.1903 4.34062 10.8103 4.34062 10.5759 4.57502L8.00057 7.15006L5.42475 4.57424C5.19035 4.33984 4.81035 4.33984 4.57595 4.57424C4.34155 4.80864 4.34155 5.18864 4.57595 5.42304L7.15171 7.9988L4.57595 10.5742C4.34155 10.8086 4.34155 11.1886 4.57595 11.423C4.69275 11.5406 4.84635 11.599 4.99995 11.599L5.00075 11.5998C5.15435 11.5998 5.30795 11.5406 5.42475 11.4238L8.00074 8.84783L10.5759 11.423Z" fill="white" fillOpacity="0.8"/>
              </svg>
          </button>
        </div>
        <p className="guide-tooltip__body">
          They’re ordered by priority, this one matters most today.
        </p>
      </div>
    </div>
  );
}

export default function HomePage({
  userName = 'Marcos',
  onCollapsedInputClick,
  onSeeAllTasks,
  onStartSimulatedChat,
  onMobileMenuClick,
  externalDoneTasks,
}: HomePageProps) {
  const greeting = useMemo(() => getTimeOfDayGreeting(), []);
  const [todayTasks, setTodayTasks] = useState<Task[]>(INITIAL_TODAY_TASKS);
  const [checkInTaskId, setCheckInTaskId] = useState<string | null>(null);
  const [highlightVersion, setHighlightVersion] = useState<HighlightVersion>('border');
  const highlightedCardRef = useRef<HTMLDivElement | null>(null);

  const checkInTask = checkInTaskId
    ? todayTasks.find((t) => t.id === checkInTaskId) ?? null
    : null;

  /** Merge externally-done tasks (marked done from a chat session) into the local list. */
  const displayTasks = useMemo<Task[]>(() => {
    if (!externalDoneTasks?.length) return todayTasks;
    return todayTasks.map((t) =>
      !t.done && externalDoneTasks.includes(t.id) ? { ...t, done: true } : t,
    );
  }, [todayTasks, externalDoneTasks]);

  const handleTaskClick = useCallback((task: Task) => {
    if (task.checkIn) {
      setCheckInTaskId(task.id);
      return;
    }
    if (task.markAsDone) {
      setTodayTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
      );
      return;
    }
    if (task.generateAngles) {
      onStartSimulatedChat?.(GENERATE_ANGLES_PROMPT, task.description, task.id);
    }
  }, [onStartSimulatedChat]);

  const handleCheckInSubmit = (revenue: string) => {
    if (!checkInTaskId) return;
    setTodayTasks((prev) =>
      prev.map((t) =>
        t.id === checkInTaskId ? { ...t, done: true, checkInValue: revenue } : t,
      ),
    );
  };

  const remainingCount = displayTasks.filter((t) => !t.done).length;

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 relative h-full">
      {/* Top bar — hamburger + page title on mobile (matches Figma node 2953:12504),
       *  house + page title on desktop. Both share the same layout slot. */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{
          paddingTop: '28px',
          paddingBottom: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
          minHeight: '56px',
          background: 'var(--alpha-dark-800)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* Mobile — hamburger button + label */}
        <button
          type="button"
          onClick={onMobileMenuClick}
          aria-label="Open menu"
          className="flex md:hidden items-center cursor-pointer"
          style={{
            gap: '16px',
            background: 'none',
            border: 'none',
            padding: 0,
          }}
        >
          <HamburgerIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
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
            Home
          </span>
        </button>

        {/* Desktop — house icon + label (matches existing behavior) */}
        <div className="hidden md:flex items-center" style={{ gap: '6px' }}>
          <HouseIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
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
            Home
          </span>
        </div>

      </div>

      {/* Scrollable content area — `min-h-full` wrapper with flex centers vertically when
          content is short, and naturally grows to allow scrolling when content overflows. */}
      <div
        className="flex-1 overflow-y-auto min-h-0 smooth-scroll relative"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div
          className="flex flex-col items-center justify-center w-full"
          style={{
            minHeight: '100%',
            paddingTop: '24px',
            paddingBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          <div
            className="flex flex-col items-stretch w-full"
            style={{ maxWidth: '680px', gap: '24px' }}
          >
            {/* Greeting */}
            <div
              className="chat-card-enter flex flex-col items-start w-full"
              style={{ animationDelay: '0ms' }}
            >
              <h1
                className="font-normal"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--heading-h6-size)',
                  lineHeight: 'var(--heading-h6-line)',
                  letterSpacing: 'var(--heading-h1-spacing)',
                  color: 'var(--alpha-light-900)',
                  margin: 0,
                }}
              >
                {greeting} {userName},
              </h1>
              <p
                className="font-normal"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--heading-h6-size)',
                  lineHeight: 'var(--heading-h6-line)',
                  letterSpacing: 'var(--heading-h1-spacing)',
                  color: 'var(--alpha-light-600)',
                  margin: 0,
                }}
              >
                You have {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} to be done today.
              </p>
            </div>

            {/* Overdue — hidden on Home per updated design; toggle SHOW_OVERDUE to restore. */}
            {SHOW_OVERDUE && OVERDUE_TASKS.length > 0 && (
              <section
                className="chat-card-enter flex flex-col items-start w-full"
                style={{ gap: '8px', animationDelay: '60ms' }}
              >
                <SectionLabel>Overdue</SectionLabel>
                <div className="flex flex-col w-full" style={{ gap: '8px' }}>
                  {OVERDUE_TASKS.map((task, i) => (
                    <OverdueTaskCard
                      key={task.id}
                      task={task}
                      animationDelay={120 + i * 60}
                      onClick={() => handleTaskClick(task)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Today */}
            <section
              className="chat-card-enter flex flex-col items-start w-full"
              style={{ gap: '8px', animationDelay: '120ms' }}
            >
              <div
                className="flex items-center justify-between w-full"
                style={{ minHeight: '20px' }}
              >
                <SectionLabel>Today</SectionLabel>
                {onSeeAllTasks && (
                  <button
                    type="button"
                    onClick={onSeeAllTasks}
                    className="home-section-label font-medium cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--body-3-size)',
                      lineHeight: 'var(--body-3-line)',
                      letterSpacing: 'var(--body-3-spacing)',
                      color: 'var(--alpha-brand-950)',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                    }}
                  >
                    See all
                  </button>
                )}
              </div>
              <div className="flex flex-col w-full" style={{ gap: '8px' }}>
                {displayTasks.map((task, i) => (
                  <TodayTaskCard
                    key={task.id}
                    task={task}
                    animationDelay={200 + i * 60}
                    onClick={() => handleTaskClick(task)}
                    highlightVariant={highlightVersion}
                    cardRef={task.highlighted ? highlightedCardRef : undefined}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Bottom collapsed chat input — pinned to bottom, secondary action.
       *  Renders the desktop CollapsedChatInput at md+ and the iPhone-styled
       *  two-pill MobileBottomChatBar below the breakpoint. */}
      <div
        className="chat-card-enter shrink-0 hidden md:flex items-center justify-center w-full relative"
        style={{
          paddingTop: '32px',
          paddingBottom: '32px',
          paddingLeft: '24px',
          paddingRight: '24px',
          animationDelay: '300ms',
        }}
      >
        <div className="w-full mx-auto" style={{ maxWidth: '704px' }}>
          <CollapsedChatInput onClick={onCollapsedInputClick} />
        </div>
      </div>

      <div
        className="chat-card-enter shrink-0 flex md:hidden items-center justify-center w-full relative"
        style={{
          paddingTop: '24px',
          paddingBottom: '24px',
          paddingLeft: '16px',
          paddingRight: '16px',
          animationDelay: '300ms',
        }}
      >
        <MobileBottomChatBar onClick={onCollapsedInputClick} />
      </div>

      {/* A/B test control — floating, always above overlays */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 63,
        }}
      >
        <HighlightVersionSelect
          value={highlightVersion}
          onChange={setHighlightVersion}
        />
      </div>

      {highlightVersion === 'spotlight' && (
        <SpotlightHighlight targetRef={highlightedCardRef} />
      )}

      {highlightVersion === 'overlay' && (
        <OverlayBorderHighlight targetRef={highlightedCardRef} />
      )}

      {highlightVersion === 'guide' && (
        <GuideTooltipHighlight targetRef={highlightedCardRef} />
      )}

      {checkInTask && (
        <CheckInModal
          initialValue={checkInTask.checkInValue ?? ''}
          onClose={() => setCheckInTaskId(null)}
          onSubmit={handleCheckInSubmit}
        />
      )}
    </div>
  );
}

import { useMemo } from 'react';
import {
  HouseIcon,
  CalendarIcon,
  PlusIcon,
  ArrowUpIcon,
  MicIcon,
  DotsVerticalIcon,
  PlayIcon,
} from './Icons';

export interface HomePageProps {
  userName?: string;
  onCollapsedInputClick?: () => void;
  onSeeAllTasks?: () => void;
}

interface Task {
  id: string;
  description: string;
  /** When true, suppresses the hover-revealed "Start task" CTA — used for the daily
   *  check-in row, which has its own answer flow rather than a startable task. */
  hideStartButton?: boolean;
}

interface OverdueTask extends Task {
  dueLabel: string;
}

const OVERDUE_TASKS: OverdueTask[] = [
  {
    id: 'overdue-1',
    dueLabel: '29 Apr',
    description:
      'Launch first batch of 4-6 new ad creatives in one ad set per platform with broad targeting',
  },
  {
    id: 'overdue-2',
    dueLabel: '29 Apr',
    description: 'Refresh your ads before they stop converting',
  },
];

const TODAY_TASKS: Task[] = [
  {
    id: 'today-1',
    description: "Daily check-in - What is your today\u2019s revenue?",
    hideStartButton: true,
  },
  {
    id: 'today-2',
    description: 'Refresh your ads before they stop converting',
  },
  {
    id: 'today-3',
    description:
      'Launch first batch of 4-6 new ad creatives in one ad set per platform with broad targeting',
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
      className="font-medium whitespace-nowrap"
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
 * Hover-only "Start task" CTA pill — matches Figma node 3169:25118 (`Product_button`
 * variant with combo box: 20×20 icon slot + label container). Always rendered to
 * reserve the 32px right-side slot and prevent layout shift, then fades in on row
 * hover/focus via the `.home-task-card__label` opacity transition.
 */
function StartTaskButton() {
  return (
    <div
      className="home-task-card__label flex flex-col items-center justify-center shrink-0 overflow-hidden"
      style={{
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '4px',
        paddingBottom: '4px',
        borderRadius: '8px',
        border: '1px solid var(--alpha-light-100)',
        background:
          'linear-gradient(180deg, var(--color-neutral-50) 0%, #f5f5f5 100%)',
      }}
      aria-hidden
    >
      <span className="flex items-center">
        {/* Icon slot — 20×20 frame embedding 12×12 artwork, matches Figma "Search icon" */}
        <span
          className="flex items-center justify-center shrink-0 overflow-hidden relative"
          style={{ width: '20px', height: '20px' }}
        >
          <PlayIcon color="var(--alpha-light-600)" />
        </span>
        <span
          className="flex items-center justify-center"
          style={{ paddingLeft: '4px', paddingRight: '4px' }}
        >
          <span
            className="font-medium whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--body-3-size)',
              lineHeight: 'var(--body-3-line)',
              letterSpacing: 'var(--body-3-spacing)',
              color: 'var(--alpha-light-600)',
              textAlign: 'center',
            }}
          >
            Start task
          </span>
        </span>
      </span>
    </div>
  );
}

function OverdueTaskCard({ task, animationDelay }: { task: OverdueTask; animationDelay: number }) {
  return (
    <div
      className="chat-card-enter w-full"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <button
        type="button"
        className="home-task-card home-task-card--overdue w-full text-left cursor-pointer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          padding: '20px',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Task content — pill + description */}
        <div
          className="flex flex-col items-start min-w-0"
          style={{ flex: '1 0 0', gap: '8px', maxWidth: '548px' }}
        >
          {/* Date pill — matches Figma 16×16 icon frame embedding 12×12.8 calendar artwork */}
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
            <span
              className="flex items-center justify-center shrink-0"
              style={{ width: '16px', height: '16px' }}
            >
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

          {/* Description */}
          <p
            className="home-task-card__text font-medium"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--body-3-size)',
              lineHeight: 'var(--body-3-line)',
              letterSpacing: 'var(--body-3-spacing)',
            }}
          >
            {task.description}
          </p>
        </div>

        {!task.hideStartButton && <StartTaskButton />}
      </button>
    </div>
  );
}

function TodayTaskCard({ task, animationDelay }: { task: Task; animationDelay: number }) {
  return (
    <div
      className="chat-card-enter w-full"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <button
        type="button"
        className="home-task-card w-full text-left cursor-pointer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          padding: '20px',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <p
          className="home-task-card__text font-medium min-w-0"
          style={{
            flex: '1 0 0',
            maxWidth: '548px',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--body-3-size)',
            lineHeight: 'var(--body-3-line)',
            letterSpacing: 'var(--body-3-spacing)',
          }}
        >
          {task.description}
        </p>

        {!task.hideStartButton && <StartTaskButton />}
      </button>
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

export default function HomePage({
  userName = 'Marcos',
  onCollapsedInputClick,
  onSeeAllTasks,
}: HomePageProps) {
  const greeting = useMemo(() => getTimeOfDayGreeting(), []);

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 relative h-full">
      {/* Top bar */}
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
        <div className="flex items-center" style={{ gap: '6px' }}>
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

      {/* Soft background glow — matches the Figma decorative background */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '0',
          right: '-200px',
          left: '-200px',
          height: '800px',
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(0,175,208,0.05) 0%, rgba(183,241,255,0.03) 35%, transparent 70%)',
        }}
      />

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
                You have {TODAY_TASKS.length} tasks to be done today and {OVERDUE_TASKS.length === 1 ? '1 overdue' : `${OVERDUE_TASKS.length} overdue`}.
              </p>
            </div>

            {/* Overdue */}
            {OVERDUE_TASKS.length > 0 && (
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
                style={{ height: '20px' }}
              >
                <SectionLabel>Today</SectionLabel>
                {onSeeAllTasks && (
                  <button
                    type="button"
                    onClick={onSeeAllTasks}
                    className="font-medium cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--body-3-size)',
                      lineHeight: 'var(--body-3-line)',
                      letterSpacing: 'var(--body-3-spacing)',
                      color: 'var(--color-pelorous-600)',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                    }}
                  >
                    See all
                  </button>
                )}
              </div>
              <div className="flex flex-col w-full" style={{ gap: '6px' }}>
                {TODAY_TASKS.map((task, i) => (
                  <TodayTaskCard
                    key={task.id}
                    task={task}
                    animationDelay={200 + i * 60}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Bottom collapsed chat input — pinned to bottom, secondary action */}
      <div
        className="chat-card-enter shrink-0 flex items-center justify-center w-full relative"
        style={{
          paddingTop: '32px',
          paddingBottom: '32px',
          paddingLeft: '24px',
          paddingRight: '24px',
          animationDelay: '300ms',
        }}
      >
        <div className="w-full" style={{ maxWidth: '704px' }}>
          <CollapsedChatInput onClick={onCollapsedInputClick} />
        </div>
      </div>
    </div>
  );
}

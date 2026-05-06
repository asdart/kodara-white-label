import { useState } from 'react';
import ChatInput from './ChatInput';
import {
  PenSparkleIcon,
  ChevronRightIcon,
  CheckboxEmptyIcon,
  CheckboxCheckedIcon,
  SparkleSmallIcon,
} from './Icons';
import glowSvg from '../assets/ellipse-glow.svg';
import ringSvg from '../assets/ellipse-border.svg';
import crescentSvg from '../assets/figma-export/d251448fe157d8c297e9697d264bb33fa3827e0c.svg';

/* ── Types ── */

type PlanSection = 'today' | 'tomorrow' | 'done';

interface PlanTask {
  id: string;
  section: PlanSection;
  title: string;
  /** Optional subtitle — when askAiCoach is true it's rendered with the cyan sparkle link styling. */
  subtitle?: string;
  askAiCoach?: boolean;
  done?: boolean;
}

const SECTION_LABELS: Record<PlanSection, string> = {
  today: 'Today',
  tomorrow: 'Tomorrow',
  done: 'Done',
};

const INITIAL_TASKS: PlanTask[] = [
  {
    id: 'task-1',
    section: 'today',
    title: 'Refresh your ads before they stop converting',
    askAiCoach: true,
  },
  {
    id: 'task-2',
    section: 'tomorrow',
    title: 'Identify Your Most Profitable Offer',
    askAiCoach: true,
  },
  {
    id: 'task-3',
    section: 'tomorrow',
    title: 'Leverage customers feedback to improve sales',
    subtitle: 'Interactive · Growth focused',
  },
  {
    id: 'task-4',
    section: 'done',
    title: 'Craft Irresistible Upsell and Cross-sell Offers',
    subtitle: 'Creative · Revenue-boosting',
    done: true,
  },
];

/* ── Props ── */

interface PlanPageProps {
  onNewTask?: () => void;
  onStartChat?: (message: string) => void;
  onAskAiCoach?: (task: PlanTask) => void;
}

/* ── Avatar (matches Dashboard's circular avatar) ── */

function PlanAvatar() {
  return (
    <div className="relative" style={{ width: '56px', height: '56px' }}>
      <div className="absolute pointer-events-none" style={{ inset: '-42px -42.5px' }}>
        <img src={glowSvg} alt="" className="block w-full h-full" />
      </div>

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: 0,
          background: 'linear-gradient(180deg, rgba(26,26,26,0.06) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: 0,
          opacity: 0.05,
          background: 'linear-gradient(180deg, rgba(26,26,26,0.06) 0%, rgba(255,255,255,0) 100%)',
          border: '0.5px solid #008BA7',
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{ top: '-0.39%', right: '-0.39%', bottom: '49.61%', left: '23.42%' }}
      >
        <img src={crescentSvg} alt="" className="block w-full h-full" style={{ overflow: 'visible' }} />
      </div>

      <div
        className="absolute overflow-hidden rounded-full"
        style={{
          top: '9px',
          bottom: '9px',
          left: '50%',
          transform: 'translateX(-50%)',
          aspectRatio: '1 / 1',
          border: '1px solid var(--alpha-light-50)',
          boxShadow:
            '0px 20px 6px 0px rgba(12,48,70,0), 0px 13px 5px 0px rgba(12,48,70,0.02), 0px 7px 4px 0px rgba(12,48,70,0.07), 0px 3px 3px 0px rgba(12,48,70,0.12), 0px 1px 2px 0px rgba(12,48,70,0.14)',
        }}
      >
        <div className="absolute" style={{ inset: '-1px' }}>
          <img src={ringSvg} alt="" className="block w-full h-full" />
        </div>
        <div className="absolute w-full h-full" style={{ inset: 0, background: 'var(--color-pelorous-50)' }} />
      </div>
    </div>
  );
}

/* ── Section label (TODAY / TOMORROW / DONE) ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '14px',
        paddingBottom: '8px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 'var(--body-4-size)',
          lineHeight: 'var(--body-4-line)',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--alpha-light-400)',
        }}
      >
        {children}
      </span>
    </div>
  );
}

/* ── Plan row ── */

function PlanTaskRow({
  task,
  onToggle,
  onAskAiCoach,
}: {
  task: PlanTask;
  onToggle: (id: string) => void;
  onAskAiCoach?: (task: PlanTask) => void;
}) {
  return (
    <div
      className="scorecard-row-hover"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px 20px',
        cursor: 'pointer',
        marginLeft: '8px',
        marginRight: '8px',
      }}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(task.id);
        }}
        className="hover:opacity-80 transition-opacity"
        aria-pressed={!!task.done}
        aria-label={task.done ? 'Mark as not done' : 'Mark as done'}
        style={{
          flexShrink: 0,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          marginTop: '1px',
        }}
      >
        {task.done ? (
          <CheckboxCheckedIcon className="w-5 h-5" color="var(--alpha-light-300)" />
        ) : (
          <CheckboxEmptyIcon className="w-5 h-5" color="var(--alpha-light-300)" />
        )}
      </button>

      {/* Title + subtitle */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--body-3-size)',
            lineHeight: 'var(--body-3-line)',
            letterSpacing: 'var(--body-3-spacing)',
            fontWeight: 500,
            color: task.done ? 'var(--alpha-light-400)' : 'var(--alpha-light-900)',
            textDecoration: task.done ? 'line-through' : undefined,
            margin: 0,
          }}
        >
          {task.title}
        </p>

        {task.subtitle && (
          <p
            style={{
              marginTop: '4px',
              marginBottom: 0,
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--body-3-size)',
              lineHeight: 'var(--body-3-line)',
              letterSpacing: 'var(--body-3-spacing)',
              color: 'var(--alpha-light-600)',
            }}
          >
            {task.subtitle}
          </p>
        )}

        {task.askAiCoach && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAskAiCoach?.(task);
            }}
            className="hover:opacity-80 transition-opacity"
            style={{
              marginTop: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <SparkleSmallIcon className="w-4 h-4" color="var(--color-pelorous-600)" />
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--body-3-size)',
                lineHeight: 'var(--body-3-line)',
                letterSpacing: 'var(--body-3-spacing)',
                fontWeight: 500,
                color: 'var(--color-pelorous-600)',
              }}
            >
              Ask AI coach to do it
            </span>
          </button>
        )}
      </div>

      {/* Chevron */}
      <div style={{ flexShrink: 0, alignSelf: 'center' }}>
        <ChevronRightIcon className="w-5 h-5" color="var(--alpha-light-300)" />
      </div>
    </div>
  );
}

/* ── Main component ── */

export default function PlanPage({ onNewTask, onStartChat, onAskAiCoach }: PlanPageProps) {
  const [tasks, setTasks] = useState<PlanTask[]>(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextDone = !t.done;
        return { ...t, done: nextDone, section: nextDone ? 'done' : t.section === 'done' ? 'today' : t.section };
      }),
    );
  };

  const groupedOrder: PlanSection[] = ['today', 'tomorrow', 'done'];
  const grouped = groupedOrder
    .map((section) => ({
      section,
      items: tasks.filter((t) => t.section === section),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 relative h-full overflow-hidden">
      {/* Top bar — matches home/chat pattern */}
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

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto min-h-0 smooth-scroll flex flex-col items-center">
        <div
          className="flex flex-col w-full"
          style={{
            maxWidth: '704px',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '24px',
            paddingBottom: '140px',
            gap: '24px',
          }}
        >
          {/* Avatar + greeting */}
          <div
            className="chat-card-enter flex flex-col items-center justify-center"
            style={{ gap: '16px', animationDelay: '0ms' }}
          >
            <PlanAvatar />
            <h1
              className="font-normal text-center"
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--heading-h4-size)',
                lineHeight: 'var(--heading-h4-line)',
                letterSpacing: 'var(--heading-h1-spacing)',
                color: 'var(--text-primary)',
              }}
            >
              Hey Marcos, here is your weekly plan?
            </h1>
          </div>

          {/* Plan card */}
          <div
            className="chat-card-enter w-full"
            style={{
              animationDelay: '80ms',
              borderRadius: '16px',
              border: '1px solid var(--alpha-light-100)',
              background: 'var(--surface-primary)',
              overflow: 'hidden',
            }}
          >
            {grouped.map((group) => (
              <div key={group.section}>
                <SectionLabel>{SECTION_LABELS[group.section]}</SectionLabel>
                {group.items.map((task) => (
                  <PlanTaskRow key={task.id} task={task} onToggle={toggleTask} onAskAiCoach={onAskAiCoach} />
                ))}
              </div>
            ))}

            {/* See all tasks button */}
            <div style={{ padding: '12px 16px 16px' }}>
              <button
                type="button"
                className="w-full hover:opacity-80 transition-opacity"
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'var(--alpha-light-50)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--body-3-size)',
                  lineHeight: 'var(--body-3-line)',
                  letterSpacing: 'var(--body-3-spacing)',
                  fontWeight: 500,
                  color: 'var(--alpha-light-600)',
                }}
              >
                See all tasks
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom overlay: input (floats over scroll area) */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div
          className="w-full pointer-events-none"
          style={{
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, var(--surface-primary))',
          }}
        />
        <div
          className="flex flex-col items-center w-full relative pointer-events-auto"
          style={{
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingBottom: '19px',
            paddingTop: '8px',
          }}
        >
          <div className="w-full" style={{ maxWidth: '704px' }}>
            <ChatInput
              onSubmit={(text) => onStartChat?.(text)}
              placeholder="Describe how your mentor can you help you today..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { CheckCircleIcon } from './Icons';

/* ── Task details bar — Figma `Whitelabel-App` 3189:26630 ──────────────────
 * Renders as the *top* section of the chat input shell. Title on the left,
 * "Mark as done" pill button on the right. Shares the shell's border with
 * the chat input below, separated by a 1px hairline. Slides up from the
 * input edge on entry, slides back down + fades on dismissal. */

interface TaskDetailsBarProps {
  title: string;
  visible: boolean;
  onMarkDone: () => void;
}

export default function TaskDetailsBar({ title, visible, onMarkDone }: TaskDetailsBarProps) {
  const stateClass = visible ? 'is-visible' : 'is-hidden';

  return (
    <div className={`task-details-bar-wrapper ${stateClass}`}>
      <div
        className={`task-details-bar ${stateClass}`}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingLeft: '16px',
          paddingRight: '12px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      >
        <span
          className="font-medium"
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--body-3-size)',
            lineHeight: 'var(--body-3-line)',
            letterSpacing: 'var(--body-3-spacing)',
            color: 'var(--alpha-light-900)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </span>

        <button
          type="button"
          onClick={onMarkDone}
          className="flex items-center justify-center hover:opacity-80 transition-opacity shrink-0"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            paddingLeft: '8px',
            paddingRight: '12px',
            paddingTop: '4px',
            paddingBottom: '4px',
            borderRadius: '999px',
            background: 'var(--surface-primary)',
            border: '1px solid var(--alpha-light-100)',
            cursor: 'pointer',
          }}
        >
          <span
            className="flex items-center justify-center shrink-0"
            style={{ width: '20px', height: '20px' }}
          >
            <CheckCircleIcon color="var(--alpha-light-600)" />
          </span>
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
            Mark as done
          </span>
        </button>
      </div>
    </div>
  );
}

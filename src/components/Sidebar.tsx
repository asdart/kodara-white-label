import {
  PenSparkleIcon,
  ChatAiIcon,
  BookIcon,
  SettingsIcon,
  SidebarCollapseIcon,
  HouseIcon,
} from './Icons';

export type SidebarPage =
  | 'home'
  | 'new-task'
  | 'tasks'
  | 'plan'
  | 'connectors'
  | 'skills'
  | 'chat';

interface SidebarProps {
  currentPage?: SidebarPage;
  onNavigate?: (page: SidebarPage) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onSettingsClick?: () => void;
  /** When true, the sidebar is rendered as a fixed drawer overlay on mobile.
   *  No-op on desktop (the desktop layout handles itself via flex). */
  mobileOpen?: boolean;
}

const navItems: { key: SidebarPage; label: string; icon: typeof PenSparkleIcon; activeWhen: SidebarPage[] }[] = [
  { key: 'home', label: 'Home', icon: HouseIcon, activeWhen: ['home'] },
  { key: 'new-task', label: 'New chats', icon: PenSparkleIcon, activeWhen: ['new-task', 'chat'] },
  { key: 'tasks', label: 'Chats', icon: ChatAiIcon, activeWhen: ['tasks'] },
  { key: 'plan', label: 'Plan', icon: BookIcon, activeWhen: ['plan'] },
];

const SIDEBAR_TRANSITION = 'width 280ms cubic-bezier(0.4, 0, 0.2, 1), padding 280ms cubic-bezier(0.4, 0, 0.2, 1)';
const LABEL_TRANSITION = 'opacity 180ms ease, max-width 280ms cubic-bezier(0.4, 0, 0.2, 1)';

export default function Sidebar({
  currentPage = 'home',
  onNavigate,
  collapsed = false,
  onToggleCollapse,
  onSettingsClick,
  mobileOpen = false,
}: SidebarProps) {
  return (
    <div
      className={`hidden md:flex items-center h-full shrink-0 sidebar-root${mobileOpen ? ' is-mobile-open' : ''}`}
      style={{
        width: collapsed ? '56px' : '232px',
        paddingLeft: '8px',
        paddingRight: '0px',
        paddingTop: '8px',
        paddingBottom: '8px',
        background: 'var(--surface-primary)',
        transition: `${SIDEBAR_TRANSITION}, background 300ms ease`,
      }}
    >
      <div
        className="flex flex-col h-full relative shrink-0 overflow-hidden"
        style={{
          width: '100%',
          minWidth: 0,
          borderRadius: '16px',
          background: 'var(--alpha-dark-600)',
          border: '1px solid var(--alpha-light-100)',
          backdropFilter: 'blur(6px)',
          gap: '1px',
        }}
      >
        {/* Header — avatar + name (left) with collapse toggle (right), single row */}
        <div
          className="flex items-center shrink-0 w-full sidebar-inner"
          style={{
            paddingLeft: collapsed ? '12px' : '16px',
            paddingRight: '12px',
            paddingTop: '20px',
            paddingBottom: '12px',
            gap: '6px',
            transition: SIDEBAR_TRANSITION,
          }}
        >
          {/* Avatar + label — shrinks to 0 when collapsed so the toggle button
              naturally slides left to align with nav icons below */}
          <div
            className="flex items-center overflow-hidden"
            style={{
              flex: '1 1 0',
              minWidth: 0,
              maxWidth: collapsed ? '0px' : '200px',
              opacity: collapsed ? 0 : 1,
              gap: '6px',
              transition: LABEL_TRANSITION,
            }}
          >
            <div
              className="shrink-0"
              style={{
                width: '20px',
                height: '20px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              }}
            />
            <span
              className="font-medium whitespace-nowrap truncate sidebar-label"
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--body-3-size)',
                lineHeight: 'var(--body-3-line)',
                letterSpacing: 'var(--body-3-spacing)',
                color: 'var(--alpha-light-600)',
              }}
            >
              Agent _name
            </span>
          </div>

          <button
            className="flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
            style={{
              width: '20px',
              height: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transform: collapsed ? 'rotate(180deg)' : 'none',
              transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms ease',
            }}
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <SidebarCollapseIcon className="w-5 h-5" color="var(--alpha-light-600)" />
          </button>
        </div>

        {/* Navigation items */}
        <div
          className="flex flex-col items-start shrink-0 w-full min-w-0 overflow-hidden"
          style={{ paddingTop: '8px', paddingBottom: '8px' }}
        >
          {navItems.map((item) => {
            const isActive = item.activeWhen.includes(currentPage);
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="flex items-center w-full min-w-0 sidebar-nav-row"
                style={{
                  height: '32px',
                  paddingLeft: collapsed ? '4px' : '8px',
                  paddingRight: '8px',
                  transition: SIDEBAR_TRANSITION,
                }}
              >
                <div
                  className={`sidebar-nav-item flex items-center h-full w-full cursor-pointer${isActive ? ' active' : ''}`}
                  style={{
                    gap: '6px',
                    paddingLeft: '8px',
                    paddingRight: '10px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    borderRadius: '8px',
                    background: isActive ? 'var(--alpha-light-25)' : undefined,
                    position: 'relative',
                  }}
                  onClick={() => onNavigate?.(item.key)}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 shrink-0" color="var(--nav-item-color)" />
                  <span
                    className="font-medium whitespace-nowrap sidebar-label"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--body-3-size)',
                      lineHeight: 'var(--body-3-line)',
                      letterSpacing: 'var(--body-3-spacing)',
                      color: 'var(--nav-item-color)',
                      maxWidth: collapsed ? '0px' : '160px',
                      opacity: collapsed ? 0 : 1,
                      overflow: 'hidden',
                      transition: LABEL_TRANSITION,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Settings - bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between min-w-0"
          style={{ paddingBottom: '12px', paddingTop: '8px' }}
        >
          <div
            className="flex items-center w-full min-w-0 sidebar-nav-row"
            style={{
              height: '32px',
              paddingLeft: collapsed ? '4px' : '8px',
              paddingRight: '8px',
              transition: SIDEBAR_TRANSITION,
            }}
          >
            <div
              className="sidebar-nav-item flex items-center h-full w-full cursor-pointer"
              style={{
                gap: '6px',
                paddingLeft: '8px',
                paddingRight: '10px',
                paddingTop: '8px',
                paddingBottom: '8px',
                borderRadius: '8px',
              }}
              title="Settings"
              onClick={onSettingsClick}
            >
              <SettingsIcon className="w-5 h-5 shrink-0" color="var(--nav-item-color)" />
              <span
                className="font-medium whitespace-nowrap sidebar-label"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--body-3-size)',
                  lineHeight: 'var(--body-3-line)',
                  letterSpacing: 'var(--body-3-spacing)',
                  color: 'var(--nav-item-color)',
                  maxWidth: collapsed ? '0px' : '160px',
                  opacity: collapsed ? 0 : 1,
                  overflow: 'hidden',
                  transition: LABEL_TRANSITION,
                }}
              >
                Settings
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

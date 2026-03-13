import { PenSparkleIcon, BarChartAiIcon, VideoIcon, SettingsIcon, SidebarCollapseIcon } from './Icons';

export type SidebarPage = 'home' | 'tasks' | 'courses' | 'connectors' | 'skills' | 'chat';

interface SidebarProps {
  currentPage?: SidebarPage;
  onNavigate?: (page: SidebarPage) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onSettingsClick?: () => void;
}

const navItems: { key: SidebarPage; label: string; icon: typeof PenSparkleIcon; activeWhen: SidebarPage[] }[] = [
  { key: 'home', label: 'New task', icon: PenSparkleIcon, activeWhen: ['home', 'chat'] },
  { key: 'tasks', label: 'My tasks', icon: BarChartAiIcon, activeWhen: ['tasks'] },
  { key: 'courses', label: 'Courses', icon: VideoIcon, activeWhen: ['courses'] },
];

export default function Sidebar({
  currentPage = 'home',
  onNavigate,
  collapsed = false,
  onToggleCollapse,
  onSettingsClick,
}: SidebarProps) {
  return (
    <div
      className="flex items-center h-full shrink-0 sidebar-root"
      style={{
        width: collapsed ? '56px' : '232px',
        paddingLeft: '8px',
        paddingRight: '0px',
        paddingTop: '8px',
        paddingBottom: '8px',
        background: 'var(--color-white)',
      }}
    >
      <div
        className="flex flex-col h-full relative shrink-0 overflow-hidden"
        style={{
          width: '100%',
          minWidth: 0,
          borderRadius: '16px',
          background: 'rgba(0, 180, 212, 0.05)',
          backdropFilter: 'blur(6px)',
          gap: '1px',
        }}
      >
        {/* Header — avatar + name + collapse button */}
        <div
          className="flex flex-col items-start shrink-0 w-full sidebar-inner"
          style={{
            paddingLeft: '12px',
            paddingRight: collapsed ? '12px' : '16px',
            paddingTop: '20px',
            paddingBottom: '12px',
            gap: '0px',
          }}
        >
          <div
            className="flex items-center overflow-hidden w-full"
            style={{ justifyContent: collapsed ? 'center' : 'space-between' }}
          >
            {!collapsed && (
              <div className="sidebar-label" style={{ paddingLeft: '4px', paddingRight: '8px' }}>
                <div className="flex items-center" style={{ gap: '6px' }}>
                  <div
                    className="shrink-0 overflow-hidden"
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: 'var(--radius-full)',
                      background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                    }}
                  />
                  <span
                    className="font-medium whitespace-nowrap sidebar-label"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--body-3-size)',
                      lineHeight: 'var(--body-3-line)',
                      letterSpacing: 'var(--body-3-spacing)',
                      color: 'var(--alpha-light-600)',
                    }}
                  >
                    User_name
                  </span>
                </div>
              </div>
            )}

            <button
              className="flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
              style={{
                width: '20px',
                height: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transform: collapsed ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.25s ease',
              }}
              onClick={onToggleCollapse}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <SidebarCollapseIcon className="w-5 h-5" color="var(--alpha-light-600)" />
            </button>
          </div>
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
                style={{ height: '32px', paddingLeft: collapsed ? '4px' : '8px', paddingRight: '8px' }}
              >
                <div
                  className={`sidebar-nav-item flex items-center h-full cursor-pointer${isActive ? ' active' : ''}`}
                  style={{
                    gap: '6px',
                    paddingLeft: '8px',
                    paddingRight: '10px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(0, 175, 208, 0.08)' : undefined,
                    width: collapsed ? 'auto' : '100%',
                    justifyContent: collapsed ? 'center' : undefined,
                    position: 'relative',
                  }}
                  onClick={() => onNavigate?.(item.key)}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 shrink-0" color="var(--nav-item-color)" />
                  {!collapsed && (
                    <span
                      className="font-medium truncate flex-1 min-w-0 overflow-hidden sidebar-label"
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: 'var(--body-3-size)',
                        lineHeight: 'var(--body-3-line)',
                        letterSpacing: 'var(--body-3-spacing)',
                        color: 'var(--nav-item-color)',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Settings - bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between min-w-0"
          style={{
            paddingBottom: '12px',
            paddingTop: '8px',
          }}
        >
          <div
            className="flex items-center w-full min-w-0 sidebar-nav-row"
            style={{ height: '32px', paddingLeft: collapsed ? '4px' : '8px', paddingRight: '8px' }}
          >
            <div
              className="sidebar-nav-item flex items-center h-full cursor-pointer"
              style={{
                gap: '6px',
                paddingLeft: '8px',
                paddingRight: '10px',
                paddingTop: '8px',
                paddingBottom: '8px',
                borderRadius: '8px',
                width: collapsed ? 'auto' : '100%',
                justifyContent: collapsed ? 'center' : undefined,
              }}
              title="Settings"
              onClick={onSettingsClick}
            >
              <SettingsIcon className="w-5 h-5 shrink-0" color="var(--nav-item-color)" />
              {!collapsed && (
                <span
                  className="font-medium truncate flex-1 min-w-0 overflow-hidden sidebar-label"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--body-3-size)',
                    lineHeight: 'var(--body-3-line)',
                    letterSpacing: 'var(--body-3-spacing)',
                    color: 'var(--nav-item-color)',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Settings
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

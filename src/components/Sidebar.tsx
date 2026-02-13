import { PenSparkleIcon, MyTasksIcon, SettingsIcon, SidebarCollapseIcon } from './Icons';

// Avatar image from Figma
const avatarUrl = "http://localhost:3845/assets/12ead654b63cf78651bddf6ac6ee9ce34b82f96b.png";

export default function Sidebar() {
  return (
    <div
      className="flex items-center h-full shrink-0"
      style={{
        width: '232px',
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
          className="flex flex-col items-start shrink-0 w-full"
          style={{
            paddingLeft: '12px',
            paddingRight: '16px',
            paddingTop: '20px',
            paddingBottom: '12px',
            gap: '0px',
          }}
        >
          <div className="flex items-center justify-between overflow-hidden w-full">
            {/* User info */}
            <div style={{ paddingLeft: '4px', paddingRight: '8px' }}>
              <div className="flex items-center" style={{ gap: '6px' }}>
                <div
                  className="shrink-0 overflow-hidden"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  }}
                >
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                    style={{ borderRadius: 'var(--radius-full)' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
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
                  User_name
                </span>
              </div>
            </div>

            {/* Collapse button */}
            <button
              className="flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
              style={{ width: '20px', height: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
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
          {/* New task */}
          <div
            className="flex items-center w-full min-w-0"
            style={{ height: '32px', paddingLeft: '8px', paddingRight: '8px' }}
          >
            <div
              className="flex items-center flex-1 h-full cursor-pointer hover:bg-black/[0.03] transition-colors"
              style={{
                gap: '6px',
                paddingLeft: '8px',
                paddingRight: '10px',
                paddingTop: '8px',
                paddingBottom: '8px',
                borderRadius: '8px',
              }}
            >
              <PenSparkleIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
              <span
                className="font-medium truncate flex-1 min-w-0 overflow-hidden"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--body-3-size)',
                  lineHeight: 'var(--body-3-line)',
                  letterSpacing: 'var(--body-3-spacing)',
                  color: 'var(--alpha-light-600)',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                New chat
              </span>
            </div>
          </div>

          {/* My tasks */}
          <div
            className="flex items-center w-full min-w-0"
            style={{ height: '32px', paddingLeft: '8px', paddingRight: '8px' }}
          >
            <div
              className="flex items-center flex-1 h-full cursor-pointer hover:bg-black/[0.03] transition-colors"
              style={{
                gap: '6px',
                paddingLeft: '8px',
                paddingRight: '10px',
                paddingTop: '8px',
                paddingBottom: '8px',
                borderRadius: '8px',
              }}
            >
              <MyTasksIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
              <span
                className="font-medium truncate flex-1 min-w-0 overflow-hidden"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--body-3-size)',
                  lineHeight: 'var(--body-3-line)',
                  letterSpacing: 'var(--body-3-spacing)',
                  color: 'var(--alpha-light-600)',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                My chats
              </span>
            </div>
          </div>
        </div>

        {/* Settings - bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between min-w-0"
          style={{
            paddingBottom: '12px',
            paddingTop: '8px',
            paddingLeft: '8px',
            paddingRight: '8px',
          }}
        >
          <div
            className="flex items-center w-full min-w-0"
            style={{ height: '32px', paddingLeft: '8px', paddingRight: '8px' }}
          >
            <div
              className="flex items-center flex-1 h-full cursor-pointer hover:bg-black/[0.03] transition-colors"
              style={{
                gap: '6px',
                paddingLeft: '8px',
                paddingRight: '10px',
                paddingTop: '8px',
                paddingBottom: '8px',
                borderRadius: '8px',
              }}
            >
              <SettingsIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
              <span
                className="font-medium truncate flex-1 min-w-0 overflow-hidden"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--body-3-size)',
                  lineHeight: 'var(--body-3-line)',
                  letterSpacing: 'var(--body-3-spacing)',
                  color: 'var(--alpha-light-600)',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
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

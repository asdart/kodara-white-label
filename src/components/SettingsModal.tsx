import { useState } from 'react';
import { useTheme } from '../lib/ThemeContext';

import userIcon from '../assets/settings/0a08fec0874f75ea004524a85196267e35a2b937.svg';
import envelopeIcon from '../assets/settings/7118723c9304bf0e4a298cb2fc875ab8aecc34a2.svg';
import phoneIcon from '../assets/settings/bef362f34df1c12611fb2d656a77e3722ef320fa.svg';
import lockIcon from '../assets/settings/b1a4804cf127f10f64a3a7bd4a33e2f98574fb2f.svg';
import puzzleIcon from '../assets/settings/fbba628d15c5ab70e60cc329081450b97cf5cc66.svg';
import sparkleIcon from '../assets/settings/861c44550d00c7504e9e57d48151ac5be23c9070.svg';
import closeIcon from '../assets/settings/87e3622a61950dfffa5c0634d7cbf920b52e8c1c.svg';
import chevronIcon from '../assets/settings/027559ce398e28dd9d3adc725cbeaa9fc6b02ea2.svg';
import dotIcon from '../assets/settings/175aed64505c91002dc8c28535525cc4689b6abd.svg';

import googleAdsLogo from '../assets/84a092ca9ecc0b31b0ad696df4347126bd296a96.svg';
import facebookLogo from '../assets/f4e77fd7130bcbff301b92a5aaa02e35a1e2b69d.svg';
import googleWorkspaceLogo from '../assets/google-g-logo.svg';
import outlookLogo from '../assets/f671ad34371cb77a53888a76a782187e042e1ec0.svg';
import notionLogo from '../assets/8ab044cf8e0798ed70fbec12838ebcb010f64838.svg';
import clickupLogo from '../assets/0cd01f232c2b07124631d7757f0c2ed3cb426ea0.svg';
import hubspotLogo from '../assets/261a092242429e71b00498c418c2c2a42029fc0b.svg';
import kajabiLogo from '../assets/bbbef57678da7be2dff0aac5e03857b816514bc8.svg';
import whatsappLogo from '../assets/54daed7f97b42bdce78096696caca7759303a33e.svg';
import quickbooksLogo from '../assets/2f19c73652652789bc3f7e66ddc1af5720dc8f6e.svg';
import highLevelV1 from '../assets/b02266d5ebd25c11bd331dda52aed4e810e90fd5.svg';
import highLevelV2 from '../assets/d78aff36cf6384f9eabca3b198157fc82c55d80b.svg';
import highLevelV3 from '../assets/a543060bb9ebc708db61dbe6a3ecc757a75aa3fe.svg';
import metaLogo from '../assets/20d3ec46bb9045a344665c01ef932d5637442177.svg';
import appIcon from '../assets/5f06972873d0a6a933052da0a019f8ad5409efc6.png';
import PixelBlastBackground from './PixelBlastBackground';

interface ConnectorTool {
  name: string;
  description: string;
}

interface SettingsConnector {
  id: string;
  name: string;
  description: string;
  toolsCount: number;
  logo: string | string[];
  tools?: ConnectorTool[];
}

const facebookTools: ConnectorTool[] = [
  { name: 'Analyze ad accounts', description: 'Explore spend, ROAS, and audience performance.' },
  { name: 'Create & launch new ads', description: 'Create ads, target audience, and launch campaigns.' },
  { name: 'Automate rules', description: 'Set trigger-based rules to pause, scale, or adjust ads' },
  { name: 'Spy on competitor ads', description: 'Watch competitor ads and find their strategies.' },
  { name: 'Automate rules', description: 'Adjust budget based on performance metrics.' },
  { name: 'View campaign performance', description: 'Real-time metrics, AI summaries, and trend insights' },
];

const settingsConnectors: SettingsConnector[] = [
  { id: 'google-ads', name: 'Google Ads', description: 'Optimize campaigns with real-time performance data', toolsCount: 26, logo: googleAdsLogo },
  { id: 'facebook', name: 'Facebook Ads', description: 'Create better ads with real data', toolsCount: 6, logo: facebookLogo, tools: facebookTools },
  { id: 'google-workspace', name: 'Google Workspace', description: 'Sync Docs, Sheets, Gmail, and Calendar seamlessly', toolsCount: 26, logo: googleWorkspaceLogo },
  { id: 'outlook', name: 'Outlook', description: 'Connect your Microsoft email and calendar in one place', toolsCount: 12, logo: outlookLogo },
  { id: 'notion', name: 'Notion', description: 'Pull and push tasks, notes, and databases effortlessly', toolsCount: 18, logo: notionLogo },
  { id: 'clickup', name: 'Click up', description: 'Keep your projects and tasks in sync automatically', toolsCount: 14, logo: clickupLogo },
  { id: 'hubspot', name: 'Hubspot', description: 'Sync contacts, deals, and pipelines in real time', toolsCount: 22, logo: hubspotLogo },
  { id: 'kajabi', name: 'Kajabi', description: 'Connect your courses and customer data instantly', toolsCount: 8, logo: kajabiLogo },
  { id: 'highlevel', name: 'Go High Level', description: 'Unify your CRM, funnels, and client communications', toolsCount: 16, logo: [highLevelV1, highLevelV2, highLevelV3] },
  { id: 'whatsapp', name: 'Whatsapp', description: 'Send and receive messages directly from your workflow', toolsCount: 4, logo: whatsappLogo },
  { id: 'quickbooks', name: 'Quickbooks', description: 'Automate invoices, expenses, and financial reporting', toolsCount: 20, logo: quickbooksLogo },
];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        position: 'relative',
        width: '54px',
        height: '24px',
        borderRadius: '1000px',
        border: 'none',
        cursor: 'pointer',
        padding: '2px',
        background: 'transparent',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1000px',
          background: on ? '#0d6fff' : 'var(--toggle-off-bg)',
          transition: 'background 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '2px',
          top: '2px',
          width: '18px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          opacity: on ? 1 : 0,
          transition: 'opacity 200ms ease',
          transitionDelay: on ? '100ms' : '0ms',
        }}
      >
        <div
          style={{
            width: '2px',
            height: '10px',
            borderRadius: '100px',
            background: 'white',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '2px',
          left: '2px',
          width: '32px',
          height: '20px',
          borderRadius: '100px',
          background: 'var(--knob-bg)',
          boxShadow: '0px 0px 1px rgba(0,0,0,0.05), 0px 0px 4px rgba(0,0,0,0.05), 0px 0px 44px rgba(0,0,0,0.1)',
          zIndex: 2,
          transform: on ? 'translateX(18px)' : 'translateX(0)',
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '2px',
          top: '2px',
          width: '18px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          opacity: on ? 0 : 1,
          transition: 'opacity 200ms ease',
          transitionDelay: on ? '0ms' : '100ms',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '100px',
            border: '1.5px solid var(--toggle-off-circle-border)',
          }}
        />
      </div>
    </button>
  );
}

function SectionRow({
  icon,
  label,
  value,
  showBorder = true,
}: {
  icon: string;
  label: string;
  value?: React.ReactNode;
  showBorder?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: showBorder ? '10px' : '0',
        borderBottom: showBorder ? '1px solid var(--border-subtle)' : 'none',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <img src={icon} alt="" style={{ width: '20px', height: '20px', filter: 'var(--icon-filter)' }} />
        <span
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'var(--text-body)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      </div>
      {value && <div style={{ flexShrink: 0 }}>{value}</div>}
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-primary)',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '20px',
          color: 'var(--text-heading)',
        }}
      >
        {title}
      </span>
      {action && (
        <span
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'var(--text-heading)',
            cursor: 'pointer',
          }}
        >
          {action}
        </span>
      )}
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--surface-inset)',
        borderRadius: '16px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}

function NotificationRow({
  title,
  subtitle,
  on,
  onChange,
  showBorder = true,
}: {
  title: string;
  subtitle: string;
  on: boolean;
  onChange: (v: boolean) => void;
  showBorder?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: showBorder ? '10px' : '0',
        borderBottom: showBorder ? '1px solid var(--border-subtle)' : 'none',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          fontFamily: 'var(--font-primary)',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        <span style={{ color: 'var(--text-heading)' }}>{title}</span>
        <span style={{ color: 'var(--text-body)' }}>{subtitle}</span>
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  );
}

function PasswordDots() {
  return (
    <div style={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <img key={i} src={dotIcon} alt="" style={{ width: '8px', height: '8px', filter: 'var(--icon-filter)' }} />
      ))}
    </div>
  );
}

function ThemeSwitch({ isDark, onChange }: { isDark: boolean; onChange: (dark: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!isDark)}
      style={{
        position: 'relative',
        width: '54px',
        height: '28px',
        borderRadius: '1000px',
        border: 'none',
        cursor: 'pointer',
        padding: '3px',
        background: 'transparent',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1000px',
          background: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)',
          transition: 'background 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      {/* Sun icon (light mode indicator) */}
      <div
        style={{
          position: 'absolute',
          left: '5px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '16px',
          height: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          opacity: isDark ? 0 : 1,
          transition: 'opacity 250ms ease',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="3.5" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>
      {/* Moon icon (dark mode indicator) */}
      <div
        style={{
          position: 'absolute',
          right: '5px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '16px',
          height: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          opacity: isDark ? 1 : 0,
          transition: 'opacity 250ms ease',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.36 10.06A6.5 6.5 0 015.94 2.64 6 6 0 1013.36 10.06z" stroke="#e2e8f0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Knob */}
      <div
        style={{
          position: 'absolute',
          top: '3px',
          left: '3px',
          width: '22px',
          height: '22px',
          borderRadius: '100px',
          background: isDark ? '#1e1e1e' : 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1)',
          zIndex: 2,
          transform: isDark ? 'translateX(26px)' : 'translateX(0)',
          transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1), background 350ms ease',
        }}
      />
    </button>
  );
}

function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', width: '100%' }}>
      <SectionHeader title="Appearance" />
      <SectionCard>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                color: 'var(--text-heading)',
              }}
            >
              Dark mode
            </span>
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '16px',
                color: 'var(--text-body)',
              }}
            >
              {isDark ? 'Using dark theme' : 'Using light theme'}
            </span>
          </div>
          <ThemeSwitch isDark={isDark} onChange={(dark) => setTheme(dark ? 'dark' : 'light')} />
        </div>
      </SectionCard>
    </div>
  );
}

function ChevronRow({
  icon,
  label,
  showBorder = true,
  onClick,
}: {
  icon: string;
  label: string;
  showBorder?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: showBorder ? '10px' : '0',
        borderBottom: showBorder ? '1px solid var(--border-subtle)' : 'none',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <img src={icon} alt="" style={{ width: '20px', height: '20px', filter: 'var(--icon-filter)' }} />
        <span
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'var(--text-body)',
          }}
        >
          {label}
        </span>
      </div>
      <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <img src={chevronIcon} alt="" style={{ width: '6px', height: '10px', filter: 'var(--icon-filter)' }} />
      </div>
    </div>
  );
}

const textValue = (text: string) => (
  <span
    style={{
      fontFamily: 'var(--font-primary)',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      color: 'var(--text-heading)',
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </span>
);

function ConnectorCardLogo({ logo }: { logo: string | string[] }) {
  if (Array.isArray(logo)) {
    return (
      <div style={{ width: '24px', height: '24px', position: 'relative' }}>
        <img src={logo[0]} alt="" style={{ position: 'absolute', top: '7.86%', left: '2.86%', width: '39.61%', height: '84.51%' }} />
        <img src={logo[1]} alt="" style={{ position: 'absolute', top: '38.64%', left: '29.88%', width: '40.25%', height: '53.71%' }} />
        <img src={logo[2]} alt="" style={{ position: 'absolute', top: '7.88%', left: '57.89%', width: '39.36%', height: '84.47%' }} />
      </div>
    );
  }
  return <img src={logo} alt="" style={{ width: '24px', height: '24px' }} />;
}

function ConnectorModalCard({
  connector,
  on,
  onChange,
  onClick,
}: {
  connector: SettingsConnector;
  on: boolean;
  onChange: (v: boolean) => void;
  onClick?: () => void;
}) {
  return (
    <div
      className="connector-card"
      onClick={onClick}
      style={{
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backdropFilter: 'blur(4px)',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <ConnectorCardLogo logo={connector.logo} />
        <Toggle on={on} onChange={onChange} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'var(--text-heading)',
          }}
        >
          {connector.name}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'var(--text-body)',
          }}
        >
          {connector.description}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: on ? 'var(--connector-connected-bg)' : 'var(--connector-off-bg)',
            borderRadius: '999px',
            padding: on ? '4px 8px' : '4px 10px',
          }}
        >
          {on ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path fillRule="evenodd" clipRule="evenodd" d="M13.7219 2.167C14.0439 2.428 14.0936 2.9 13.833 3.222L5.333 13.722C5.19 13.898 4.975 14.001 4.748 14C4.521 13.999 4.306 13.896 4.164 13.719L0.164 8.719C-0.094 8.395 -0.042 7.923 0.282 7.664C0.605 7.406 1.077 7.458 1.336 7.782L4.753 12.054L12.667 2.278C12.928-0.044 13.4-0.094 13.722 0.167Z" transform="translate(1 1) scale(0.857)" fill="#106844" />
            </svg>
          ) : (
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--modal-dot-color)',
              }}
            />
          )}
          <span
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              letterSpacing: '-0.15px',
              color: on ? '#106844' : 'var(--text-body)',
            }}
          >
            {on ? `${connector.toolsCount} tools connected` : `Connect ${connector.toolsCount} tools`}
          </span>
        </div>
        {on && onClick && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M5.25 2.625H3.5C3.03587 2.625 2.59075 2.80937 2.26256 3.13756C1.93437 3.46575 1.75 3.91087 1.75 4.375V10.5C1.75 10.9641 1.93437 11.4092 2.26256 11.7374C2.59075 12.0656 3.03587 12.25 3.5 12.25H9.625C10.0891 12.25 10.5342 12.0656 10.8624 11.7374C11.1906 11.4092 11.375 10.9641 11.375 10.5V8.75M6.5625 7.4375L12.25 1.75M12.25 1.75H9.1875M12.25 1.75V4.8125" stroke="var(--connector-manage-color)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 500,
                fontSize: '13px',
                lineHeight: '18px',
                color: 'var(--connector-manage-color)',
              }}
            >
              Manage
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ConnectorsView({
  onClose,
  connectorStates,
  onToggleConnector,
  onCardClick,
}: {
  onClose: () => void;
  connectorStates: Record<string, boolean>;
  onToggleConnector: (id: string, v: boolean) => void;
  onCardClick?: (connector: SettingsConnector) => void;
}) {
  return (
    <div
      className="smooth-scroll"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        overflowY: 'auto',
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '28px',
              color: 'var(--text-primary)',
            }}
          >
            Connectors
          </p>
          <p
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              color: 'var(--text-body)',
            }}
          >
            Integrate your tools to enhance your specialist.
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
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
            flexShrink: 0,
          }}
        >
          <img src={closeIcon} alt="Close" style={{ width: '9px', height: '9px', filter: 'var(--icon-filter)' }} />
        </button>
      </div>

      {/* Connector cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {settingsConnectors.map((connector) => (
          <ConnectorModalCard
            key={connector.id}
            connector={connector}
            on={!!connectorStates[connector.id]}
            onChange={(v) => onToggleConnector(connector.id, v)}
            onClick={connectorStates[connector.id] && connector.tools ? () => onCardClick?.(connector) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function ManageToolsView({
  connector,
  onClose,
  onBack,
  onDisconnect,
}: {
  connector: SettingsConnector;
  onClose: () => void;
  onBack: () => void;
  onDisconnect: () => void;
}) {
  const tools = connector.tools || [];
  const [toolStates, setToolStates] = useState<Record<number, boolean>>(
    () => Object.fromEntries(tools.map((_, i) => [i, true])),
  );

  return (
    <div
      className="smooth-scroll"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        overflowY: 'auto',
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Header with back arrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.75 1L0.75 6L5.75 11" stroke="var(--text-heading)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '28px',
              color: 'var(--text-primary)',
            }}
          >
            {connector.name}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
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
            flexShrink: 0,
          }}
        >
          <img src={closeIcon} alt="Close" style={{ width: '9px', height: '9px', filter: 'var(--icon-filter)' }} />
        </button>
      </div>

      {/* Connected tools header + Disconnect */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'var(--text-heading)',
          }}
        >
          Connected tools
        </span>
        <button
          onClick={onDisconnect}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '999px',
            border: '1px solid var(--border-default)',
            background: 'var(--surface-primary)',
            cursor: 'pointer',
            fontFamily: 'var(--font-primary)',
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '18px',
            color: 'var(--text-body)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 5.5L10.25 3.75M10.25 3.75L11.75 2.25M10.25 3.75L11.75 5.25M10.25 3.75L8.75 2.25M5.5 8.5L3.75 10.25M3.75 10.25L2.25 11.75M3.75 10.25L2.25 8.75M3.75 10.25L5.25 11.75M6 8L8 6" stroke="var(--disconnect-stroke)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Disconnect
        </button>
      </div>

      {/* Tools list */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tools.map((tool, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderTop: i > 0 ? '1px solid var(--connector-tool-border)' : 'none',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'var(--text-heading)',
                }}
              >
                {tool.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'var(--text-body)',
                }}
              >
                {tool.description}
              </span>
            </div>
            <Toggle on={!!toolStates[i]} onChange={(v) => setToolStates((prev) => ({ ...prev, [i]: v }))} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FacebookConnectModal({ onClose, onConnect }: { onClose: () => void; onConnect: () => void }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => setClosing(true);

  const handleConnect = () => {
    onConnect();
    setClosing(true);
  };

  return (
    <div
      className={`connector-modal-overlay ${closing ? 'closing' : ''}`}
      onClick={handleClose}
      onAnimationEnd={() => { if (closing) onClose(); }}
    >
      <div
        className={`connector-modal ${closing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          background: 'var(--surface-elevated)',
          backdropFilter: 'blur(10px)',
          boxShadow:
            '0px 3px 6px 0px rgba(0,0,0,0.04), 0px 11px 11px 0px rgba(0,0,0,0.03), 0px 24px 15px 0px rgba(0,0,0,0.02), 0px 43px 17px 0px rgba(0,0,0,0.01), 0px 67px 19px 0px rgba(0,0,0,0)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
          <button
            onClick={handleClose}
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
              padding: '0',
            }}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.72 8.78C7.866 8.928 8.058 9 8.25 9H8.25C8.443 9 8.635 8.927 8.78 8.78C9.074 8.488 9.074 8.013 8.78 7.72L5.562 4.5L8.78 1.282C9.074 0.989 9.074 0.514 8.78 0.22C8.488 -0.072 8.013 -0.072 7.72 0.22L4.5 3.44L1.28 0.22C0.988 -0.073 0.513 -0.073 0.22 0.22C-0.073 0.513 -0.073 0.988 0.22 1.28L3.44 4.5L0.22 7.72C-0.073 8.013 -0.073 8.488 0.22 8.78C0.366 8.928 0.558 9 0.75 9L0.75 9C0.943 9 1.135 8.928 1.28 8.782L4.5 5.562L7.72 8.78Z" fill="var(--svg-stroke-color)" />
            </svg>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '28px',
                color: 'var(--text-primary)',
              }}
            >
              Facebook Ads
            </p>

            <div
              style={{
                background: 'var(--surface-inset)',
                borderRadius: '16px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '72px 24px',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <PixelBlastBackground
                  color="#c0c0c0"
                  pixelSize={2.0}
                  patternScale={4}
                  patternDensity={1.35}
                  pixelSizeJitter={0.15}
                  speed={1.6}
                  opacity={1}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  className="modal-icon-enter"
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow:
                      '0px 1px 1px 0px rgba(0,0,0,0.06), 0px 2px 2px 0px rgba(0,0,0,0.05), 0px 5px 3px 0px rgba(0,0,0,0.03), 0px 8px 3px 0px rgba(0,0,0,0.01), 0px 13px 4px 0px rgba(0,0,0,0)',
                    animationDelay: '150ms',
                  }}
                >
                  <img src={appIcon} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <svg
                  className="modal-line-draw"
                  width="55"
                  height="6"
                  viewBox="0 0 55 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <circle cx="3" cy="3" r="3" fill="#6366F1" />
                  <line x1="10" y1="3" x2="45" y2="3" stroke="#6366F1" strokeWidth="2" strokeDasharray="3.5 7" strokeLinecap="round" />
                  <circle cx="52" cy="3" r="3" fill="#6366F1" />
                </svg>

                <div
                  className="modal-icon-enter"
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '20px',
                    background: 'var(--modal-icon-bg)',
                    border: '1px solid var(--modal-icon-border)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    flexShrink: 0,
                    boxShadow:
                      '0px 1px 1px 0px rgba(0,0,0,0.06), 0px 2px 2px 0px rgba(0,0,0,0.05), 0px 5px 3px 0px rgba(0,0,0,0.03), 0px 8px 3px 0px rgba(0,0,0,0.01), 0px 13px 4px 0px rgba(0,0,0,0)',
                    animationDelay: '300ms',
                  }}
                >
                  <img src={metaLogo} alt="Meta" style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'var(--text-heading)',
                }}
              >
                Connect your Facebook Business
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'var(--text-body)',
                }}
              >
                Facebook Ads syncs campaigns with Kodara. By continuing, you
                agree to Kodara&rsquo;s terms. Need help? Contact support.
              </p>
            </div>

            <div style={{ width: '100%', height: '1px', background: 'var(--modal-divider)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'var(--text-heading)',
                }}
              >
                Tools:
              </p>
              {[
                'Analyze ad accounts',
                'Create & launch new ads',
                'View campaign performance',
                'Spy on competitor ads',
                'Create detailed reports',
                'Automate rules',
              ].map((tool) => (
                <div key={tool} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <path d="M1 5L5 9L13 1" stroke="var(--check-stroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: 'var(--text-body)',
                    }}
                  >
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="connector-modal-btn" onClick={handleConnect}>
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                fontFamily: 'var(--font-primary)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.15px',
                color: 'var(--btn-text-color)',
                textAlign: 'center',
              }}
            >
              Connect
            </span>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                border: '1.5px solid var(--btn-border-inner)',
                filter: 'blur(0.2px)',
                pointerEvents: 'none',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

type SettingsView = 'settings' | 'connectors' | 'manage-tools';

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const [currentView, setCurrentView] = useState<SettingsView>('settings');
  const [managingConnector, setManagingConnector] = useState<SettingsConnector | null>(null);
  const [notifications, setNotifications] = useState({
    checkins: false,
    tips: false,
    progress: false,
  });
  const [connectorStates, setConnectorStates] = useState<Record<string, boolean>>({});
  const [showFacebookModal, setShowFacebookModal] = useState(false);

  const handleClose = () => setClosing(true);

  const toggleNotification = (key: keyof typeof notifications) => (v: boolean) =>
    setNotifications((prev) => ({ ...prev, [key]: v }));

  const handleToggleConnector = (id: string, v: boolean) => {
    if (id === 'facebook' && v) {
      setShowFacebookModal(true);
      return;
    }
    setConnectorStates((prev) => ({ ...prev, [id]: v }));
  };

  const handleCardClick = (connector: SettingsConnector) => {
    if (connectorStates[connector.id] && connector.tools) {
      setManagingConnector(connector);
      setCurrentView('manage-tools');
    }
  };

  return (
    <div
      className={`settings-modal-overlay${closing ? ' closing' : ''}`}
      onClick={handleClose}
      onAnimationEnd={() => { if (closing) onClose(); }}
    >
      <div
        className={`settings-modal${closing ? ' closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          maxHeight: '600px',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          background: 'var(--surface-elevated)',
          backdropFilter: 'blur(10px)',
          boxShadow:
            '0px 3px 6px 0px rgba(0,0,0,0.04), 0px 11px 11px 0px rgba(0,0,0,0.03), 0px 24px 15px 0px rgba(0,0,0,0.02), 0px 43px 17px 0px rgba(0,0,0,0.01), 0px 67px 19px 0px rgba(0,0,0,0)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div key={currentView + (managingConnector?.id || '')} className="settings-view-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {currentView === 'manage-tools' && managingConnector ? (
            <ManageToolsView
              connector={managingConnector}
              onClose={handleClose}
              onBack={() => { setCurrentView('connectors'); setManagingConnector(null); }}
              onDisconnect={() => {
                setConnectorStates((prev) => ({ ...prev, [managingConnector.id]: false }));
                setCurrentView('connectors');
                setManagingConnector(null);
              }}
            />
          ) : currentView === 'connectors' ? (
            <ConnectorsView
              onClose={handleClose}
              connectorStates={connectorStates}
              onToggleConnector={handleToggleConnector}
              onCardClick={handleCardClick}
            />
          ) : (
            <>
              <div
                className="smooth-scroll"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  padding: '24px',
                  paddingBottom: '8px',
                  overflowY: 'auto',
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 500,
                      fontSize: '20px',
                      lineHeight: '28px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Settings
                  </p>
                  <button
                    onClick={handleClose}
                    style={{
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
                      flexShrink: 0,
                    }}
                  >
                    <img src={closeIcon} alt="Close" style={{ width: '9px', height: '9px', filter: 'var(--icon-filter)' }} />
                  </button>
                </div>

                {/* Account */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', width: '100%' }}>
                  <SectionHeader title="Account" action="Edit" />
                  <SectionCard>
                    <SectionRow icon={userIcon} label="Name" value={textValue('Marcus Wilson')} />
                    <SectionRow icon={envelopeIcon} label="Email" value={textValue('marcus@email.com')} />
                    <SectionRow icon={phoneIcon} label="Phone number" value={textValue('+1 604 339 1221')} showBorder={false} />
                  </SectionCard>
                </div>

                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', width: '100%' }}>
                  <SectionHeader title="Account" action="Edit" />
                  <SectionCard>
                    <SectionRow icon={lockIcon} label="Password" value={<PasswordDots />} showBorder={false} />
                  </SectionCard>
                </div>

                {/* Appearance */}
                <AppearanceSection />

                {/* Customize your specialist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', width: '100%' }}>
                  <SectionHeader title="Customize you specialist" />
                  <SectionCard>
                    <ChevronRow icon={puzzleIcon} label="Connectors" onClick={() => setCurrentView('connectors')} />
                    <ChevronRow icon={sparkleIcon} label="Skills" showBorder={false} />
                  </SectionCard>
                </div>

                {/* Notifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', width: '100%' }}>
                  <SectionHeader title="Notifications" />
                  <SectionCard>
                    <NotificationRow
                      title="AI Check-ins & Reminders"
                      subtitle="Personalized check-ins and smart reminders."
                      on={notifications.checkins}
                      onChange={toggleNotification('checkins')}
                    />
                    <NotificationRow
                      title="Tips & Feature Updates"
                      subtitle="Helpful tips and feature updates."
                      on={notifications.tips}
                      onChange={toggleNotification('tips')}
                    />
                    <NotificationRow
                      title="Progress & Insights"
                      subtitle="AI summaries and progress insights."
                      on={notifications.progress}
                      onChange={toggleNotification('progress')}
                      showBorder={false}
                    />
                  </SectionCard>
                </div>
              </div>

              {/* Fixed bottom bar */}
              <div
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  padding: '0 24px 24px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-24px',
                    left: 0,
                    right: 0,
                    height: '24px',
                    background: 'var(--gradient-fade)',
                    pointerEvents: 'none',
                  }}
                />
                <button
                  className="connector-modal-btn"
                  onClick={handleClose}
                >
                  <span
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '-0.15px',
                      color: 'var(--btn-text-color)',
                      textAlign: 'center',
                    }}
                  >
                    Save changes
                  </span>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '8px',
                      border: '1.5px solid var(--btn-border-inner)',
                      filter: 'blur(0.2px)',
                      pointerEvents: 'none',
                    }}
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showFacebookModal && (
        <FacebookConnectModal
          onClose={() => setShowFacebookModal(false)}
          onConnect={() => setConnectorStates((prev) => ({ ...prev, facebook: true }))}
        />
      )}
    </div>
  );
}

export function ConnectorsModal({ onClose }: { onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const [connectorStates, setConnectorStates] = useState<Record<string, boolean>>({});
  const [showFacebookModal, setShowFacebookModal] = useState(false);
  const [managingConnector, setManagingConnector] = useState<SettingsConnector | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'manage-tools'>('list');

  const handleClose = () => setClosing(true);

  const handleToggleConnector = (id: string, v: boolean) => {
    if (id === 'facebook' && v) {
      setShowFacebookModal(true);
      return;
    }
    setConnectorStates((prev) => ({ ...prev, [id]: v }));
  };

  const handleCardClick = (connector: SettingsConnector) => {
    if (connectorStates[connector.id] && connector.tools) {
      setManagingConnector(connector);
      setCurrentView('manage-tools');
    }
  };

  return (
    <div
      className={`connector-modal-overlay ${closing ? 'closing' : ''}`}
      onClick={handleClose}
      onAnimationEnd={() => { if (closing) onClose(); }}
    >
      <div
        className={`connector-modal connectors-modal-hide-scrollbar ${closing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          maxHeight: '600px',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          background: 'var(--surface-elevated)',
          backdropFilter: 'blur(10px)',
          boxShadow:
            '0px 3px 6px 0px rgba(0,0,0,0.04), 0px 11px 11px 0px rgba(0,0,0,0.03), 0px 24px 15px 0px rgba(0,0,0,0.02), 0px 43px 17px 0px rgba(0,0,0,0.01), 0px 67px 19px 0px rgba(0,0,0,0)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div key={currentView + (managingConnector?.id || '')} className="settings-view-enter" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {currentView === 'manage-tools' && managingConnector ? (
            <ManageToolsView
              connector={managingConnector}
              onClose={handleClose}
              onBack={() => { setCurrentView('list'); setManagingConnector(null); }}
              onDisconnect={() => {
                setConnectorStates((prev) => ({ ...prev, [managingConnector.id]: false }));
                setCurrentView('list');
                setManagingConnector(null);
              }}
            />
          ) : (
            <ConnectorsView
              onClose={handleClose}
              connectorStates={connectorStates}
              onToggleConnector={handleToggleConnector}
              onCardClick={handleCardClick}
            />
          )}
        </div>
      </div>

      {showFacebookModal && (
        <FacebookConnectModal
          onClose={() => setShowFacebookModal(false)}
          onConnect={() => setConnectorStates((prev) => ({ ...prev, facebook: true }))}
        />
      )}
    </div>
  );
}

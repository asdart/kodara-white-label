import { useState } from 'react';
import { PuzzleIcon } from './Icons';
import PixelBlastBackground from './PixelBlastBackground';

import googleAdsLogo from '../assets/84a092ca9ecc0b31b0ad696df4347126bd296a96.svg';
import facebookLogo from '../assets/f4e77fd7130bcbff301b92a5aaa02e35a1e2b69d.svg';
import googleWorkspaceLogo from '../assets/google-g-logo.svg';
import metaLogo from '../assets/20d3ec46bb9045a344665c01ef932d5637442177.svg';
import appIcon from '../assets/5f06972873d0a6a933052da0a019f8ad5409efc6.png';

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

interface Connector {
  id: string;
  name: string;
  description: string;
  logo: 'google-ads' | 'facebook' | 'google-workspace' | 'outlook' | 'notion' | 'clickup' | 'hubspot' | 'kajabi' | 'highlevel' | 'whatsapp' | 'quickbooks' | 'asana';
}

const connectors: Connector[] = [
  { id: 'google-ads', name: 'Google Ads', description: 'Optimize campaigns with real-time performance data', logo: 'google-ads' },
  { id: 'facebook', name: 'Facebook Ads', description: 'Create better ads with real data', logo: 'facebook' },
  { id: 'google-workspace', name: 'Google Workspace', description: 'Sync Docs, Sheets, Gmail, and Calendar seamlessly.', logo: 'google-workspace' },
  { id: 'outlook', name: 'Outlook', description: 'Connect your Microsoft email and calendar in one place', logo: 'outlook' },
  { id: 'notion', name: 'Notion', description: 'Pull and push tasks, notes, and databases effortlessly', logo: 'notion' },
  { id: 'clickup', name: 'Click up', description: 'Keep your projects and tasks in sync automatically', logo: 'clickup' },
  { id: 'asana', name: 'Asana', description: 'Manage team workflows without leaving your app', logo: 'asana' },
  { id: 'hubspot', name: 'Hubspot', description: 'Sync contacts, deals, and pipelines in real time', logo: 'hubspot' },
  { id: 'kajabi', name: 'Kajabi', description: 'Connect your courses and customer data instantly', logo: 'kajabi' },
  { id: 'highlevel', name: 'Go High Level', description: 'Unify your CRM, funnels, and client communications', logo: 'highlevel' },
  { id: 'whatsapp', name: 'Whatsapp', description: 'Send and receive messages directly from your workflow', logo: 'whatsapp' },
  { id: 'quickbooks', name: 'Quickbooks', description: 'Automate invoices, expenses, and financial reporting', logo: 'quickbooks' },
];

function ConnectorLogo({ type }: { type: Connector['logo'] }) {
  const size = '24px';

  switch (type) {
    case 'google-ads':
      return <img src={googleAdsLogo} alt="" style={{ width: size, height: size }} />;
    case 'facebook':
      return <img src={facebookLogo} alt="" style={{ width: size, height: size }} />;
    case 'google-workspace':
      return <img src={googleWorkspaceLogo} alt="" style={{ width: size, height: size }} />;
    case 'outlook':
      return <img src={outlookLogo} alt="" style={{ width: size, height: size }} />;
    case 'notion':
      return <img src={notionLogo} alt="" style={{ width: size, height: size }} />;
    case 'clickup':
    case 'asana':
      return <img src={clickupLogo} alt="" style={{ width: '20px', height: size }} />;
    case 'hubspot':
      return <img src={hubspotLogo} alt="" style={{ width: '16px', height: '18px' }} />;
    case 'kajabi':
      return (
        <div style={{ width: size, height: size, position: 'relative' }}>
          <img src={kajabiLogo} alt="" style={{ position: 'absolute', inset: '10%', width: '80%', height: '80%' }} />
        </div>
      );
    case 'highlevel':
      return (
        <div style={{ width: size, height: size, position: 'relative' }}>
          <img src={highLevelV1} alt="" style={{ position: 'absolute', top: '7.86%', left: '2.86%', width: '39.61%', height: '84.51%' }} />
          <img src={highLevelV2} alt="" style={{ position: 'absolute', top: '38.64%', left: '29.88%', width: '40.25%', height: '53.71%' }} />
          <img src={highLevelV3} alt="" style={{ position: 'absolute', top: '7.88%', left: '57.89%', width: '39.36%', height: '84.47%' }} />
        </div>
      );
    case 'whatsapp':
      return <img src={whatsappLogo} alt="" style={{ width: '20px', height: '20px' }} />;
    case 'quickbooks':
      return <img src={quickbooksLogo} alt="" style={{ width: size, height: size }} />;
  }
}


function ConnectorCard({ connector, onClick }: { connector: Connector; onClick?: () => void }) {
  return (
    <div
      className="connector-card"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '24px',
        borderRadius: '16px',
        backdropFilter: 'blur(4px)',
        minHeight: '160px',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          flex: 1,
          minWidth: 0,
        }}
      >
        <ConnectorLogo type={connector.logo} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: 'auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 600,
              fontSize: 'var(--body-3-size, 14px)',
              lineHeight: 'var(--body-3-line, 20px)',
              letterSpacing: 'var(--body-3-spacing, -0.15px)',
              color: 'var(--alpha-light-900, rgba(26,26,26,0.8))',
            }}
          >
            {connector.name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 400,
              fontSize: 'var(--body-3-size, 14px)',
              lineHeight: 'var(--body-3-line, 20px)',
              letterSpacing: 'var(--body-3-spacing, -0.15px)',
              color: 'rgba(26, 26, 26, 0.7)',
            }}
          >
            {connector.description}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FacebookConnectModal({ onClose, onManageConnectors, onTryItOut }: { onClose: () => void; onManageConnectors?: () => void; onTryItOut?: () => void }) {
  const [closing, setClosing] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleClose = () => {
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
          border: '1px solid var(--alpha-light-100, rgba(26,26,26,0.09))',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          boxShadow:
            '0px 3px 6px 0px rgba(0,0,0,0.04), 0px 11px 11px 0px rgba(0,0,0,0.03), 0px 24px 15px 0px rgba(0,0,0,0.02), 0px 43px 17px 0px rgba(0,0,0,0.01), 0px 67px 19px 0px rgba(0,0,0,0)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '28px',
              height: '28px',
              borderRadius: '999px',
              background: 'var(--alpha-light-50, rgba(26,26,26,0.06))',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0',
            }}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.72 8.78C7.866 8.928 8.058 9 8.25 9H8.25C8.443 9 8.635 8.927 8.78 8.78C9.074 8.488 9.074 8.013 8.78 7.72L5.562 4.5L8.78 1.282C9.074 0.989 9.074 0.514 8.78 0.22C8.488 -0.072 8.013 -0.072 7.72 0.22L4.5 3.44L1.28 0.22C0.988 -0.073 0.513 -0.073 0.22 0.22C-0.073 0.513 -0.073 0.988 0.22 1.28L3.44 4.5L0.22 7.72C-0.073 8.013 -0.073 8.488 0.22 8.78C0.366 8.928 0.558 9 0.75 9L0.75 9C0.943 9 1.135 8.928 1.28 8.782L4.5 5.562L7.72 8.78Z" fill="rgba(26,26,26,0.6)" />
            </svg>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Title */}
            <p
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '28px',
                color: '#1a1a1a',
              }}
            >
              Facebook Ads
            </p>

            {/* Illustration area */}
            <div
              style={{
                background: 'rgba(26,26,26,0.04)',
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
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                }}
              >
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

              {/* Icons row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Kodara icon */}
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
                  <img
                    src={appIcon}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Connecting line */}
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
                  <line
                    x1="10"
                    y1="3"
                    x2="45"
                    y2="3"
                    stroke="#6366F1"
                    strokeWidth="2"
                    strokeDasharray="3.5 7"
                    strokeLinecap="round"
                  />
                  <circle cx="52" cy="3" r="3" fill="#6366F1" />
                </svg>

                {/* Meta logo */}
                <div
                  className="modal-icon-enter"
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '20px',
                    background: 'white',
                    border: '1px solid var(--alpha-light-200, rgba(26,26,26,0.2))',
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

            {/* Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'var(--alpha-light-900, rgba(26,26,26,0.8))',
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
                  color: 'var(--alpha-light-600, rgba(26,26,26,0.6))',
                }}
              >
                Facebook Ads syncs campaigns with Kodara. By continuing, you
                agree to Kodara&rsquo;s terms. Need help? Contact support.
              </p>
            </div>

            {!connected && (
              <div style={{ width: '100%', height: '1px', background: 'rgba(26,26,26,0.06)' }} />
            )}

            {!connected && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'var(--alpha-light-900, rgba(26,26,26,0.8))',
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
                      <path d="M1 5L5 9L13 1" stroke="rgba(26,26,26,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: 'var(--alpha-light-600, rgba(26,26,26,0.6))',
                      }}
                    >
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!connected ? (
            <button
              className="connector-modal-btn"
              onClick={() => setConnected(true)}
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
                  color: 'rgba(255,255,255,0.8)',
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
                  border: '1.5px solid white',
                  filter: 'blur(0.2px)',
                  pointerEvents: 'none',
                }}
              />
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <button
                onClick={() => { handleClose(); onTryItOut?.(); }}
                style={{
                  flex: '1 0 0',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  background: 'linear-gradient(180deg, #737373 0%, #404040 100%)',
                  border: 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
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
                    color: 'rgba(255,255,255,0.8)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Try it out
                </span>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '8px',
                    border: '1.5px solid white',
                    filter: 'blur(0.2px)',
                    pointerEvents: 'none',
                  }}
                />
              </button>
              <button
                onClick={() => {
                  handleClose();
                  onManageConnectors?.();
                }}
                style={{
                  flex: '1 0 0',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(26,26,26,0.2)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
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
                    color: 'rgba(26,26,26,0.8)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Manage connectors
                </span>
                <div
                  style={{
                    position: 'absolute',
                    inset: '-1px',
                    borderRadius: '8px',
                    border: '1.5px solid white',
                    filter: 'blur(0.2px)',
                    pointerEvents: 'none',
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConnectorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showFacebookModal, setShowFacebookModal] = useState(false);

  const filtered = connectors.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col items-start flex-1 min-h-0" style={{ width: '100%', height: '100%' }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{
          width: '100%',
          paddingTop: '24px',
          paddingBottom: '0px',
          paddingLeft: '20px',
          paddingRight: '20px',
          background: 'var(--alpha-dark-800, rgba(255,255,255,0.75))',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          className="flex items-start justify-between flex-1"
          style={{ paddingBottom: '10px' }}
        >
          <div className="flex items-center" style={{ gap: '6px', paddingTop: '4px' }}>
            <PuzzleIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600, rgba(26,26,26,0.6))" />
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 500,
                fontSize: 'var(--body-3-size, 14px)',
                lineHeight: 'var(--body-3-line, 20px)',
                letterSpacing: 'var(--body-3-spacing, -0.15px)',
                color: 'var(--alpha-light-600, rgba(26,26,26,0.6))',
                whiteSpace: 'nowrap',
              }}
            >
              Connectors
            </span>
          </div>
          <div className="flex items-center" style={{ gap: '16px' }}>
            {/* Category dropdown */}
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '180px',
                height: '32px',
                paddingLeft: '8px',
                paddingRight: '8px',
                paddingTop: '6px',
                paddingBottom: '6px',
                borderRadius: '8px',
                border: '1px solid rgba(26, 26, 26, 0.09)',
                background: 'white',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'rgba(26, 26, 26, 0.48)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Category
              </span>
              <svg width="20" height="20" viewBox="0 0 10.0015 5.75075" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M4.99975 5.75075C4.80775 5.75075 4.61575 5.67775 4.46975 5.53075L0.21975 1.28075C-0.07325 0.98775 -0.07325 0.51275 0.21975 0.21975C0.51275 -0.07325 0.98775 -0.07325 1.28075 0.21975L5.00075 3.93975L8.72075 0.21975C9.01375 -0.07325 9.48875 -0.07325 9.78175 0.21975C10.0747 0.51275 10.0747 0.98775 9.78175 1.28075L5.53175 5.53075C5.38575 5.67675 5.19375 5.75075 5.00175 5.75075H4.99975Z" fill="rgba(26, 26, 26, 0.48)" />
              </svg>
            </button>
            {/* Search field */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '224px',
                height: '32px',
                paddingLeft: '8px',
                paddingRight: '4px',
                paddingTop: '6px',
                paddingBottom: '6px',
                borderRadius: '8px',
                border: '1px solid rgba(26, 26, 26, 0.09)',
                background: 'white',
                overflow: 'hidden',
                gap: '4px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 14 13.9999" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.25106 10.3116C8.28145 11.0569 7.06747 11.5 5.75 11.5C2.57436 11.5 0 8.92564 0 5.75C0 2.57436 2.57436 0 5.75 0C8.92564 0 11.5 2.57436 11.5 5.75C11.5 7.06742 11.0569 8.28137 10.3117 9.25095L13.7803 12.7196C14.0732 13.0125 14.0732 13.4873 13.7803 13.7802C13.4874 14.0731 13.0126 14.0731 12.7197 13.7802L9.25106 10.3116ZM1.5 5.75C1.5 3.40279 3.40279 1.5 5.75 1.5C8.09721 1.5 10 3.40279 10 5.75C10 6.9119 9.53374 7.96491 8.77812 8.73211C8.77018 8.7394 8.76237 8.74689 8.75467 8.75458C8.74698 8.76228 8.73948 8.7701 8.73219 8.77804C7.96498 9.53371 6.91194 10 5.75 10C3.40279 10 1.5 8.09721 1.5 5.75Z" fill="rgba(26, 26, 26, 0.48)" />
              </svg>
              <input
                type="text"
                placeholder="Search connectors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="connector-search"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'var(--alpha-light-900, rgba(26,26,26,0.8))',
                  flex: 1,
                  minWidth: 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Connector cards grid */}
      <div
        className="flex-1 overflow-auto"
        style={{
          width: '100%',
          padding: '24px 8px 64px 8px',
          scrollBehavior: 'smooth',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            maxWidth: '676px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {filtered.map((connector) => (
            <ConnectorCard
              key={connector.id}
              connector={connector}
              onClick={connector.id === 'facebook' ? () => setShowFacebookModal(true) : undefined}
            />
          ))}
        </div>
      </div>

      {showFacebookModal && (
        <FacebookConnectModal onClose={() => setShowFacebookModal(false)} />
      )}
    </div>
  );
}

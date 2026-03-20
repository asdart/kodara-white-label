import { useState, useEffect } from 'react';
import { PlugIcon, XMarkIcon } from './Icons';
import googleAdsLogo from '../assets/84a092ca9ecc0b31b0ad696df4347126bd296a96.svg';
import facebookLogo from '../assets/f4e77fd7130bcbff301b92a5aaa02e35a1e2b69d.svg';
import googleWorkspaceLogo from '../assets/google-g-logo.svg';

interface ConnectorsBarProps {
  onConnectClick?: () => void;
  onClose?: () => void;
  onExpandedChange?: (expanded: boolean) => void;
}

export default function ConnectorsBar({ onConnectClick, onClose, onExpandedChange }: ConnectorsBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpanded(true);
      onExpandedChange?.(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onExpandedChange]);

  const handleClose = () => {
    setClosing(true);
    onExpandedChange?.(false);
  };

  const handleConnectClick = () => {
    onConnectClick?.();
  };

  const isCollapsed = !expanded || closing;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: isCollapsed ? '0fr' : '1fr',
        opacity: isCollapsed ? 0 : 1,
        paddingTop: isCollapsed ? '0px' : '12px',
        transition: 'grid-template-rows 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease, padding-top 400ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onTransitionEnd={(e) => {
        if (closing && e.propertyName === 'grid-template-rows') onClose?.();
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <div
          className="flex items-center justify-between w-full cursor-pointer hover:opacity-90 transition-opacity"
          style={{ paddingLeft: '16px', paddingRight: '16px' }}
          onClick={handleConnectClick}
        >
          <div className="flex gap-[6px] items-center">
            <div className="flex items-center justify-center shrink-0" style={{ width: '16px', height: '16px' }}>
              <PlugIcon style={{ width: '14px', height: '14px', flexShrink: 0 }} color="var(--alpha-light-600)" />
            </div>
            <span
              className="font-medium whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--body-4-size)',
                lineHeight: 'var(--body-4-line)',
                letterSpacing: 'var(--body-3-spacing)',
                color: 'var(--alpha-light-600)',
              }}
            >
              Connect your tools to specialist
            </span>
          </div>

          <div className="flex gap-[6px] items-center">
            {/* Connector icons — overlapping style */}
            <div className="flex items-center" style={{ marginRight: '2px' }}>
              <div
                className="flex items-center justify-center shrink-0 z-[3]"
                style={{
                  width: '20px',
                  height: '20px',
                  padding: '2px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--alpha-dark-900)',
                  border: '1px solid var(--alpha-light-100)',
                }}
              >
                <img src={googleAdsLogo} alt="Google Ads" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
              </div>
              <div
                className="flex items-center justify-center shrink-0 -ml-[2px] z-[2]"
                style={{
                  width: '20px',
                  height: '20px',
                  padding: '2px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--alpha-dark-900)',
                  border: '1px solid var(--alpha-light-100)',
                }}
              >
                <img src={facebookLogo} alt="Facebook" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
              </div>
              <div
                className="flex items-center justify-center shrink-0 -ml-[2px] z-[1]"
                style={{
                  width: '20px',
                  height: '20px',
                  padding: '2px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--alpha-dark-900)',
                  border: '1px solid var(--alpha-light-100)',
                }}
              >
                <img src={googleWorkspaceLogo} alt="Google" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
              </div>
            </div>

            <button
              className="flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
              style={{
                width: '16px',
                height: '16px',
                padding: 0,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              aria-label="Dismiss"
            >
              <XMarkIcon className="w-4 h-4" color="var(--alpha-light-600)" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

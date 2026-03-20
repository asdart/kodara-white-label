import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PlusIcon, ArrowUpIcon, StopIcon, SparkleSmallIcon, FilePlusIcon, ImageIcon, PlugIcon, MicIcon, DotsVerticalIcon } from './Icons';
import googleAdsLogo from '../assets/84a092ca9ecc0b31b0ad696df4347126bd296a96.svg';
import facebookLogo from '../assets/f4e77fd7130bcbff301b92a5aaa02e35a1e2b69d.svg';
import googleWorkspaceLogo from '../assets/google-g-logo.svg';

interface ChatInputProps {
  disabled?: boolean;
  onTextChange?: (text: string) => void;
  onSubmit?: (text: string) => void;
  onStop?: () => void;
  onConnectorsClick?: () => void;
  placeholder?: string;
}

const CONNECTOR_ITEMS = [
  { id: 'facebook', name: 'Facebook Ads', logo: facebookLogo },
  { id: 'google-workspace', name: 'Google Workspace', logo: googleWorkspaceLogo },
  { id: 'google-ads', name: 'Google Ads', logo: googleAdsLogo },
];

// 4 lines max: line-height is 20px (--body-3-line)
const MAX_LINES = 4;
const LINE_HEIGHT = 20;
const MAX_TEXTAREA_HEIGHT = MAX_LINES * LINE_HEIGHT;

export default function ChatInput({ disabled = false, onTextChange, onSubmit, onStop, onConnectorsClick, placeholder = "How can I help you today?" }: ChatInputProps) {
  const isStopMode = disabled && !!onStop;
  const [hasText, setHasText] = useState(false);

  // Plus dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const plusBtnRef = useRef<HTMLButtonElement>(null);

  // Connectors dropdown
  const [connectorsOpen, setConnectorsOpen] = useState(false);
  const [connectorsClosing, setConnectorsClosing] = useState(false);
  const [connectorsPosition, setConnectorsPosition] = useState({ top: 0, left: 0 });
  const [connectorToggles, setConnectorToggles] = useState<Record<string, boolean>>({ facebook: false, 'google-workspace': false, 'google-ads': false });
  const connectorsDropdownRef = useRef<HTMLDivElement>(null);
  const connectorsBtnRef = useRef<HTMLButtonElement>(null);

  // Mic input dropdown
  const [micOpen, setMicOpen] = useState(false);
  const [micClosing, setMicClosing] = useState(false);
  const [micPosition, setMicPosition] = useState({ top: 0, left: 0 });
  const [selectedMic, setSelectedMic] = useState('shure-v7');
  const micDropdownRef = useRef<HTMLDivElement>(null);
  const micBtnRef = useRef<HTMLButtonElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const prevHeight = el.getBoundingClientRect().height;
    el.style.transition = 'none';
    el.style.height = 'auto';
    const targetHeight = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT);
    el.style.height = `${prevHeight}px`;
    void el.offsetHeight;
    el.style.transition = 'height 150ms ease-out';
    el.style.height = `${targetHeight}px`;
    el.style.overflowY = el.scrollHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
  }, []);

  // ── Plus dropdown helpers ──────────────────────────────────────────────────

  const updateDropdownPosition = useCallback(() => {
    if (plusBtnRef.current) {
      const rect = plusBtnRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + 6, left: rect.left });
    }
  }, []);

  const closeDropdown = useCallback(() => {
    if (!dropdownOpen || closing) return;
    setClosing(true);
    setTimeout(() => { setDropdownOpen(false); setClosing(false); }, 150);
  }, [dropdownOpen, closing]);

  const toggleDropdown = () => {
    if (dropdownOpen) { closeDropdown(); }
    else { updateDropdownPosition(); setDropdownOpen(true); setClosing(false); }
  };

  // ── Connectors dropdown helpers ───────────────────────────────────────────

  const updateConnectorsPosition = useCallback(() => {
    if (connectorsBtnRef.current) {
      const rect = connectorsBtnRef.current.getBoundingClientRect();
      setConnectorsPosition({ top: rect.bottom + 6, left: rect.left });
    }
  }, []);

  const closeConnectorsDropdown = useCallback(() => {
    if (!connectorsOpen || connectorsClosing) return;
    setConnectorsClosing(true);
    setTimeout(() => { setConnectorsOpen(false); setConnectorsClosing(false); }, 150);
  }, [connectorsOpen, connectorsClosing]);

  const toggleConnectorsDropdown = () => {
    if (connectorsOpen) { closeConnectorsDropdown(); }
    else { updateConnectorsPosition(); setConnectorsOpen(true); setConnectorsClosing(false); }
  };

  // ── Mic dropdown helpers ─────────────────────────────────────────────────

  const updateMicPosition = useCallback(() => {
    if (micBtnRef.current) {
      const rect = micBtnRef.current.getBoundingClientRect();
      setMicPosition({ top: rect.bottom + 6, left: rect.right - 200 });
    }
  }, []);

  const closeMicDropdown = useCallback(() => {
    if (!micOpen || micClosing) return;
    setMicClosing(true);
    setTimeout(() => { setMicOpen(false); setMicClosing(false); }, 150);
  }, [micOpen, micClosing]);

  const toggleMicDropdown = () => {
    if (micOpen) { closeMicDropdown(); }
    else { updateMicPosition(); setMicOpen(true); setMicClosing(false); }
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(() => {
    const el = textareaRef.current;
    if (!el || !el.value.trim() || disabled) return;
    const text = el.value.trim();
    onSubmit?.(text);
    el.value = '';
    setHasText(false);
    onTextChange?.('');
    el.style.transition = 'none';
    el.style.height = 'auto';
    el.style.overflowY = 'hidden';
  }, [disabled, onSubmit, onTextChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
    },
    [handleSubmit],
  );

  // ── Click-outside / Escape for plus dropdown ──────────────────────────────

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        plusBtnRef.current && !plusBtnRef.current.contains(e.target as Node)
      ) { closeDropdown(); }
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handleClickOutside); };
  }, [dropdownOpen, closeDropdown]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDropdown(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [dropdownOpen, closeDropdown]);

  useEffect(() => {
    if (!dropdownOpen) return;
    updateDropdownPosition();
    window.addEventListener('scroll', updateDropdownPosition, true);
    window.addEventListener('resize', updateDropdownPosition);
    return () => { window.removeEventListener('scroll', updateDropdownPosition, true); window.removeEventListener('resize', updateDropdownPosition); };
  }, [dropdownOpen, updateDropdownPosition]);

  // ── Click-outside / Escape for connectors dropdown ────────────────────────

  useEffect(() => {
    if (!connectorsOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        connectorsDropdownRef.current && !connectorsDropdownRef.current.contains(e.target as Node) &&
        connectorsBtnRef.current && !connectorsBtnRef.current.contains(e.target as Node)
      ) { closeConnectorsDropdown(); }
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handleClickOutside); };
  }, [connectorsOpen, closeConnectorsDropdown]);

  useEffect(() => {
    if (!connectorsOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeConnectorsDropdown(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [connectorsOpen, closeConnectorsDropdown]);

  useEffect(() => {
    if (!connectorsOpen) return;
    updateConnectorsPosition();
    window.addEventListener('scroll', updateConnectorsPosition, true);
    window.addEventListener('resize', updateConnectorsPosition);
    return () => { window.removeEventListener('scroll', updateConnectorsPosition, true); window.removeEventListener('resize', updateConnectorsPosition); };
  }, [connectorsOpen, updateConnectorsPosition]);

  // ── Click-outside / Escape for mic dropdown ──────────────────────────────

  useEffect(() => {
    if (!micOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        micDropdownRef.current && !micDropdownRef.current.contains(e.target as Node) &&
        micBtnRef.current && !micBtnRef.current.contains(e.target as Node)
      ) { closeMicDropdown(); }
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handleClickOutside); };
  }, [micOpen, closeMicDropdown]);

  useEffect(() => {
    if (!micOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMicDropdown(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [micOpen, closeMicDropdown]);

  useEffect(() => {
    if (!micOpen) return;
    updateMicPosition();
    window.addEventListener('scroll', updateMicPosition, true);
    window.addEventListener('resize', updateMicPosition);
    return () => { window.removeEventListener('scroll', updateMicPosition, true); window.removeEventListener('resize', updateMicPosition); };
  }, [micOpen, updateMicPosition]);

  return (
    <div
      className={`chat-input w-full flex flex-col gap-[24px] items-start overflow-hidden ${disabled ? 'is-disabled' : ''}`}
      style={{ borderRadius: '24px', paddingLeft: '16px', paddingRight: '12px', paddingTop: '12px', paddingBottom: '12px' }}
    >
      {/* Input area */}
      <div className="flex flex-col gap-[12px] items-start w-full">
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onInput={(e) => {
            autoResize();
            const value = (e.target as HTMLTextAreaElement).value;
            setHasText(value.length > 0);
            onTextChange?.(value);
          }}
          className="w-full resize-none outline-none bg-transparent"
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--weight-regular)',
            fontSize: 'var(--body-3-size)',
            lineHeight: `${LINE_HEIGHT}px`,
            letterSpacing: 'var(--body-3-spacing)',
            color: disabled ? 'var(--alpha-light-400)' : hasText ? 'var(--alpha-light-900)' : 'var(--alpha-light-600)',
            cursor: disabled ? 'not-allowed' : undefined,
            overflowY: 'hidden',
            maxHeight: `${MAX_TEXTAREA_HEIGHT}px`,
          }}
        />
      </div>

      {/* Bottom bar */}
      <div className="flex items-end justify-between w-full">
        {/* Left side: plus + connectors + AI tag */}
        <div className="flex gap-[8px] items-center relative">

          {/* Plus button */}
          <button
            ref={plusBtnRef}
            className="flex items-center hover:opacity-70 transition-opacity"
            disabled={disabled}
            onClick={() => !disabled && toggleDropdown()}
            style={{
              padding: '2px',
              borderRadius: '6px',
              background: disabled ? 'var(--color-neutral-50)' : 'var(--color-white)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              border: 'none',
            }}
          >
            <PlusIcon className="w-5 h-5" color={disabled ? 'var(--alpha-light-200)' : undefined} />
          </button>

          {/* Plus dropdown */}
          {dropdownOpen && createPortal(
            <div
              ref={dropdownRef}
              className={`plus-dropdown fixed z-[9999] ${closing ? 'closing' : ''}`}
              style={{
                top: dropdownPosition.top, left: dropdownPosition.left,
                width: '144px',
                paddingTop: '4px', paddingBottom: '4px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(4px)',
                border: '1px solid var(--alpha-light-100)',
                boxShadow: '0px 67px 19px 0px rgba(0,0,0,0), 0px 43px 17px 0px rgba(0,0,0,0.01), 0px 24px 15px 0px rgba(0,0,0,0.02), 0px 11px 11px 0px rgba(0,0,0,0.03), 0px 3px 6px 0px rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column', gap: '2px',
              }}
            >
              <button className="plus-dropdown-item flex items-center w-full" onClick={() => { closeDropdown(); fileInputRef.current?.click(); }} style={{ height: '32px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                <div className="flex items-center flex-1 h-full" style={{ gap: '6px', paddingLeft: '6px', paddingRight: '8px', paddingTop: '6px', paddingBottom: '6px', borderRadius: '8px' }}>
                  <FilePlusIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
                  <span className="font-medium truncate flex-1 min-w-0 overflow-hidden text-left" style={{ fontFamily: 'var(--font-primary)', fontSize: 'var(--body-3-size)', lineHeight: 'var(--body-3-line)', letterSpacing: 'var(--body-3-spacing)', color: 'var(--alpha-light-600)', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Upload file</span>
                </div>
              </button>
              <button className="plus-dropdown-item flex items-center w-full" onClick={() => { closeDropdown(); photoInputRef.current?.click(); }} style={{ height: '32px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                <div className="flex items-center flex-1 h-full" style={{ gap: '6px', paddingLeft: '6px', paddingRight: '8px', paddingTop: '6px', paddingBottom: '6px', borderRadius: '8px' }}>
                  <ImageIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
                  <span className="font-medium truncate flex-1 min-w-0 overflow-hidden text-left" style={{ fontFamily: 'var(--font-primary)', fontSize: 'var(--body-3-size)', lineHeight: 'var(--body-3-line)', letterSpacing: 'var(--body-3-spacing)', color: 'var(--alpha-light-600)', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Upload photo</span>
                </div>
              </button>
            </div>,
            document.body
          )}

          {/* Connectors button — morphs from plug icon to logo pill */}
          {(() => {
            const hasActive = Object.values(connectorToggles).some(Boolean);
            return (
              <button
                ref={connectorsBtnRef}
                className="flex items-center justify-center hover:opacity-70"
                disabled={disabled}
                onClick={() => !disabled && toggleConnectorsDropdown()}
                style={{
                  position: 'relative',
                  minWidth: '24px',
                  minHeight: '24px',
                  padding: '4px',
                  background: hasActive || connectorsOpen ? 'var(--alpha-light-50)' : 'transparent',
                  border: hasActive ? '1px solid var(--alpha-light-100)' : '1px solid transparent',
                  borderRadius: hasActive ? '999px' : '8px',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  transition: 'background 250ms ease, border-color 250ms ease, border-radius 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Plug icon — centered, crossfades out when connectors activate */}
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: hasActive ? 0 : 1,
                    transform: hasActive ? 'scale(0.4)' : 'scale(1)',
                    transition: 'opacity 200ms ease, transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: 'none',
                  }}
                >
                  <PlugIcon style={{ width: '14.25px', height: '14.25px', flexShrink: 0 }} color={disabled ? 'var(--alpha-light-200)' : 'var(--alpha-light-600)'} />
                </div>
                {/* Connector logos — each independently scales/fades in */}
                {CONNECTOR_ITEMS.map((connector, i) => {
                  const isOn = connectorToggles[connector.id];
                  const hasActiveBefore = CONNECTOR_ITEMS.slice(0, i).some((c) => connectorToggles[c.id]);
                  return (
                    <img
                      key={connector.id}
                      src={connector.logo}
                      alt={connector.name}
                      style={{
                        width: isOn ? '16px' : '0px',
                        height: '16px',
                        objectFit: 'contain',
                        flexShrink: 0,
                        opacity: isOn ? 1 : 0,
                        transform: isOn ? 'scale(1)' : 'scale(0)',
                        marginLeft: isOn && hasActiveBefore ? '4px' : '0px',
                        transition: 'opacity 200ms ease, transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), width 200ms ease, margin-left 200ms ease',
                      }}
                    />
                  );
                })}
              </button>
            );
          })()}

          {/* Connectors dropdown */}
          {connectorsOpen && createPortal(
            <div
              ref={connectorsDropdownRef}
              className={`plus-dropdown fixed z-[9999] ${connectorsClosing ? 'closing' : ''}`}
              style={{
                top: connectorsPosition.top, left: connectorsPosition.left,
                width: '240px',
                paddingTop: '4px', paddingBottom: '4px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(4px)',
                border: '1px solid var(--alpha-light-100)',
                boxShadow: '0px 67px 19px 0px rgba(0,0,0,0), 0px 43px 17px 0px rgba(0,0,0,0.01), 0px 24px 15px 0px rgba(0,0,0,0.02), 0px 11px 11px 0px rgba(0,0,0,0.03), 0px 3px 6px 0px rgba(0,0,0,0.04)',
              }}
            >
              {/* Connector toggle rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '4px' }}>
                {CONNECTOR_ITEMS.map((connector) => {
                  const isOn = connectorToggles[connector.id];
                  return (
                    <div key={connector.id} style={{ padding: '0 4px' }}>
                      <div
                        style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          height: '32px', padding: '6px',
                          borderRadius: '8px', position: 'relative',
                          background: isOn ? 'var(--alpha-light-50)' : 'transparent',
                          cursor: 'pointer',
                        }}
                        onClick={() => setConnectorToggles((prev) => ({ ...prev, [connector.id]: !prev[connector.id] }))}
                      >
                        <img
                          src={connector.logo}
                          alt={connector.name}
                          style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0 }}
                        />
                        <span
                          style={{
                            flex: 1, minWidth: 0,
                            fontFamily: 'var(--font-primary)',
                            fontWeight: 500,
                            fontSize: '14px',
                            lineHeight: 'var(--body-3-line)',
                            letterSpacing: 'var(--body-3-spacing)',
                            color: 'var(--alpha-light-600)',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}
                        >
                          {connector.name}
                        </span>
                        {/* Toggle switch */}
                        <div
                          style={{
                            width: '30px', height: '16px', borderRadius: '1000px',
                            background: isOn ? '#0d6fff' : 'var(--alpha-light-100)',
                            padding: '2px', flexShrink: 0, position: 'relative',
                            transition: 'background 200ms ease',
                            display: 'flex', alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '12px', height: '12px',
                              borderRadius: '100px', background: 'white',
                              boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.05), 0px 0px 4px 0px rgba(0,0,0,0.05), 0px 0px 44px 0px rgba(0,0,0,0.1)',
                              transform: isOn ? 'translateX(14px)' : 'translateX(0)',
                              transition: 'transform 200ms ease',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add connectors footer */}
              <div style={{ padding: '0 4px' }}>
                <div
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                    height: '32px', padding: '8px 6px',
                    borderTop: '1px solid var(--alpha-light-50)',
                    cursor: 'pointer',
                  }}
                  onClick={() => { closeConnectorsDropdown(); onConnectorsClick?.(); }}
                  className="hover:opacity-70 transition-opacity"
                >
                  <PlusIcon style={{ width: '16px', height: '16px' }} color="var(--alpha-light-600)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-primary)', fontWeight: 500,
                      fontSize: '14px', lineHeight: 'var(--body-3-line)',
                      letterSpacing: 'var(--body-3-spacing)',
                      color: 'var(--alpha-light-600)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}
                  >
                    Add connectors
                  </span>
                </div>
              </div>
            </div>,
            document.body
          )}

          {/* Leanne AI tag — brand green */}
          <div
            className="flex items-center"
            style={{ gap: '4px', padding: '4px 8px', borderRadius: '24px', background: 'var(--alpha-brand-50)', opacity: disabled ? 0.6 : 1 }}
          >
            <div className="flex gap-[4px] items-center">
              <SparkleSmallIcon className="w-3 h-3" color="var(--alpha-brand-950)" />
              <span className="font-medium whitespace-nowrap" style={{ fontFamily: 'var(--font-primary)', fontSize: 'var(--body-4-size)', lineHeight: 'var(--body-4-line)', letterSpacing: 'var(--body-3-spacing)', color: 'var(--alpha-brand-950)' }}>
                Leanne AI
              </span>
            </div>
          </div>
        </div>

        {/* Right side: options + mic + send */}
        <div className="flex gap-[6px] items-center">
          {/* Button group: options + mic */}
          <div
            className="flex items-center overflow-hidden rounded-full"
            style={{
              background: micOpen ? '#f5f5f5' : 'var(--color-neutral-50)',
              transition: 'background 150ms ease',
            }}
          >
            <button
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
              disabled={disabled}
              onClick={() => !disabled && toggleMicDropdown()}
              style={{
                width: '36px', height: '36px', padding: '8px',
                background: 'transparent', cursor: disabled ? 'not-allowed' : 'pointer',
                border: 'none', transform: 'rotate(90deg)',
              }}
            >
              <DotsVerticalIcon className="w-5 h-5" color={disabled ? 'var(--alpha-light-200)' : 'var(--alpha-light-600)'} />
            </button>

            {/* Mic dropdown */}
            {micOpen && createPortal(
              <div
                ref={micDropdownRef}
                className={`plus-dropdown fixed z-[9999] ${micClosing ? 'closing' : ''}`}
                style={{
                  top: micPosition.top, left: micPosition.left,
                  width: '200px',
                  paddingTop: '4px', paddingBottom: '4px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid var(--alpha-light-100)',
                  boxShadow: '0px 67px 19px 0px rgba(0,0,0,0), 0px 43px 17px 0px rgba(0,0,0,0.01), 0px 24px 15px 0px rgba(0,0,0,0.02), 0px 11px 11px 0px rgba(0,0,0,0.03), 0px 3px 6px 0px rgba(0,0,0,0.04)',
                  display: 'flex', flexDirection: 'column', gap: '2px',
                }}
              >
                {[
                  { id: 'shure-v7', name: 'Shure V7' },
                  { id: 'default', name: 'Default (Macbook built in)' },
                ].map((mic) => {
                  const isSelected = selectedMic === mic.id;
                  return (
                    <div
                      key={mic.id}
                      style={{ padding: '0 4px', cursor: 'pointer' }}
                      onClick={() => { setSelectedMic(mic.id); closeMicDropdown(); }}
                    >
                      <div
                        className="plus-dropdown-item"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          padding: '6px 8px',
                          borderRadius: '8px',
                          background: isSelected ? 'var(--alpha-light-50)' : undefined,
                        }}
                      >
                        <span
                          style={{
                            flex: 1, minWidth: 0,
                            fontFamily: 'var(--font-primary)',
                            fontWeight: 500,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: 'var(--body-3-spacing)',
                            color: isSelected ? 'var(--alpha-light-900)' : 'var(--alpha-light-600)',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}
                        >
                          {mic.name}
                        </span>
                        {isSelected && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.207 5.707a1 1 0 0 0-1.414-1.414L7 8.086 5.207 6.293a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4.5-4.5Z" fill="var(--alpha-light-600)" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>,
              document.body
            )}

            <button
              ref={micBtnRef}
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
              disabled={disabled}
              style={{
                width: '36px', height: '36px', padding: '8px',
                background: 'var(--color-white)', border: '1px solid var(--alpha-light-100)',
                borderRadius: 'var(--radius-full)', cursor: disabled ? 'not-allowed' : 'pointer',
                boxShadow: '0px 22px 6px 0px rgba(0,0,0,0), 0px 14px 6px 0px rgba(0,0,0,0), 0px 8px 5px 0px rgba(0,0,0,0.01), 0px 4px 4px 0px rgba(0,0,0,0.02), 0px 1px 2px 0px rgba(0,0,0,0.02)',
              }}
            >
              <MicIcon className="w-5 h-5" color={disabled ? 'var(--alpha-light-200)' : 'var(--alpha-light-600)'} />
            </button>
          </div>

          {/* Send / Stop button */}
          <button className="send-btn" disabled={disabled && !isStopMode} onClick={isStopMode ? onStop : handleSubmit}>
            <span className="send-btn-gradient" aria-hidden />
            {isStopMode ? (
              <StopIcon className="w-5 h-5 relative z-10" color="var(--alpha-light-600)" />
            ) : (
              <ArrowUpIcon className="w-5 h-5 relative z-10" color={disabled ? 'var(--alpha-light-200)' : 'var(--alpha-light-600)'} />
            )}
          </button>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
      <input ref={photoInputRef} type="file" accept="image/*" style={{ display: 'none' }} />
    </div>
  );
}

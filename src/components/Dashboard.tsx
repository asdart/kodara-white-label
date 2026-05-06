import { useState, useCallback, useEffect, useRef } from 'react';
import Sidebar, { type SidebarPage } from './Sidebar';
import ChatInput from './ChatInput';
import ConnectorsBar from './ConnectorsBar';
import SuggestionCards, { simulatedResponses, simulatedThinkingSteps, simulatedImages } from './SuggestionCards';
import type { ThinkingStepsConfig } from './SuggestionCards';
import HomePage from './HomePage';
import MyChatsPage from './MyChatsPage';
import ChatPage from './ChatPage';
import PlanPage from './PlanPage';
import ConnectorsPage, { FacebookConnectModal } from './ConnectorsPage';
import { ConnectorsModal } from './SettingsModal';
import SettingsModal from './SettingsModal';
import { PenSparkleIcon, AppleIcon } from './Icons';
import glowSvg from '../assets/ellipse-glow.svg';
import ringSvg from '../assets/ellipse-border.svg';
import crescentSvg from '../assets/figma-export/d251448fe157d8c297e9697d264bb33fa3827e0c.svg';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<SidebarPage>('home');
  const [chatInitialMessage, setChatInitialMessage] = useState('');
  const [chatSimulatedResponse, setChatSimulatedResponse] = useState<string | undefined>();
  const [chatSimulatedSteps, setChatSimulatedSteps] = useState<ThinkingStepsConfig | undefined>();
  const [chatSimulatedImage, setChatSimulatedImage] = useState<string | undefined>();
  const [chatTaskTitle, setChatTaskTitle] = useState<string | undefined>();
  const [chatKey, setChatKey] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showConnectorsBar, setShowConnectorsBar] = useState(true);
  const [connectorsBarExpanded, setConnectorsBarExpanded] = useState(false);
  const [showConnectorsModal, setShowConnectorsModal] = useState(false);
  const [showFacebookModal, setShowFacebookModal] = useState(false);
  const [prefillText, setPrefillText] = useState<string | undefined>();
  const [prefillConnector, setPrefillConnector] = useState<string | undefined>();
  const prevPageRef = useRef<SidebarPage | undefined>(undefined);

  const handleConnectorConnect = useCallback((id: string) => {
    if (id === 'facebook') {
      setShowFacebookModal(true);
    } else {
      setShowConnectorsModal(true);
    }
  }, []);

  const handleTryItOut = useCallback((connectorId: string) => {
    const prompts: Record<string, string> = {
      facebook: 'Analyze my Facebook Ads performance for the last 30 days and suggest optimizations to reduce cost per acquisition',
    };
    setPrefillConnector(connectorId);
    setPrefillText(prompts[connectorId] ?? '');
  }, []);

  /* Show connectors bar on refresh (initial mount) and whenever user returns to New task from another page */
  useEffect(() => {
    if (currentPage === 'new-task' && prevPageRef.current !== undefined && prevPageRef.current !== 'new-task') {
      setShowConnectorsBar(true);
    }
    prevPageRef.current = currentPage;
  }, [currentPage]);

  const startChat = useCallback((message: string) => {
    setChatInitialMessage(message);
    setChatSimulatedResponse(undefined);
    setChatSimulatedSteps(undefined);
    setChatSimulatedImage(undefined);
    setChatTaskTitle(undefined);
    setChatKey((k) => k + 1);
    setCurrentPage('chat');
  }, []);

  const startSimulatedChat = useCallback((message: string, taskTitle?: string) => {
    const response = simulatedResponses[message];
    const steps = simulatedThinkingSteps[message];
    const image = simulatedImages[message];
    setChatInitialMessage(message);
    setChatSimulatedResponse(response);
    setChatSimulatedSteps(steps);
    setChatSimulatedImage(image);
    setChatTaskTitle(taskTitle);
    setChatKey((k) => k + 1);
    setCurrentPage('chat');
  }, []);

  const handleNavigate = useCallback((page: SidebarPage) => {
    setCurrentPage(page);
  }, []);

  return (
    <div
      className="flex items-start w-full h-full rounded-3xl overflow-hidden relative"
      style={{ background: 'var(--surface-primary)', transition: 'background 300ms ease' }}
    >
      {/* Background gradient behind main content */}
      <div
        className="static pointer-events-none"
        style={{
          right: '-200px',
          bottom: '-200px',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0,190,220,0.06) 0%, rgba(0,190,220,0.02) 40%, transparent 70%)',
        }}
      />

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        onSettingsClick={() => setShowSettings(true)}
      />

      {/* Main content */}
      {currentPage === 'chat' ? (
        <ChatPage
          key={chatKey}
          initialMessage={chatInitialMessage}
          simulatedResponse={chatSimulatedResponse}
          simulatedSteps={chatSimulatedSteps}
          simulatedImage={chatSimulatedImage}
          taskTitle={chatTaskTitle}
          onNewTask={() => setCurrentPage('new-task')}
        />
      ) : currentPage === 'tasks' ? (
        <MyChatsPage key="tasks" />
      ) : currentPage === 'plan' ? (
        <PlanPage
          key="plan"
          onNewTask={() => setCurrentPage('home')}
          onStartChat={(text) => startChat(text)}
          onAskAiCoach={(task) => startChat(`Help me with: ${task.title}`)}
        />
      ) : currentPage === 'connectors' ? (
        <div key="connectors" className="flex flex-col flex-1 min-h-0 min-w-0 h-full overflow-hidden">
          <ConnectorsPage />
        </div>
      ) : currentPage === 'home' ? (
        <HomePage
          key="home"
          onCollapsedInputClick={() => { setPrefillText(undefined); setPrefillConnector(undefined); setCurrentPage('new-task'); }}
          onSeeAllTasks={() => setCurrentPage('tasks')}
          onStartSimulatedChat={startSimulatedChat}
        />
      ) : (
        <div key="new-task" className="flex flex-col flex-1 min-h-0 min-w-0 relative h-full">
          {/* Top bar */}
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
            <div className="flex gap-1.5 items-center cursor-pointer hover:opacity-80 transition-opacity">
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
            <a
              href="#"
              className="flex gap-1 items-center justify-center cursor-pointer hover:opacity-80 transition-opacity rounded-lg"
              style={{
                background: 'var(--alpha-dark-300)',
                border: '1px solid var(--alpha-light-50)',
                paddingTop: '6px',
                paddingBottom: '6px',
                paddingRight: '12px',
                paddingLeft: '10px',
              }}
              onClick={(e) => e.preventDefault()}
            >
              <AppleIcon className="w-5 h-5 shrink-0" color="var(--alpha-light-600)" />
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
                Download Mac app
              </span>
            </a>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center px-5 pb-8 min-h-0">
            {/* Top spacer */}
            <div className="flex-1 min-h-0" />
            <div className="flex flex-col gap-6 items-center w-full max-w-[704px] shrink-0">
              {/* Avatar and greeting */}
              <div className="chat-card-enter flex flex-col items-center justify-center" style={{ gap: '16px', animationDelay: '0ms' }}>
                {/* Avatar logo — 64×64 container */}
                <div className="relative" style={{ width: '64px', height: '64px' }}>
                  {/* Glow effect */}
                  <div
                    className="absolute pointer-events-none"
                    style={{ inset: '-46px -46.5px' }}
                  >
                    <img src={glowSvg} alt="" className="block w-full h-full" />
                  </div>

                  {/* Ellipse 29 — ring gradient fill */}
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(26,26,26,0.06) 0%, rgba(255,255,255,0) 100%)',
                    }}
                  />

                  {/* Ellipse 32 — ring border + fill at 5% opacity */}
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      inset: 0,
                      opacity: 0.05,
                      background: 'linear-gradient(180deg, rgba(26,26,26,0.06) 0%, rgba(255,255,255,0) 100%)',
                      border: '0.5px solid #008BA7',
                    }}
                  />

                  {/* Ellipse 33 — cyan crescent highlight at top */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: '-0.39%',
                      right: '-0.39%',
                      bottom: '49.61%',
                      left: '23.42%',
                    }}
                  >
                    <img src={crescentSvg} alt="" className="block w-full h-full" style={{ overflow: 'visible' }} />
                  </div>

                  {/* Ball — circular avatar photo */}
                  <div
                    className="absolute overflow-hidden rounded-full"
                    style={{
                      top: '10px',
                      bottom: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      aspectRatio: '1 / 1',
                      border: '1px solid var(--alpha-light-50)',
                      boxShadow:
                        '0px 20px 6px 0px rgba(12,48,70,0), 0px 13px 5px 0px rgba(12,48,70,0.02), 0px 7px 4px 0px rgba(12,48,70,0.07), 0px 3px 3px 0px rgba(12,48,70,0.12), 0px 1px 2px 0px rgba(12,48,70,0.14)',
                    }}
                  >
                    {/* Ring gradient overlay */}
                    <div className="absolute" style={{ inset: '-1px' }}>
                      <img src={ringSvg} alt="" className="block w-full h-full" />
                    </div>
                    {/* Avatar fill */}
                    <div
                      className="absolute w-full h-full"
                      style={{
                        inset: 0,
                        background: 'var(--color-pelorous-50)',
                      }}
                    />
                  </div>
                </div>

                {/* Greeting */}
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
                  Hey Marcos, what&rsquo;s up?
                </h1>
              </div>

              {/* Chat input + connectors bar (first load only) */}
              <div
                className="chat-card-enter w-full"
                style={{
                  animationDelay: '80ms',
                  display: 'flex',
                  flexDirection: 'column',
                  background: showConnectorsBar && connectorsBarExpanded ? 'var(--alpha-light-50)' : 'transparent',
                  borderRadius: '24px',
                  paddingBottom: showConnectorsBar && connectorsBarExpanded ? '12px' : '0px',
                  transition: 'background 400ms ease, padding-bottom 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <ChatInput
                  onSubmit={(text) => { setPrefillText(undefined); setPrefillConnector(undefined); startChat(text); }}
                  onConnectorsClick={() => setShowConnectorsModal(true)}
                  onConnectorConnect={handleConnectorConnect}
                  prefillText={prefillText}
                  prefillConnector={prefillConnector}
                />
                {showConnectorsBar && (
                  <ConnectorsBar
                    onConnectClick={() => setShowConnectorsModal(true)}
                    onClose={() => { setShowConnectorsBar(false); setConnectorsBarExpanded(false); }}
                    onExpandedChange={setConnectorsBarExpanded}
                  />
                )}
              </div>

              {/* Suggestion cards */}
              <div className="chat-card-enter w-full" style={{ animationDelay: '160ms' }}>
                <SuggestionCards onSelect={startSimulatedChat} />
              </div>
            </div>
            {/* Bottom spacer */}
            <div className="flex-1 min-h-0 shrink-[3]" />
          </div>
        </div>
      )}

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}

      {showConnectorsModal && (
        <ConnectorsModal onClose={() => setShowConnectorsModal(false)} />
      )}

      {showFacebookModal && (
        <FacebookConnectModal
          onClose={() => setShowFacebookModal(false)}
          onManageConnectors={() => { setShowFacebookModal(false); setShowConnectorsModal(true); }}
          onTryItOut={() => handleTryItOut('facebook')}
        />
      )}
    </div>
  );
}

import Sidebar from './Sidebar';
import ChatInput from './ChatInput';
import SuggestionCards from './SuggestionCards';
import { PenSparkleIcon, AppleIcon } from './Icons';

// Figma assets (served from Figma's local dev server)
const avatarUrl = "/assets/avatar.png";
const glowSvg = "http://localhost:3845/assets/07cb82ce7cf14b884e9ca720a80cfe27a985cc19.svg";
const ringSvg = "http://localhost:3845/assets/07191d5cbdb26ba17d140afe28f4165bf91d785d.svg";

export default function Dashboard() {
  return (
    <div
      className="flex items-start w-full h-full rounded-3xl overflow-hidden relative"
      style={{ background: 'var(--color-white)' }}
    >
      {/* Background gradient behind main content */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-200px',
          left: '200px',
          right: '-200px',
          bottom: '-200px',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0,190,220,0.06) 0%, rgba(0,190,220,0.02) 40%, transparent 70%)',
        }}
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-h-0 min-w-0 relative h-full">
        {/* Top bar — Figma node 1-421: 16px vertical, 24px horizontal padding */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{
            paddingTop: '28px',
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
            className="flex gap-1 items-center justify-center cursor-pointer hover:opacity-80 transition-opacity rounded-lg pt-1.5 pr-3 pb-1.5 pl-2.5"
            style={{
              background: 'var(--alpha-dark-300)',
              border: '1px solid var(--alpha-light-50)',
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
          {/* Top spacer — equal flex weight keeps content centered, shrinks to absorb growth upward */}
          <div className="flex-1 min-h-0" />
          <div className="flex flex-col gap-6 items-center w-full max-w-[704px] shrink-0">
            {/* Avatar and greeting */}
            <div className="flex flex-col items-center justify-center" style={{ gap: '16px' }}>
              {/* Avatar logo — 64×64 container */}
              <div className="relative" style={{ width: '64px', height: '64px' }}>
                {/* Glow effect — extends beyond the container */}
                <div
                  className="absolute pointer-events-none"
                  style={{ inset: '-46px -46.5px' }}
                >
                  <img src={glowSvg} alt="" className="block w-full h-full" />
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
                  {/* Photo */}
                  <img
                    src={avatarUrl}
                    alt="Leanne"
                    className="absolute w-full h-full object-cover"
                    style={{ inset: 0 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.style.background = 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)';
                    }}
                  />
                </div>
              </div>

              {/* Greeting */}
              <h1
                className="font-normal text-black text-center"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--heading-h4-size)',
                  lineHeight: 'var(--heading-h4-line)',
                  letterSpacing: 'var(--heading-h1-spacing)',
                }}
              >
                Hey Marcos, what&rsquo;s up?
              </h1>
            </div>

            {/* Chat input */}
            <ChatInput />

            {/* Suggestion cards */}
            <SuggestionCards />
          </div>
          {/* Bottom spacer — shrinks first so input expands upward */}
          <div className="flex-1 min-h-0 shrink-[3]" />
        </div>
      </div>
    </div>
  );
}

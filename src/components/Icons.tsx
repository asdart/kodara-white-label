/* Icon colors default to Figma token: alpha/light/600 = rgba(26,26,26,0.6)
   Pass color="var(--alpha-light-900)" etc. to override with other tokens */

const LIGHT_600 = 'rgba(26,26,26,0.6)'; // --alpha-light-600

export function PenSparkleIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.167 2.5L17.5 5.833l-10 10H4.167V14.167l10-10z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.667 5l3.333 3.333" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.25 12.5l.625 1.25 1.25.625-1.25.625-.625 1.25-.625-1.25-1.25-.625 1.25-.625.625-1.25z" fill={color} />
      <path d="M3.75 2.5l.417.833.833.417-.833.417-.417.833-.417-.833-.833-.417.833-.417.417-.833z" fill={color} />
    </svg>
  );
}

export function ChatAiIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 9.583a7.126 7.126 0 01-.767 3.25 7.217 7.217 0 01-6.45 4.009 7.126 7.126 0 01-3.25-.767L2.5 17.5l1.425-4.533a7.126 7.126 0 01-.767-3.25A7.217 7.217 0 017.167 3.267a7.126 7.126 0 013.25-.767h.425a7.2 7.2 0 016.658 6.658v.425z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="10" r="0.75" fill={color} />
      <circle cx="10.25" cy="10" r="0.75" fill={color} />
      <circle cx="13.5" cy="10" r="0.75" fill={color} />
    </svg>
  );
}

export function SettingsIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.167 12.5a1.375 1.375 0 00.275 1.517l.05.05a1.667 1.667 0 01-1.18 2.845 1.667 1.667 0 01-1.179-.488l-.05-.05a1.375 1.375 0 00-1.516-.275 1.375 1.375 0 00-.834 1.259v.142a1.667 1.667 0 01-3.333 0v-.075a1.375 1.375 0 00-.9-1.259 1.375 1.375 0 00-1.517.275l-.05.05a1.667 1.667 0 11-2.358-2.358l.05-.05a1.375 1.375 0 00.275-1.517 1.375 1.375 0 00-1.259-.833H2.5a1.667 1.667 0 010-3.334h.075a1.375 1.375 0 001.258-.9 1.375 1.375 0 00-.275-1.516l-.05-.05A1.667 1.667 0 115.867 3.342l.05.05a1.375 1.375 0 001.516.275h.067a1.375 1.375 0 00.833-1.258V2.5a1.667 1.667 0 013.334 0v.075a1.375 1.375 0 00.833 1.258 1.375 1.375 0 001.517-.275l.05-.05a1.667 1.667 0 112.358 2.359l-.05.05a1.375 1.375 0 00-.275 1.516v.067a1.375 1.375 0 001.258.833h.142a1.667 1.667 0 010 3.334h-.075a1.375 1.375 0 00-1.258.833z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3.5v13M3.5 10h13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 16V4M10 4l-5 5M10 4l5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SidebarCollapseIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="16" height="14" rx="2" stroke={color} strokeWidth="1.5" />
      <line x1="7.5" y1="3" x2="7.5" y2="17" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function MyTasksIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bar chart bars */}
      <rect x="3" y="12" width="3" height="5" rx="0.5" stroke={color} strokeWidth="1.3" />
      <rect x="8.5" y="8" width="3" height="9" rx="0.5" stroke={color} strokeWidth="1.3" />
      <rect x="14" y="4" width="3" height="13" rx="0.5" stroke={color} strokeWidth="1.3" />
      {/* Sparkle */}
      <path d="M15.5 2l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4.4-1z" fill={color} />
    </svg>
  );
}

export function AppleIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function FilePlusIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.667 2.5H5.833A1.667 1.667 0 004.167 4.167v11.666A1.667 1.667 0 005.833 17.5h8.334a1.667 1.667 0 001.666-1.667V7.5l-4.166-5z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.667 2.5V7.5h4.166" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14.167v-3.334M8.333 12.5h3.334" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ImageIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="7.5" r="1.25" stroke={color} strokeWidth="1.5" />
      <path d="M17 13l-3.5-3.5L5 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkleSmallIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1l1.146 2.854L10 5l-2.854 1.146L6 9 4.854 6.146 2 5l2.854-1.146L6 1z" fill="#008ba7" />
      <path d="M9.5 7l.573 1.427L11.5 9l-1.427.573L9.5 11l-.573-1.427L7.5 9l1.427-.573L9.5 7z" fill="#008ba7" />
    </svg>
  );
}

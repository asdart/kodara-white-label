/* Icon colors default to Figma token: alpha/light/600 = rgba(26,26,26,0.6)
   Pass color="var(--alpha-light-900)" etc. to override with other tokens */

import type { CSSProperties } from 'react';

const LIGHT_600 = 'rgba(26,26,26,0.6)'; // --alpha-light-600

export function PenSparkleIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        width: '20px',
        height: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 0.75C6.5 1.16421 6.16421 1.5 5.75 1.5C5.33579 1.5 5 1.16421 5 0.75C5 0.335786 5.33579 0 5.75 0C6.16421 0 6.5 0.335786 6.5 0.75Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.153 1.84735C12.0234 0.718027 10.1917 0.717596 9.06262 1.84774L1.73569 9.17466C1.38475 9.5256 1.12609 10.0499 0.932507 10.5386C0.729856 11.0501 0.561017 11.6224 0.42678 12.1473C0.291854 12.6749 0.188114 13.1696 0.118185 13.5316C0.0831394 13.713 0.0563919 13.862 0.0382979 13.9664C0.0292471 14.0186 0.0222699 14.0602 0.0175723 14.0886C-0.0371591 14.3368 0.0375437 14.5981 0.219564 14.7802L0.220564 14.7812C0.402676 14.9634 0.664556 15.0381 0.912873 14.9834C0.941318 14.9787 0.982413 14.9718 1.03462 14.9627C1.139 14.9446 1.28804 14.9179 1.46943 14.8828C1.83138 14.8129 2.32613 14.7092 2.85372 14.5742C3.37862 14.44 3.95088 14.2712 4.46242 14.0685C4.95108 13.8749 5.47542 13.6163 5.82635 13.2653L13.1533 5.93832C14.2831 4.80861 14.2835 2.97649 13.153 1.84735ZM12.093 2.90864C12.6365 3.4515 12.637 4.33338 12.0927 4.87766L4.76569 12.2047C4.64313 12.3272 4.36246 12.4947 3.90996 12.674C3.48035 12.8441 2.9753 12.9949 2.48207 13.121C2.20576 13.1917 1.93781 13.2534 1.69526 13.3058C1.74757 13.0632 1.80935 12.7953 1.88001 12.5189C2.00615 12.0257 2.15687 11.5207 2.32706 11.0911C2.50632 10.6386 2.67378 10.3579 2.79635 10.2353L10.1237 2.90801C10.6665 2.3645 11.5487 2.36436 12.093 2.90864Z" fill={color} />
      <path d="M2.54704 2.17699L3.49304 2.49199C3.64604 2.54299 3.74904 2.68599 3.74904 2.84799C3.74904 3.00999 3.64504 3.15299 3.49204 3.20399L2.54604 3.51899L2.23004 4.46599C2.18004 4.61799 2.03604 4.72199 1.87504 4.72199C1.71404 4.72199 1.57104 4.61899 1.52004 4.46599L1.20404 3.51899L0.258038 3.20399C0.105038 3.15299 0.0010376 3.00999 0.0010376 2.84799C0.0010376 2.68599 0.105038 2.54299 0.258038 2.49199L1.20404 2.17699L1.52004 1.22999C1.62204 0.923988 2.12904 0.923988 2.23104 1.22999L2.54704 2.17699Z" fill={color} />
      <path d="M14.658 11.99L13.395 11.569L12.974 10.306C12.837 9.898 12.162 9.898 12.025 10.306L11.604 11.569L10.341 11.99C10.137 12.058 9.99902 12.249 9.99902 12.464C9.99902 12.679 10.137 12.87 10.341 12.938L11.604 13.359L12.025 14.622C12.093 14.826 12.285 14.964 12.5 14.964C12.715 14.964 12.906 14.826 12.975 14.622L13.396 13.359L14.659 12.938C14.863 12.87 15.001 12.679 15.001 12.464C15.001 12.249 14.862 12.058 14.658 11.99Z" fill={color} />
    </svg>
    </div>
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

export function PlusIcon({ className = "w-5 h-5", style, color = LIGHT_600 }: { className?: string; style?: CSSProperties; color?: string }) {
  return (
    <svg className={className} style={style} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export function ArrowDownIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4v12M10 16l-5-5M10 16l5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    <div
      className={className}
      style={{
        display: 'flex',
        width: '20px',
        height: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 10C16.5 6.41021 13.5898 3.5 10 3.5C6.41021 3.5 3.5 6.41021 3.5 10C3.5 11.0337 3.74532 12.0086 4.17676 12.877L4.37207 13.2422L4.38477 13.2637C4.57149 13.6137 4.63085 14.0206 4.63184 14.3936C4.63281 14.7767 4.57197 15.1847 4.46777 15.5811C4.40221 15.8305 4.31343 16.0847 4.20801 16.3359C4.32174 16.3085 4.43655 16.2801 4.5498 16.2471C5.16487 16.0679 5.68745 15.8338 5.97559 15.6475L6.06738 15.5967C6.28673 15.4949 6.5446 15.504 6.75781 15.627C7.19802 15.8808 7.8931 16.2158 8.80176 16.3877C9.18892 16.461 9.59008 16.5 10 16.5H10.0137C10.4278 16.5001 10.7637 16.8358 10.7637 17.25C10.7637 17.6642 10.4278 17.9999 10.0137 18H10C9.6221 18 9.24941 17.9734 8.88477 17.9219L8.52246 17.8623C7.63836 17.6951 6.92065 17.4009 6.39258 17.1328C5.98654 17.3406 5.48748 17.5364 4.96875 17.6875C4.26297 17.8931 3.44876 18.0393 2.70898 17.999C2.41377 17.9829 2.15568 17.7946 2.0498 17.5186C1.94397 17.2423 2.01063 16.9291 2.21973 16.7197C2.55953 16.3794 2.85845 15.8046 3.01758 15.1992C3.09522 14.9037 3.13241 14.6269 3.13184 14.3975C3.13121 14.1624 3.09071 14.0288 3.0625 13.9736C2.39133 12.8043 2 11.4491 2 10C2 5.58179 5.58179 2 10 2C14.4182 2 18 5.58179 18 10C18 10.4142 17.6642 10.75 17.25 10.75C16.8358 10.75 16.5 10.4142 16.5 10Z" fill={color} />
        <path d="M18.4873 14.5381L16.5928 13.9072L15.9615 12.0127C15.8594 11.707 15.5728 11.5 15.2501 11.5C14.9274 11.5 14.6407 11.707 14.5387 12.0127L13.9074 13.9072L12.0129 14.5381C11.7067 14.6406 11.5002 14.9268 11.5002 15.25C11.5002 15.5732 11.7067 15.8594 12.0129 15.9619L13.9074 16.5928L14.5387 18.4873C14.6408 18.793 14.9274 19 15.2501 19C15.5728 19 15.8595 18.793 15.9615 18.4873L16.5928 16.5928L18.4873 15.9619C18.7935 15.8594 19 15.5732 19 15.25C19 14.9268 18.7935 14.6406 18.4873 14.5381Z" fill={color} />
      </svg>
    </div>
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

export function SuggestionArrowIcon({ className = "w-4 h-4", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.333 12.667L12.667 3.333M12.667 3.333H5.333M12.667 3.333v7.334" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CopyIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.8027 7.20996C15.2124 7.14908 15.5943 7.43213 15.6553 7.8418L16.4199 12.9863V12.9873C16.5952 14.1717 15.8402 15.2799 14.7041 15.5684L14.4717 15.6152L9.05859 16.4199C8.089 16.5643 7.17924 16.0825 6.71973 15.29C6.51207 14.9317 6.63394 14.4724 6.99219 14.2646C7.35055 14.0571 7.80894 14.1798 8.0166 14.5381C8.18097 14.8215 8.50226 14.9855 8.83789 14.9355L14.251 14.1309C14.6666 14.0692 14.9632 13.7024 14.9443 13.29L14.9365 13.207L14.1719 8.0625C14.111 7.65294 14.3933 7.27106 14.8027 7.20996ZM11.3955 4C12.6733 4.00018 13.7087 5.03571 13.709 6.31348V11.3955C13.7088 12.6733 12.6733 13.7088 11.3955 13.709H6.31348C5.03571 13.7087 4.00018 12.6733 4 11.3955V6.31348C4.00024 5.03575 5.03575 4.00024 6.31348 4H11.3955ZM6.31348 5.5C5.86418 5.50024 5.50024 5.86418 5.5 6.31348V11.3955C5.50018 11.8449 5.86414 12.2087 6.31348 12.209H11.3955C11.8449 12.2088 12.2088 11.8449 12.209 11.3955V6.31348C12.2087 5.86414 11.8449 5.50018 11.3955 5.5H6.31348Z" fill={color} />
    </svg>
  );
}

export function ThumbsUpIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(4,4)">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.005 0.185421C6.22592 -0.00814987 6.54451 -0.0568949 6.81752 0.0711619L7.16323 0.233273C8.18245 0.711804 8.69093 1.86932 8.35368 2.94326L8.02164 3.99991H9.24725C11.0395 3.99996 12.3376 5.67962 11.9221 7.39253L11.8762 7.55855L11.1067 10.0586C10.7507 11.211 9.68525 12 8.4777 12H5.24913C3.72993 12 2.49914 10.7691 2.49907 9.24997V5.45989C2.49908 4.82852 2.71693 4.21695 3.1153 3.72647L5.91711 0.277219L6.005 0.185421ZM4.27938 4.6718C4.09787 4.89527 3.99911 5.17338 3.9991 5.45989V9.24997C3.99917 9.94071 4.55837 10.5 5.24913 10.5H8.4777C9.02578 10.5 9.51068 10.1421 9.67304 9.61716L10.4426 7.11714C10.6898 6.31394 10.089 5.49998 9.24725 5.49993H6.99818C6.584 5.49993 6.24824 5.16408 6.24817 4.74992C6.24817 4.67141 6.2629 4.59644 6.28528 4.52531L6.92299 2.49404C7.0149 2.20139 6.91601 1.89205 6.69154 1.70106L4.27938 4.6718Z" fill={color} />
        <path d="M0.750015 4.49992C1.16424 4.49992 1.50003 4.83571 1.50003 5.24993V10.75C1.49996 11.1641 1.1642 11.5 0.750015 11.5C0.335834 11.5 6.59653e-05 11.1641 0 10.75V5.24993C0 4.83571 0.335793 4.49992 0.750015 4.49992Z" fill={color} />
      </g>
    </svg>
  );
}

export function ThumbsDownIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(4,4) scale(1,-1) translate(0,-12)">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.005 0.185421C6.22592 -0.00814987 6.54451 -0.0568949 6.81752 0.0711619L7.16323 0.233273C8.18245 0.711804 8.69093 1.86932 8.35368 2.94326L8.02164 3.99991H9.24725C11.0395 3.99996 12.3376 5.67962 11.9221 7.39253L11.8762 7.55855L11.1067 10.0586C10.7507 11.211 9.68525 12 8.4777 12H5.24913C3.72993 12 2.49914 10.7691 2.49907 9.24997V5.45989C2.49908 4.82852 2.71693 4.21695 3.1153 3.72647L5.91711 0.277219L6.005 0.185421ZM4.27938 4.6718C4.09787 4.89527 3.99911 5.17338 3.9991 5.45989V9.24997C3.99917 9.94071 4.55837 10.5 5.24913 10.5H8.4777C9.02578 10.5 9.51068 10.1421 9.67304 9.61716L10.4426 7.11714C10.6898 6.31394 10.089 5.49998 9.24725 5.49993H6.99818C6.584 5.49993 6.24824 5.16408 6.24817 4.74992C6.24817 4.67141 6.2629 4.59644 6.28528 4.52531L6.92299 2.49404C7.0149 2.20139 6.91601 1.89205 6.69154 1.70106L4.27938 4.6718Z" fill={color} />
        <path d="M0.750015 4.49992C1.16424 4.49992 1.50003 4.83571 1.50003 5.24993V10.75C1.49996 11.1641 1.1642 11.5 0.750015 11.5C0.335834 11.5 6.59653e-05 11.1641 0 10.75V5.24993C0 4.83571 0.335793 4.49992 0.750015 4.49992Z" fill={color} />
      </g>
    </svg>
  );
}

export function VoiceIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(3,3.5)">
        <path d="M9.06152 0.18719C9.84358 -0.31291 10.8711 0.247364 10.8711 1.17742V11.9733C10.871 12.9031 9.8435 13.4641 9.06152 12.9645L9.06055 12.9636L4.57715 10.0934H2.02832C0.908819 10.0934 0.000171728 9.18556 0 8.0661V5.08367C0.000251658 3.96428 0.908868 3.05633 2.02832 3.05633H4.57715L9.06055 0.18719H9.06152ZM5.20117 4.43817C5.08056 4.51534 4.94007 4.55629 4.79688 4.55633H2.02832C1.7373 4.55633 1.50025 4.79271 1.5 5.08367V8.0661C1.50017 8.35713 1.73725 8.59344 2.02832 8.59344H4.79688L4.90332 8.60125C5.00891 8.61642 5.11064 8.65463 5.20117 8.71258L9.37109 11.3815V1.76824L5.20117 4.43817ZM11.7207 4.84051C12.0136 4.54762 12.4884 4.54762 12.7812 4.84051C13.7393 5.79878 13.7394 7.35207 12.7812 8.31024C12.4884 8.60284 12.0135 8.60285 11.7207 8.31024C11.4279 8.01742 11.428 7.5426 11.7207 7.24969C12.0931 6.87731 12.0929 6.27354 11.7207 5.90106C11.4279 5.60825 11.4281 5.13342 11.7207 4.84051Z" fill={color} />
      </g>
    </svg>
  );
}

export function FeedbackChatIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2,2)">
        <path d="M7 8C7 8.551 7.448 9 8 9C8.552 9 9 8.551 9 8C9 7.449 8.552 7 8 7C7.448 7 7 7.449 7 8Z" fill={color} />
        <path d="M4.5 9C3.948 9 3.5 8.551 3.5 8C3.5 7.449 3.948 7 4.5 7C5.052 7 5.5 7.449 5.5 8C5.5 8.551 5.052 9 4.5 9Z" fill={color} />
        <path d="M10.5 8C10.5 8.551 10.948 9 11.5 9C12.052 9 12.5 8.551 12.5 8C12.5 7.449 12.052 7 11.5 7C10.948 7 10.5 7.449 10.5 8Z" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58179 0 0 3.58179 0 8C0 9.4506 0.392437 10.8068 1.06486 11.977C1.09293 12.0343 1.13114 12.1672 1.13175 12.3972C1.13236 12.6268 1.09516 12.9039 1.01739 13.1997C0.858222 13.8052 0.559302 14.3797 0.219384 14.72C0.010286 14.9293 -0.0562083 15.242 0.049625 15.5183C0.155453 15.7946 0.413829 15.9828 0.709262 15.9989C1.44911 16.0391 2.26317 15.8932 2.969 15.6876C3.48718 15.5366 3.98599 15.3421 4.3918 15.1345C4.91984 15.4026 5.63842 15.6947 6.52245 15.8619C7.00125 15.9526 7.49597 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58179 12.4182 0 8 0ZM1.5 8C1.5 4.41021 4.41021 1.5 8 1.5C11.5898 1.5 14.5 4.41021 14.5 8C14.5 11.5898 11.5898 14.5 8 14.5C7.59004 14.5 7.18875 14.4614 6.80155 14.3881C5.8929 14.2162 5.19789 13.8812 4.75768 13.6273C4.51392 13.4867 4.21198 13.4944 3.9757 13.6472C3.68755 13.8336 3.16487 14.0682 2.5495 14.2474C2.4371 14.2802 2.32402 14.3103 2.21114 14.3376C2.31664 14.0863 2.40251 13.8306 2.46811 13.581C2.57234 13.1845 2.63277 12.7764 2.63175 12.3932C2.63076 12.0203 2.57145 11.614 2.38472 11.264C2.38077 11.2566 2.37669 11.2492 2.37249 11.2419C1.8202 10.2855 1.5 9.18119 1.5 8Z" fill={color} />
      </g>
    </svg>
  );
}

export function MicIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1.5C8.619 1.5 7.5 2.619 7.5 4v5.5a2.5 2.5 0 005 0V4c0-1.381-1.119-2.5-2.5-2.5z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 8.5v1a4.5 4.5 0 01-9 0v-1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14v3.5M7.5 17.5h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PauseIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="4" width="3.5" height="12" rx="1" fill={color} />
      <rect x="11.5" y="4" width="3.5" height="12" rx="1" fill={color} />
    </svg>
  );
}

export function PlayIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(4.5,4)">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.44589 7.60195L9.13777 6.61942C9.37419 6.48213 9.5 6.25811 9.5 5.99911C9.5 5.74041 9.37448 5.51662 9.13859 5.37928C9.13832 5.37912 9.13886 5.37944 9.13859 5.37928L2.60938 1.60004C2.38155 1.46797 2.09405 1.46696 1.86565 1.5971C1.63689 1.72821 1.5 1.97025 1.5 2.21927V9.78074C1.5 10.0294 1.63648 10.2711 1.86463 10.4023C1.97911 10.467 2.10714 10.5 2.23577 10.5C2.36644 10.5 2.49795 10.4661 2.61454 10.3998L7.44589 7.60195ZM3.3626 11.7C3.01561 11.8988 2.62569 12 2.23577 12C1.84943 12 1.46488 11.9006 1.12146 11.7053C0.429268 11.3094 0 10.5726 0 9.78074V2.21927C0 1.42743 0.429268 0.690641 1.12146 0.294724C1.81187 -0.0994167 2.66862 -0.0994172 3.36081 0.301825L9.89106 4.08167C10.585 4.48469 11 5.20018 11 5.99911C11 6.38918 10.9011 6.75935 10.7191 7.08297C10.7175 7.08574 10.716 7.08851 10.7144 7.09127C10.5252 7.42422 10.2478 7.70742 9.89951 7.91163C9.89688 7.91316 9.89426 7.9147 9.89163 7.91623C9.89144 7.91634 9.89182 7.91612 9.89163 7.91623L9.89228 7.91866L3.3626 11.7Z" fill={color} />
      </g>
    </svg>
  );
}

export function VideoIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        width: '20px',
        height: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 3.75C4.5 4.16421 4.16421 4.5 3.75 4.5C3.33579 4.5 3 4.16421 3 3.75C3 3.33579 3.33579 3 3.75 3C4.16421 3 4.5 3.33579 4.5 3.75Z" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M12 9.25V8.26945L15.1478 10.0004C15.9799 10.4577 17 9.85627 17 8.90512V3.09612C17 2.14498 15.9798 1.54364 15.1476 2.00093L12 3.73179V2.75C12 1.23122 10.7688 0 9.25 0H2.75C1.23122 0 0 1.23122 0 2.75V9.25C0 10.7688 1.23122 12 2.75 12H9.25C10.7688 12 12 10.7688 12 9.25ZM2.75 1.5C2.05964 1.5 1.5 2.05964 1.5 2.75V9.25C1.5 9.94036 2.05964 10.5 2.75 10.5H9.25C9.94036 10.5 10.5 9.94036 10.5 9.25V7.01398C10.4998 7.00497 10.4998 6.99595 10.5 6.98692V5.01433C10.4998 5.0053 10.4998 4.99627 10.5 4.98726V2.75C10.5 2.05964 9.94036 1.5 9.25 1.5H2.75ZM15.5 8.48226L12 6.55762V5.44363L15.5 3.51899V8.48226Z" fill={color} />
      </svg>
    </div>
  );
}

export function BarChartAiIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        width: '20px',
        height: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 15.002 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.75 0C1.16421 0 1.5 0.335786 1.5 0.75V15.25C1.5 15.6642 1.16421 16 0.75 16C0.335786 16 0 15.6642 0 15.25V0.75C0 0.335786 0.335786 0 0.75 0Z" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M6.25 11.5C7.21666 11.5 8 12.2839 8 13.25V13.75C8 14.7161 7.21666 15.5 6.25 15.5H4.75C3.78334 15.5 3 14.7161 3 13.75V13.25C3 12.2839 3.78334 11.5 4.75 11.5H6.25ZM4.75 13C4.61206 13 4.5 13.1121 4.5 13.25V13.75C4.5 13.8879 4.61206 14 4.75 14H6.25C6.38794 14 6.5 13.8879 6.5 13.75V13.25C6.5 13.1121 6.38794 13 6.25 13H4.75Z" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M12.25 6C13.2167 6 14 6.78393 14 7.75V8.25C14 9.21607 13.2167 10 12.25 10H4.75C3.78334 10 3 9.21607 3 8.25V7.75C3 6.78393 3.78334 6 4.75 6H12.25ZM4.75 7.5C4.61206 7.5 4.5 7.61207 4.5 7.75V8.25C4.5 8.38793 4.61206 8.5 4.75 8.5H12.25C12.3879 8.5 12.5 8.38793 12.5 8.25V7.75C12.5 7.61207 12.3879 7.5 12.25 7.5H4.75Z" fill={color} />
        <path d="M12.0264 0.305664C12.1636 -0.101783 12.8373 -0.101778 12.9746 0.305664L13.3965 1.56934L14.6592 1.99023C14.863 2.05828 15.0019 2.249 15.002 2.46387C15.002 2.67887 14.8642 2.87048 14.6602 2.93848L13.3975 3.35938L12.9756 4.62207C12.9065 4.82597 12.7159 4.96387 12.501 4.96387C12.286 4.96386 12.0944 4.82597 12.0264 4.62207L11.6055 3.35938L10.3418 2.93848C10.1378 2.87046 10 2.67885 10 2.46387C10.0001 2.24901 10.138 2.05829 10.3418 1.99023L11.6055 1.56934L12.0264 0.305664Z" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M7 0.5C7.96666 0.5 8.75 1.28393 8.75 2.25V2.75C8.75 3.71607 7.96666 4.5 7 4.5H4.75C3.78334 4.5 3 3.71607 3 2.75V2.25C3 1.28393 3.78334 0.5 4.75 0.5H7ZM4.75 2C4.61206 2 4.5 2.11207 4.5 2.25V2.75C4.5 2.88793 4.61206 3 4.75 3H7C7.13794 3 7.25 2.88793 7.25 2.75V2.25C7.25 2.12944 7.16445 2.02836 7.05078 2.00488L7 2H4.75Z" fill={color} />
      </svg>
    </div>
  );
}

export function PuzzleIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        width: '20px',
        height: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.41161 0C10.7817 4.22856e-05 11.8937 1.11054 11.8938 2.48214C11.8938 2.59814 11.8843 2.7119 11.8688 2.82321H13.2607C14.7739 2.82321 15.9998 4.04993 16 5.56161V7.94018C16 8.19585 15.858 8.43102 15.6313 8.54911C15.4044 8.66716 15.13 8.64854 14.9205 8.50179C14.7385 8.37429 14.5214 8.30089 14.2875 8.30089C13.6744 8.30101 13.1768 8.79796 13.1768 9.41161C13.1768 10.0252 13.6744 10.5222 14.2875 10.5223C14.5203 10.5223 14.7384 10.4487 14.9223 10.3205C15.1318 10.1745 15.4048 10.1569 15.6313 10.275C15.8577 10.3932 16 10.6276 16 10.883V13.2607C16 14.7725 14.774 16 13.2607 16H10.883C10.6274 16 10.3922 15.858 10.2741 15.6313C10.1561 15.4044 10.1747 15.13 10.3214 14.9205C10.449 14.7383 10.5223 14.5222 10.5223 14.2875C10.5222 13.6739 10.0247 13.1768 9.41161 13.1768C8.79847 13.1768 8.30101 13.6739 8.30089 14.2875C8.30089 14.5212 8.37434 14.7382 8.50268 14.9223C8.64874 15.1318 8.66631 15.4048 8.54821 15.6313C8.43003 15.8577 8.19563 16 7.94018 16H5.56161C4.04846 15.9998 2.82321 14.7724 2.82321 13.2607V11.8688C2.71174 11.8843 2.59797 11.8938 2.48214 11.8938C1.11208 11.8937 4.22964e-05 10.7832 0 9.41161C0 8.03997 1.11205 6.92946 2.48214 6.92946C2.59806 6.92946 2.71182 6.93887 2.82321 6.95446V5.56161C2.82338 4.05003 4.04855 2.82338 5.56161 2.82321H6.95446C6.93896 2.71181 6.92946 2.59807 6.92946 2.48214C6.9295 1.11052 8.04151 0 9.41161 0ZM9.41161 1.37143C8.79842 1.37143 8.30093 1.86845 8.30089 2.48214C8.30089 2.71694 8.37412 2.93291 8.50179 3.11518C8.64846 3.32451 8.66694 3.59821 8.54911 3.825C8.43106 4.05187 8.19592 4.19464 7.94018 4.19464H5.56161C4.80642 4.1948 4.1948 4.807 4.19464 5.56161V7.94018C4.19464 8.19563 4.05236 8.43003 3.82589 8.54821C3.59947 8.66636 3.32649 8.6487 3.11696 8.50268C2.93306 8.37447 2.71502 8.30089 2.48214 8.30089C1.86896 8.30093 1.37143 8.7979 1.37143 9.41161C1.37147 10.0253 1.86899 10.5223 2.48214 10.5223C2.71609 10.5223 2.9331 10.4489 3.11518 10.3214C3.32453 10.1747 3.59819 10.1562 3.825 10.2741C4.05187 10.3922 4.19464 10.6273 4.19464 10.883V13.2607C4.19464 14.0155 4.80632 14.6284 5.56161 14.6286H6.95446C6.93893 14.5173 6.92946 14.4035 6.92946 14.2875C6.92958 12.9159 8.04156 11.8054 9.41161 11.8054C10.7816 11.8054 11.8936 12.916 11.8938 14.2875C11.8938 14.4034 11.8842 14.5172 11.8688 14.6286H13.2607C14.0161 14.6286 14.6286 14.0156 14.6286 13.2607V11.8679C14.5172 11.8834 14.4034 11.8938 14.2875 11.8938C12.9175 11.8936 11.8054 10.7832 11.8054 9.41161C11.8054 8.04003 12.9175 6.92958 14.2875 6.92946C14.4032 6.92946 14.5172 6.93806 14.6286 6.95357V5.56161C14.6284 4.8069 14.016 4.19464 13.2607 4.19464H10.883C10.6276 4.19464 10.3932 4.05234 10.275 3.82589C10.1568 3.59944 10.1745 3.32651 10.3205 3.11696C10.4489 2.93289 10.5223 2.71584 10.5223 2.48214C10.5223 1.86847 10.0248 1.37147 9.41161 1.37143Z" fill={color} />
      </svg>
    </div>
  );
}

export function SparkleNavIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        width: '20px',
        height: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16.001 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.396 1.569L4.659 1.99C4.863 2.058 5.002 2.249 5.002 2.464C5.002 2.679 4.864 2.87 4.66 2.938L3.397 3.359L2.976 4.622C2.907 4.826 2.716 4.964 2.501 4.964C2.286 4.964 2.094 4.826 2.026 4.622L1.605 3.359L0.342 2.938C0.138 2.87 0 2.679 0 2.464C0 2.249 0.138 2.058 0.342 1.99L1.605 1.569L2.026 0.306C2.163 -0.102 2.838 -0.102 2.975 0.306L3.396 1.569Z" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M9.19846 1.47429C9.08532 1.18808 8.80881 1.00003 8.50104 1C8.19328 0.999972 7.91673 1.18797 7.80354 1.47417L6.01003 6.00905L1.47515 7.80256C1.18897 7.91574 1.00098 8.19226 1.00098 8.5C1.00098 8.80774 1.18897 9.08426 1.47515 9.19744L6.01003 10.991L7.80354 15.5258C7.91673 15.812 8.19328 16 8.50104 16C8.80881 16 9.08532 15.8119 9.19846 15.5257L10.991 10.9909L15.5268 9.19746C15.813 9.08429 16.001 8.80776 16.001 8.5C16.001 8.19224 15.813 7.91571 15.5268 7.80254L10.991 6.00905L9.19846 1.47429ZM7.28541 6.86283L8.50079 3.78975L9.71549 6.86271C9.79171 7.05554 9.94437 7.20821 10.1372 7.28446L13.2113 8.5L10.1372 9.71554C9.94437 9.79179 9.79171 9.94446 9.71549 10.1373L8.50079 13.2102L7.28541 10.1372C7.20918 9.94441 7.05657 9.7918 6.86381 9.71556L3.79027 8.5L6.86381 7.28444C7.05657 7.2082 7.20918 7.05559 7.28541 6.86283Z" fill={color} />
      </svg>
    </div>
  );
}

export function SparkleSmallIcon({ className = "w-3 h-3", color = "#008ba7" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1l1.146 2.854L10 5l-2.854 1.146L6 9 4.854 6.146 2 5l2.854-1.146L6 1z" fill={color} />
      <path d="M9.5 7l.573 1.427L11.5 9l-1.427.573L9.5 11l-.573-1.427L7.5 9l1.427-.573L9.5 7z" fill={color} />
    </svg>
  );
}

/** Icon/Large/Plug — matches Figma Whitelabel-App (node 2184:9955) */
export function PlugIcon({ className, style, color = LIGHT_600 }: { className?: string; style?: CSSProperties; color?: string }) {
  return (
    <svg className={className} style={style} viewBox="0 0 14.25 14.25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.07999 0.219605C9.37284 -0.0732449 9.84764 -0.0731586 10.1405 0.219605C10.4334 0.512498 10.4334 0.987259 10.1405 1.28015L8.54972 2.87L11.3778 5.6991L12.9696 4.10828C13.2625 3.81571 13.7374 3.81558 14.0302 4.10828C14.3229 4.40108 14.3228 4.87593 14.0302 5.16882L12.4384 6.75964L13.6767 7.99695C14.3598 8.68009 14.3597 9.78934 13.6767 10.4725L12.4394 11.7098C9.88672 14.2624 5.84628 14.4288 3.09855 12.2108L1.28019 14.0302C0.987343 14.3229 0.512529 14.3229 0.219642 14.0302C-0.0732327 13.7373 -0.0731952 13.2625 0.219642 12.9696L2.038 11.1503C-0.179286 8.40257 -0.0123637 4.36282 2.53995 1.81043L3.77726 0.573121C4.46047 -0.109891 5.56874 -0.110012 6.25187 0.573121L7.48917 1.80945L9.07999 0.219605ZM5.19132 1.63367C5.09398 1.53632 4.93523 1.53644 4.83781 1.63367L3.6005 2.87097C1.45467 5.01689 1.45462 8.50341 3.6005 10.6493C5.7464 12.795 9.23296 12.7951 11.3788 10.6493L12.6161 9.41199C12.7133 9.31465 12.7132 9.15584 12.6161 9.05847L5.19132 1.63367Z"
        fill={color}
      />
    </svg>
  );
}

export function DotsVerticalIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="5" r="1.25" fill={color} />
      <circle cx="10" cy="10" r="1.25" fill={color} />
      <circle cx="10" cy="15" r="1.25" fill={color} />
    </svg>
  );
}

export function XMarkIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4l12 12M16 4L4 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StopIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="12" height="12" rx="2" fill={color} />
    </svg>
  );
}

/** Icon/Large/House — matches Figma Whitelabel-App (node 3017:17421) */
export function HouseIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        width: '20px',
        height: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="14" height="16" viewBox="0 0 14 15.744" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.85496 0.516945C6.5145 -0.0142907 7.4855 -0.0142907 8.14504 0.516945L13.4419 4.78468C13.7935 5.06799 14 5.50191 14 5.96057V13.4945C14 14.7395 12.9665 15.7438 11.6927 15.7438H10.0233C9.10153 15.7438 8.35455 15.0182 8.35455 14.1234V11.0231C8.35455 10.844 8.20518 10.6989 8.02093 10.6989H5.97907C5.79482 10.6989 5.64545 10.844 5.64545 11.0231V14.1234C5.64545 15.0182 4.89847 15.7438 3.97676 15.7438H2.30727C1.03346 15.7438 0 14.7395 0 13.4945V5.96057C0 5.50191 0.206494 5.06799 0.55815 4.78468L5.85496 0.516945ZM7.21041 1.6442C7.08967 1.54702 6.91033 1.54702 6.78959 1.6442L1.49278 5.91194C1.43873 5.95548 1.40741 6.01918 1.40741 6.08712V13.4945C1.40741 13.9777 1.81065 14.3672 2.30727 14.3672H3.97676C4.12136 14.3672 4.23804 14.2538 4.23804 14.1234V11.0231C4.23804 10.0837 5.01657 9.32229 5.97907 9.32229H8.02093C8.98343 9.32229 9.76196 10.0837 9.76196 11.0231V14.1234C9.76196 14.2538 9.87864 14.3672 10.0233 14.3672H11.6927C12.1893 14.3672 12.5926 13.9777 12.5926 13.4945V6.08712C12.5926 6.01918 12.5613 5.95548 12.5072 5.91194L7.21041 1.6442Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/** Calendar icon — matches Figma Whitelabel-App overdue pill (node I3151:13282;3151:13157)
 *  Artwork is exactly 12×12.8 (the Figma "Date icon" 16×16 frame embeds this artwork). */
export function CalendarIcon({ className, color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12.8"
      viewBox="0 0 12 12.8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 0C3.66421 0 4 0.335786 4 0.75V1.5H8V0.75C8 0.335786 8.33579 0 8.75 0C9.16421 0 9.5 0.335786 9.5 0.75V1.55C10.6217 1.7889 11.5 2.78566 11.5 4V10C11.5 11.4307 10.4307 12.5 9 12.5H3C1.56929 12.5 0.5 11.4307 0.5 10V4C0.5 2.78566 1.37833 1.7889 2.5 1.55V0.75C2.5 0.335786 2.83579 0 3.25 0ZM2 4.5V10C2 10.6022 2.39786 11 3 11H9C9.60214 11 10 10.6022 10 10V4.5H2ZM10 3H2C2 2.44772 2.44772 2 3 2H9C9.55228 2 10 2.44772 10 3Z"
        fill={color}
      />
    </svg>
  );
}

/** Book / plan icon — used for the Plan sidebar nav item. */
export function BookIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.333 4.167A1.667 1.667 0 015 2.5h3.333c.92 0 1.667.747 1.667 1.667v11.666c0-.92-.746-1.666-1.667-1.666H3.333V4.167z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.667 4.167A1.667 1.667 0 0015 2.5h-3.333c-.92 0-1.667.747-1.667 1.667v11.666c0-.92.746-1.666 1.667-1.666h5V4.167z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Chevron right — row affordance on plan/list items. */
export function ChevronRightIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 4.5l6 5.5-6 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Unchecked checkbox — square with rounded corners. */
export function CheckboxEmptyIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.25" y="3.25" width="13.5" height="13.5" rx="3.5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

/** Checked checkbox — filled square with white checkmark. */
export function CheckboxCheckedIcon({ className = "w-5 h-5", color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="2.5" width="15" height="15" rx="4" fill={color} />
      <path d="M6 10.25l2.75 2.75L14 7.75" stroke="var(--surface-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Check-circle icon — matches Figma `Product_button` "Mark as done" CTA (node 3169:25118).
 *  12×12 artwork, intended to sit inside a 20×20 icon frame like the other pill buttons. */
export function CheckCircleIcon({ className, color = LIGHT_600 }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ display: 'block', flexShrink: 0 }}
    >
      <circle cx="6" cy="6" r="5.25" stroke={color} strokeWidth="1.5" />
      <path
        d="M3.75 6L5.25 7.5L8.25 4.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

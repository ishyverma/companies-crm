type P = { size?: number; className?: string };

function Svg({ size = 12, className, children }: P & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export const BoltIcon = (p: P) => (
  <Svg {...p}><path d="M9.6 1 3 9.2h3.9L6.2 15 13 6.8H9.1L9.6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" /></Svg>
);

export const NotesIcon = (p: P) => (
  <Svg {...p}>
    <path fillRule="evenodd" clipRule="evenodd" d="M4.5 1.5h7A1.5 1.5 0 0 1 13 3v10a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13V3a1.5 1.5 0 0 1 1.5-1.5ZM5.5 5v1.2h5V5h-5Zm0 3v1.2h5V8h-5Zm0 3v1.2h3V11h-3Z" />
  </Svg>
);

export const MailIcon = (p: P) => (
  <Svg {...p}>
    <rect x="1.5" y="3" width="13" height="10" rx="1.8" />
    <path d="M2.4 4.8 8 9l5.6-4.2" fill="none" stroke="var(--sidebar-bg)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BuildingIcon = (p: P) => (
  <Svg {...p}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.2 1.5h5.1c.66 0 1.2.54 1.2 1.2V5h3.3c.66 0 1.2.54 1.2 1.2v7.1c0 .66-.54 1.2-1.2 1.2H3.2A1.2 1.2 0 0 1 2 13.3V2.7c0-.66.54-1.2 1.2-1.2ZM4 3.6v1.5h1.5V3.6H4Zm2.6 0v1.5h1.5V3.6H6.6ZM4 6.9v1.5h1.5V6.9H4Zm2.6 0v1.5h1.5V6.9H6.6ZM4 10.2v1.5h1.5v-1.5H4Zm2.6 0v1.5h1.5v-1.5H6.6Zm4.1-3.2v1.5h1.5V7h-1.5Zm0 3.2v1.5h1.5v-1.5h-1.5Z" />
  </Svg>
);

export const UserIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="8" cy="5" r="3.1" />
    <path d="M2.5 14c0-3 2.5-4.7 5.5-4.7s5.5 1.7 5.5 4.7c0 .55-.45 1-1 1h-9c-.55 0-1-.45-1-1Z" />
  </Svg>
);

export const CalendarIcon = (p: P) => (
  <Svg {...p}>
    <path d="M5 1.2a.8.8 0 0 1 .8.8v.7h4.4V2a.8.8 0 0 1 1.6 0v.7h.2A2.3 2.3 0 0 1 14.3 5v7.7a2.3 2.3 0 0 1-2.3 2.3H4a2.3 2.3 0 0 1-2.3-2.3V5A2.3 2.3 0 0 1 4 2.7h.2V2A.8.8 0 0 1 5 1.2Z" />
    <rect x="1.7" y="5.5" width="12.6" height="1.3" fill="var(--cell-head)" />
  </Svg>
);

export const GlobeIcon = (p: P) => (
  <Svg {...p}>
    <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M1.8 8h12.4M8 1.8c1.8 1.7 2.7 3.8 2.7 6.2S9.8 12.5 8 14.2C6.2 12.5 5.3 10.4 5.3 8S6.2 3.5 8 1.8Z" />
    </g>
  </Svg>
);

export const TagIcon = (p: P) => (
  <Svg {...p}>
    <path fillRule="evenodd" clipRule="evenodd" d="M2 2.8C2 2.36 2.36 2 2.8 2h4.5c.3 0 .6.12.8.34l5.6 5.6a1.15 1.15 0 0 1 0 1.62l-4.1 4.1a1.15 1.15 0 0 1-1.62 0l-5.6-5.6A1.15 1.15 0 0 1 2 7.3V2.8ZM5.3 4.2a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" />
  </Svg>
);

export const DatabaseIcon = (p: P) => (
  <Svg {...p}>
    <path d="M8 1.5c3.3 0 6 1.05 6 2.35S11.3 6.2 8 6.2 2 5.15 2 3.85 4.7 1.5 8 1.5Z" />
    <path d="M2 5.6c0 1.3 2.7 2.35 6 2.35s6-1.05 6-2.35v2.3c0 1.3-2.7 2.35-6 2.35S2 9.2 2 7.9V5.6Z" />
    <path d="M2 9.65c0 1.3 2.7 2.35 6 2.35s6-1.05 6-2.35v1.5c0 1.8-2.7 3.35-6 3.35s-6-1.55-6-3.35v-1.5Z" />
  </Svg>
);

export const PillsIcon = (p: P) => (
  <Svg {...p}>
    <rect x="2" y="2" width="12" height="3.2" rx="1.6" />
    <rect x="2" y="6.4" width="12" height="3.2" rx="1.6" />
    <rect x="2" y="10.8" width="12" height="3.2" rx="1.6" />
  </Svg>
);

export const WeakIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="8" cy="8" r="7" />
    <path d="M4.8 9c1-1.7 2.4-1.9 3.3-.9.8.9 1.9.9 3.1-.5" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
  </Svg>
);

export const PanelLeftIcon = (p: P) => (
  <Svg {...p}>
    <rect x="1.75" y="2.25" width="12.5" height="11.5" rx="2.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.5 5a2 2 0 0 1 2-2H6v10H4.5a2 2 0 0 1-2-2V5Z" />
  </Svg>
);

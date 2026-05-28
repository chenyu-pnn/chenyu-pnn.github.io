import { useTheme, type Theme } from '../hooks/useTheme'

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"     x2="12" y2="5.5"   />
      <line x1="12" y1="18.5"  x2="12" y2="22"    />
      <line x1="2"  y1="12"    x2="5.5" y2="12"   />
      <line x1="18.5" y1="12"  x2="22" y2="12"    />
      <line x1="4.93" y1="4.93"  x2="7.17" y2="7.17"   />
      <line x1="16.83" y1="16.83" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="7.17" y2="16.83"  />
      <line x1="16.83" y1="7.17" x2="19.07" y2="4.93"  />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <rect x="2" y="3" width="20" height="14" />
      <line x1="8"  y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

const ICONS: Record<Theme, React.ReactNode> = {
  dark:   <MoonIcon />,
  light:  <SunIcon />,
  system: <MonitorIcon />,
}

export function ThemeToggle() {
  const { theme, cycleTheme } = useTheme()

  return (
    <button
      onClick={cycleTheme}
      title={`Theme: ${theme} — click to cycle`}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 50,
        width: '36px',
        height: '36px',
        border: '1px solid var(--border-2)',
        background: 'var(--bg-2)',
        color: 'var(--fg-3)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        transition: 'color 0.2s, background 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--fg)'
        e.currentTarget.style.background = 'var(--bg-3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--fg-3)'
        e.currentTarget.style.background = 'var(--bg-2)'
      }}
    >
      {ICONS[theme]}
    </button>
  )
}

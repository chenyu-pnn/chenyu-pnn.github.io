import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero',   label: 'me'     },
  { id: 'work',   label: 'work'   },
  { id: 'photos', label: 'photos' },
]

export function LeftTimeline() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.4
      let current = SECTIONS[0].id
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= threshold) current = id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="left-timeline"
      style={{
        position: 'fixed',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 0,
      }}
    >
      {SECTIONS.map(({ id, label }, i) => (
        <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <button
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            title={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 0',
            }}
          >
            <div
              className="timeline-dot"
              style={{
                width: active === id ? '8px' : '5px',
                height: active === id ? '8px' : '5px',
                background: active === id ? 'var(--fg)' : 'var(--fg-3)',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}
            />
            <span style={{
              fontFamily: 'var(--font-playful)',
              fontSize: '15px',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s',
              ...(active === id
                ? { background: 'var(--fg)', color: 'var(--bg)', padding: '0 5px', fontWeight: 600 }
                : { color: 'var(--fg-3)', fontWeight: 400 }
              ),
            }}>
              {label}
            </span>
          </button>

          {i < SECTIONS.length - 1 && (
            <div style={{ width: '1px', height: '32px', background: 'var(--border)', marginLeft: '3.5px' }} />
          )}
        </div>
      ))}
    </div>
  )
}

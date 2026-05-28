import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero',       label: 'Intro'      },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
]

export function LeftTimeline() {
  const [active, setActive] = useState('hero')
  const [hovered, setHovered] = useState<string | null>(null)

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
        alignItems: 'center',
      }}
    >
      {SECTIONS.map(({ id, label }, i) => (
        <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Hover label */}
            <span
              style={{
                position: 'absolute',
                left: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--fg-2)',
                whiteSpace: 'nowrap',
                opacity: hovered === id || active === id ? 1 : 0,
                transition: 'opacity 0.25s',
                pointerEvents: 'none',
              }}
            >
              {label}
            </span>

            {/* Dot — clickable */}
            <button
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              title={label}
              style={{
                width: active === id ? '7px' : '4px',
                height: active === id ? '7px' : '4px',
                background: active === id ? 'var(--fg)' : 'var(--fg-3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
                display: 'block',
              }}
            />
          </div>

          {i < SECTIONS.length - 1 && (
            <div style={{ width: '1px', height: '40px', background: 'var(--border)' }} />
          )}
        </div>
      ))}
    </div>
  )
}

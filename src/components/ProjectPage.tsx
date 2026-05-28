import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { marked } from 'marked'
import { projects } from '../data'
import { usePageTransition } from './TransitionOverlay'

/* ── Project page left timeline ── */
function ProjectTimeline({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '')
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.4
      let current = items[0]?.id ?? ''
      for (const { id } of items) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= threshold) current = id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [items])

  return (
    <div
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
      {items.map(({ id, label }, i) => (
        <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Hover/active label */}
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

            {/* Dot */}
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

          {i < items.length - 1 && (
            <div style={{ width: '1px', height: '40px', background: 'var(--border)' }} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Main project page ── */
export function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const { navigateBack } = usePageTransition()
  const project = projects.find(p => p.id === id)

  const [mdHtml, setMdHtml] = useState<string | null>(null)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [id])

  useEffect(() => {
    if (!project) return
    fetch(`/articles/${project.id}.md`)
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(text => setMdHtml(marked.parse(text) as string))
      .catch(() => setMdHtml(null))
  }, [project?.id])

  const useMd = mdHtml !== null
  const timelineItems: { id: string; label: string }[] = []

  if (!project) {
    return (
      <div style={{ height: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="label">Project not found</span>
      </div>
    )
  }

  const heroImage = project.image

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingBottom: '80px' }}>
      {timelineItems.length > 0 && <ProjectTimeline items={timelineItems} />}

      <div className="container" style={{ maxWidth: '860px' }}>

        {/* ── Back nav ── */}
        <div style={{ paddingTop: '32px', paddingBottom: '40px' }}>
          <button
            onClick={() => navigateBack()}
            className="label"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--fg-2)',
              padding: 0,
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-2)')}
          >
            ← Projects
          </button>
        </div>

        {/* ── Title ── */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'var(--fg)',
              marginBottom: '8px',
            }}
          >
            {project.title}
          </h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--fg)', letterSpacing: '0.1em' }}>
            {project.year}
          </span>
        </div>

        {/* ── Hero image ── */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16/10',
            border: '1px solid var(--border)',
            background: 'var(--bg-3)',
            overflow: 'hidden',
            marginBottom: '20px',
          }}
        >
          {heroImage
            ? <img src={heroImage} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
                  HERO IMAGE
                </span>
              </div>
          }
        </div>

        {/* ── Tags below hero ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border)',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-2)',
                  border: '1px solid var(--border-2)',
                  padding: '4px 10px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Article content ── */}
        {useMd && <div className="prose" dangerouslySetInnerHTML={{ __html: mdHtml! }} />}

      </div>
    </div>
  )
}

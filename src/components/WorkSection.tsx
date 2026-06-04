import { useState } from 'react'
import { experience, projects, profile } from '../data'
import type { Experience } from '../data'
import { ProjectCard } from './ProjectCard'


function ExperienceCard({ item }: { item: Experience }) {
  const [hovered, setHovered] = useState(false)
  const Tag = item.url ? 'a' : ('div' as 'a' | 'div')
  const linkProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...(linkProps as object)}
      className="card-glow"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: hovered ? 'var(--bg-2)' : 'var(--bg)',
        cursor: item.url ? 'pointer' : 'default',
        textDecoration: 'none',
        transition: 'background 0.25s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — position:absolute inside aspect-ratio container to guarantee fill */}
      <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg-2)', position: 'relative', flexShrink: 0 }}>
        {item.image ? (
          <img src={item.image} alt={item.company} style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-3)' }} />
        )}
      </div>

      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Experience
          </span>
          <span className="label">{item.period}</span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '18px',
          fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.1, color: 'var(--fg)',
          textDecoration: hovered && item.url ? 'underline' : 'none',
          textUnderlineOffset: '4px', textDecorationColor: 'var(--fg-2)',
        }}>
          {item.company}
        </h3>

        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--fg-3)',
        }}>
          {item.role}
        </span>

        <p style={{ fontSize: '12px', color: 'var(--fg-2)', lineHeight: 1.65, flex: 1 }}>
          {item.description}
        </p>

        {item.location && (
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--fg-3)',
              border: '1px solid var(--border)', padding: '3px 8px',
            }}>
              {item.location}
            </span>
          </div>
        )}
      </div>
    </Tag>
  )
}

export function WorkSection() {
  return (
    <section id="work" style={{ paddingBottom: '32px' }}>
      <div className="container">

        <div style={{ marginBottom: '20px' }}>
          <div className="rule" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '12px' }}>
            <div className="label">Work</div>
            {profile.links?.resume && (
              <a
                href={profile.links.resume}
                className="label"
                style={{ color: 'var(--fg-2)', borderBottom: '1px solid var(--border-2)', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--fg)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-2)'; e.currentTarget.style.borderColor = 'var(--border-2)' }}
              >
                Resume ↗
              </a>
            )}
          </div>
        </div>

        <div className="work-grid">
          {experience.map((item, i) => <ExperienceCard key={i} item={item} />)}
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>

      </div>
    </section>
  )
}

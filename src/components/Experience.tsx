import { useState } from 'react'
import { experience, profile } from '../data'
import type { Experience as ExperienceType } from '../data'

function ExperienceCard({ item }: { item: ExperienceType }) {
  const [hovered, setHovered] = useState(false)
  const Tag = item.url ? 'a' : 'div'
  const linkProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...linkProps}
      style={{ display: 'block', textDecoration: 'none', cursor: item.url ? 'pointer' : 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{
        aspectRatio: '16/9',
        overflow: 'hidden',
        background: 'var(--bg-2)',
        marginBottom: '18px',
      }}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.company}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--bg-3)' }} />
        )}
      </div>

      {/* Period — mono, small, top */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: 'var(--fg-3)',
        letterSpacing: '0.08em',
        marginBottom: '6px',
      }}>
        {item.period}
        {item.location && <span style={{ color: 'var(--fg-3)' }}> · {item.location}</span>}
      </div>

      {/* Company — display, italic, large */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: '28px',
        fontWeight: 400,
        color: 'var(--fg)',
        lineHeight: 1.05,
        marginBottom: '6px',
        textDecoration: hovered && item.url ? 'underline' : 'none',
        textUnderlineOffset: '4px',
        textDecorationColor: 'var(--fg-2)',
      }}>
        {item.company}
      </div>

      {/* Role — mono, uppercase */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--fg-2)',
        marginBottom: '12px',
      }}>
        {item.role}
      </div>

      {/* Description — body */}
      <p style={{
        fontSize: '13px',
        color: 'var(--fg-2)',
        lineHeight: 1.8,
      }}>
        {item.description}
      </p>
    </Tag>
  )
}

export function Experience() {
  return (
    <section id="experience" style={{ padding: '32px 0' }}>
      <div className="container">
        <div className="rule" />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginTop: '16px',
          marginBottom: '32px',
        }}>
          <div className="label">01 / Experience</div>
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

        <div className="section-grid">
          {experience.map((item, i) => (
            <ExperienceCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

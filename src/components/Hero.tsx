import { useEffect, useState } from 'react'
import { profile } from '../data'
import { HeroBackground } from './HeroBackground'

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <rect x="2" y="4" width="20" height="16" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function IconLink({ href, title, external = true, children }: {
  href: string; title: string; external?: boolean; children: React.ReactNode
}) {
  return (
    <a
      href={href}
      title={title}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{ color: 'var(--fg-2)', display: 'flex', transition: 'color 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-2)' }}
    >
      {children}
    </a>
  )
}

function ScrollIndicator() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio > 0.85),
      { threshold: [0.85, 1.0] }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{
      position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none', zIndex: 2,
    }}>
      <span className="label" style={{ color: 'var(--fg-2)', letterSpacing: '0.2em', fontSize: '10px' }}>scroll</span>
      <div className="scroll-chevron">
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="var(--fg-2)" strokeWidth="1.5" strokeLinecap="square">
          <polyline points="1,1 7,7 13,1" />
        </svg>
      </div>
    </div>
  )
}

export function Hero() {
  const links = profile.links ?? {}
  const allRoles = [
    { role: profile.work.role, name: profile.work.name },
    ...(profile.previous ?? []),
  ]

  return (
    <section id="hero" className="hero-section" style={{
      height: '100svh', display: 'flex', alignItems: 'center',
      position: 'relative', zIndex: 1, overflow: 'hidden',
    }}>
      <HeroBackground />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Name */}
        <div style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(72px, 12vw, 140px)',
          lineHeight: 0.88,
          letterSpacing: '0.02em',
          color: 'var(--accent)',
          marginBottom: '-2px',
        }}>Chenyu</div>
        <div style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(72px, 12vw, 140px)',
          lineHeight: 0.88,
          letterSpacing: '0.02em',
          color: 'var(--accent)',
          marginBottom: '16px',
        }}>Pan</div>

        {/* Icons */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {links.email    && <IconLink href={`mailto:${links.email}`} title="Email" external={false}><MailIcon /></IconLink>}
          {links.linkedin && <IconLink href={links.linkedin} title="LinkedIn"><LinkedInIcon /></IconLink>}
          <IconLink href={links.resume ?? '#'} title="Resume" external={false}><ResumeIcon /></IconLink>
        </div>

        {/* Bullets — above bio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', maxWidth: '50%' }}>

          {/* Education */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>›</span>
            {profile.education.logo && (
              <img src={profile.education.logo} alt="" width={14} height={14}
                style={{ objectFit: 'contain', opacity: 0.7, flexShrink: 0 }} />
            )}
            <span className="text-highlight" style={{ fontSize: '12px' }}>
              {profile.education.name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-2)' }}>
              · {profile.education.detail} · {profile.education.year}
            </span>
          </div>

          {/* Experience roster */}
          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0 2px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', marginRight: '4px' }}>›</span>
            {allRoles.map((exp, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '3px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-2)' }}>{exp.role}</span>
                <span style={{ fontSize: '10px', color: 'var(--fg-2)' }}>at</span>
                <span className="text-highlight" style={{ fontSize: '12px' }}>{exp.name}</span>
                {i < allRoles.length - 1 && (
                  <span style={{ color: 'var(--fg-3)' }}>,</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <p style={{ fontSize: '13px', color: 'var(--fg-2)', lineHeight: 1.85, maxWidth: '50%', whiteSpace: 'pre-line' }}>
          {profile.bio}
        </p>

      </div>
      <ScrollIndicator />
    </section>
  )
}

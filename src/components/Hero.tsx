import { profile } from '../data'
import { HeroBackground } from './HeroBackground'

// ── Social icons ────────────────────────────────────────────
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
  href: string
  title: string
  external?: boolean
  children: React.ReactNode
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

export function Hero() {
  const links = profile.links ?? {}

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        height: '100svh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <HeroBackground />
      <div
        className="container hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left: name + icons + bio ── */}
        <div>
          <div className="display" style={{ marginBottom: '-4px' }}>Chenyu</div>
          <div className="display" style={{ marginBottom: '18px' }}>Pan</div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
            {links.email    && <IconLink href={`mailto:${links.email}`}    title="Email"    external={false}><MailIcon /></IconLink>}

            {links.linkedin && <IconLink href={links.linkedin}             title="LinkedIn"             ><LinkedInIcon /></IconLink>}
            {links.resume
              ? <IconLink href={links.resume} title="Resume" external={false}><ResumeIcon /></IconLink>
              : <span style={{ color: 'var(--fg-2)', display: 'flex' }}><ResumeIcon /></span>
            }
          </div>

          <p style={{ fontSize: '13px', color: 'var(--fg-2)', lineHeight: 1.85, maxWidth: '340px', whiteSpace: 'pre-line' }}>
            {profile.bio}
          </p>
        </div>

        {/* ── Right: focus + education / now + previous ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

          {/* Box 1: focus (top) + education */}
          <div className="hero-card-box">
            <div className="hero-card-divider" style={{ padding: '10px 20px' }}>
              <div className="label" style={{ marginBottom: '3px', color: 'var(--fg-2)' }}>Focus</div>
              <div style={{ fontSize: '12px', color: 'var(--fg-2)' }}>{profile.work.focus}</div>
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '15px 20px' }}>
              <LogoBox item={profile.education} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--fg)', marginBottom: '2px' }}>
                  {profile.education.name}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 400, color: 'var(--fg-2)', marginLeft: '8px' }}>
                    {profile.education.year}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-2)', letterSpacing: '0.05em' }}>
                  {profile.education.detail}
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: now + previous */}
          <div className="hero-card-box">
            <div className={profile.previous?.length ? 'hero-card-divider' : undefined} style={{ padding: '15px 20px' }}>
              <div className="label" style={{ marginBottom: '10px', color: 'var(--accent)' }}>Now</div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <LogoBox item={profile.work} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--fg)', marginBottom: '3px' }}>
                    {profile.work.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-2)', letterSpacing: '0.05em' }}>{profile.work.role}</div>
                </div>
              </div>
            </div>
            {profile.previous && profile.previous.length > 0 && (
              <div style={{ padding: '13px 20px' }}>
                <div className="label" style={{ marginBottom: '8px', color: 'var(--fg-2)' }}>Previous</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {profile.previous.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg)' }}>{p.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-2)', letterSpacing: '0.05em' }}>· {p.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

function LogoBox({ item }: { item: { logo?: string } }) {
  return (
    <div style={{
      width: '52px',
      height: '52px',
      flexShrink: 0,
      border: '1px solid var(--border-2)',
      background: 'var(--bg-3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {item.logo && (
        <img src={item.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </div>
  )
}

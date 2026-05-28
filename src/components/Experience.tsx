import { experience, profile } from '../data'

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
          marginBottom: '16px',
        }}>
          <div className="label">01 / Experience</div>
          <a
            href={profile.links?.resume ?? '#'}
            className="label"
            style={{ color: 'var(--fg-2)', borderBottom: '1px solid var(--border-2)', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--fg)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-2)'; e.currentTarget.style.borderColor = 'var(--border-2)' }}
          >
            Resume ↗
          </a>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '24px' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '3px',
              top: '4px',
              bottom: '4px',
              width: '1px',
              background: 'var(--border-2)',
            }}
          />

          {experience.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                marginBottom: i < experience.length - 1 ? '8px' : 0,
                position: 'relative',
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-21px',
                  top: '22px',
                  width: '7px',
                  height: '7px',
                  background: item.current ? 'var(--accent)' : 'var(--bg)',
                  border: `1px solid ${item.current ? 'var(--accent)' : 'var(--fg-3)'}`,
                  flexShrink: 0,
                  zIndex: 1,
                }}
              />

              {/* Entry box */}
              <div
                className="experience-entry"
                style={{
                  flex: 1,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-2)',
                  display: 'flex',
                  overflow: 'hidden',
                }}
              >
                {/* Image column — 25% width, 16:10 aspect ratio */}
                <div className="experience-image-col" style={{
                  width: '25%',
                  aspectRatio: '16/10',
                  flexShrink: 0,
                  position: 'relative',
                  background: 'var(--bg-3)',
                  borderRight: '1px solid var(--border)',
                  overflow: 'hidden',
                }}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.company}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '26px', fontWeight: 400, color: 'var(--fg)', marginBottom: '4px', lineHeight: 1.1 }}>{item.role}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-2)', letterSpacing: '0.05em' }}>
                          {item.company}{item.location ? ` · ${item.location}` : ''}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-3)', letterSpacing: '0.05em', whiteSpace: 'nowrap', paddingTop: '3px', flexShrink: 0 }}>
                        {item.period}
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--fg-2)', lineHeight: 1.8 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

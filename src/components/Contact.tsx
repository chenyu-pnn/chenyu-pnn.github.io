import { lastUpdated } from '../data'

const LINKS = [
  { label: 'Email',    value: 'chenyu.pan1009@gmail.com',    href: 'mailto:chenyu.pan1009@gmail.com' },
  { label: 'GitHub',   value: 'github.com/username',         href: 'https://github.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/username',    href: 'https://linkedin.com' },
]

export function Contact() {
  return (
    <section id="contact" style={{ padding: '32px 0 64px' }}>
      <div className="container">
        <div className="rule" />
        <div className="label" style={{ marginTop: '16px', marginBottom: '14px' }}>03 / Contact</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}>
          {/* Heading */}
          <div style={{ background: 'var(--bg-2)', padding: '36px 32px', display: 'flex', alignItems: 'center' }}>
            <h2 className="heading">
              Let's build<br />something.
            </h2>
          </div>

          {/* Links */}
          <div style={{ display: 'grid', gap: '1px', background: 'var(--border)' }}>
            {LINKS.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 22px',
                  background: 'var(--bg-2)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-3)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-2)')}
              >
                <div>
                  <div className="label" style={{ marginBottom: '3px' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--fg)' }}>{value}</div>
                </div>
                <span style={{ fontSize: '16px', color: 'var(--fg-3)', transform: 'rotate(-45deg)', display: 'inline-block' }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="label" style={{ marginTop: '14px', color: 'var(--fg-3)' }}>
          Updated {lastUpdated}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'

const NAV_LINKS = ['Experience', 'Projects', 'Contact'] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        borderBottom: `1px solid ${scrolled ? 'var(--border-2)' : 'transparent'}`,
        background: scrolled ? 'rgba(9, 9, 9, 0.80)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'border-color 0.3s, background 0.3s',
        zIndex: 100,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--fg)',
          letterSpacing: '0.03em',
        }}
      >
        CP
      </span>

      <div style={{ display: 'flex', gap: '36px' }}>
        {NAV_LINKS.map((link) => (
          <NavLink key={link} href={`#${link.toLowerCase()}`}>
            {link}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--fg-2)',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-2)')}
    >
      {children}
    </a>
  )
}

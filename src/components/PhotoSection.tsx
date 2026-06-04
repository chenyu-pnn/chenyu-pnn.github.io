import { useState } from 'react'
import { photos } from '../data'
import type { Photo } from '../data'

function PhotoCard({ photo }: { photo: Photo }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="card-glow"
      style={{
        background: hovered ? 'var(--bg-2)' : 'var(--bg)',
        transition: 'background 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg-2)', position: 'relative' }}>
        <img
          src={photo.src}
          alt={photo.blurb}
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {photo.date}
        </span>
        <p style={{ fontSize: '12px', color: 'var(--fg-2)', lineHeight: 1.6 }}>
          {photo.blurb}
        </p>
      </div>
    </div>
  )
}

export function PhotoSection() {
  return (
    <section id="photos" style={{ paddingBottom: '48px' }}>
      <div className="container">
        <div style={{ marginBottom: '20px' }}>
          <div className="rule" />
          <div className="label" style={{ marginTop: '12px' }}>Photos</div>
        </div>

        {photos.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-3)' }}>
            — coming soon
          </p>
        ) : (
          <div className="photo-grid">
            {photos.map(p => <PhotoCard key={p.id} photo={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}

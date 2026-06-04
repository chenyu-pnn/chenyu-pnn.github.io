import { lazy, Suspense, useState, useRef } from 'react'
import { usePageTransition } from './TransitionOverlay'
import type { Project } from '../data'

const ProjectModel = lazy(() =>
  import('./ProjectModel').then((m) => ({ default: m.ProjectModel }))
)

export function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const { navigateTo } = usePageTransition()
  const dragRef = useRef(false)
  const mouseDownPos = useRef({ x: 0, y: 0 })

  return (
    <div
      onMouseDown={e => { dragRef.current = false; mouseDownPos.current = { x: e.clientX, y: e.clientY } }}
      onMouseMove={e => {
        const dx = e.clientX - mouseDownPos.current.x
        const dy = e.clientY - mouseDownPos.current.y
        if (Math.sqrt(dx * dx + dy * dy) > 4) dragRef.current = true
      }}
      onClick={() => { if (!dragRef.current) navigateTo(`/projects/${project.id}`) }}
      className="card-glow"
      style={{
        background: hovered ? 'var(--bg-2)' : 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        transition: 'background 0.25s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual */}
      <Suspense
        fallback={
          <div style={{ aspectRatio: '4/3', background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="label">—</span>
          </div>
        }
      >
        <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
          <ProjectModel modelUrl={project.model} modelZoom={project.modelZoom} imageUrl={project.image} title={project.title} />
        </div>
      </Suspense>

      {/* Info */}
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Year + type */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Project
          </span>
          <span className="label">{project.year}</span>
        </div>

        {/* Title — underlines on card hover */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '18px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            color: 'var(--fg)',
            textDecoration: hovered ? 'underline' : 'none',
            textUnderlineOffset: '4px',
            textDecorationColor: 'var(--fg-2)',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '12px', color: 'var(--fg-2)', lineHeight: 1.65, flex: 1 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)',
                border: '1px solid var(--border)',
                padding: '3px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

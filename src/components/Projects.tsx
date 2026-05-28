import { projects } from '../data'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <section id="projects" style={{ padding: '32px 0' }}>
      <div className="container">
        <div className="rule" />
        <div className="label" style={{ margin: '16px 0' }}>02 / Projects</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}>
          {projects.map((project) => (
            <div key={project.id} style={{ background: 'var(--bg-2)' }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

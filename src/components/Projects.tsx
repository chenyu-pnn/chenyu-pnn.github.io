import { projects } from '../data'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <section id="projects" style={{ padding: '32px 0' }}>
      <div className="container">
        <div className="rule" />
        <div className="label" style={{ marginTop: '16px', marginBottom: '32px' }}>02 / Projects</div>

        <div className="section-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

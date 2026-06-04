import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Background } from './components/Background'
import { LeftTimeline } from './components/LeftTimeline'
import { ThemeToggle } from './components/ThemeToggle'
import { Hero } from './components/Hero'
import { WorkSection } from './components/WorkSection'
import { PhotoSection } from './components/PhotoSection'
import { ProjectPage } from './components/ProjectPage'
import { TransitionProvider } from './components/TransitionOverlay'
import { useScrollAnimations } from './hooks/useScrollAnimations'

gsap.registerPlugin(ScrollTrigger)

function MainPage() {
  useScrollAnimations()
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <LeftTimeline />
      <main>
        <Hero />
        <WorkSection />
        <PhotoSection />
      </main>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const isProjectPage = location.pathname.startsWith('/projects/')
  return (
    <>
      {!isProjectPage && <Background />}
      <ThemeToggle />
      <TransitionProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </TransitionProvider>
    </>
  )
}

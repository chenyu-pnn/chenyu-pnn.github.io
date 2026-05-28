import { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'

type Phase = 'idle' | 'cover' | 'uncover'

interface TransitionContextValue {
  navigateTo: (path: string) => void
  navigateBack: () => void
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
  navigateBack: () => {},
})

export function usePageTransition() {
  return useContext(TransitionContext)
}


export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [phase, setPhase] = useState<Phase>('idle')
  const pendingRef = useRef<(() => void) | null>(null)
  const didNavigateRef = useRef(false)
  const savedScrollRef = useRef<number | null>(null)
  const isBackRef = useRef(false)

  const trigger = useCallback((action: () => void, isBack: boolean) => {
    if (!isBack) savedScrollRef.current = null
    isBackRef.current = isBack
    pendingRef.current = action
    setPhase('cover')
  }, [])

  const navigateTo = useCallback(
    (path: string) => {
      savedScrollRef.current = window.scrollY
      trigger(() => navigate(path), false)
    },
    [navigate, trigger]
  )
  const navigateBack = useCallback(() => {
    trigger(() => navigate(-1), true)
  }, [navigate, trigger])

  const handleAnimationEnd = useCallback(() => {
    if (phase === 'cover') {
      if (!isBackRef.current) {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      pendingRef.current?.()
      pendingRef.current = null
      didNavigateRef.current = true
    } else if (phase === 'uncover') {
      setPhase('idle')
    }
  }, [phase])

  useEffect(() => {
    if (didNavigateRef.current) {
      didNavigateRef.current = false
      if (isBackRef.current) {
        setTimeout(() => {
          const el = document.getElementById('projects')
          if (el) {
            window.scrollTo({ top: el.offsetTop, behavior: 'instant' })
            gsap.set('#experience', { y: 0, opacity: 1 })
            gsap.set('#projects', { y: 0, opacity: 1 })
          }
          setPhase('uncover')
        }, 50)
      } else {
        setPhase('uncover')
      }
    }
  }, [location.key])

  return (
    <TransitionContext.Provider value={{ navigateTo, navigateBack }}>
      {children}
      {phase !== 'idle' && (
        <>
          <div
            onAnimationEnd={handleAnimationEnd}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--bg)',
              zIndex: 10000,
              pointerEvents: phase === 'cover' ? 'all' : 'none',
              animation:
                phase === 'cover'
                  ? 'tx-cover 0.2s ease forwards'
                  : 'tx-uncover 0.3s ease forwards',
            }}
          />
          <style>{`
            @keyframes tx-cover   { from { opacity: 0 } to { opacity: 1 } }
            @keyframes tx-uncover { from { opacity: 1 } to { opacity: 0 } }
          `}</style>
        </>
      )}
    </TransitionContext.Provider>
  )
}

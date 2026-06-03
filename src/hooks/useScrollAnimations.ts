import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom 20%',
        onLeave: () =>
          gsap.to('#hero', { y: -48, opacity: 0, duration: 0.5, ease: 'power2.in' }),
        onEnterBack: () =>
          gsap.to('#hero', { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }),
      })

      gsap.set('#experience', { y: 64, opacity: 0 })
      ScrollTrigger.create({
        trigger: '#experience',
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.to('#experience', { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out' }),
      })
    })

    return () => ctx.revert()
  }, [])
}

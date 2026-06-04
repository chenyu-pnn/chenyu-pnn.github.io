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

      gsap.set('#work', { y: 64, opacity: 0 })
      ScrollTrigger.create({
        trigger: '#work',
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.to('#work', { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out' }),
      })

      gsap.set('#photos', { y: 64, opacity: 0 })
      ScrollTrigger.create({
        trigger: '#photos',
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.to('#photos', { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out' }),
      })
    })

    return () => ctx.revert()
  }, [])
}

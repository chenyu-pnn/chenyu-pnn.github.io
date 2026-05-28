import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = ['#hero', '#experience', '#projects']
      sections.forEach((id) => {
        if (id !== '#hero') gsap.set(id, { y: 64, opacity: 0 })
        ScrollTrigger.create({
          trigger: id,
          start: 'top 88%',
          end: 'bottom 12%',
          onEnter: () =>
            gsap.to(id, { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out' }),
          onLeave: () =>
            gsap.to(id, { y: -48, opacity: 0, duration: 0.5, ease: 'power2.in' }),
          onEnterBack: () =>
            gsap.to(id, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }),
          onLeaveBack: () =>
            gsap.to(id, { y: 64, opacity: 0, duration: 0.5, ease: 'power2.in' }),
        })
      })
    })

    return () => ctx.revert()
  }, [])
}

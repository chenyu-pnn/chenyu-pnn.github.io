import { useEffect, useRef } from 'react'

interface Meteor {
  x:       number
  y:       number
  vx:      number
  vy:      number
  life:    number
  maxLife: number
  tail:    number
  w:       number
}

function newMeteor(W: number, H: number): Meteor {
  const fromTop = Math.random() > 0.28
  const angle   = Math.PI / 4 + (Math.random() - 0.5) * (Math.PI / 5.5)
  const speed   = 5 + Math.random() * 8
  return {
    x:       fromTop ? Math.random() * W * 0.9 : -8,
    y:       fromTop ? -8 : Math.random() * H * 0.55,
    vx:      Math.cos(angle) * speed,
    vy:      Math.sin(angle) * speed,
    life:    0,
    maxLife: 50 + Math.random() * 65,
    tail:    55 + Math.random() * 110,
    w:       0.45 + Math.random() * 0.75,
  }
}

export function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx    = canvas.getContext('2d')!
    const pool:  Meteor[] = []
    let raf:     number
    let frame =  0

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function tick() {
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      frame++
      if (frame % 52 === 0 && pool.length < 7) {
        pool.push(newMeteor(W, H))
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const m = pool[i]
        m.x += m.vx
        m.y += m.vy
        m.life++

        if (m.life > m.maxLife) { pool.splice(i, 1); continue }

        const t     = m.life / m.maxLife
        const alpha = Math.sin(t * Math.PI) * 0.38

        const spd = Math.hypot(m.vx, m.vy)
        const tx  = m.x - (m.vx / spd) * m.tail
        const ty  = m.y - (m.vy / spd) * m.tail

        const g = ctx.createLinearGradient(tx, ty, m.x, m.y)
        g.addColorStop(0, 'rgba(255,255,255,0)')
        g.addColorStop(1, `rgba(255,255,255,${alpha})`)

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(m.x, m.y)
        ctx.strokeStyle = g
        ctx.lineWidth   = m.w
        ctx.lineCap     = 'round'
        ctx.stroke()

        // head glow
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.w * 1.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.55})`
        ctx.fill()
        ctx.restore()
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

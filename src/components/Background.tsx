import { useEffect, useRef } from 'react'

type Bundle = {
  p1:  [number, number]   // start  (fraction of viewport w/h)
  cp1: [number, number]   // bezier control 1
  cp2: [number, number]   // bezier control 2
  p2:  [number, number]   // end
  color: string
  count: number           // lines per bundle
  spread: number          // total bundle width in px
}

// Each bundle is a family of closely spaced bezier curves.
// Defined in fractions so they scale to any viewport.
const BUNDLES: Bundle[] = [
  // Rose — rises from bottom-left to upper-right
  {
    p1: [-0.05, 0.88], cp1: [0.10, 0.52], cp2: [0.42, 0.14], p2: [0.72, -0.05],
    color: '#ffb3ba', count: 28, spread: 68,
  },
  // Lavender — sweeps from top-centre to the right edge
  {
    p1: [0.30, -0.05], cp1: [0.44, 0.28], cp2: [0.76, 0.34], p2: [1.05, 0.60],
    color: '#d4b3ff', count: 24, spread: 62,
  },
  // Mint — falls from top-right to lower-centre
  {
    p1: [0.90, -0.05], cp1: [0.96, 0.32], cp2: [0.54, 0.62], p2: [0.32, 1.05],
    color: '#b3ffd9', count: 22, spread: 56,
  },
  // Peach — hugs the lower-left, short gentle arc
  {
    p1: [-0.05, 0.80], cp1: [0.18, 0.66], cp2: [0.44, 0.88], p2: [0.62, 1.05],
    color: '#ffd4b3', count: 18, spread: 48,
  },
  // Sky — short arc near upper-left corner
  {
    p1: [-0.05, 0.20], cp1: [0.10, 0.06], cp2: [0.30, 0.04], p2: [0.50, -0.05],
    color: '#b3d9ff', count: 16, spread: 44,
  },
  // Warm yellow — long diagonal cross from bottom to upper-right
  {
    p1: [0.18, 1.05], cp1: [0.40, 0.68], cp2: [0.76, 0.38], p2: [1.05, 0.12],
    color: '#fff0b3', count: 20, spread: 54,
  },
]

function drawBundle(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  b: Bundle,
) {
  // Convert fractions → pixels
  const p1:  [number, number] = [b.p1[0]  * w, b.p1[1]  * h]
  const cp1: [number, number] = [b.cp1[0] * w, b.cp1[1] * h]
  const cp2: [number, number] = [b.cp2[0] * w, b.cp2[1] * h]
  const p2:  [number, number] = [b.p2[0]  * w, b.p2[1]  * h]

  // Unit normal perpendicular to the p1→p2 direction
  const dx = p2[0] - p1[0]
  const dy = p2[1] - p1[1]
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const nx = -dy / len
  const ny =  dx / len

  ctx.lineCap = 'round'
  ctx.lineWidth = 1.1

  for (let i = 0; i < b.count; i++) {
    const t   = (i / (b.count - 1) - 0.5) * b.spread   // signed offset in px
    const ox  = nx * t
    const oy  = ny * t

    // Alpha bell: highest at centre, tapering to edges
    const rel   = Math.abs(i / (b.count - 1) - 0.5) * 2  // 0 = centre, 1 = edge
    const alpha = 0.72 * (1 - rel * 0.68)

    ctx.beginPath()
    ctx.moveTo(p1[0] + ox,        p1[1] + oy)
    ctx.bezierCurveTo(
      cp1[0] + ox * 0.65,  cp1[1] + oy * 0.65,
      cp2[0] + ox * 0.65,  cp2[1] + oy * 0.65,
      p2[0]  + ox,         p2[1]  + oy,
    )
    ctx.strokeStyle = b.color
    ctx.globalAlpha = alpha
    ctx.stroke()
  }
}

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width  = w
      canvas.height = h

      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = 1

      for (const bundle of BUNDLES) drawBundle(ctx, w, h, bundle)

      ctx.globalAlpha = 1
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.78,
      }}
    />
  )
}

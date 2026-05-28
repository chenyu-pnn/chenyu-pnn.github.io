import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Component, Suspense, useState } from 'react'
import type { ReactNode } from 'react'
import * as THREE from 'three'

class ModelErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { error: boolean }> {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  componentDidCatch(err: unknown) { console.error('[ProjectModel]', err) }
  render() { return this.state.error ? this.props.fallback : this.props.children }
}

function GLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)

  const centered = (() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    scene.position.sub(center)
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
    return scene
  })()

  return <primitive object={centered} />
}

interface ProjectModelProps {
  modelUrl?: string
  modelZoom?: number
  imageUrl?: string
  title?: string
}

export function ProjectModel({ modelUrl, modelZoom = 14, imageUrl, title }: ProjectModelProps) {
  const [hovered, setHovered] = useState(false)

  if (!modelUrl && !imageUrl) {
    return (
      <div
        className="canvas-wrap"
        style={{ aspectRatio: '4 / 3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
          MODEL NOT FOUND
        </span>
      </div>
    )
  }

  if (!modelUrl && imageUrl) {
    return (
      <div
        className="canvas-wrap"
        style={{ aspectRatio: '4 / 3' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={imageUrl}
          alt={title || ''}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>
    )
  }

  return (
    <div
      className="canvas-wrap"
      style={{ aspectRatio: '4 / 3' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtle corner label */}
      <div
        className="label"
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '16px',
          zIndex: 1,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        Drag to rotate
      </div>

      <ModelErrorBoundary fallback={
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.1em' }}>MODEL ERROR</span>
        </div>
      }>
        <Canvas
          shadows
          camera={{ position: [modelZoom * 0.35, modelZoom * 0.55, modelZoom * 0.8], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.18} />
          {/* Key: warm upper-left, casts shadows */}
          <directionalLight
            position={[-5, 8, 3]}
            intensity={2.2}
            color="#fff5e8"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
          />
          {/* Fill: cool right-back, no shadows so it doesn't fight the key */}
          <directionalLight position={[5, 2, -3]} intensity={0.5} color="#b8ccff" />
          {/* Rim: purple from behind for edge pop */}
          <pointLight position={[0, -2, -7]} intensity={2.5} color="#7c5cfc" distance={22} />

          <Suspense fallback={null}>
            {modelUrl && <GLTFModel url={modelUrl} />}
          </Suspense>

          <OrbitControls
            autoRotate={!hovered}
            autoRotateSpeed={0.7}
            enableZoom={true}
            zoomSpeed={0.8}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(3 * Math.PI) / 4}
          />
        </Canvas>
      </ModelErrorBoundary>
    </div>
  )
}

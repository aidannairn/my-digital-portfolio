import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload, PerformanceMonitor } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

const Stars = props => {
  const starsRef = useRef()

  const [dpr, setDpr] = useState(1)

  const [sphere] = useState(() => random.inSphere(new Float32Array(4500), { radius: 1.2 }))

  useFrame((state, delta) => {
    starsRef.current.rotation.x -= delta / 10
    starsRef.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={starsRef}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color='#F272C8'
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => {
  const [dpr, setDpr] = useState(1)
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={dpr}
      >
        <PerformanceMonitor
          onChange={({ factor }) => Math.round((0.5 + 1.5 * factor) * 2) / 2}
          flipflops={3}
          onFallback={() => setDpr(1)}
        >
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
          <Preload all />
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}

export default StarsCanvas
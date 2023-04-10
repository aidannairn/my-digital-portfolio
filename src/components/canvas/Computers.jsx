import { useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, PerformanceMonitor } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('/desktop_pc/scene.gltf')
  
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <pointLight intensity={2} />
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        // shawdow-mapSize={1024}
      />
      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -1.5, -1] : [0, -1.5, -1.15]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [dpr, setDpr] = useState(2)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = e => setIsMobile(e.matches)

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={dpr}
      camera={{
        position: [20, 3, 5],
        fov: 25,
        zoom: isMobile ? 2 : 1.5
      }}
      gl={{ preserveDrawingBuffer: true }}
      className={`
        cursor-grab
        active:cursor-grabbing
        z-0
        ${isMobile ? '' : '-mt-[7.5rem]'}
      `}
      style={{ maxHeight: `${isMobile ? 'calc(100vw - 10%)' : 'calc(100vw - 70%)'}`}}
    >
      {/* -mt-[17.5rem]
      sm:-mt-[27.5rem] */}
      <PerformanceMonitor
        onChange={({ factor }) => Math.round((0.5 + 1.5 * factor) * 2) / 2}
        flipflops={3}
        onFallback={() => setDpr(1)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
          <Computers isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </PerformanceMonitor>
    </Canvas>
  )
}

export default ComputerCanvas
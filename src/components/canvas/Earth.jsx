import { useState, Suspense } from "react"
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, PerformanceMonitor } from "@react-three/drei"

import CanvasLoader from '../Loader'

const Earth = () => {
  const earth = useGLTF('/planet/scene.gltf')

  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  )
}

const EarthCanvas = () => {
  const [dpr, setDpr] = useState(2)
  
  return (
    <Canvas
      shadows
      dpr={dpr}
      frameloop='demand'
      gl={{ preserveDrawingBuffer: true }}
      camera={{ 
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6]
      }}
    >
      <PerformanceMonitor
        onChange={({ factor }) => Math.round((0.5 + 1.5 * factor) * 2) / 2}
        flipflops={3}
        onFallback={() => setDpr(1)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            enableZoom={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
          <Earth />
          <Preload all />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  )
}

export default EarthCanvas
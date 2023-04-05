import { useState, Suspense } from 'react'
import { Decal, Float, Preload, useTexture } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Ball = ({ gridDimensions: gd, icon, position, scale }) => {
  const setFloatingRange = () => {
    // Set the maximum distance from the center
    const max = Math.ceil(gd.x + gd.y)
    
    const absTotal = position.reduce((prev, curr) =>
      prev + Math.abs(curr), 0)
      
    const rangeVal = ((max - absTotal) * (scale * 0.01)) 
    const floatRange = [-rangeVal, rangeVal]
    return floatRange
  }

  const [ decal ] = useTexture([ icon ])
  
  const [isHovered, setIsHovered] = useState(false)
  const [floatRange, setFloatRange] = useState(setFloatingRange)
  
  return (
    <>
      <Float 
        // speed={0} // default 1.75
        speed={(Math.random() * (1.8 - 1.7) + 1.7).toFixed(2)}
        rotationIntensity={1}
        floatIntensity={1}
        floatingRange={floatRange} // default [-0.1, 0.1]
      >
        <mesh
          castShadow
          receiveShadow
          position={position}
          scale={isHovered ? 1.25 * scale : scale}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color='#FFF8EB'
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[ 2 * Math.PI, 0, 6.25 ]}
            scale={1.25}
            flatShading
            map={decal}
          />
        </mesh>
      </Float>
    </>
  )
}

const BallCanvas = props => {
  return (
    <>
      <Suspense fallback={<CanvasLoader />}>
        <Ball {...props} />
      </Suspense>
      <Preload all />
    </>
  )
}

export default BallCanvas
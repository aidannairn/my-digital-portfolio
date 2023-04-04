import { useState, Suspense } from 'react'
import { Decal, Float, Preload, useTexture, PerspectiveCamera } from '@react-three/drei'

import CanvasLoader from '../Loader'


const Ball = props => {
  const setFloatingRange = () => {
    const { position, gridDimensions: gd } = props
    const max = Math.ceil(gd.x + gd.y)
    
    const absTotal = position.reduce((prev, curr) =>
      prev + Math.abs(curr), 0)
      
    const rangeVal = (max - absTotal) * 0.02
    const floatRange = [-rangeVal, rangeVal]
    return floatRange
  }

  const [ decal ] = useTexture([ props.icon ])
  
  const [isHovered, setIsHovered] = useState(false)
  const [floatRange, setFloatRange] = useState(setFloatingRange)
  
  return (
    <>
      <Float 
        // speed={1.75}
        speed={(Math.random() * (1.8 - 1.7) + 1.7).toFixed(2)}
        rotationIntensity={1}
        floatIntensity={1}
        // floatingRange={[-0.002, 0.002]} 
        floatingRange={floatRange} 
      >
        <mesh
          castShadow
          receiveShadow
          position={props.position}
          scale={isHovered ? 1.25 * props.scale : props.scale}
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
      {/* <PerspectiveCamera
        makeDefault
        fov={5}
        position={[0, 0, 80]}
        rotation={[0, 0, 0]}
      /> */}
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
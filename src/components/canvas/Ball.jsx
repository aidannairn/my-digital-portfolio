import { Suspense } from 'react'
import { Decal, Float, Preload, useTexture, PerspectiveCamera } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Ball = props => {
  const [ decal ] = useTexture([ props.icon ])
  
  return (
    <>
      <Float speed={1.75} rotationIntensity={1} floatIntensity={0.5} >
        {/* <ambientLight intensity={0.0025} /> */}
        <directionalLight
          position={[
            props.position[0],
            props.position[1],
            1
          ]}
          intensity={0.075}
        />
        <spotLight
          position={props.position}
          angle={0.5}
          penumbra={1}
          intensity={0.2}
        />
        <pointLight
          position={[
            props.position[0],
            props.position[1],
            -10
          ]}
        />
        <mesh
          castShadow
          receiveShadow
          scale={0.75}
          {...props}
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
      <PerspectiveCamera
        makeDefault
        fov={5}
        position={[0, 0, 80]}
        rotation={[0, 0, 0]}
      />
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
import { forwardRef, useEffect, useState, memo } from 'react'
import { Decal, Float, useTexture } from '@react-three/drei'

import defaultTexture from '../../assets/blank_image.png'

const TechnologyCard = forwardRef(({
  gridDimensions: gd,
  index,
  handleTechItemClick,
  name,
  imageURL,
  position,
  scale
}, ref) => {
  /*
    - The default behavior of floatingRange is for objects to have less range the closer they are to the center.
    - setFloatingRange is designed to make each object have the same amount of floatingRange regardless of their position.
  */
  const getFloatingRange = () => {
    // Set the maximum distance from the center.
    const maxDist= Math.ceil(gd.x + gd.y)
    
    // Get object's distance from center.
    const distFromCenter = position.reduce((prev, curr) =>
      prev + Math.abs(curr), 0)

    /* 
      Divide maxDist by distFromCenter.
      - This value will be used to reduce the amount of floating range the further they are positioned from the center.
      - The further from the center; The lower the value will be.
      - If the object has a position of [0, 0, 0], zero will divide into maxDist "Infinity" times.
    */
    const maxDivideDFC = maxDist / distFromCenter

    const rangeVal = maxDivideDFC !== Infinity ? maxDivideDFC * 0.01 : 0.1

    const floatRange = [-rangeVal, rangeVal]
    return floatRange
  }

  const [ decal ] = imageURL
    ? useTexture([ imageURL ])
    : useTexture([ defaultTexture ])
  const [isHovered, setIsHovered] = useState(false)
  const [floatRange, setFloatRange] = useState(0)

  useEffect(() => { setFloatRange(getFloatingRange) }, [])
  useEffect(() => {
    if (isHovered && ref.current) {
      ref.current.title = name
      ref.current.style.cursor = 'pointer'
    } else {
      ref.current.title = ''
      ref.current.style.cursor = 'default'
    }
  }, [isHovered])

  return (
    <Float 
      speed={isHovered ? 0 : (Math.random() * (1.8 - 1.7) + 1.7).toFixed(2)}
      rotationIntensity={1}
      floatIntensity={1}
      floatingRange={floatRange} // default [-0.1, 0.1]
    >
      <mesh
        castShadow
        receiveShadow
        position={position}
        scale={isHovered ? 1.25 * scale : scale}
        onClick={() => handleTechItemClick(index)}
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
  )
})

const arePropsEqual = (prevProps, nextProps) => {
  const deepEqual = (x, y) => {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
  }

  const prev = { ...prevProps }
  delete prev.handleTechItemClick

  const next = { ...nextProps }
  delete next.handleTechItemClick

  if (deepEqual(prev, next))
    return true
  return false
}

export default memo(TechnologyCard, arePropsEqual)
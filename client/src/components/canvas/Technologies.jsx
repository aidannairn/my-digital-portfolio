import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Decal, Float, useTexture, OrthographicCamera, Html, Preload } from '@react-three/drei'
import axios from 'axios'

import { OnConfirmModal, TechDetailModal } from '../modals'
import CanvasLoader from '../Loader'

const TechItem = ({
  gridDimensions: gd,
  index,
  handleTechItemClick,
  imageURL,
  position,
  scale
}) => {
  /*
    - The default behavior of floatingRange is for objects to have less range the closer they are to the center.
    - setFloatingRange is designed to make each object have the same amount of floatingRange regardless of their position.
  */
  const setFloatingRange = () => {
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

  const [ decal ] = useTexture([ imageURL ])
  
  const [isHovered, setIsHovered] = useState(false)
  const [floatRange, setFloatRange] = useState(setFloatingRange)

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
}

const TechCanvas = ({
  technologies,
  setTechnologies,
  positions,
  canvasGridDimensions,
  scale,
  currentUserId,
  currentUserToken,
  userRequest
}) => {
  const [activeTechIndex, setActiveTechIndex] = useState(0)
  const [isTechModalExpanded, setIsTechModalExpanded] = useState(false)
  const [isDeleteModalExpanded, setIsDeleteModalExpanded] = useState(false)

  const handleTechItemClick = index => {
    setActiveTechIndex(index)
    setIsTechModalExpanded(true)
  }

  const removeATechnology = async () => {
    try {
      const res = await userRequest.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/tech/${technologies[activeTechIndex]._id}`, 
        { headers: { Authorization: `Bearer ${currentUserToken}` } }
      )

      setTechnologies(prevState => 
        prevState.filter(tech => 
          tech._id !== res.data.id
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const displayDeleteMessage = () => (
    <h2 className='my-4 font-extralight'>
      You are about to remove <span className='font-normal'>{technologies[activeTechIndex].name}</span> from your technologies.
    </h2>
  )

  return (
    <>
      { isTechModalExpanded &&
        <TechDetailModal
          modal={{
            visibility: isTechModalExpanded,
            close: () => setIsTechModalExpanded(false)
          }}
          id={technologies[activeTechIndex]._id}
          name={technologies[activeTechIndex].name}
          docs={technologies[activeTechIndex].docsURL}
          image={`${import.meta.env.VITE_MEDIA_BUCKET}/${technologies[activeTechIndex].imageURL}`}
          userIsAuthor={currentUserId === technologies[activeTechIndex].userId}
          openTechDeleteModal={() => setIsDeleteModalExpanded(true)}
        />
      }
      { isDeleteModalExpanded &&
        <OnConfirmModal
        modal={{
          visibility: isDeleteModalExpanded,
          close: () => setIsDeleteModalExpanded(false)
        }}
        message={displayDeleteMessage}
        action={removeATechnology}
      />
      }
      <Canvas>
        <ambientLight intensity={0.033} />
        <directionalLight
          position={[0, 0, 1]}
          intensity={.8}
        />
        <pointLight
          intensity={0.25}
          position={[0, 0, 0]}
        />
        {/* <axesHelper args={[5]} /> */}
        <OrthographicCamera
          makeDefault
          zoom={90}
          top={200}
          bottom={-200}
          left={200}
          right={-200}
          near={1}
          far={2000}
          position={[0, 0, 200]}
        />
        <Suspense fallback={<CanvasLoader />}>
          { positions.length === technologies.length &&
            technologies.map((technology, i) => (
              <TechItem
                key={`tech-${technology._id}`}
                index={i}
                gridDimensions={canvasGridDimensions}
                position={positions[i]}
                scale={scale}
                imageURL={`${import.meta.env.VITE_MEDIA_BUCKET}/${technology.imageURL}`}
                handleTechItemClick={handleTechItemClick}
              />
            ))
          }
        </Suspense>
        <Preload all />
      </Canvas>
    </>
  )
}

export default TechCanvas
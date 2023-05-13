import { useContext, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, Preload } from '@react-three/drei'

import { OnConfirmModal, TechDetailModal } from '../modals'
import { AlertsContext } from '../../contexts/AlertsContext'
import CanvasLoader from '../Loader'
import TechnologyCard from './TechnologyCard'

const TechCanvas = ({
  technologies,
  setTechnologies,
  positions,
  canvasGridDimensions,
  scale,
  currentUser: { userId, userToken, authRequest }
}) => {
  const canvasRef = useRef(null)
  const { addAlert } = useContext(AlertsContext)
  const [activeTechIndex, setActiveTechIndex] = useState(0)
  const [isTechModalExpanded, setIsTechModalExpanded] = useState(false)
  const [isDeleteModalExpanded, setIsDeleteModalExpanded] = useState(false)

  const handleTechItemClick = index => {
    setActiveTechIndex(index)
    setIsTechModalExpanded(true)
  }

  const removeATechnology = async () => {
    try {
      const res = await authRequest.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/tech/${technologies[activeTechIndex]._id}`, 
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      const { type, msg } = res.data.alert
      addAlert({ type, msg })

      setTechnologies(prevState => 
        prevState.filter(tech => 
          tech._id !== res.data.techId
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
          userIsAuthor={userId === technologies[activeTechIndex].userId}
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
      { !!technologies.length &&
        <Canvas ref={canvasRef} >
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
                <TechnologyCard
                  ref={canvasRef}
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
      }
    </>
  )
}

export default TechCanvas
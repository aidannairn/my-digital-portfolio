import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'

import { textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { technologies } from "../constants"
import { styles } from '../styles'
import BallCanvas from './canvas/Ball'

const Technologies = () => {
  const canvasWrapRef = useRef()
  const canvasRef = useRef()

  const [canvasColumns, setCanvasColumns] = useState(6)
  const [canvasRows, setCanvasRows] = useState(
    Math.ceil(technologies.length / canvasColumns)
  )
  const [technologyPositions, setTechnologyPositions] = useState([])

  useEffect(() => {
    const canvasWidth = canvasWrapRef.current.clientWidth
    
    let currentRow = 1
    const techPos = technologies.map((tech, index) => {
      if (index >= currentRow * canvasColumns) currentRow++
      const x = -5.5 + (
        currentRow === 1 
          ? index * 2.2
          : (index - (canvasColumns * (currentRow - 1))) * 2.2
      )
      const y = currentRow === 1 ? 2.5 : currentRow === 2 ? 0 : -2.5
      const z = 0
      return [x, y, z]
    })
    setTechnologyPositions(techPos)
  }, [canvasWrapRef])

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Some of the languages, libraries and frameworks I use</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>
      <div 
        ref={canvasWrapRef}
        className={'mt-20 w-full h-full'}
        style={{ height: `${canvasRows * 150}px` }}
      >
        {!!technologyPositions.length && 
          <Canvas
            // dpr={[1, 2]}
            // camera={{ fov: 25, position: [0, 0, 0] }}
            className='w-full'
            ref={canvasRef}
          >
            <ambientLight intensity={0.033} />
            <directionalLight
              position={[0, 0, 1]}
              intensity={.8}
            />
            <pointLight
              intensity={0.25}
              position={[0, 0, 0]}
            />
          {
            technologies.map((technology, i) => {
              return (
                <BallCanvas
                  key={`ball-${i}`}
                  position={technologyPositions[i]}
                  icon={technology.icon}
                />

              )
            })
          }
        </Canvas>}
      </div>
    </>
  )
}



export default SectionWrapper(Technologies, 'technologies')
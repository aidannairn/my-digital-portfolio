import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'

import { textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { technologies } from "../constants"
import { styles } from '../styles'
import BallCanvas from './canvas/Ball'

const Technologies = () => {
  const canvasWrapRef = useRef()
  const canvasRef = useRef()

  const [canvasColumns, setCanvasColumns] = useState(5)
  const [canvasRows, setCanvasRows] = useState(
    Math.ceil(technologies.length / canvasColumns)
  )
  const [canvasDimensions, setCanvasDimensions] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(0.5)
  const [technologyPositions, setTechnologyPositions] = useState([])

  useEffect(() => {
    const canvasWidth = canvasWrapRef.current.clientWidth
    const canvasHeight = canvasWrapRef.current.clientHeight

    setCanvasDimensions({
      x: canvasWidth / 200,
      y: canvasHeight / 200
    })
    
    let currentRow = 0
    const techPos = technologies.map((tech, index) => {
      if (index >= (currentRow + 1) * canvasColumns) currentRow++
      const x = -((canvasWidth / 200)) + (
        currentRow === 0 
          ? index * ((canvasWidth / 100) / (canvasColumns - 1))
          : (index - (canvasColumns * currentRow)) * ((canvasWidth / 100) / (canvasColumns - 1))
      )
      
      let y
      if (currentRow === 0)
        y = (canvasHeight - 50) / 200
      else if (currentRow !== canvasRows - 1)
        y = ((canvasHeight - 50) / 200) - (currentRow * (((canvasHeight - 50) / 100) / (canvasRows - 1)))
      else
        y = ((canvasHeight + 50) / 200) - (currentRow * ((canvasHeight / 100) / (canvasRows - 1)))

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
        style={{ height: `${canvasRows * 130}px` }}
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
            <axesHelper args={[5]} />
            {/* <gridHelper args={[6, 4, 0xffffff, 'white']}/> */}
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
          {
            technologies.map((technology, i) => {
              return (
                <BallCanvas
                  key={`ball-${i}`}
                  gridDimensions={canvasDimensions}
                  position={technologyPositions[i]}
                  icon={technology.icon}
                  scale={scale}
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
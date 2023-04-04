import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

import { textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { technologies } from "../constants"
import { styles } from '../styles'
import BallCanvas from './canvas/Ball'

const Technologies = () => {
  const techContainerRef = useRef()

  const [canvasPixelDimensions, setCanvasPixelDimensions] = useState({ x: 0, y: 0 })
  const [canvasGridDimensions, setCanvasGridDimensions] = useState({ x: 0, y: 0 })
  const [canvasColumns, setCanvasColumns] = useState(0)
  const [canvasRows, setCanvasRows] = useState(0)
  const [scale, setScale] = useState(0.5)
  const [technologyPositions, setTechnologyPositions] = useState([])

  useEffect(() => {
    // Get the width of the Technologies component.
    const techContainerWidth = techContainerRef.current.clientWidth

    // Determine the number of columns that can fit on the canvas where each column has a width of 150px.
    const canvasInnerWidth = Math.floor(techContainerWidth / 150) * 150
    const columns = Math.floor(canvasInnerWidth / 150)

    // Calculate the height that the canvas needs to fit all tech items.
    const canvasHeight = (technologies.length / columns) * 130

    setCanvasPixelDimensions({
      x: canvasInnerWidth,
      y: canvasHeight
    })

    setCanvasGridDimensions({
      x: canvasInnerWidth / 200,
      y: canvasHeight / 200
    })

    setCanvasColumns(columns)
    setCanvasRows(Math.ceil(technologies.length / columns))
  }, [])
  
  useEffect(() => {
    const canvasWidth = canvasPixelDimensions.x
    const canvasHeight = canvasPixelDimensions.y

    let currentRow = 0
    const techPos = technologies.map((tech, index) => {
      // Update the current row when the current item index exceeds the maximum amount of columns
      if (index >= (currentRow + 1) * canvasColumns) currentRow++
      
      // Use canvasPadding to create some space around the outer items to account for changes in position when floating animation is active.
      const canvasPadding = 75
      
      // Assign item to column.
      let gridXPosition
      if (currentRow === 0) gridXPosition = index
      else gridXPosition = index - (canvasColumns * currentRow)
      
      // Position item x distance from the left of canvas - Space evenly.
      let x = -((canvasWidth / 200))
      if (gridXPosition === 0)
        x += canvasPadding * 0.01
      else if (gridXPosition === canvasColumns - 1)
        x += gridXPosition * (((canvasWidth - canvasPadding) / 100) / ((canvasColumns) - 1))
      else
        x += (canvasPadding * 0.01) + ((((canvasWidth - (canvasPadding * 2)) / 100) / (canvasColumns - 1)) * gridXPosition)    
      
      // Position item y distance from the top of canvas - Space evenly.
      let y
      if (currentRow === 0)
        y = (canvasHeight - canvasPadding) / 200
      else if (currentRow !== canvasRows - 1)
        y = ((canvasHeight - canvasPadding) / 200) - (currentRow * (((canvasHeight - canvasPadding) / 100) / (canvasRows - 1)))
      else
        y = ((canvasHeight + canvasPadding) / 200) - (currentRow * ((canvasHeight / 100) / (canvasRows - 1)))

      // Assign the z-index to a value of 0, as we do not intend to modify the item depth.
      const z = 0
      return [x, y, z]
    })
    // Update the technologyPositions state to include each of the new positions we declared above.
    setTechnologyPositions(techPos)
  }, [canvasRows])

  return (
    <div className='technologies-container' ref={techContainerRef} >
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Some of the languages, libraries and frameworks I use</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>
      <div 
        className={`mt-20 mx-auto`}
        style={{ 
          height: `${canvasPixelDimensions.y}px`,
          width: '100%'
        }}
      >
        {!!technologyPositions.length && 
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
            <axesHelper args={[5]} />
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
                  gridDimensions={canvasGridDimensions}
                  position={technologyPositions[i]}
                  icon={technology.icon}
                  scale={scale}
                />

              )
            })
          }
        </Canvas>}
      </div>
    </div>
  )
}



export default SectionWrapper(Technologies, 'technologies')
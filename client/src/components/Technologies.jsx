import { useContext, useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

import { TechCanvas } from './canvas'
import { textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { UserContext } from '../contexts/UserContext'
import { fadeIn } from '../utils/motion'
import { FormModal } from './modals'
import formSettings from './form/data/technologies.form'
import useWindowSize from '../utils/useWindowSize'
import styles from '../styles'

const Technologies = ({ technologies, setTechnologies }) => {
  const windowWidth = useWindowSize('x')
  const techContainerRef = useRef(null)
  const [canvasPixelDimensions, setCanvasPixelDimensions] = useState({ x: 0, y: 0 })
  const [canvasGridDimensions, setCanvasGridDimensions] = useState({ x: 0, y: 0 })
  const [canvasColumns, setCanvasColumns] = useState(0)
  const [canvasRows, setCanvasRows] = useState(0)
  const [scale, setScale] = useState(0)
  const [technologyPositions, setTechnologyPositions] = useState([])
  
  useEffect(() => {
    let currentScale
    if (windowWidth <= 450) currentScale = 0.25
    else if (windowWidth <= 768) currentScale = 0.35
    else currentScale = 0.5
  
    // Get the width of the Technologies component.
    const techContainerWidth = techContainerRef.current.clientWidth
    
    // The default pixel width/height of each tech item - Multiplied by the scale.
    const techItemDimensions = {
      x: 300 * currentScale,
      y: 275 * currentScale
    }
    
    // Determine the number of columns that can fit on the canvas where each column has a width of x.
    const canvasInnerWidth = Math.floor(
      techContainerWidth / techItemDimensions.x
    ) * techItemDimensions.x
    const columns = Math.floor(canvasInnerWidth / techItemDimensions.x)

    const techLength = technologies.length

    // Calculate the height that the canvas needs to fit all tech items.
    const canvasHeight = (
      Math.ceil((techLength > columns ? techLength : columns) / columns)
    ) * techItemDimensions.y

    setCanvasPixelDimensions({
      x: canvasInnerWidth,
      y: canvasHeight
    })

    setCanvasGridDimensions({
      x: canvasInnerWidth / 200,
      y: canvasHeight / 200
    })
    setCanvasColumns(columns)
    setCanvasRows(Math.ceil(techLength / columns))
    setScale(currentScale)
  }, [windowWidth, technologies])
  
  useEffect(() => {
    if (!canvasRows && !scale) return
    const canvasWidth = canvasPixelDimensions.x
    const canvasHeight = canvasPixelDimensions.y
    let currentRow = 0
    const techPos = technologies.map((tech, index) => {
      // Update the current row when the current item index exceeds the maximum amount of columns
      if (index >= (currentRow + 1) * canvasColumns) currentRow++
      
      // Use canvasPadding to create some space around the outer items to account for changes in position when floating animation is active.
      const canvasXPadding = 200 * scale
      const canvasYPadding = 275 * scale
      
      // Assign item to column.
      let gridXPosition
      if (currentRow === 0) gridXPosition = index
      else gridXPosition = index - (canvasColumns * currentRow)
      
      // Position item x distance from the left of canvas - Space evenly.
      let x = -((canvasWidth / 200))
      if (gridXPosition === 0)
        x += canvasXPadding * 0.01
      else if (gridXPosition === canvasColumns - 1)
        x += gridXPosition * (((canvasWidth - canvasXPadding) / 100) / ((canvasColumns) - 1))
      else
        x += (canvasXPadding * 0.01) + ((((canvasWidth - (canvasXPadding * 2)) / 100) / (canvasColumns - 1)) * gridXPosition)   

      // Position item y distance from the top of canvas - Space evenly.
      let y
      if (currentRow === 0 && canvasRows === 1)
        y = 0
      else if (currentRow === 0)
        y = (canvasHeight - canvasYPadding) / 200
      else if (currentRow !== canvasRows - 1)
        y = ((canvasHeight - canvasYPadding) / 200) - (currentRow * (((canvasHeight - canvasYPadding) / 100) / (canvasRows - 1)))
      else
        y = ((canvasHeight + canvasYPadding) / 200) - (currentRow * ((canvasHeight / 100) / (canvasRows - 1)))

      // Assign the z-index to a value of 0, as we do not intend to modify the item depth.
      const z = 0
      return [x, y, z]
    })
    // Update the technologyPositions state to include each of the new positions we declared above.
    setTechnologyPositions(techPos)
  }, [canvasRows, scale, technologies])

  const formRef = useRef(null)
  const {
    user: { userId, userToken }, 
    authRequest
  } = useContext(UserContext)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleSubmit = async () => {
    const form = formRef.current.getFormState()
    const formData = new FormData()
    formData.append('image', form.logo)
    formData.append('name', form.name)
    formData.append('docsURL', form.docsURL)
  
    const res = await authRequest.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/tech/create`,
      formData,
      { 
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    setTechnologies(prevState => [...prevState, res.data.technology])
  }

  formSettings.submit = {
    action: handleSubmit,
    btnText: {
      idle: 'Add Technology',
      loading: 'Please wait...'
    }
  }

  return (
    <>
      { userId === import.meta.env.VITE_INITIAL_USER_ID &&
        <FormModal
          ref={formRef}
          modal={{
            visibility: isModalVisible,
            close: () => setIsModalVisible(false)
          }}
          {...formSettings}
        />
      }
      <div className='sm:-mx-16 -mx-6' ref={techContainerRef} >
        <motion.div
          variants={textVariant()}
          className='sm:px-16 px-6'
        >
          <p className={styles.sectionSubText}>Some of the languages, libraries, frameworks and packages I use</p>
          <h2 className={styles.sectionHeadText}>Technologies.</h2>
        </motion.div>
        { userId === import.meta.env.VITE_INITIAL_USER_ID &&
          <motion.div
            variants={fadeIn('', '', 1, 1)}
            className='flex gap-5 mt-5 sm:px-16 px-6'
          >
            <div className='green-blue-gradient hover:green-blue-gradient--hover rounded-lg p-px'>
              <button className='bg-primary hover:bg-tertiary rounded-lg p-2' onClick={() => setIsModalVisible(true)}>
                Add A Technology
              </button>
            </div>
          </motion.div>
        }
        { !!technologies?.length &&
          <motion.div 
            variants={fadeIn('', '', 1, 1)}
            className={`mt-10 mx-auto`}
            style={{ 
              height: `${canvasPixelDimensions.y}px`,
              width: '100%'
            }}
            >
            <TechCanvas
              technologies={technologies}
              setTechnologies={setTechnologies}
              positions={technologyPositions}
              canvasGridDimensions={canvasGridDimensions}
              scale={scale}
              currentUser={{ userId, userToken, authRequest }}
            />
          </motion.div>
        }
      </div>
    </>
  )
}



export default SectionWrapper(Technologies, 'technologies')
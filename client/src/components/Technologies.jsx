import { useContext, useEffect, useLayoutEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

import { BallCanvas } from './canvas'
import { textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { technologies } from "../constants"
import { styles } from '../styles'
import { UserContext } from '../contexts/UserContext'
import { fadeIn } from '../utils/motion'
import useWindowSize from '../utils/useWindowSize'
import Form from './form/Form'
import Modal from '../hoc/Modal'

const Technologies = () => {
  const windowWidth = useWindowSize('x')

  const techContainerRef = useRef(null)

  const [canvasPixelDimensions, setCanvasPixelDimensions] = useState({ x: 0, y: 0 })
  const [canvasGridDimensions, setCanvasGridDimensions] = useState({ x: 0, y: 0 })
  const [canvasColumns, setCanvasColumns] = useState(0)
  const [canvasRows, setCanvasRows] = useState(0)
  const [scale, setScale] = useState(1)
  const [technologyPositions, setTechnologyPositions] = useState([])
  
  useEffect(() => {
    if (windowWidth <= 450) setScale(0.25)
    else if (windowWidth <= 768) setScale(0.35)
    else setScale(0.5)
  }, [windowWidth])

  useLayoutEffect(() => {
    // Get the width of the Technologies component.
    const techContainerWidth = techContainerRef.current.clientWidth

    // The default pixel width/height of each tech item - Multiplied by the scale.
    const techItemDimensions = {
      x: 300 * scale,
      y: 300 * scale
    }

    // Determine the number of columns that can fit on the canvas where each column has a width of 150px.
    const canvasInnerWidth = Math.floor(techContainerWidth / techItemDimensions.x) * techItemDimensions.x
    const columns = Math.floor(canvasInnerWidth / techItemDimensions.x)

    // Calculate the height that the canvas needs to fit all tech items.
    const canvasHeight = (technologies.length / columns) * techItemDimensions.y

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
  }, [scale, windowWidth])
  
  useEffect(() => {
    const canvasWidth = canvasPixelDimensions.x
    const canvasHeight = canvasPixelDimensions.y

    let currentRow = 0
    const techPos = technologies.map((tech, index) => {
      // Update the current row when the current item index exceeds the maximum amount of columns
      if (index >= (currentRow + 1) * canvasColumns) currentRow++
      
      // Use canvasPadding to create some space around the outer items to account for changes in position when floating animation is active.
      const canvasPadding = 200 * scale
      
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

  const formRef = useRef(null)
  const { user: { id: userId } } = useContext(UserContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const form = formRef.current.getFormState()
      setLoading(true)

      const formData = new FormData()
      formData.append('image', form.logo)
      formData.append('name', form.name)
      formData.append('docsURL', form.docsURL)
      formData.append('userId', userId)
    
      await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/tech/create`,
        formData,
        { 
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const formSettings = {
    title: 'Add A Technology',
    subtitle: "List some of the technologies you're confident with",
    inputGroups: [
      {
        inputs: [
          {
            component: 'LabelTextInput',
            properties: {
              label: 'Name',
              name: 'name',
              placeholder: 'The name of the technology',
              required: true
            }
          },
          {
            component: 'LabelImageInput',
            properties: {
              label: 'Logo',
              name: 'logo',
              required: true
            }
          },
          {
            component: 'LabelTextInput',
            properties: {
              label: 'Documentation Link',
              name: 'docsURL',
              placeholder: "Link to this technology's documentation",
            }
          }
        ]
      }
    ],
    submit: {
      action: handleSubmit,
      text: loading ? 'Submitting Technology...' : 'Submit Technology'
    }
  }

  const FormModal = Modal(Form)

  return (
    <>
      <FormModal
        ref={formRef}
        modal={{
          visibility: isModalVisible,
          close: () => setIsModalVisible(false)
        }}
        {...formSettings}
      />
      <div className='sm:-mx-16 -mx-6' ref={techContainerRef} >
        <motion.div
          variants={textVariant()}
          className='sm:px-16 px-6'
        >
          <p className={styles.sectionSubText}>Some of the languages, libraries, frameworks and packages I use</p>
          <h2 className={styles.sectionHeadText}>Technologies.</h2>
        </motion.div>
        <motion.div
          variants={fadeIn('', '', 1, 1)}
          className='flex gap-5 mt-5 sm:px-16 px-6'
        >
          <div className='green-blue-gradient hover:green-blue-gradient--hover rounded-lg p-px'>
            <button className='bg-primary hover:bg-tertiary rounded-lg p-2' onClick={() => setIsModalVisible(true)}>Add Technology</button>
          </div>
        </motion.div>
        <div 
          className={`mt-10 mx-auto`}
          style={{ 
            height: `${canvasPixelDimensions.y}px`,
            width: '100%'
          }}
        >
          <BallCanvas
            technologies={technologies}
            positions={technologyPositions}
            canvasGridDimensions={canvasGridDimensions}
            scale={scale}
          />
        </div>
      </div>
    </>
  )
}



export default SectionWrapper(Technologies, 'technologies')
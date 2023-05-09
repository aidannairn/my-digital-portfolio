import { useContext, useEffect, useRef, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { motion } from 'framer-motion'

import { sort } from '../utils/sort'
import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { UserContext } from '../contexts/UserContext'
import { ExpandedImageModal, FormModal, OnConfirmModal } from './modals'
import formSettings from './form/data/experiences.form'

import 'react-vertical-timeline-component/style.min.css'

const ExperienceCard = ({
  _id,
  provider,
  qualification,
  certificateURL,
  logoURL,
  logoBgHex,
  dateFrom: timestampFrom,
  dateTo: timestampTo,
  bullets,
  userId: authorId,
  currentUser: { userId, userToken, authRequest },
  setExperiences
}) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [isDeleteModalExpanded, setIsDeleteModalExpanded] = useState(false)

  const getDateFromTimeStamp = (timestamp, format) =>
    new Date(timestamp).toLocaleDateString('en-NZ', format)
  
  const dateOptions = { month: 'short', year: 'numeric' }
  const dateFrom = getDateFromTimeStamp(timestampFrom, dateOptions)
  const dateTo = timestampTo
    ? getDateFromTimeStamp(timestampTo, dateOptions)
    : 'present'

  const removeAnExperience = async () => {
    try {
      const res = await authRequest.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/education/${_id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      setExperiences(prevState => 
        prevState.filter(experience => 
          experience._id !== res.data.id
        )
      )
    } catch (error) {
      console.error(error)
    }
  }
  
  const mediaBucket = import.meta.env.VITE_MEDIA_BUCKET

  const displayDeleteMessage = () => (
    <h2 className='my-4 font-extralight'>
      You are about to remove <span className='italic'>{qualification}</span> at <span className='font-normal'>{provider}</span> from your learning experiences.
    </h2>
  )

  return (
  <>
    { isImageExpanded && certificateURL &&
      <ExpandedImageModal
        modal={{
          visibility: isImageExpanded,
          close: () => setIsImageExpanded(false)
        }}
        imageURL={`${mediaBucket}/${certificateURL}`}
        imageAlt={`${qualification} certificate`}
        noScroll={true}
      />
    }
    { authorId === userId && 
      isDeleteModalExpanded &&
      <OnConfirmModal
        modal={{
          visibility: isDeleteModalExpanded,
          close: () => setIsDeleteModalExpanded(false)
        }}
        message={displayDeleteMessage}
        action={removeAnExperience}
      />
    }
    { authorId === userId &&
      <div className='relative z-20'>
        <div className='p-px'>
          <button
            className='absolute right-0 top-0 border-white hover:border-[#8c0505] rounded hover:text-[#8c0505]'
            onClick={() => setIsDeleteModalExpanded(true)}
          >
            <span className='font-light border-inherit border-r-[1.5px] pr-2 mr-2'>Remove</span>
            <i className='fa fa-trash-o text-lg' aria-hidden='true'></i>
          </button>
        </div>
      </div>
    }
    <VerticalTimelineElement
      contentStyle={{ background: '#00143a', color: '#FFF' }}
      contentArrowStyle={{ borderRight: '7px solid #232631' }}
      date={dateTo ? `${dateFrom} - ${dateTo || 'present'}` : null}
      iconStyle={{ background: logoBgHex || 'rgb(0, 20, 58)' }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          { logoURL
            ? <img
              src={`${mediaBucket}/${logoURL}`}
              alt={`${provider} logo`}
              className='w-[60%] h-[60%] object-contain'
            />
            : <h3 className='text-2xl'>{provider.charAt(0)}</h3>
          }
          
        </div>
      }
    >
      <div>
        <h3 className='text-white whitespace-pre-line text-[24px] font-bold'>{qualification}</h3>
        <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>{provider}</p>
      </div>
      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {bullets.map((point, i) => (
          <li
            key={`experience-point-${i}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
      { certificateURL &&
        <img
          className='mt-5 w-full sm:max-w-[200px] cursor-pointer'
          src={`${mediaBucket}/${certificateURL}`}
          alt={`${qualification} certificate`}
          onClick={() => setIsImageExpanded(true)}
        />
      }
    </VerticalTimelineElement>
  </>
)}

const Experience = ({ experiences, setExperiences }) => {
  const formRef = useRef(null)
  const { user: { userId, userToken }, authRequest } = useContext(UserContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [sortedExperiences, setSortedExperiences] = useState([])

  useEffect(() => {
    const incompleteExperiences = []
    const completeExperiences = []
    
    experiences.map(experience => {
      if (!experience.dateTo) incompleteExperiences.push(experience)
      else completeExperiences.push(experience)
    })

    const incompleteSorted = sort([...incompleteExperiences], 'dateFrom')
    const completeSorted = sort([...completeExperiences], '-dateFrom', '-dateTo')

    setSortedExperiences([...incompleteSorted, ...completeSorted])
  }, [experiences])
  
  const handleSubmit = async () => {
    const form = formRef.current.getFormState()
    const bullets = await form.bullets.map(bullet => bullet.skill)
    const formData = new FormData()
    formData.append('provider', form.provider)
    formData.append('logo', form.logo)
    formData.append('qualification', form.qualification)
    formData.append('certificate', form.certificate)
    formData.append('dateFrom', form.dateFrom)
    formData.append('dateTo', form.activelyLearning ? '' : form.dateTo)
    formData.append('bullets', JSON.stringify(bullets))
    formData.append('userId', userId)
  
    const res = await authRequest.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/education/create`,
      formData,
      { 
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    setExperiences(prevState => [...prevState, res.data.experience])
  }  

  formSettings.submit = {
    action: handleSubmit,
    btnText: {
      idle: 'Add Experience',
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
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Experience.</h2>
      </motion.div>
      { userId === import.meta.env.VITE_INITIAL_USER_ID &&
        <motion.div
          variants={fadeIn('', '', 1, 1)}
          className='flex gap-5 mt-5'
        >
          <div className='green-blue-gradient hover:green-blue-gradient--hover rounded-lg p-px'>
            <button className='bg-primary hover:bg-tertiary rounded-lg p-2' onClick={() => setIsModalVisible(true)}>
              Add An Experience
            </button>
          </div>
        </motion.div>
      }
      <motion.div 
        variants={fadeIn('', '', 1, 1)}
        className='mt-20 flex flex-col'
      >
        <VerticalTimeline>
          {sortedExperiences.map((experience, i) => (
            <ExperienceCard
            key={i}
            currentUser={{ userId, userToken, authRequest }}
            setExperiences={setExperiences}
            { ...experience }
          />
          ))}
        </VerticalTimeline>
      </motion.div>
    </>
  )
}

export default SectionWrapper(Experience, 'experience')
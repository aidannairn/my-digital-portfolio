import { useContext, useEffect, useRef, useState } from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import { motion } from 'framer-motion'

import { sort } from '../utils/sort'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { UserContext } from '../contexts/UserContext'
import { FormModal } from './modals'
import ExperienceCard from './ExperienceCard'
import formSettings from './form/data/experiences.form'
import styles from '../styles'
import 'react-vertical-timeline-component/style.min.css'

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
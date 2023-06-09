import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import { sort } from '../utils/sort'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { AlertsContext } from '../contexts/AlertsContext'
import { UserContext } from '../contexts/UserContext'
import { FormModal } from './modals'
import ExperienceCard from './ExperienceCard'
import formSettings from './form/data/experiences.form'
import styles from '../styles'
import getBaseURL from '../utils/getBaseURL'
import getInitialUserId from '../utils/getInitialUser'

const Experience = ({ experiences, setExperiences }) => {
  const { addAlert } = useContext(AlertsContext)
  const { user: { userId, userToken }, authRequest } = useContext(UserContext)
  const formRef = useRef(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [sortedExperiences, setSortedExperiences] = useState([])
  const [shouldFadeIn, setShouldFadeIn] = useState(true)

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
  
    const res = await authRequest.post(
      `${getBaseURL()}/education/create`,
      formData,
      { 
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (!experiences.length) setShouldFadeIn(false)
    
    const { type, msg } = res.data.alert
    addAlert({ type, msg })
    setExperiences(prevState => [...prevState, { ...res.data.experience, recentlyAdded: true }])
  }  

  formSettings.submit = {
    action: handleSubmit,
    btnText: {
      idle: 'Add Experience',
      loading: 'Please wait...'
    }
  }

  const initialUserId = getInitialUserId()

  return (
    <>
      { userId === initialUserId &&
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
        <p className={styles.sectionSubText}>The qualifications that helped get me to where I am today</p>
        <h2 className={styles.sectionHeadText}>Experience.</h2>
      </motion.div>
      { userId === initialUserId &&
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
      { !!sortedExperiences.length &&
        <motion.div 
          variants={shouldFadeIn ? fadeIn('', '', 1, 1) : null}
          className='mt-20 flex flex-col'
        >
          <div>
            {sortedExperiences.map((experience, i) => (
              <ExperienceCard
                key={i}
                index={i}
                currentUser={{ userId, userToken, authRequest }}
                setExperiences={setExperiences}
                { ...experience }
                isLastOfType={sortedExperiences.length - 1 === i}
              />
            ))}
          </div>
        </motion.div>
      }
    </>
  )
}

export default SectionWrapper(Experience, 'experience')
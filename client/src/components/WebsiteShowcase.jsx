import { useContext, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'

import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { AlertsContext } from '../contexts/AlertsContext'
import { UserContext } from '../contexts/UserContext'
import { FormModal } from './modals'
import getBaseURL from '../utils/getBaseURL'
import formSettings from './form/data/website-features.form'
import WebShowCaseCard from './WebsiteShowcaseCard'
import getInitialUserId from '../utils/getInitialUser'
import styles from '../styles'
import 'swiper/css'


const WebsiteShowcase = ({ features, setFeatures }) => {
  const { addAlert } = useContext(AlertsContext)
  const {
    user: { userId, userToken },
    authRequest
  } = useContext(UserContext)
  const formRef = useRef(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [shouldFadeIn, setShouldFadeIn] = useState(true)

  const handleSubmit = async () => {
    const form = formRef.current.getFormState()
    const bullets = await form.bullets.map(bullet => bullet.point)
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('subtitle', form.subtitle)
    formData.append('image', form.demo)
    formData.append('bullets', JSON.stringify(bullets))
  
    const res = await authRequest.post(
      `${getBaseURL()}/website_feature/create`,
      formData,
      { 
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (!features.length) setShouldFadeIn(false)
    
    const { type, msg } = res.data.alert
    addAlert({ type, msg })
    setFeatures(prevState => [...prevState, res.data.websiteFeature])
  }  

  formSettings.submit = {
    action: handleSubmit,
    btnText: {
      idle: 'Add Feature',
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
      <motion.div
        variants={textVariant()}
        className='sm:px-16 px-6'
      >
        <p className={styles.sectionSubText}>Swipe to learn about some of the <span className='text-quaternary'>coolest features</span> I've included in this app</p>
        <h2 className={styles.sectionHeadText}>For The Nerds.</h2>
      </motion.div>
      { userId === initialUserId &&
        <motion.div
          variants={fadeIn('', '', 1, 1)}
          className='flex gap-5 mt-5'
        >
          <div className='green-blue-gradient hover:green-blue-gradient--hover rounded-lg p-px'>
            <button className='bg-primary hover:bg-tertiary rounded-lg p-2' onClick={() => setIsModalVisible(true)}>
              Add A Feature
            </button>
          </div>
        </motion.div>
      }
      { !!features.length &&
        <motion.div 
          variants={shouldFadeIn ? fadeIn('', '', 1, 1) : null}
        >
          <Swiper
            loop
            grabCursor
          >
            { features.map((demo, i) => (
              <SwiperSlide key={i}>
                <WebShowCaseCard { ...demo } />
              </SwiperSlide>
            ))}
          </Swiper>  
        </motion.div>
      }
    </>
  )
}

export default SectionWrapper(WebsiteShowcase)
import { useContext, useEffect, useRef, useState } from 'react'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'

import { fadeIn, textVariant } from '../utils/motion'
import { AlertsContext } from '../contexts/AlertsContext'
import { UserContext } from '../contexts/UserContext'
import { ExpandedImageModal, FormModal, OnConfirmModal } from './modals'
import getBaseURL from '../utils/getBaseURL'
import formSettings from './form/data/website-features.form'
import WebShowCaseCard from './WebsiteShowcaseCard'
import getInitialUserId from '../utils/getInitialUser'
import styles from '../styles'
import 'swiper/css/pagination'
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
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [isDeleteModalExpanded, setIsDeleteModalExpanded] = useState(false)
  const [activeFeature, setActiveFeature] = useState({})

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

  const removeAFeature = async () => {
    try {
      const res = await authRequest.delete(
        `${getBaseURL()}/website_feature/${activeFeature._id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      const { alert: { type, msg }, websiteFeatureId } = await res.data
      addAlert({ type, msg })

      setFeatures(prevState => 
        prevState.filter(feat => 
          feat._id !== websiteFeatureId
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const displayDeleteMessage = () => {
    return (
      <h2 className='my-4 font-extralight'>
        You are about to remove <span className='font-normal'>{activeFeature.title}</span> from your features.
      </h2>
    )
  }

  useEffect(() => { setActiveFeature(features[0]) }, [])

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
      { userId && 
        isDeleteModalExpanded &&
        <OnConfirmModal
          modal={{
            visibility: isDeleteModalExpanded,
            close: () => setIsDeleteModalExpanded(false)
          }}
          message={displayDeleteMessage}
          action={removeAFeature}
        />
      }
      { isImageExpanded && activeFeature.demoURL &&
        <ExpandedImageModal
          modal={{
            visibility: isImageExpanded,
            close: () => setIsImageExpanded(false)
          }}
          imageURL={activeFeature.demoURL}
          imageAlt={`An example that demonstrates "${activeFeature.title}".`}
          noScroll={true}
        />
      }
      <div className={`${styles.paddingX} pt-6 sm:pt-16 sm:py-5 max-w-7xl mx-auto relative`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Swipe to learn about some of the <span className='text-quaternary'>coolest features</span> I have implemented in this app</p>
          <h2 className={styles.sectionHeadText}>For The Nerds.</h2>
        </motion.div>
        <motion.p
          variants={fadeIn('', '', 1, 1)}
          className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Checkout the source code for this application <a href={import.meta.env.VITE_GITHUB_SRC} target='_blank' className='text-quaternary'>here.</a>
        </motion.p>
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
      </div>
      { !!features.length &&
        <motion.div
          variants={shouldFadeIn ? fadeIn('', '', 1, 1) : null}
        >
          <Swiper
            modules={[ Pagination ]}
            grabCursor
            navigation
            pagination={{ clickable: true }}
            onActiveIndexChange={swiper => setActiveFeature(features[swiper.activeIndex])}
          >
            { features.map((feat, i) => (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  <div style={{ transform: 'translateZ(100px)' }}>
                    <WebShowCaseCard
                      isActive={isActive}
                      currentUser={{ userId, userToken, authRequest }}
                      setIsDeleteModalExpanded={() => setIsDeleteModalExpanded(true)}
                      setIsImageExpanded={() => setIsImageExpanded(true)}
                      currentUserId={userId}
                      { ...feat }
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>  
        </motion.div>
      }
    </>
  )
}

export default WebsiteShowcase
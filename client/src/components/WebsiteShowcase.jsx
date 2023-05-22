import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'

import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import WebShowCaseCard from './WebsiteShowcaseCard'
import styles from '../styles'
import 'swiper/css'


const WebsiteShowcase = ({ features }) => {
  const [shouldFadeIn, setShouldFadeIn] = useState(true)

  useEffect(() => {
    if (!features.length) setShouldFadeIn(false)
  }, [])
  
  return (
    <>
      <motion.div
        variants={textVariant()}
        className='sm:px-16 px-6'
      >
        <p className={styles.sectionSubText}>Swipe to learn about some of the <span className='text-quaternary'>coolest features</span> I've included in this app</p>
        <h2 className={styles.sectionHeadText}>For The Nerds.</h2>
      </motion.div>
      { !!features.length &&
        <motion.div 
          variants={shouldFadeIn ? fadeIn('', '', 1, 1) : null}
        >
          <Swiper
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
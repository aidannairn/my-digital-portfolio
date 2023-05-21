import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'

import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import WebShowCaseCard from './WebShowcaseCard'
import styles from '../styles'
import 'swiper/css'


const WebsiteShowcase = () => {
  const [shouldFadeIn, setShouldFadeIn] = useState(true)

  const showcase = [
    {
      title: 'Title One',
      subtitle: 'This is a subtitle',
      bullets: [
        'Bullet One',
        'Bullet Two'
      ],
    },
    {
      title: 'Title Two',
      subtitle: 'This is a subtitle',
      bullets: [
        'Bullet One',
        'Bullet Two'
      ],
    },
  ]

  if (!showcase.length) setShouldFadeIn(false)

  return (
    <>
      <motion.div
        variants={textVariant()}
        className='sm:px-16 px-6'
      >
        <p className={styles.sectionSubText}>Swipe to learn about some of the <span className='text-quaternary'>coolest features</span> I've included in this app</p>
        <h2 className={styles.sectionHeadText}>For The Nerds.</h2>
      </motion.div>
      <motion.div 
        variants={shouldFadeIn ? fadeIn('', '', 1, 1) : null}
      >
        <Swiper
        >
          { showcase?.map((demo, i) => (
            <SwiperSlide key={i}>
              <WebShowCaseCard { ...demo } />
            </SwiperSlide>
          ))}
        </Swiper>  
      </motion.div>
    </>
  )
}

export default SectionWrapper(WebsiteShowcase)
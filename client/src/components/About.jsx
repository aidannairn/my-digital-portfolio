import React from 'react'
import { motion } from 'framer-motion'

import { slideIn } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import styles from '../styles'

const ImageCard = ({ profileImageURL }) => {
  return (
    <motion.div 
      variants={slideIn('left', 'tween', 0.2, 1)} 
      className='w-full sm:w-[50%] flex items-center justify-center sm:justify-end py-5'
    >
      <img
        title='Aidan Nairn'
        src={profileImageURL}
        alt={'A profile shot of Aidan'}
        className='rounded-full max-h-[22.5rem]'
      /> 
    </motion.div>
  )
}

const About = ({ profileImageURL }) => {
  return (
    <div className='flex flex-col sm:flex-row items-stretch overflow-hidden gap-10 items-stretch'>
      <div className='w-full sm:w-[50%]'>
        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className='mt-4 '
        >
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
          <div className='text-secondary text-[17px] leading-[30px] whitespace-pre-line'>
            <p className='mb-6'>
              I'm a skilled software developer that uses coding as my creative outlet. I mostly work with JavaScript, TypeScript, React and NodeJS. I'm a quick learner. I create applications that are user-friendly, scalable and efficient.
            </p>
            <p>
              I consider myself to be as much of a problem creator as I am a problem solver. When I have an idea; I am able to think over the logistics, anticipate potential flaws and overcome them.
            </p>
          </div>
        </motion.div>
      </div>
      <ImageCard profileImageURL={profileImageURL} />
    </div>
  )
}

export default SectionWrapper(About, 'about')
import { useState } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'

import { styles } from '../styles'
import { github } from '../constants'
import { SectionWrapper } from '../hoc'
import { projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  const [isSrcListVisible, setIsSrcListVisible] = useState(false)
  
  const handleGitHubClick = () => {
    if (typeof source_code_link === 'string')
      window.open(source_code_link, '_blank')
    else
      setIsSrcListVisible(true)
  }

  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)} >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[180px]'>
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover rounded-2xl ${isSrcListVisible ? 'invisible' : 'visible'}`}
          />
          <div
            className='absolute inset-0 flex m-3 justify-end card-img_hover'
          >
            <div
              onClick={handleGitHubClick}
              className='w-full flex flex-col items-end cursor-pointer'
            >
              { source_code_link && <img className='w-10 h-10 rounded-full' src={github} alt='github' /> }
              {
                isSrcListVisible && (
                  <div className='w-full flex flex-col'>
                    {
                      source_code_link.map((link, i) => (
                        <a
                          key={i}
                          href={link}
                          target='_blank'
                          className='text-right py-1 capitalize'
                        >
                            {link.replace(/-/g, ' ').split('/')[4]}
                        </a>
                      ))
                    }
                  </div>
                )
              } 
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color || 'blue-text-gradient'}`}>
              {tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Things that I have created</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>
      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          The following projects showcase my skills and experience through real-world examples of my work. They reflect my ability to solve complex problems, work with different technologies and manage projects efficiently and effectively.
        </motion.p>
      </div>
      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, i) => (
          <ProjectCard 
            key={`project-${i}`}
            index={i}
            {...project}
          />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Projects, 'projects')
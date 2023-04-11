import { motion } from 'framer-motion'

import { styles } from '../styles'
import { ComputerCanvas } from './canvas'

const Hero = () => {
  return (
    <section className='w-full h-screen mx-auto'>
      <div className={`absolute w-full h-screen mx-auto bg-hero-pattern bg-cover bg-no-repeat bg-center hue-rotate-[220deg]`} />
      <div className={`${styles.paddingX} z-10 mt-20 mx-auto flex flex-row items-start gap-5 hue-rotate-0`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-quaternary' />
          <div className='w-1 sm:h-80 h-40 blue-gradient' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} mt-10 text-white`}>Hi, I'm <span className='text-quaternary'>Aidan</span></h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop scalable web applications <br className='sm:block hidden' /> that have low running costs.
          </p>
        </div>
      </div>
      <ComputerCanvas />
      <div className='absolute w-full h-[8.5rem] bottom-[0.5rem] z-20 flex justify-center items-start sm:items-end'>
        <a className='h-fit' href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero
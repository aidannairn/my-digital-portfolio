import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

import { ComputerCanvas } from './canvas'
import useWindowSize from '../utils/useWindowSize'
import styles from '../styles'

const Hero = ({ isLoading }) => {
  const heroMainRef = useRef(null)
  const heroTextRef = useRef(null)
  const scrollButtonRef = useRef(null)

  const [canvasNegativeTopY, setCanvasNegativeTopY] = useState(50)
  const [canvasHeight, setCanvasHeight] = useState(300)

  const windowSize = useWindowSize()

  const setCanvasPlot = () => {
    if (heroTextRef.current && scrollButtonRef.current) {
      const mainBottom = heroMainRef.current.getBoundingClientRect().bottom
      const textBottom = heroTextRef.current.getBoundingClientRect().bottom
      const scrollButtonTop = scrollButtonRef.current.getBoundingClientRect().top

      setCanvasNegativeTopY(mainBottom - textBottom)
      setCanvasHeight(scrollButtonTop - textBottom)
    }
  }

  useEffect(() => setCanvasPlot(), [windowSize, isLoading])
  
  return (
    <section className='w-full h-screen mx-auto'>
      <div className={`hero-bg absolute w-full h-dynamic-screen mx-auto bg-hero-pattern bg-cover bg-no-repeat bg-center`} />
      <div className='hero-gradient'></div>
      <div ref={heroMainRef} className={`${styles.paddingX} z-10 mt-20 mx-auto flex flex-row items-start gap-5 hue-rotate-0`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-quaternary' />
          <div className='w-1 sm:h-80 h-40 blue-gradient' />
        </div>
        <div ref={heroTextRef} className='mt-2'>
          <h1 className={`${styles.heroHeadText} mt-10 text-white`}>Hi, I'm <span className='text-quaternary'>Aidan</span></h1>
          <p className={`${styles.heroSubText} max-w-[32.5rem] mt-2 text-white-100`}>
            I develop websites that are user-friendly, efficient and scalable.
          </p>
        </div>
      </div>
      <ComputerCanvas
        canvasHeight={canvasHeight} 
        marginTop={-canvasNegativeTopY}
      />
      { !isLoading &&
        <div ref={scrollButtonRef} className='absolute w-full h-fit mb-10 bottom-0 flex justify-center z-10'>
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
      }
    </section>
  )
}

export default Hero
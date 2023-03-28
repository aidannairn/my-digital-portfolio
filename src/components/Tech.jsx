import { motion } from 'framer-motion'

import { textVariant } from '../utils/motion'
import { BallCanvas } from "./canvas"
import { SectionWrapper } from '../hoc'
import { technologies } from "../constants"
import { styles } from '../styles'

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Some of the languages, libraries and frameworks I use</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-10 mt-20">
        {technologies.map(technology => (
          <div key={technology.name} className="w-28 h-28">
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Tech, 'tech')
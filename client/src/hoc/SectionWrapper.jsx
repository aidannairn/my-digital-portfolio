import { motion } from 'framer-motion'

import { staggerContainer } from '../utils/motion'
import styles from '../styles'

const SectionWrapper = (Component, idName) =>
  function HOC(props) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 'some' }}
        className={`${styles.padding} max-w-7xl mx-auto relative`}
      >
        <span id={idName} className="hash-span">&nbsp;</span>
        <Component {...props} />
      </motion.section>
    )
  }

export default SectionWrapper
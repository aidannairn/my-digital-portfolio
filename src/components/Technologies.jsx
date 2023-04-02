import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'

import { textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { technologies } from "../constants"
import { styles } from '../styles'
import BallCanvas from './canvas/Ball'

const Technologies = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Some of the languages, libraries and frameworks I use</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>
      <div 
        className={'mt-20'}
        style={{ height: '500px' }}
      >
        <Canvas>
          {/* <ambientLight intensity={0.25} /> */}
          {/* <directionalLight position={[0, 0, 0.05]} /> */}
          {/* <spotLight  position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} /> */}
          {
            technologies.map((technology, i) => {
              return (
                <BallCanvas
                  key={`ball-${i}`}
                  position={[
                    i < 5 ? -5 + i * 2.5 : i < 10 ? (i - 5) * 2.5 - 5 : i < 15 ?(i - 10) * 2.5 - 5 : (i - 15) - 5,
                    i < 5 ? 2 : i < 10 ? 0 : i < 15 ? -2 : -4,
                    0
                  ]}
                  icon={technology.icon}
                />

              )
            })
          }
        </Canvas>
      </div>
    </>
  )
}



export default SectionWrapper(Technologies, 'technologies')
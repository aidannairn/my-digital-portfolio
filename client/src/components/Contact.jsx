import { useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import Form from './form/Form'
import formSettings from './form/data/contact.form'
import styles from '../styles'

const Contact = () => {
  const formRef = useRef(null)

  const handleSubmit = async () => {
    const { name, email, message } = formRef.current.getFormState()
    
    if (!(name && email && message)) throw new Error('All fields should be filled in before a submission is made.')
    
    const { 
      VITE_EMAILJS_SERVICE_ID: serviceId,
      VITE_EMAILJS_TEMPLATE_ID: templateId,
      VITE_EMAILJS_PUBLIC_KEY: publicKey,
      VITE_MY_EMAIL: myEmail
    } = import.meta.env

    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: name,
        to_name: 'Aidan',
        from_email: email,
        to_email: myEmail,
        message
      },
      publicKey
    )
  }

  formSettings.submit = {
    action: handleSubmit,
    btnText: {
      idle: 'Send',
      loading: 'Sending...'
    }
  }

  return (
    <div className='xl:mt-23 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-[#00112e] p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <Form ref={formRef} {...formSettings} />
      </motion.div>
      {/* <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div> */}
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')
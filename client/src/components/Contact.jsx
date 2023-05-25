import { useContext, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { AlertsContext } from '../contexts/AlertsContext'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import Form from './form/Form'
import formSettings from './form/data/contact.form'
import styles from '../styles'

const Contact = () => {
  const { addAlert } = useContext(AlertsContext)
  const formRef = useRef(null)

  const handleSubmit = async () => {
    const { name, email, message } = formRef.current.getFormState()
    
    if (!(name && email && message)) {
      const msg = 'All fields should be filled in before a submission is made.'
      addAlert({ type: 'error', msg })
      throw new Error(msg)
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!email.match(emailRegex)) {
      const msg = 'The email address that you entered is not a valid email format.'
      addAlert({ type: 'error', msg })
      throw new Error(msg)
    }
    
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

    addAlert({ type: 'success', msg: 'Your email has been sent! Aidan will get back to you as soon as possible.' })
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
        className='flex-[0.75] bg-quinary p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <Form ref={formRef} {...formSettings} />
      </motion.div>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] max-h-[50%] md:max-h-[90vh]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')
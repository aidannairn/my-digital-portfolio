import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { AlertsContext } from '../contexts/AlertsContext'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import Form from './form/Form'
import formSettings from './form/data/contact.form'
import useWindowSize from '../utils/useWindowSize'
import styles from '../styles'

const Contact = () => {
  const { addAlert } = useContext(AlertsContext)
  const formRef = useRef(null)
  const formContainerRef = useRef(null)
  const contactRef = useRef(null)
  const earthContainerRef = useRef(null)
  const windowDimensions = useWindowSize()
  const [canvasSize, setCanvasSize] = useState(300)

  useEffect(() => {
    const contactWidth = contactRef?.current.clientWidth
    const formContainerWidth = formContainerRef?.current.clientWidth + 40 // Where 40 is the gap between columns.

    if (windowDimensions.width >= 768) {
      if ((contactWidth - formContainerWidth) < 690)
        return setCanvasSize((contactWidth - formContainerWidth) || 300)
      else if ((contactWidth - formContainerWidth) >= 690)
        return setCanvasSize(690)
    }

    setCanvasSize(contactWidth || 300)
  }, [windowDimensions])
  
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
    <div ref={contactRef} className='max-w-full flex flex-col-reverse md:flex-row md:justify-between gap-10 overflow-hidden'>
      <div id='contact' className='pt-3'>
        <motion.div
          ref={formContainerRef}
          variants={slideIn('right', 'tween', 0.2, 1)}
          className='bg-quinary p-8 rounded-2xl mt-4 w-full md:w-[21.25rem]'
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>
          <Form ref={formRef} {...formSettings} />
        </motion.div>
      </div>
      <motion.div
        ref={earthContainerRef}
        variants={slideIn('left', 'tween', 0.2, 1)}
        style={{
          width: canvasSize,
          height: canvasSize
        }}
      >
        <div className='relative h-full w-full'>
          <EarthCanvas />
          <div className='absolute bg-primary opacity-0 top-0 h-full w-full' />
        </div>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact)
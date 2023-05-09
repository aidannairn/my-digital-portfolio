import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import Form from './form/Form'

const Contact = () => {
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const form = formRef.current.getFormState()
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
          from_name: form.name,
          to_name: 'Aidan',
          from_email: form.email,
          to_email: myEmail,
          message: form.message
        },
        publicKey
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const formSettings = {
    inputGroups: [
      { inputs: [
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Name',
            name: 'name',
            placeholder: 'What is your name?',
            required: true
          }
        },
        {
          component: 'LabelTextInput',
          properties: {
            label: 'Email',
            name: 'email',
            type: 'email',
            placeholder: 'What is your email address?',
            required: true
          }
        },
        {
          component: 'LabelTextArea',
          properties: {
            label: 'Message',
            rows: 5,
            name: 'message',
            placeholder: 'What would you like to say?',
            required: true
          }
        }
      ]}
    ],
    submit: {
      action: handleSubmit,
      text: loading ? 'Sending...' : 'Send'
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
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { styles } from '../styles'
import Form from '../components/form/Form'

const SignIn = () => {
  const redirect = useNavigate()
  const formRef = useRef(null)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const form = formRef.current.getFormState()
      setLoading(true)
      await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/signin`, { ...form })
      redirect('/', { replace: true })
      window.location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const formSettings = {
    inputGroups: [{
      inputs: [{
        component: 'LabelTextInput',
        properties: {
          label: 'Email',
          name: 'email',
          placeholder: 'What is your email?',
        }
      },
      {
        component: 'LabelTextInput',
        properties: {
          label: 'Password',
          type: 'password',
          name: 'password',
          placeholder: '********',
        }
      }]
    }],
    submit: {
      action: handleSubmit,
      text: loading ? 'Signing in...' : 'Sign in'
    }
  }

  return (
    <div className='bg-primary h-screen flex items-center justify-center'>
      <div className='bg-[#00112e] w-[80%] sm:w-[30rem] p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Have an account?</p>
        <h3 className={styles.sectionHeadText}>Sign In.</h3>
          <Form ref={formRef} {...formSettings} />
      </div>
    </div>
  )
}
export default SignIn
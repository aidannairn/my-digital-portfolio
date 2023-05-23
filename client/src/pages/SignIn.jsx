import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Form from '../components/form/Form'
import formSettings from '../components/form/data/signin.form'
import getBaseURL from '../utils/getBaseURL'
import styles from '../styles'

const SignIn = () => {
  const redirect = useNavigate()
  const formRef = useRef(null)
  const baseURL = getBaseURL()

  const handleSubmit = async () => {
    const form = formRef.current.getFormState()
    await axios.post(`${baseURL}/signin`, { ...form })
    redirect('/', { replace: true })
    window.location.reload()
  }

  formSettings.submit = {
    action: handleSubmit,
    btnText: {
      idle: 'Sign In',
      loading: 'Signing In...'
    }
  }

  return (
    <div className='bg-primary h-screen h-[100dvh] flex items-center justify-center'>
      <div className='bg-[#00112e] w-[80%] sm:w-[30rem] p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Have an account?</p>
        <h3 className={styles.sectionHeadText}>Sign In.</h3>
          <Form ref={formRef} {...formSettings} />
      </div>
    </div>
  )
}
export default SignIn
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { styles } from '../styles'
import Form from '../components/form/Form'
import formSettings from '../components/form/data/signin.form'

const SignIn = () => {
  const redirect = useNavigate()
  const formRef = useRef(null)

  const handleSubmit = async () => {
    const form = formRef.current.getFormState()
    await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/signin`, { ...form })
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
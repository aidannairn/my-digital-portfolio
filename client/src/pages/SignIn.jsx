import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { styles } from '../styles'
import FormLabelTextInput from '../components/form/LabelTextInput'

const SignIn = () => {
  const redirect = useNavigate()
  const formRef = useRef(null)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
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

  return (
    <div className='bg-primary h-screen flex items-center justify-center'>
      <div className='bg-[#00112e] w-[80%] sm:w-[30rem] p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Have an account?</p>
        <h3 className={styles.sectionHeadText}>Sign In.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col'
        >
          <FormLabelTextInput
            label='Email'
            type='text'
            name='email'
            value={form.email}
            placeholder='What is your email?'
            handleChange={handleChange}
          />
          <FormLabelTextInput
            label='Password'
            type='password'
            name='password'
            value={form.password}
            placeholder='********'
            handleChange={handleChange}
          />
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 self-end outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default SignIn
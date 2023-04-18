import { useRef, useState } from 'react'

import { styles } from '../styles'

const FormLabelInput = ({
  label,
  type,
  name,
  value,
  handleChange,
  placeholder
}) => {
  return (
    <label className='flex flex-col'>
      <span className='text-white font-medium mb-4'>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
      />
    </label>
  )
}

const SignIn = () => {
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

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
  }

  return (
    <div className='bg-primary h-screen flex items-center justify-center'>
      <div className='bg-[#00112e] p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Have an account?</p>
        <h3 className={styles.sectionHeadText}>Sign In.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <FormLabelInput
            label='Email'
            type='text'
            name='email'
            value={form.email}
            placeholder='What is your email?'
            handleChange={handleChange}
          />
          <FormLabelInput
            label='Password'
            type='password'
            name='password'
            value={form.password}
            placeholder='********'
            handleChange={handleChange}
          />
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 self-end sm:self-start outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default SignIn
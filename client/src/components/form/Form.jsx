import { forwardRef, useEffect, useState, useImperativeHandle } from "react"

import { styles } from "../../styles"
import FormLabelTextInput from "./LabelTextInput"
import isObjectEmpty from "../../utils/isObjectEmpty"

const Form = forwardRef(({
  modalClassNames,
  title,
  subtitle,
  fields,
  submit
}, ref ) => {
  const [form, setForm] = useState({})

  /*  Declare a function that can be called by the parent component.
      - In this case we want to send the form data to parent when the user submits the form.
  */
  useImperativeHandle(ref, () => (
    { getFormState: () => { return form }}
  ), [form])

  const componentMap = {
    FormLabelTextInput
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  useEffect(() => {
    const formDefaults = {}
    fields.map(field => formDefaults[field.properties.name] = '')
    setForm(formDefaults)
  }, [])
  
  return !isObjectEmpty(form) ? (
    <div className={`${modalClassNames || ''}`}>
      { title && subtitle &&
        <div className='mb-6'>
          <p className={styles.sectionSubText}>{subtitle}</p>
          <h2 className='text-white font-semibold xs:text-[30px] text-[20px]'>{title}</h2>
        </div>
      }
      <form className='flex flex-col' onSubmit={submit?.action}>
        { fields?.map((field, i) => {
          const Component = componentMap[field.Component]
          return (
            <Component
              key={i}
              handleChange={handleChange}
              value={form[field.properties.name] || ''}
              {...field.properties }
            />
          )
        }) }
        <button
          type='submit'
          className='bg-tertiary py-3 self-end px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
        >
            { submit?.text || 'Submit' }
        </button>
      </form>
    </div>
  ) : <></>
})

export default Form
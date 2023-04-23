import { forwardRef, useEffect, useState, useImperativeHandle } from "react"

import { styles } from "../../styles"
import { LabelImageInput, LabelTextArea, LabelTextInput } from "./index"
import isObjectEmpty from "../../utils/isObjectEmpty"

const Form = forwardRef(({
  modalClassNames,
  title,
  subtitle,
  inputGroups,
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
    LabelImageInput,
    LabelTextArea,
    LabelTextInput
  }

  const handleChange = e => {
    const { name, value, files } = e.target
    setForm({ ...form, [name]: files?.[0] || value })
  }

  useEffect(() => {
    const formDefaults = {}
    inputGroups.map(inputGroup => {
      inputGroup.inputs.map(input => formDefaults[input.properties.name] = null)
    })
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
        { inputGroups?.map((inputGroup, i) => <section key={i}>
          { inputGroup.settings?.heading && 
            <h3 className='font-semibold text-lg text-white-100'>{inputGroup.settings.heading}</h3>
          }
          { inputGroup.inputs.map((input, j) => {
              const Component = componentMap[input.component]
              return (
                <Component
                  key={`Form Input: ${i}${j}`}
                  handleChange={handleChange}
                  value={form[input.properties.name] || ''}
                  {...input.properties }
                />
              )
            })
          }
        </section> )}
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
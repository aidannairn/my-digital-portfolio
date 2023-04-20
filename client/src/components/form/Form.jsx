import { useEffect, useState } from "react"

import { styles } from "../../styles"
import FormLabelTextInput from "./LabelTextInput"
import isObjectEmpty from "../../utils/isObjectEmpty"

const Form = ({
  modalClassNames,
  title,
  subtitle,
  fields
}) => {
  const [form, setForm] = useState({})

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
      <div className='mb-6'>
        <p className={styles.sectionSubText}>{subtitle}</p>
        <h2 className='text-white font-semibold xs:text-[30px] text-[20px]'>{title}</h2>
      </div>
      <form>
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
      </form>
    </div>
  ) : <></>
}

export default Form
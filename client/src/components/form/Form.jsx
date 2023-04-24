import { forwardRef, useEffect, useState, useImperativeHandle } from "react"

import { styles } from "../../styles"
import { LabelImageInput, LabelTextArea, LabelTextInput } from "./index"
import isObjectEmpty from "../../utils/isObjectEmpty"

const CollectionDisplay = ({ collection }) => {
  return collection.length ? (
    <div className='flex flex-col-reverse mb-2'>
      { collection.map((group, i) => 
        <div key={i} className='mb-2'>
          { Object.keys(group).map((key, j) => 
            <p key={j}>{group[key]}</p>
          )}
        </div>
      )}
    </div>
  ) : <></>
}

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

  const handleCollection = collectionIndex => {
    const collectionName = inputGroups[collectionIndex].settings.array.name
    const collectionData = {}
    const inputProperties = {}
    
    inputGroups[collectionIndex].inputs.map(input => {
      const propName = input.properties.name
      inputProperties[propName] = null
      if (form[propName])
        collectionData[propName] = form[propName]
    })

    if (!isObjectEmpty(collectionData)) {
      setForm({
        ...form,
        [collectionName]: [...form[collectionName] || [], collectionData],
        ...inputProperties
      })
    }
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
          { inputGroup.settings?.array &&
            <>
              <div className='green-blue-gradient w-fit mb-4 hover:green-blue-gradient--hover rounded-lg p-px'>
                <button type='button' className='bg-primary hover:bg-tertiary rounded-lg p-2' onClick={() => handleCollection(i)}>Add</button>
              </div>
              <CollectionDisplay collection={form[inputGroup.settings.array.name] || []} />
            </>
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
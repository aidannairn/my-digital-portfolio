import { useEffect, useState } from 'react'

import isObjectEmpty from "../../utils/isObjectEmpty"

const InputGroupRepeat = ({ form, group, inputs }) => {
  const collectionName = group.settings.array.name

  const [isMax, setIsMax] = useState(false)
  const [collectionLabels, setCollectionLabels] = useState([])

  useEffect(() => {
    if (form.state[collectionName]?.length >= group.settings.array?.max)
      setIsMax(true)
  }, [form.state[collectionName]])
  
  const handleCollection = () => {
    const collectionData = {}
    const inputProperties = {}
    const inputLabels = []
    
    group.inputs.map(input => {
      const propName = input.properties.name
      inputProperties[propName] = null
      if (form.state[propName])
        collectionData[propName] = form.state[propName]
      if (collectionData[propName])
        inputLabels.push(input.properties.label)
    })

    if (!isObjectEmpty(collectionData)) {
      setCollectionLabels([...collectionLabels, labels])
      form.setState({
        ...form.state,
        [collectionName]: [...form.state[collectionName] || [], collectionData],
        ...inputProperties
      })
    }
  }

  const collection = form.state[group.settings.array.name] || []
  return (
    <>
      { !isMax &&
        <div className='flex gap-4 items-center mb-4'>
          <div className='green-blue-gradient w-fit hover:green-blue-gradient--hover rounded-lg p-px'>
            <button type='button' className={`bg-primary hover:bg-tertiary rounded-lg p-2 ${isMax ? 'cursor-not-allowed' : ''}`} onClick={handleCollection} disabled={isMax}>Add</button>
          </div>
          { group.settings.array?.max &&
            <i>{form.state[collectionName]?.length || 0}/{group.settings.array?.max}</i>
          }
        </div>
      }
      { !!collection.length && (
        <div className='flex flex-col-reverse mb-2'>
          { collection.map((properties, i) => (
            <div key={i} className='mb-2'>
              { Object.keys(properties).map((key, j) => 
                <p key={j}>{collectionLabels[i][j]}: {properties[key]}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default InputGroupRepeat
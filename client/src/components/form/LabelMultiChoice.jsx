import { useState } from "react"

const LabelMultiChoice = ({
  label,
  name,
  options,
  handleChange,
  required
}) => {
  const [indexOfSelected, setIndexOfSelected] = useState(0)

  return (
    <div className='flex flex-col mb-6'>
      <span className='text-white font-medium mb-4'>{label}{required ? <i className='font-thin'> (required)</i> : ''}</span>
      <div className='flex flex-col'>
        { options.map((option, i) => (
          <label key={i} className='flex gap-2'>
            <input
              type='radio'
              name={name}
              value={option.value}
              checked={indexOfSelected === i}
              onClick={() => setIndexOfSelected(i)}
              onChange={handleChange}
            />
            <span>{option.name}</span>
          </label>
        )) }
      </div>
    </div>
  )
}

export default LabelMultiChoice
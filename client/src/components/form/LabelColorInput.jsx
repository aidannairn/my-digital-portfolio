import { useEffect, useState } from 'react'

const LabelColorInput = ({
  label,
  name,
  value,
  handleChange,
  required,
}) => {
  const [btnHover, setBtnHover] = useState(false)
  const [colorHex, setColorHex] = useState('')

  const handleColorInputChange = e => setColorHex(e.target.value)
  const clearColorHex = () => setColorHex('')

  useEffect(() => {
    const input = { target: {
      name: name,
      value: colorHex
    }}
    handleChange(input)
  }, [colorHex])

  return (
    <div className='mb-6'>
      <label htmlFor='colorSelectBtn' className='flex flex-col'>
        <span className='text-white font-medium mb-4'>{label}{required ? <i className='font-thin'> (required)</i> : ''}</span>
      </label>
      <div className='flex items-center gap-5'>
        <div className={`relative w-28 h-10 p-px rounded-lg green-blue-gradient ${btnHover ? 'green-blue-gradient--hover' : 'green-blue-gradient'}`}>
          <div className={`${btnHover ? 'bg-tertiary' : 'bg-quinary'} w-full h-full rounded-lg`}>
            <p className='absolute flex items-center justify-center w-full h-full my-auto top-0 bottom-0'>Pick A Color</p>
            <input
              id='colorSelectBtn'
              type='color'
              value={value || '#FFFFFF'}
              onChange={handleColorInputChange}
              className='opacity-0 absolute z-50 w-full h-full left-0 cursor-pointer'
              required={required}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              />
          </div>
        </div>
        { value &&
          <div className='relative w-28 h-10 p-px rounded-lg green-blue-gradient green-blue-gradient'>
            <div className='bg-primary rounded-lg h-full w-full flex justify-between items-center p-2'>
              <p className='w-full bg-inherit' style={{ color: colorHex }}>
                {colorHex.toUpperCase()}
              </p>
            <button type='button' onClick={clearColorHex}>X</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
export default LabelColorInput
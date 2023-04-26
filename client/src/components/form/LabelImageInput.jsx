import { useRef, useState } from 'react'

const LabelImageInput = ({
  label,
  name,
  value: file,
  handleChange,
  required
}) => {
  const [btnHover, setBtnHover] = useState(false)

  return (
    <div className='mb-6'>
      <label htmlFor='imgSelectBtn' className='flex flex-col'>
        <span className='text-white font-medium mb-4'>{label}{required ? <i className='font-thin'> (required)</i> : ''}</span>
      </label>
      <div className={`relative w-40 h-10 p-px rounded-lg green-blue-gradient ${btnHover ? 'green-blue-gradient--hover' : 'green-blue-gradient'}`}>
        <div className={`${btnHover ? 'bg-tertiary' : 'bg-quinary'} w-full h-full rounded-lg`}>
          <p className='absolute flex items-center justify-center w-full h-full my-auto top-0 bottom-0'>Select An Image</p>
          <input
            id='imgSelectBtn'
            type='file'
            name={name}
            onChange={handleChange}
            className='opacity-0 absolute z-50 w-full h-full left-0 cursor-pointer'
            required={required}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            />
        </div>
      </div>
      { file &&
        <img src={URL.createObjectURL(file)} alt='A screenshot of the working project.' className='mt-4' />
      }
    </div>
  )
}
export default LabelImageInput
import { forwardRef } from 'react'

const DateInputField = forwardRef(({
  className,
  name,
  placeholder,
  min,
  max,
  inputRefMap,
  date
}, ref ) => {
  const handleDateChange = e => {
    const { name, min, max } = e.target
    let { value } = e.target
    const limit = name === 'year' ? 4 : 2
    value = value.slice(0, limit)
    if (max && value.length === limit && +value > +max) value = max
    if (min && value.length === limit && +value < +min) value = min
    date.setState({ ...date.state, [name]: value })
  }

  const handleInputKeyUp = e => {
    const { name, value, max } = e.target
    const digitsBeforeNext = name === 'year' ? null : 2

    if (digitsBeforeNext) {
      const currInputRef = inputRefMap.findIndex(ref =>
        ref.current === e.target)
      
      if (value.length === digitsBeforeNext && value <= max) 
        inputRefMap[currInputRef + 1].current.focus()
    }
  }

  const handleInputBlur = e => {
    let { name, value } = e.target
    if (name === 'year' && value.length < 4) return
    value = value.padStart(2, '0')
    date.setState({ ...date.state, [name]: value })
  }

  return (
    <input
      ref={ref}
      type='number'
      className={`bg-tertiary py-4 px-2 sm:w-[5rem] w-full text-center placeholder:text-secondary text-white outlined-none border-none font-medium ${className || ''}`}
      placeholder={placeholder}
      name={name}
      min={min}
      max={max}
      value={date.state[name]}
      onChange={handleDateChange}
      onKeyUp={handleInputKeyUp}
      onBlur={handleInputBlur}
    />
  )
})

export default DateInputField
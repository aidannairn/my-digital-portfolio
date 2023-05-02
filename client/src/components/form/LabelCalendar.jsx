import { useEffect, useRef, useState } from 'react'

const LabelCalendar = ({
  label,
  name,
  value,
  required,
  handleChange,
  untilNow
}) => {
  const dayInputRef = useRef(null)
  const monthInputRef = useRef(null)
  const yearInputRef = useRef(null)

  const inputRefMap = [dayInputRef, monthInputRef, yearInputRef]

  const [currentDate, setCurrentDate] = useState(new Date('Jan 1, 1900 00:00:00'))
  const [daysInMonth, setDaysInMonth] = useState(31)
  const [date, setDate] = useState({
    day: '',
    month: '',
    year: ''
  })

  useEffect(() => { setCurrentDate(new Date()) }, [])

  const handleDateChange = e => {
    const { name, min, max } = e.target
    let { value } = e.target
    const limit = name === 'year' ? 4 : 2
    value = value.slice(0, limit)
    if (max && value.length === limit && +value > +max) value = max
    if (min && value.length === limit && +value < +min) value = min
    setDate({ ...date, [name]: value })
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

  const populateDaysInMonth = newDate => {
    const month = newDate.toLocaleString('default', { month: 'long' })

    let totalDays = 0

    const days30 = ['January', 'March', 'May', 'July', 'August', 'October', 'December']
    const days31 = ['April', 'June', 'September', 'November']

    if (days30.includes(month)) {
      totalDays = 30
    } else if (days31.includes(month)) {
      totalDays = 31
    } else {
      const year = newDate.getFullYear()
      const isLeapYear = new Date(year, 1, 29).getMonth() === 1
      totalDays = isLeapYear ? 29 : 28
    }
    return totalDays
  }

  const handleInputBlur = e => {
    let { name, value } = e.target
    if (name === 'year' && value.length < 4) return
    
    value = value.padStart(2, '0')
    setDate({ ...date, [name]: value })
  }

  useEffect(() => {
    const { day, month, year } = date
    if (day && month.length === 2 && year.length === 4) {
      const dateStr = new Date(`${year}-${month}-1`)
      const totalDays = populateDaysInMonth(dateStr)
      setDaysInMonth(totalDays)

      if (+dayInputRef.current.value > totalDays)
        setDate({ ...date, day: totalDays })
      else 
        handleChange({
          target: {
            name: name,
            value: new Date(`${year}-${month}-${day}`).getTime()
          }
        })
    }
  }, [date])
  

  return (
    <div className='mb-6'>
      <span className='text-white font-medium mb-4'>{label}{required ? <i className='font-thin'> (required)</i> : ''}</span>
      <div className='mt-2 flex gap-3'>
        <label className='flex items-center w-full'>
          <input
            ref={dayInputRef}
            type='number'
            className='bg-tertiary py-4 px-2 sm:w-[5rem] w-full text-center placeholder:text-secondary text-white rounded-l-lg outlined-none border-none font-medium'
            placeholder='dd'
            name='day'
            min='1'
            max={daysInMonth}
            value={date.day}
            onChange={handleDateChange}
            onKeyUp={handleInputKeyUp}
            onBlur={handleInputBlur}
          />
          <span className='bg-tertiary py-4 pr-[0.25rem] sm:pr-4'>-</span>
          <input
            ref={monthInputRef}
            type='number'
            className='bg-tertiary py-4 px-2 sm:w-[5rem] w-full text-center placeholder:text-secondary text-white outlined-none border-none font-medium'
            placeholder='mm'
            name='month'
            min='1'
            max='12'
            value={date.month}
            onChange={handleDateChange}
            onKeyUp={handleInputKeyUp}
            onBlur={handleInputBlur}
          />
          <span className='bg-tertiary py-4 pr-[0.25rem] sm:pr-4'>-</span>
          <input
            ref={yearInputRef}
            type='number'
            className='bg-tertiary py-4 px-2 sm:w-[5rem] w-full text-center placeholder:text-secondary text-white rounded-r-lg outlined-none border-none font-medium'
            placeholder='yyyy'
            name='year'
            min={currentDate.getFullYear() - 100}
            max={currentDate.getFullYear() + (untilNow ? 0 : 100)}
            value={date.year}
            onChange={handleDateChange}
          />
        </label>
      </div>
    </div>
  )
}

export default LabelCalendar
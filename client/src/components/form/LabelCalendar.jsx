import { useEffect, useRef, useState } from 'react'

import DateInputField from './DateInputField'

const LabelCalendar = ({
  label,
  name,
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

  const populateDaysInMonth = newDate => {
    const month = newDate.toLocaleString('default', { month: 'long' })
    const days30 = ['January', 'March', 'May', 'July', 'August', 'October', 'December']
    const days31 = ['April', 'June', 'September', 'November']
    let totalDays = 0
    
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
          <DateInputField
            ref={dayInputRef}
            className='rounded-l-lg'
            name='day'
            placeholder='dd'
            min='1'
            max={daysInMonth}
            inputRefMap={inputRefMap}
            date={{ state: date, setState: setDate }}
          />
          <span className='bg-tertiary py-4 pr-[0.25rem] sm:pr-4'>-</span>
          <DateInputField
            ref={monthInputRef}
            name='month'
            placeholder='mm'
            min='1'
            max='12'
            inputRefMap={inputRefMap}
            date={{ state: date, setState: setDate }}
          />
          <span className='bg-tertiary py-4 pr-[0.25rem] sm:pr-4'>-</span>
          <DateInputField
            ref={yearInputRef}
            className='rounded-r-lg'
            name='year'
            placeholder='yyyy'
            min={currentDate.getFullYear() - 100}
            max={currentDate.getFullYear() + (untilNow ? 0 : 100)}
            inputRefMap={inputRefMap}
            date={{ state: date, setState: setDate }}
          />
        </label>
      </div>
    </div>
  )
}

export default LabelCalendar
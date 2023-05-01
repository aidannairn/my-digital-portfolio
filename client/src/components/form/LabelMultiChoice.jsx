const LabelMultiChoice = ({
  label,
  name,
  options,
  value,
  handleChange,
  required
}) => {
  return (
    <div className='flex flex-col mb-6'>
      <span className='text-white font-medium mb-4'>{label}{required ? <i className='font-thin'> (required)</i> : ''}</span>
      <div className='flex flex-col'>
          <label className='flex gap-2'>
            <input type='radio' checked value={options[0].value} name={name} onChange={handleChange} />
            <span>{options[0].name}</span>
          </label>
        { options.slice(1).map((option, i) => (
          <label key={i} className='flex gap-2'>
            <input type='radio' value={option.value} name={name} onChange={handleChange} />
            <span>{option.name}</span>
          </label>
        )) }
      </div>
    </div>
  )
}

export default LabelMultiChoice
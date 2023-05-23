const LabelTextArea = ({
  label,
  rows,
  name,
  value,
  handleChange,
  placeholder,
  required
}) => {
  return (
    <label className='flex flex-col mb-6'>
      <span className='text-white font-medium mb-4'>{label}{required ? <i className='font-thin'> (required)</i> : ''}</span>
      <textarea
        rows={rows || '7'}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
      />
    </label>
  )
}
export default LabelTextArea
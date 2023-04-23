const LabelTextInput = ({
  label,
  type,
  name,
  value,
  handleChange,
  placeholder,
  required
}) => {
  return (
    <label className='flex flex-col mb-6'>
      <span className='text-white font-medium mb-4'>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
        required={required}
      />
    </label>
  )
}

export default LabelTextInput
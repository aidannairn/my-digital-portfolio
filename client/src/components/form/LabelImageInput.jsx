const LabelImageInput = ({
  label,
  name,
  value: file,
  handleChange,
  required
}) => {
  return (
    <label className='flex flex-col mb-6'>
      <span className='text-white font-medium mb-4'>{label}</span>
      <input
        type='file'
        name={name}
        onChange={handleChange}
        className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
        required={required}
        />
        { file &&
          <img src={URL.createObjectURL(file)} alt='A screenshot of the working project.' />
        }
    </label>
  )
}
export default LabelImageInput
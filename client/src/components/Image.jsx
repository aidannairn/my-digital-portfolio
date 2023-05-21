import defaultImage from '../assets/blank_image-outline.png'

const Image = props => {
  const source = props.src || defaultImage
  const replacementTitle = `Could not find source image of ${props.alt}`
  console.log(source)
  console.log(replacementTitle)
  return (
    <>
      <img { ...props } src={source} title={props.title || !props.src ? replacementTitle : ''} />
    </>
  )
}
export default Image
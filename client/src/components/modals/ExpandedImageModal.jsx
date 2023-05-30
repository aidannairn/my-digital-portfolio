import Modal from '../../hoc/Modal'

const ExpandedImageModal = ({ modal, imageURL, imageAlt }) => (
  <img
    loading='lazy'
    className={`${modal?.className || ''}`}
    src={imageURL}
    alt={imageAlt}
  />
)

export default Modal(ExpandedImageModal)
import Modal from "../hoc/Modal"

const Form = props => {
  return (
    <div className={`${props.modalClassNames || ''}`}>
      <div>Form</div>
    </div>
  )
}

export default Modal(Form)
import Modal from '../../hoc/Modal'

const ActionOnConfirmModal = ({ modal, message: Message, action }) => {
  const handleRemoveBtnClick = () => {
    action()
    modal.close()
  }

  return (
    <div className={`${modal?.className || ''} text-center w-[90vw] sm:w-[50vw] max-h-[60vh] pt-5 pb-3 px-6`}>
      <h1 className='font-bold text-[1.5em]'>Are you sure?</h1>
      { Message && <Message /> }
      <p className='mb-2'>Would you like to proceed?</p>
      <div className='flex justify-center gap-2'>
        <button
          className='py-[0.25rem] w-20 bg-tertiary hover:brightness-125 rounded-lg'
          onClick={modal.close}
        >
          No
        </button>
        <button
          className='py-[0.25rem] w-20 bg-tertiary hover:brightness-125 rounded-lg'
          onClick={handleRemoveBtnClick}
        >
          Yes
        </button>
      </div>
    </div>
  )
}

export default Modal(ActionOnConfirmModal)
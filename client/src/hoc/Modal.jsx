import { forwardRef, useRef } from "react"

const Modal = (Component) => forwardRef(
  function HOC(props, ref) {
    const { modal } = props
    const modalRef = useRef(null)

    const handleModalExit = e => {
      if (e.target === modalRef.current) modal.close()
    }

    const defaultClasses = `
      max-h-[70vh] sm:max-h-[80vh] max-w-[90vw] sm:max-w-[80vw] border-[#00112e] bg-[#00112e] rounded-2xl
      ${props.noScroll ? '' : 'scrollbar overflow-y-auto border-y-[5px]'}
    `
    
    const componentProps = { ...props }
    componentProps.modal.className = defaultClasses

    return modal.visibility ? (
      <div ref={modalRef} className='modal' onClick={handleModalExit}>
        <div className='green-blue-gradient w-fit rounded-2xl relative p-px'>
          <div className='w-6 h-6 absolute max-h-full -top-2 -right-2 rounded-full green-blue-gradient p-px' onClick={modal.close}>
            <div className='rounded-full w-full h-full bg-tertiary text-white text-center flex justify-center items-center p-1.5 hover:brightness-150 cursor-pointer'>
              <p className='rotate-45 font-extralight text-xl'>+</p>
            </div>
          </div>
          <Component ref={ref} {...componentProps} />
        </div>
      </div>
    ) : <></>
  }
)

export default Modal
import { useRef } from "react"
import { close } from "../assets"

const Modal = (Component) => (
  function HOC({ modal }) {
    const modalRef = useRef(null)

    const handleModalExit = e => {
      if (e.target === modalRef.current) modal.close()
    }

    return modal.visibility ? (
      <div ref={modalRef} className='modal' onClick={handleModalExit}>
        <div className='green-blue-gradient relative max-h-[80%] p-px'>
          <div className='w-6 h-6 absolute max-h-full -top-2 -right-2 rounded-full green-blue-gradient p-px' onClick={modal.close}>
            <div className='rounded-full w-full h-full bg-tertiary text-white text-center flex justify-center items-center p-1.5 hover:brightness-150 cursor-pointer'>
              <img src={close} alt='Exit button' />
            </div>
          </div>
          <Component />
        </div>
      </div>
    ) : <></>
  }
)

export default Modal
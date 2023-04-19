import { useEffect, useState, useRef } from "react"

const Modal = (Component) => (
  function HOC(props) {
    const modalRef = useRef(null)

    const [isVisible, setIsVisible] = useState(false)
    
    useEffect(() => { setIsVisible(props.isVisible) }, [props])

    const handleModalExit = e => {
      if (e.target === modalRef.current) setIsVisible(false)
    }

    return isVisible ? (
      <div ref={modalRef} className='modal' onClick={handleModalExit}>
        <div className='green-blue-gradient max-h-[80%] max-w-[80%] sm:max-w-[90%] p-[1px]'>
          <Component />
        </div>
      </div>
    ) : <></>
  }
)

export default Modal
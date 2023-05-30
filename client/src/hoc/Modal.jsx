import { forwardRef, useEffect, useRef, useState } from 'react'

import useWindowSize from '../utils/useWindowSize'

const Modal = (Component) => forwardRef(
  function HOC(props, ref) {
    const { modal } = props
    const modalRef = useRef(null)
    const windowWidth = useWindowSize().width
    const [width, setWidth] = useState(0)

    useEffect(() => {
      if (windowWidth < 768)
        setWidth(windowWidth)
      else
        setWidth(document.documentElement.style.getPropertyValue('--vw-exclude-scrollbar'))
    }, [windowWidth])
    
    const handleModalExit = e => {
      if (e.target === modalRef.current) modal.close()
    }

    const defaultClasses = `
      max-h-[70vh] sm:max-h-[80vh] max-w-[90vw] sm:max-w-[80vw] border-quinary bg-quinary rounded-2xl
      ${props.noScroll ? '' : 'scrollbar overflow-y-auto border-y-[5px]'}
    `
    
    const componentProps = { ...props }
    componentProps.modal.className = defaultClasses

    return modal.visibility && width ? (
      <div
        className='fixed backdrop-blur-[3px] min-h-[1px] h-auto z-30 left-0'
        style={{ top: modal.visibility ? 0 : '-1px' }}
      >
        <div
          ref={modalRef}
          className='h-dynamic-screen overflow-hidden flex items-center justify-center bg-[rgba(0, 0, 0, 0.2)]'
          onClick={handleModalExit}
          style={{ width }}
        >
          <div className='green-blue-gradient w-fit rounded-2xl relative p-px'>
            <div className='w-6 h-6 absolute max-h-full -top-2 -right-2 rounded-full green-blue-gradient p-px' onClick={modal.close}>
              <div className='rounded-full w-full h-full bg-tertiary text-white text-center flex justify-center items-center p-1.5 hover:brightness-150 cursor-pointer'>
                <p className='rotate-45 font-extralight text-xl'>+</p>
              </div>
            </div>
            <Component ref={ref} {...componentProps} />
          </div>
        </div>
      </div>
    ) : <></>
  }
)

export default Modal
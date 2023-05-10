import { useRef, useEffect, useState } from 'react'

import Modal from '../../hoc/Modal' 
import useWindowSize from '../../utils/useWindowSize'

const TechDetailModal = ({
  modal,
  name,
  image,
  docs,
  userIsAuthor,
  openTechDeleteModal
}) => {
  const titleRef = useRef(null)
  const [titleWidth, setTitleWidth] = useState(0)
  const [maxImageHeight, setMaxImageHeight] = useState(0)

  const windowSize = useWindowSize()

  useEffect(() => {
    if (!userIsAuthor && !docs) {
      setMaxImageHeight(windowSize.height * 0.6)
      if (titleRef.current) {
        setTitleWidth(titleRef.current.clientWidth)
      }
    }
  }, [windowSize])
  
  const imageStyles = !docs && !userIsAuthor
    ? {
      width: titleWidth <= maxImageHeight ? titleWidth : maxImageHeight,
      minWidth: windowSize.width <= 768 ? '100%' : '12rem'
    } 
    : {}

  const handleRemoveBtnClick = () => {
    openTechDeleteModal()
    modal.close()
  }

  return (
    <div className={`${modal?.className || ''} w-[90vw] sm:w-fit max-h-[60vh] pt-5 pb-3 px-6`}>
      <div className={`flex ${!docs && !userIsAuthor ? 'flex-col items-center' : 'flex-col sm:flex-row'}`}>
        <img src={image} alt={`${name} logo`} 
          className={`w-full sm:w-32 ${!docs && !userIsAuthor ? 'mb-6 mr-0' : 'mr-6 mb-6 sm:mb-0'}`}
          style={imageStyles}
        />
        <div className='flex flex-col justify-center'>
          <h1 ref={titleRef} className={`text-2xl ${!docs && !userIsAuthor ? 'text-center mb-0' : 'mb-3 text-center sm:text-left'}`}>{name}</h1>
          { docs &&
            <a href={docs} target='_blank' className='flex items-center w-fit hover:opacity-80'>
              <img
                className='invert h-4 w-4 mr-2'
                src={`${import.meta.env.VITE_MEDIA_BUCKET}/icons/chain_link.svg`} alt='Show links icon'
              />
              <span>Read Documentation</span>
            </a>
          }
          { userIsAuthor &&
            <button
              className='hover:text-[#8c0505] w-fit'
              onClick={handleRemoveBtnClick}
            >
              <i className='fa fa-trash-o text-lg mr-2 w-4' aria-hidden='true'></i>
              <span>Remove</span>
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default Modal(TechDetailModal)
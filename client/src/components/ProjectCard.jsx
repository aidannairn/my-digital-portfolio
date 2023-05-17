import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'

import { AlertsContext } from '../contexts/AlertsContext'
import { OnConfirmModal } from './modals'
import { fadeIn } from '../utils/motion'
import getBaseURL from '../utils/getBaseURL'
import useWindowSize from '../utils/useWindowSize'

const ProjectCard = ({
  index,
  _id,
  name,
  description,
  tags,
  imageURL,
  links,
  recentlyAdded,
  userId: authorId,
  currentUser: { userId, userToken, authRequest },
  setProjects
}) => {
  const { addAlert } = useContext(AlertsContext)
  const [isSrcListVisible, setIsSrcListVisible] = useState(false) 
  const [isDeleteModalExpanded, setIsDeleteModalExpanded] = useState(false)
  const windowWidth = useWindowSize('x')

  const removeAProject = async () => {
    try {
      const res = await authRequest.delete(
        `${getBaseURL()}/project/${_id}`, 
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      
      const { alert: { type, msg }, projectId } = await res.data
      addAlert({ type, msg })

      setProjects(prevState =>
        prevState.filter(project =>
          project._id !== projectId
        )  
      )
    } catch (error) {
      console.error(error)
    }
  }

  const displayDeleteMessage = () => (
    <h2 className='my-4 font-extralight'>
      You are about to remove <span className='font-normal'>{name}</span> from your projects.
    </h2>
  )

  return (
    <>
      { authorId === userId && 
        isDeleteModalExpanded &&
        <OnConfirmModal
          modal={{
            visibility: isDeleteModalExpanded,
            close: () => setIsDeleteModalExpanded(false)
          }}
          message={displayDeleteMessage}
          action={removeAProject}
        />
      }
      <Tilt
        className='sm:w-[360px] max-w-[90vw] justify-self-center'
        tiltEnable={windowWidth > 768}
      >
        <motion.div
          className='bg-tertiary h-full p-5 rounded-2xl'
          variants={recentlyAdded ? null : fadeIn('up', 'spring', (index * 0.5) + 1, 0.75)}
        >
          <div 
            options={{
              max: 45,
              scale: 1,
              speed: 450
            }}
            className='flex flex-col justify-content-stretch h-full'
          >
            <div 
              className={`relative w-full p-px rounded-2xl 
              ${isSrcListVisible ? 'green-blue-gradient' : ''}`}
            >
              <div className='bg-tertiary rounded-2xl h-[178px]'>
                <img
                  src={`${import.meta.env.VITE_MEDIA_BUCKET}/${imageURL}`}
                  alt={name}
                  className={`w-full h-full object-cover rounded-2xl ${isSrcListVisible ? 'invisible' : 'visible'}`}
                />
                <div
                  className='absolute inset-0 flex justify-end card-img_hover w-full'
                >
                  <div
                    onMouseLeave={() => setIsSrcListVisible(false)}
                    className='w-full flex flex-col items-end'
                  >
                    <div className='flex gap-2 mr-2 mt-2'>
                      { authorId === userId &&
                        <button
                          className='w-10 h-10 p-2 flex items-center justify-center rounded-full  blue-dark-gradient text-[#DDE1E0] hover:text-[#8c0505]'
                          onClick={() => setIsDeleteModalExpanded(true)}
                        >
                          <i className='fa fa-trash-o text-2xl' aria-hidden='true'></i>
                        </button>
                      }
                      { !!links.length && (
                        <button
                          className={`w-10 h-10 p-2 ml-0 rounded-full  blue-dark-gradient hover:border-2 hover:border-[#000D26] ${isSrcListVisible ? 'border-2 border-[#000D26]' : ''}`}
                          onClick={() => setIsSrcListVisible(true)}
                        >
                          <img
                            className='invert'
                            src={`${import.meta.env.VITE_MEDIA_BUCKET}/icons/chain_link.svg`} alt='Show links icon'
                          />
                        </button>
                      )}
                    </div>
                    { isSrcListVisible && (
                      <div className='w-full flex flex-col mb-2 scrollbar items-end overflow-y-auto'>
                        { links?.map((link, i) => (
                          <a
                            key={i}
                            href={link.linkURL}
                            target='_blank'
                            className='text-right py-1 mr-2 capitalize w-fit hover:opacity-80'
                          >
                            { link.linkName }
                          </a>
                        ))}
                      </div>
                    )} 
                  </div>
                </div>

              </div>
            </div>
            <div className='flex-grow mt-5'>
              <h3 className='text-white font-bold text-[24px]'>{name}</h3>
              <p className='mt-2 text-secondary text-[14px] whitespace-pre-line'>{description}</p>
            </div>
            <div className='mt-4 flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <p
                  key={tag.tagName}
                  className='text-[14px]'
                  style={{ color: tag.tagColor || '#0088FE' }}
                >
                  {tag.tagName}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </Tilt>
    </>
  )
}

export default ProjectCard
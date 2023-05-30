import { useContext, useState } from 'react'
import { motion } from 'framer-motion'

import { fadeIn } from '../utils/motion'
import { AlertsContext } from '../contexts/AlertsContext'
import { ExpandedImageModal, OnConfirmModal } from './modals'
import useWindowSize from '../utils/useWindowSize'
import getBaseURL from '../utils/getBaseURL'

const ExperienceCard = ({
  index,
  recentlyAdded,
  _id,
  provider,
  qualification,
  certificateURL,
  logoURL,
  logoBgHex,
  dateFrom: timestampFrom,
  dateTo: timestampTo,
  bullets,
  userId: authorId,
  currentUser: { userId, userToken, authRequest },
  setExperiences,
  isLastOfType
}) => {
  const { addAlert } = useContext(AlertsContext)
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [isDeleteModalExpanded, setIsDeleteModalExpanded] = useState(false)

  const windowWidth = useWindowSize().width

  const getDateFromTimeStamp = (timestamp, format) =>
    new Date(timestamp).toLocaleDateString('en-NZ', format)
  
  const dateOptions = { month: 'short', year: 'numeric' }
  const dateFrom = getDateFromTimeStamp(timestampFrom, dateOptions)
  const dateTo = timestampTo
    ? getDateFromTimeStamp(timestampTo, dateOptions)
    : 'present'

  const removeAnExperience = async () => {
    try {
      const res = await authRequest.delete(
        `${getBaseURL()}/education/${_id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      const { alert: { type, msg }, expId } = await res.data
      addAlert({ type, msg })

      setExperiences(prevState => 
        prevState.filter(experience => 
          experience._id !== expId
        )
      )
    } catch (error) {
      console.error(error)
    }
  }
  
  const displayDeleteMessage = () => (
    <h2 className='my-4 font-extralight'>
      You are about to remove <span className='italic'>{qualification}</span> at <span className='font-normal'>{provider}</span> from your learning experiences.
    </h2>
  )

  const iconBg = logoBgHex ? `bg-[${logoBgHex}]` : 'bg-quinary'

  return (
  <>
    { isImageExpanded && certificateURL &&
      <ExpandedImageModal
        modal={{
          visibility: isImageExpanded,
          close: () => setIsImageExpanded(false)
        }}
        imageURL={certificateURL}
        imageAlt={`${qualification} certificate`}
        noScroll={true}
      />
    }
    { authorId === userId && 
      isDeleteModalExpanded &&
      <OnConfirmModal
        modal={{
          visibility: isDeleteModalExpanded,
          close: () => setIsDeleteModalExpanded(false)
        }}
        message={displayDeleteMessage}
        action={removeAnExperience}
      />
    }
    <motion.div
     className='flex justify-center w-full'
      variants={recentlyAdded ? null : fadeIn('', '', (index * 1) + 1, 0.75)}
    >
      <div
        className='grid w-[100%] grid-cols-[repeat(1,4rem_auto)] md:grid-cols-[repeat(1,11rem_4rem_auto)] gap-6 w-full'
      >
      { windowWidth >= 768 &&
        <div className='h-16 flex items-center mr-0'>
          <p className='text-secondary w-full text-right font-semibold'>
            {dateFrom} - {dateTo}
          </p>
        </div>
      }
      <div className='h-full w-16'>
        <div className={`${iconBg} flex justify-center items-center w-16 h-16 border-[0.25rem] rounded-full m-auto`}>
          { logoURL
            ? <img
              src={logoURL}
              alt={`${provider} logo`}
              className='w-[60%] h-[60%] object-contain'
            />
            : <h3 className='text-2xl'>{provider.charAt(0)}</h3>
          }
        </div>
        <div className={`w-1 h-[97.5%] m-auto ${isLastOfType ? 'bg-gradient-to-b from-white to-primary' : 'bg-white'}`} />
      </div>
      <div className='bg-quinary border-b-4 rounded mb-12 p-5 pt-3'>
        <div>
          <h3 className='text-white whitespace-pre-line text-lg md:text-xl font-bold'>{qualification}</h3>
          <p className='text-secondary text-[16px] font-semibold'>{provider}</p>
          { windowWidth < 768 &&
            <p className='text-secondary text-[16px] font-semibold'>{dateFrom} - {dateTo}</p>
          }
        </div>
        <ul className='mt-5 list-disc ml-5 space-y-2'>
          {bullets.map((point, i) => (
            <li
              key={`experience-point-${i}`}
              className='text-white-100 text-[14px] pl-1 tracking-wider'
            >
              {point}
            </li>
          ))}
        </ul>
        { certificateURL &&
          <div className='w-full flex justify-center md:justify-start'>
            <img
              className='mt-5 w-auto max-h-[10rem] cursor-zoom-in'
              src={certificateURL}
              alt={`${qualification} certificate`}
              onClick={() => setIsImageExpanded(true)}
            />
          </div>
        }
        { authorId === userId &&
          <div className='mt-4 w-full flex justify-end'>
            <button
              className='w-10 h-10 p-2 flex items-center justify-center rounded-full bg-primary text-[#DDE1E0] hover:text-[#8c0505]'
              onClick={() => setIsDeleteModalExpanded(true)}
            >
              <i className='fa fa-trash-o text-2xl' aria-hidden='true'></i>
            </button>
          </div>
        }
      </div>
      </div>
    </motion.div>
  </>
)}

export default ExperienceCard
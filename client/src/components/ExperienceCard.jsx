import { useState } from 'react'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'

import { ExpandedImageModal, OnConfirmModal } from './modals'

const ExperienceCard = ({
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
  setExperiences
}) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [isDeleteModalExpanded, setIsDeleteModalExpanded] = useState(false)

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
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/education/${_id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      setExperiences(prevState => 
        prevState.filter(experience => 
          experience._id !== res.data.id
        )
      )
    } catch (error) {
      console.error(error)
    }
  }
  
  const mediaBucket = import.meta.env.VITE_MEDIA_BUCKET

  const displayDeleteMessage = () => (
    <h2 className='my-4 font-extralight'>
      You are about to remove <span className='italic'>{qualification}</span> at <span className='font-normal'>{provider}</span> from your learning experiences.
    </h2>
  )

  return (
  <>
    { isImageExpanded && certificateURL &&
      <ExpandedImageModal
        modal={{
          visibility: isImageExpanded,
          close: () => setIsImageExpanded(false)
        }}
        imageURL={`${mediaBucket}/${certificateURL}`}
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
    { authorId === userId &&
      <div className='relative z-20'>
        <div className='p-px'>
          <button
            className='absolute right-0 top-0 border-white hover:border-[#8c0505] rounded hover:text-[#8c0505]'
            onClick={() => setIsDeleteModalExpanded(true)}
          >
            <span className='font-light border-inherit border-r-[1.5px] pr-2 mr-2'>Remove</span>
            <i className='fa fa-trash-o text-lg' aria-hidden='true'></i>
          </button>
        </div>
      </div>
    }
    <VerticalTimelineElement
      contentStyle={{ background: '#00143a', color: '#FFF' }}
      contentArrowStyle={{ borderRight: '7px solid #232631' }}
      date={dateTo ? `${dateFrom} - ${dateTo || 'present'}` : null}
      iconStyle={{ background: logoBgHex || 'rgb(0, 20, 58)' }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          { logoURL
            ? <img
              src={`${mediaBucket}/${logoURL}`}
              alt={`${provider} logo`}
              className='w-[60%] h-[60%] object-contain'
            />
            : <h3 className='text-2xl'>{provider.charAt(0)}</h3>
          }
          
        </div>
      }
    >
      <div>
        <h3 className='text-white whitespace-pre-line text-[24px] font-bold'>{qualification}</h3>
        <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>{provider}</p>
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
        <img
          className='mt-5 w-full sm:max-w-[200px] cursor-pointer'
          src={`${mediaBucket}/${certificateURL}`}
          alt={`${qualification} certificate`}
          onClick={() => setIsImageExpanded(true)}
        />
      }
    </VerticalTimelineElement>
  </>
)}

export default ExperienceCard
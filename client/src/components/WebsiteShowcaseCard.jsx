import Tilt from 'react-parallax-tilt'

import useWindowSize from '../utils/useWindowSize'
import Image from './Image'
import styles from '../styles'

const WebsiteShowcaseCard = ({
  title,
  subtitle,
  demoURL,
  bullets,
  userId: authorId,
  currentUserId,
  setIsDeleteModalExpanded,
  setIsImageExpanded,
  isActive
}) => {
  const windowWidth = useWindowSize().width

  return isActive ? (
    <div
      className={`${styles.padding} max-w-7xl mx-auto relative`}
    >
      <Tilt tiltEnable={windowWidth >= 768} className='green-blue-gradient hover:green-blue-gradient--hover rounded-lg p-px'>
        <div className={`bg-primary rounded-lg ${authorId === currentUserId ? 'md:h-[25rem] pt-3' : 'md:h-[21.5rem]'} p-2`}>
          { authorId === currentUserId &&
            <button
              className='absolute right-4 w-10 h-10 p-2 flex items-center justify-center rounded-full  bg-quinary text-[#DDE1E0] hover:text-[#8c0505]'
              onClick={setIsDeleteModalExpanded}
            >
              <i className='fa fa-trash-o text-2xl' aria-hidden='true'></i>
            </button>
          }
          <div className='grid md:grid-cols-2 h-full mr-2 gap-4'>
            <div className='w-full overflow-y-auto scrollbar' style={{ direction: 'rtl' }}>
              <div className='pl-2' style={{direction: 'ltr' }}>
                <h3 className={`text-2xl md:text-4xl font-bold mb-2 ${authorId === currentUserId ? 'pr-14' : ''}`}>{title}</h3>
                <h4 className='text-secondary'>{subtitle}</h4>
                <ul className='mt-4'>
                  { bullets?.map((bullet, i) => (
                    <li key={i} className='mb-4'><i className='fa fa-star mr-2' aria-hidden='true'></i>{bullet}</li>
                  ))}
                </ul>

              </div>
            </div>
            <div className={`website-showcase-card w-full flex items-center justify-center h-full ${currentUserId === authorId ? 'md:py-8' : ''}`}>
              <Image
                className='cursor-zoom-in w-auto max-h-[20rem]'
                src={demoURL} alt={`An example that demonstrates "${title}".`}
                onClick={setIsImageExpanded}
              />
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  ) : <></>
}
export default WebsiteShowcaseCard
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
  const windowWidth = useWindowSize('x')

  return isActive ? (
    <div
      className={`${styles.padding} max-w-7xl mx-auto relative`}
    >
      <Tilt tiltEnable={windowWidth > 768} className='green-blue-gradient hover:green-blue-gradient--hover rounded-lg p-px'>
        <div className={`bg-primary rounded-lg ${authorId === currentUserId ? 'sm:h-[25rem] pt-12 sm:pt-3' : 'sm:h-[21.5rem]'} p-2`}>
          { authorId === currentUserId &&
            <div className='absolute left-10 top-12 sm:left-auto sm:top-auto sm:right-20'>
              <div className='p-px justify-self-end'>
                <button
                  className='border-white hover:border-[#8c0505] rounded hover:text-[#8c0505]'
                  onClick={setIsDeleteModalExpanded}
                >
                  <span className='font-light border-inherit border-r-[1.5px] pr-2 mr-2'>Remove</span>
                  <i className='fa fa-trash-o text-lg' aria-hidden='true'></i>
                </button>
              </div>
            </div>
          }
          <div className='grid sm:grid-cols-2 h-full mr-2 gap-4'>
            <div className='w-full overflow-y-auto scrollbar' style={{ direction: 'rtl' }}>
              <div className='pl-2' style={{direction: 'ltr' }}>
                <h3 className='text-2xl sm:text-4xl font-bold mb-2'>{title}</h3>
                <h4 className='text-secondary'>{subtitle}</h4>
                <ul className='mt-4'>
                  { bullets?.map((bullet, i) => (
                    <li key={i} className='mb-4'><i className='fa fa-star mr-2' aria-hidden='true'></i>{bullet}</li>
                  ))}
                </ul>

              </div>
            </div>
            <div className={`website-showcase-card w-full flex items-center justify-center h-full ${currentUserId === authorId ? 'sm:py-8' : ''}`}>
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
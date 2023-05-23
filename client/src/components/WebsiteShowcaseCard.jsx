import Image from './Image'

const WebsiteShowcaseCard = ({
  title,
  subtitle,
  demoURL,
  bullets,
  userId: authorId,
  currentUserId,
  setIsDeleteModalExpanded,
  setIsImageExpanded
}) => {
  return (
    <div className='sm:p-5'>
      { authorId === currentUserId &&
        <div className='grid z-50'>
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
      <div className={`flex flex-col sm:flex-row sm:justify-between mt-4 ${!currentUserId ? 'pt-16' : ''}`}>
        <div className='w-full sm:w-[50%] mb-4 sm:mb-0'>
          <h3 className='text-2xl sm:text-4xl font-bold mb-2'>{title}</h3>
          <h4 className='text-secondary'>{subtitle}</h4>
          <ul className='mt-4'>
            { bullets?.map((bullet, i) => (
              <li key={i} className='mb-2'>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className='w-full sm:w-[50%] flex justify-center sm:justify-end items-center'>
          <Image className='cursor-zoom-in max-w-[90%]' src={demoURL} alt={`An example that demonstrates "${title}".`} onClick={setIsImageExpanded} />
        </div>
      </div>
    </div>
  )
}
export default WebsiteShowcaseCard
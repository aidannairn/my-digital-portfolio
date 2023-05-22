import Image from './Image'

const WebsiteShowcaseCard = ({
  _id,
  title,
  subtitle,
  demoURL,
  bullets,
  userId: authorId,
  currentUserId,
  setFeatToBeRemoved
}) => {
  return (
    <>
      { authorId === currentUserId &&
        <div className='grid'>
          <div className='p-px justify-self-end'>
            <button
              className='border-white hover:border-[#8c0505] rounded hover:text-[#8c0505]'
              onClick={() => setFeatToBeRemoved({ id: _id, title })}
            >
              <span className='font-light border-inherit border-r-[1.5px] pr-2 mr-2'>Remove</span>
              <i className='fa fa-trash-o text-lg' aria-hidden='true'></i>
            </button>
          </div>
        </div>
      }
      <div className='flex'>
        <div className='w-[50%]'>
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
          <ul>
            { bullets?.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className='w-[50%]'>
          <Image src={demoURL} alt={`An example that demonstrates "${title}".`} />
        </div>
      </div>
    </>
  )
}
export default WebsiteShowcaseCard
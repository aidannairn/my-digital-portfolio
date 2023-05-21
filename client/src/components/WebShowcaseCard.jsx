import Image from './Image'

const WebShowcaseCard = ({
  title,
  subtitle,
  demoURL,
  bullets,
  userId
}) => {
  return (
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
  )
}
export default WebShowcaseCard
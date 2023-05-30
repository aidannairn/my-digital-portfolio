const Link = ({ url, name, icon }) => (
  <a href={url} target='_blank' className='flex items-center justify-center py-5 gap-0 hover:text-secondary'>
    <i className={`mr-2 ${icon}`} aria-hidden='true' />
    <span>{name}</span>
  </a>
)

const Footer = () => {
  return (
    <div className='footer flex justify-center items-center text-white bg-quinary gap-5'>
      <Link
        url={import.meta.env.VITE_GITHUB_URL}
        name='GitHub'
        icon='fa fa-github'
      />
      <Link
        url={import.meta.env.VITE_LINKEDIN_URL}
        name='LinkedIn'
        icon='fa fa-linkedin-square'
      />
    </div>
  )
}
export default Footer
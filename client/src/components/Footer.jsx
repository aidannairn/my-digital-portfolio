const Link = ({ url, name, icon }) => (
  <a href={url} className='flex items-center py-5 hover:text-secondary'><i className={`mr-2 ${icon}`} aria-hidden='true'></i><span>{name}</span></a>
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
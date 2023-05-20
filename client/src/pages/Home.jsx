import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { About, Contact, Experience, Feedback, Hero, Navbar, Technologies, Projects } from '../components'
import { StarsCanvas } from '../components/canvas'
import { UserContext } from '../contexts/UserContext'
import getBaseURL from '../utils/getBaseURL'
import getInitialUserId from '../utils/getInitialUser'

const Home = () => {
  const [chainLinkURL, setChainLinkURL] = useState('')
  const [profileImageURL, setProfileImageURL] = useState('')
  const [experiences, setExperiences] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { user: { userId } } = useContext(UserContext)

  const baseURL = getBaseURL()

  const getUserContent = async () => {
    try {
      setIsLoading(true)

      const globalAssetsRes = await axios.get(`${baseURL}/home`)
      setChainLinkURL(globalAssetsRes.data.chainLinkURL)
      setProfileImageURL(globalAssetsRes.data.profileImageURL)

      const userRes = await axios.get(`${baseURL}/user_content/${getInitialUserId()}`)
      setExperiences(userRes.data.experiences)
      setTechnologies(userRes.data.technologies)
      setProjects(userRes.data.projects)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { getUserContent() }, [])
  
  return (
    <div className='bg-primary'>
      <Navbar isLoading={isLoading} />
      <Hero isLoading={isLoading} />
      { !isLoading && 
        <>
          <About profileImageURL={profileImageURL} />
          { (!!experiences.length || userId) &&
            <Experience experiences={experiences} setExperiences={setExperiences} />
          }
          { (!!technologies.length || userId) &&
            <Technologies technologies={technologies} setTechnologies={setTechnologies} chainLinkURL={chainLinkURL} />
          }
          { (!!projects.length || userId) &&
            <Projects projects={projects} setProjects={setProjects} chainLinkURL={chainLinkURL} />
          }
          {/* <Feedback /> */}
          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
        </>
      }
    </div>
  )
}

export default Home

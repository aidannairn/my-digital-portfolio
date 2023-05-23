import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Technologies,
  WebsiteShowcase,
  Projects
} from '../components'
import { StarsCanvas } from '../components/canvas'
import { UserContext } from '../contexts/UserContext'
import { AlertsContext } from '../contexts/AlertsContext'
import getBaseURL from '../utils/getBaseURL'
import getInitialUserId from '../utils/getInitialUser'

const LoadingContent = () => {
  return (
    <div className='flex items-end'>
      <p>Loading the page content</p>
      <div className='ml-[0.35rem] mb-[0.35rem]'>
        <div className='loading-dots'/>
      </div>
    </div>
  )
}

const NoContentLoaded = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col'>
      <p>Some of the page content could not be loaded.</p>
      <button
        type='button'
        onClick={() => navigate(0)}
        className='rounded bg-[#f5c6cb] hover:bg-[#721c24] text-[#721c24] hover:text-[#f5c6cb] border-[#721c24] border w-fit px-2 pb-[0.15rem]'
      >
        Try again
      </button>
    </div>
  )
}

const Home = () => {
  const [profileImageURL, setProfileImageURL] = useState('')
  const [experiences, setExperiences] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [projects, setProjects] = useState([])
  const [websiteFeatures, setWebsiteFeatures] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { user: { userId } } = useContext(UserContext)
  const { addAlert, removeAlertById } = useContext(AlertsContext)

  const baseURL = getBaseURL()

  const getUserContent = async () => {
    try {
      setIsLoading(true)
      var alertId = addAlert({ type: 'info', component: LoadingContent, duration: 300 })
      const globalAssetsRes = await axios.get(`${baseURL}/home`)
      setProfileImageURL(globalAssetsRes.data.profileImageURL)

      const websiteFeatureRes = await axios.get(`${baseURL}/website_features`)
      setWebsiteFeatures(websiteFeatureRes.data.websiteFeatures)

      const userRes = await axios.get(`${baseURL}/user_content/${getInitialUserId()}`)
      setExperiences(userRes.data.experiences)
      setTechnologies(userRes.data.technologies)
      setProjects(userRes.data.projects)
    } catch (error) {
      console.error(error)
      addAlert({ type: 'error', component: NoContentLoaded, duration: 300 })
    } finally {
      removeAlertById(alertId)
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
            <Technologies technologies={technologies} setTechnologies={setTechnologies} />
          }
          { (!!projects.length || userId) &&
            <Projects projects={projects} setProjects={setProjects} />
          }
          { (!!websiteFeatures.length || userId) &&
            <WebsiteShowcase features={websiteFeatures} setFeatures={setWebsiteFeatures} />
          }
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

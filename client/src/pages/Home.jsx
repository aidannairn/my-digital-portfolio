import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { About, Contact, Experience, Feedback, Hero, Navbar, Technologies, Projects } from '../components'
import { StarsCanvas } from '../components/canvas'
import { UserContext } from '../contexts/UserContext'
import getBaseURL from '../utils/getBaseURL'
import getInitialUserId from '../utils/getInitialUser'

const Home = () => {
  const [experiences, setExperiences] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { user: { userId } } = useContext(UserContext)

  const getUserContent = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${getBaseURL()}/user_content/${getInitialUserId()}`)
      setExperiences(res.data.experiences)
      setTechnologies(res.data.technologies)
      setProjects(res.data.projects)
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
          <About />
          { (!!experiences.length || userId) &&
            <Experience experiences={experiences} setExperiences={setExperiences} />
          }
          { (!!technologies.length || userId) &&
            <Technologies technologies={technologies} setTechnologies={setTechnologies} />
          }
          { (!!projects.length || userId) &&
            <Projects projects={projects} setProjects={setProjects} />
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

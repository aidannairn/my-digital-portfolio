import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { About, Contact, Experience, Feedback, Hero, Navbar, Technologies, Projects } from '../components'
import { StarsCanvas } from '../components/canvas'
import { UserContext } from '../contexts/UserContext'

const Home = () => {
  const [experiences, setExperiences] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { user: { userId } } = useContext(UserContext)

  const getUserContent = async () => {
    const {
      VITE_SERVER_BASE_URL: baseURL,
      VITE_INITIAL_USER_ID: userId
    } = import.meta.env

    try {
      setIsLoading(true)
      const res = await axios.get(`${baseURL}/api/user_content/${userId}`)
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
    <div className='home bg-primary'>
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
            {/* <StarsCanvas /> */}
          </div>
        </>
      }
    </div>
  )
}

export default Home

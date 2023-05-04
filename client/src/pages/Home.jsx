import { useEffect, useState } from 'react'
import axios from 'axios'

import { About, Contact, Experience, Feedback, Hero, Navbar, Technologies, Projects } from '../components'
import { StarsCanvas } from '../components/canvas'

const Home = () => {
  const [experiences, setExperiences] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { getUserContent() }, [])
  
  return (
    <div className='home bg-primary'>
      <Navbar isLoading={isLoading} />
      <Hero isLoading={isLoading} />
      { !isLoading && 
        <>
          {/* <About /> */}
          <Experience experiences={experiences} />
          <Technologies technologies={technologies} />
          <Projects projects={projects} />
          {/* <Feedback /> */}
          {/* <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div> */}
        </>
      }
    </div>
  )
}

export default Home

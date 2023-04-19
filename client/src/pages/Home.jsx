import { useState } from 'react'

import { About, Contact, Experience, Feedback, Hero, Navbar, Technologies, Projects } from '../components'
import { StarsCanvas } from '../components/canvas'
import Form from '../components/Form'

const Home = () => {
  const [visibility, setVisibility] = useState(true)
  
  return (
    <div className='home bg-primary'>
      <Form modal={{ visibility, close: () => setVisibility(false) }} />
      <Navbar />
      {/* <Hero /> */}
      <About />
      <Experience />
      {/* <Technologies /> */}
      <Projects />
      {/* <Feedback /> */}
      {/* <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div> */}
    </div>
  )
}

export default Home

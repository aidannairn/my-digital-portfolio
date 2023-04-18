import { About, Contact, Experience, Feedback, Hero, Navbar, Technologies, Projects } from '../components'
import { StarsCanvas } from '../components/canvas'

const Home = () => {
  return (
    <div className='home bg-primary'>
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

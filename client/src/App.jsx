import { Outlet } from 'react-router-dom'
import { About, Contact, Experience, Feedback, Hero, Navbar, Technologies, Projects } from './components'
import { StarsCanvas } from './components/canvas'

const App = () => {
  return (
    <div className='App bg-primary'>
      <Navbar />
      {/* <Hero /> */}
      <Outlet />
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

export default App
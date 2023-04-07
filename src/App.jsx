import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Experience, Feedback, Hero, Navbar, Technologies, Projects, StarsCanvas } from './components'

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          {/* <Hero /> */}
        </div>
        <About />
        <Experience />
        {/* <Technologies /> */}
        <Projects />
        <Feedback />
        {/* <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div> */}
      </div>
    </BrowserRouter>
  )
}

export default App

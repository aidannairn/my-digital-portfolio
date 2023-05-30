import { useEffect, useState } from 'react'

const useWindowSize = a => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    // Set window width/height state
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    // Call handleResize when window is resized.
    window.addEventListener('resize', handleResize)

    // Call handleResize on mount so windowWidth gets updated to initial window size.
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
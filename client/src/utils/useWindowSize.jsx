import { useEffect, useState } from "react"

const useWindowSize = a => {
  let axis
  if (a === 'x') axis = 'width'
  else if (a === 'y') axis = 'height'
  else if (['width', 'height'].includes(a)) axis = a
  else axis = null

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
    window.addEventListener("resize", handleResize)

    // Call handleResize on mount so windowWidth gets updated to initial window size.
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (axis) return windowSize[axis]
  return windowSize
}

export default useWindowSize
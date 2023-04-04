import { useEffect, useState } from "react"

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Set the windowWidth state.
    const handleResize = () => setWindowWidth(window.innerWidth)

    // Call handleResize when window is resized.
    window.addEventListener("resize", handleResize)

    // Call handleResize on mount so windowWidth gets updated to initial window size.
    handleResize()
    // Remove event listener on cleanup.
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return windowWidth
}

export default useWindowWidth
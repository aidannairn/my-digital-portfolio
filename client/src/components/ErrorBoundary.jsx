import { useRouteError, Link } from 'react-router-dom'

const ErrorBoundary= () => {
  const error = useRouteError()

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-3 text-center'>
      <h1 className='text-5xl'>Oops!</h1>
      <h2 >Sorry, an unexpected error has occured.</h2>
      <p>
        <i>{error.status} - {error.statusText || error.message}</i>
      </p>
      <Link className='blue-text-gradient' to='/'>Go home</Link>
    </div>
  )
}

export default ErrorBoundary
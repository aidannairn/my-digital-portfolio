const getBaseURL = () => {
  if (import.meta.env.VITE_ENV === 'production')
    return import.meta.env.VITE_SERVER_PROD_URL
  return import.meta.env.VITE_SERVER_DEV_URL
}

export default getBaseURL
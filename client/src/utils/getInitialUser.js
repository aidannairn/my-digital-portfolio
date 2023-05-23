const getInitialUserId = () => {
  if (import.meta.env.VITE_ENV === 'production')
    return import.meta.env.VITE_PROD_USER_ID
  return import.meta.env.VITE_DEV_USER_ID
}

export default getInitialUserId
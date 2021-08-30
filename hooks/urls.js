import { useEffect, useState } from 'react'

export function useSiteUrl() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5001'
        : 'https://' + window.location.hostname
    )
  }, [])

  return url
}

export function useSocketUrl() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : 'https://' + window.location.hostname
    )
  }, [])

  return url
}

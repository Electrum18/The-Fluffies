import { useEffect, useState } from 'react'

export function useSiteUrl() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(
      window.location.hostname === 'localhost'
        ? 'http://localhost:5001'
        : 'https://the-fluffies.net'
    )
  }, [])

  return url
}

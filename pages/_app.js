import '@/styles/global.css'

import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'

import * as gtag from '@/libs/gtag'

export function reportWebVitals({ id, name, label, value }) {
  if (gtag.PRODUCTION) {
    gtag.event({
      action: name,
      category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true
    })
  } else {
    console.log(name, value)
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => gtag.pageview(url)

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

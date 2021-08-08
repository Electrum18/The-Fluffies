import '@/styles/global.css'

import { ThemeProvider } from 'next-themes'

export function reportWebVitals(metric) {
  console.log(metric.name, metric.value)
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

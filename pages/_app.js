import '@/styles/global.css'

import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

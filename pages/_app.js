import '@/styles/global.css'

export function reportWebVitals(metric) {
  console.log(metric.name, metric.value)
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

import Document, { Head, Html, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID, GTAG_ENABLED, PRODUCTION } from '@/libs/gtag'

const YAMETRIC_ENABLED = process.env.NEXT_PUBLIC_YM_ID && PRODUCTION

function AnalyticsGA() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_TRACKING_ID}', {
page_path: window.location.pathname,
});
`
        }}
      />
    </>
  )
}

function AnalyticsYM() {
  return (
    <>
      <script async src="https://mc.yandex.ru/metrika/tag.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.ym = window.ym || function () {(window.ym.a = window.ym.a || []).push(arguments)}
window.ym.l = 1 * new Date()
ym(${process.env.NEXT_PUBLIC_YM_ID}, 'init', {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true
})
`
        }}
      />
    </>
  )
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {GTAG_ENABLED && <AnalyticsGA />}
          {YAMETRIC_ENABLED && <AnalyticsYM />}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

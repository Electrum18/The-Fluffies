export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
export const PRODUCTION = process.env.NODE_ENV === 'production'
export const GTAG_ENABLED = GA_TRACKING_ID && PRODUCTION

function checkGTAG() {
  if (!GA_TRACKING_ID) {
    console.warn('NEXT_PUBLIC_GA_ID environment is not defined, skipping...')
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  if (!GTAG_ENABLED) {
    checkGTAG()
  } else {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value, ...props }) => {
  if (!GTAG_ENABLED) {
    checkGTAG()
  } else {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...props
    })
  }
}

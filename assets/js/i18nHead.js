export default function(self, page) {
  const { messages, locale } = self.$i18n

  const t = messages[locale].meta

  const image =
    'https://raw.githubusercontent.com/Electrum18/The-Fluffies/master/assets/img/announcement.png'

  const twitter = '@TFluffies'

  const metaTags = [
    { name: 'description', content: t.description },
    { name: 'keywords', content: t.keywords },

    { name: 'og:title', content: t.title[page] },
    { name: 'og:site_name', content: 'The Fluffies' },
    { name: 'og:description', content: t.description },
    { name: 'og:url', content: 'https://the-fluffies.net/' },
    { name: 'og:image', content: image },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: twitter },
    { name: 'twitter:creator', content: twitter },
    { name: 'twitter:title', content: t.title[page] },
    { name: 'twitter:description', content: t.description },
    { name: 'twitter:image', content: image }
  ]

  const appliedMeta = []

  metaTags.forEach((tag) => {
    if (tag.content !== undefined && tag.content !== null) {
      appliedMeta.push({
        hid: tag.name,
        name: tag.name,
        content: tag.content
      })
    }
  })

  const { htmlAttrs, meta, link } = self.$nuxtI18nSeo()

  return {
    htmlAttrs,
    title: t.title[page],
    meta: [...appliedMeta, ...meta],
    link
  }
}

import { IMetaTag, IMetaTags, IMetaReturn } from '~/types/meta'

export default function(self: any, page: string, canonical: string): IMetaReturn {
  const { messages, locale } = self.$i18n

  const t = messages[locale].meta

  const image =
    'https://raw.githubusercontent.com/Electrum18/The-Fluffies/master/assets/img/announcement.png'

  const twitter = '@TFluffies'

  const metaTags: IMetaTags = [
    { name: 'title', content: t.title[page] },
    { name: 'description', content: t.description },

    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: 'https://the-fluffies.net/' },
    { name: 'og:title', content: t.title[page] },
    { name: 'og:description', content: t.description },
    { name: 'og:image', content: image },
    { name: 'og:site_name', content: 'The Fluffies' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: 'https://the-fluffies.net/' },
    { name: 'twitter:title', content: t.title[page] },
    { name: 'twitter:description', content: t.description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:site', content: twitter },
    { name: 'twitter:creator', content: twitter }
  ]

  const appliedMeta: IMetaTag[] = []

  for (let i = 0; i < metaTags.length; i++) {
    const tag = metaTags[i]

    if (tag.content ?? false) {
      appliedMeta.push({
        hid: tag.name,
        name: tag.name,
        content: tag.content
      })
    }
  }

  const { htmlAttrs, meta, link } = self.$nuxtI18nSeo()

  return {
    htmlAttrs,
    title: t.title[page],
    meta: [...appliedMeta, ...meta],
    link: [
      {
        rel: 'canonical',
        href: "https://the-fluffies.net" +
          (page !== 'privacy' && page !== 'terms' && locale === 'ru' ? '/ru' : '') +
          canonical
      },
      ...link
    ]
  }
}

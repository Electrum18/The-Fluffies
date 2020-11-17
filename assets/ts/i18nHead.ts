import { IMetaTag, IMetaTags, IMetaImport } from '~/types/meta'

export default function({ meta: { title, description } }: IMetaImport, page: string) {
  const image =
    'https://raw.githubusercontent.com/Electrum18/The-Fluffies/master/assets/img/announcement.png'

  const twitter = '@TFluffies'

  const metaTags: IMetaTags = [
    { name: 'title', content: title[page] },
    { name: 'description', content: description },

    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: 'https://the-fluffies.net/' },
    { name: 'og:title', content: title[page] },
    { name: 'og:description', content: description },
    { name: 'og:image', content: image },
    { name: 'og:site_name', content: 'The Fluffies' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: 'https://the-fluffies.net/' },
    { name: 'twitter:title', content: title[page] },
    { name: 'twitter:description', content: description },
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

  return {
    title: title[page],
    newMeta: appliedMeta
  }
}

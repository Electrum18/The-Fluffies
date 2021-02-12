/* eslint-disable space-before-function-paren */
import { IMetaTag, IMetaTags, IMetaImport } from '~/types/meta'

export default function ({ meta: { title, description } }: IMetaImport, page: string) {
  const image =
    'https://raw.githubusercontent.com/Electrum18/The-Fluffies/master/assets/img/announcement.png'

  const twitter = '@TFluffies'

  const metaTags: IMetaTags = [
    { name: 'title', content: title[page] },
    { name: 'description', content: description[page] },

    { itemprop: 'title', content: title[page] },
    { itemprop: 'description', content: description[page] },
    { itemprop: 'image', content: image },

    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://the-fluffies.net/' },
    { property: 'og:title', content: title[page] },
    { property: 'og:description', content: description[page] },
    { property: 'og:image', content: image },
    { property: 'og:site_name', content: 'The Fluffies' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: 'https://the-fluffies.net/' },
    { name: 'twitter:title', content: title[page] },
    { name: 'twitter:description', content: description[page] },
    { name: 'twitter:image', content: image },
    { name: 'twitter:site', content: twitter },
    { name: 'twitter:creator', content: twitter }
  ]

  const appliedMeta: IMetaTag[] = []

  for (let i = 0; i < metaTags.length; i++) {
    const tag = metaTags[i]

    if (tag.content ?? false) {
      appliedMeta.push({
        hid: tag.name || tag.itemprop || tag.property,
        ...(tag as any)
      })
    }
  }

  return {
    title: title[page],
    newMeta: appliedMeta
  }
}

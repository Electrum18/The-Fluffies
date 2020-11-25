import { IMetaImport } from "~/types/meta";

export default function({ meta: { schema: { breadcrumbs } } }: IMetaImport, page: string, url: string) {
  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "The Fluffies",
        url: "https://the-fluffies.net/",
        logo: "https://the-fluffies.net/icon.png"
      },
      {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        itemListElement: [{
          "@type": "ListItem",
          position: 1,
          name: breadcrumbs[page],
          item: "https://the-fluffies.net" + url
        }]
      }
    ])
  }
}
interface IMetaTag {
  hid: string
  name: string
  content: string
}

interface IMetaTags {
  length: number

  readonly [index: number]: {
    name?: string
    itemprop?: string
    property?: string
    content: string
  }
}

interface IMetaImport {
  meta: {
    title: {
      [index: string]: string
    },

    description: {
      [index: string]: string
    },

    schema: {
      breadcrumbs: {
        [index: string]: string
      }
    }
  }
}

export {
  IMetaTag,
  IMetaTags,
  IMetaImport
}
interface IMetaTag {
  hid: string
  name: string
  content: string
}

interface IMetaTags {
  length: number

  readonly [index: number]: {
    name: string
    content: string
  }
}

interface IRoute {
  readonly [index: number]: {
    hid: string
    rel: string
    href: string
    hreflang: string
  }
}

interface IMetaReturn {
  htmlAttrs: {
    [index: string]: any
  },

  title: string
  meta: IMetaTag[]
  link: IRoute[]
}

export {
  IMetaTag,
  IMetaTags,
  IMetaReturn
}
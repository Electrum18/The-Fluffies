export function linkNormalize(link: any[]) {
  for (let i = 0; i < link.length; i++) {
    const href = link[i].href

    if (href === '/ru/termsofservice') {
      link[i].href = '/termsofservice/'
    } else if (href === '/ru/privacypolicy') {
      link[i].href = '/privacypolicy/'
    } else if (href[href.length - 1] !== '/') {
      link[i].href += '/'
    }
  }

  return link
}

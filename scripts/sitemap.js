const { writeFileSync, readdirSync } = require('fs')

const ignoreList = {
  all: {
    _app: true,
    _document: true,
    404: true
  },

  ru: {
    privacypolicy: true,
    termsofservice: true
  }
}

const replaceList = {
  all: {
    index: ''
  }
}

const pages = readdirSync('pages')
  .map(page => validatePage(page.replace(/\.js.?/, '')))
  .filter(page => !ignoreList.all[page])

const ruPages = [...pages]
  .filter(page => !ignoreList.ru[page])
  .map(page => 'ru/' + page)

pages.push(...ruPages)

function generateSitemap() {
  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>${pages.map(addPage).join('')}
</urlset>
`.trim()
}

const getDate = new Date().toISOString()

function addPage(url) {
  return `
  <url>
    <loc>${`https://the-fluffies.net/${url}`}</loc>
    <lastmod>${getDate}</lastmod>
  </url>`
}

function validatePage(page) {
  const replacedPage = replaceList.all[page]

  return replacedPage !== undefined ? replacedPage : page
}

writeFileSync('public/sitemap.xml', generateSitemap(), 'utf8')

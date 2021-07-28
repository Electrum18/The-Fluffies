const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')

const getDate = new Date().toISOString()

const formatted = sitemap => prettier.format(sitemap, { parser: 'html' })

;(async () => {
  const pages = await globby([
    'pages/**/*{.js,.jsx,.mdx}',
    '!pages/_*.js',
    '!pages/api'
  ])

  const pagesSitemap = pages
    .map(page => {
      const path = page.replace(/pages|\.(j|t)sx?/g, '')

      let route = path === '/index' ? '/' : path
      let result = `
        <url>
          <loc>${`https://the-fluffies.net${route}`}</loc>
          <lastmod>${getDate}</lastmod>
        </url>`

      route = route === '/' ? route.replace('/', '') : route

      if (route !== '/privacypolicy' && route !== '/termsofservice') {
        result += `
          <url>
            <loc>${`https://the-fluffies.net/ru${route}`}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`
      }

      return result
    })
    .join('')

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${pagesSitemap}
    </urlset>`

  fs.writeFileSync('public/sitemap.xml', formatted(generatedSitemap), 'utf8')
})()

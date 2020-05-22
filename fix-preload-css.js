/* eslint-disable no-console */

const { readdir, readFile, writeFile } = require('fs')

const target = './dist/_nuxt/'

let integrate = `
var m2 = document.createElement("link");
m2.rel = "preload", m2.type = "text/css", m2.as="style", m2.onload = t, m2.onerror = function(t) {
    var n = t && t.target && t.target.src || d,
        o = new Error("Loading CSS chunk " + e + " failed.\\n(" + n + ")");
    o.code = "CSS_CHUNK_LOAD_FAILED", o.request = n, delete c[e], m2.parentNode.removeChild(m2), r(o)
}, m2.href = d;
var y = document.querySelector("head");
y.appendChild(m2);
`

integrate = integrate.replace(/(\n+)/g, '')

readdir(target, (err, files) => {
  if (err) throw err

  files.forEach((file) => {
    if (!/\.js$/m.test(file)) return

    readFile(target + file, 'utf-8', (err, content) => {
      if (err) throw err

      const foundFile = /var \w=document\.createElement\("link"\);m\.rel="stylesheet"/.exec(content)

      if (foundFile !== null) {
        const newContent =
          content.slice(0, foundFile.index) + integrate + content.slice(foundFile.index)

        writeFile(target + file, newContent, (err) => {
          if (err) throw err

          console.log(target + file, ' has been successfully modified!')
        })
      }
    })
  })
})

const { readdirSync, readFileSync, writeFileSync } = require('fs')

const css = {
  '.__image': {
    display: 'inline-block',
    'max-width': '100%',
    overflow: 'hidden',
    position: 'relative',
    'box-sizing': 'border-box',
    margin: 0
  },

  '.__image div': {
    'box-sizing': 'border-box',
    display: 'block',
    'max-width': '100%'
  },

  '.__image div img': {
    'max-width': '100%',
    display: 'block',
    margin: 0,
    border: 'none',
    padding: 0
  },

  '.__image > img, .__image nosrcipt img': {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    'box-sizing': 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    'min-width': '100%',
    'max-width': '100%',
    'min-height': '100%',
    'max-height': '100%'
  }
}

function parseCSSObj() {
  return Object.keys(css)
    .map(
      group =>
        `${group} {${Object.keys(css[group]).reduce(
          (prev, proper) => prev + `${proper}:${css[group][proper]};`,
          ''
        )}}`
    )
    .join(' ')
}

function fixFolder(url) {
  try {
    const files = readdirSync(url).filter(file => /\.html/.test(file))

    for (const file of files) {
      const data = readFileSync(url + '/' + file, 'utf8')
        .replace(
          /style="display:inline-block;max-width:100%;overflow:hidden;position:relative;box-sizing:border-box;margin:0"/g,
          'class="__image"'
        )
        .replace(
          / style="box-sizing:border-box;display:block;max-width:100%"/g,
          ''
        )
        .replace(
          / style="max-width:100%;display:block;margin:0;border:none;padding:0"/g,
          ''
        )
        .replace(
          / style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"/g,
          ''
        )

      writeFileSync(
        url + '/' + file,
        data.replace('</head>', `<style>${parseCSSObj()}</style></head>`),
        'utf8'
      )
    }
  } catch (e) {
    console.warn('[FIX ERROR]:', e)
  }
}

fixFolder('.next/server/pages')
fixFolder('.next/server/pages/en')
fixFolder('.next/server/pages/ru')

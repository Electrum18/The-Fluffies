
let $ = require('jquery');

function Save_Image () {
  let 
    elem: any = document.querySelector('#avatar svg').innerHTML
      .replace(/><\/path>/g,    ' />')
      .replace(/><\/rect>/g,    ' />')
      .replace(/><\/ellipse>/g, ' />')

      .match(/<.+?>/g),

    header = `
<?xml version="1.0" encoding="utf-8"?>

<!-- Generated with love by the-fluffies.net at ${new Date().getFullYear()} -->

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 -112 1024 1024" style="enable-background:new 0 -112 1024 1024;" xml:space="preserve">
`,
    styles = `\n
\t<style type="text/css">
\t\t.Hair, .Hair2,.HairBack, .HairBack2, .HairBack3, .Head, .Neck { stroke: #888; stroke-width: 10;
\t\t\tstroke-linecap: round; stroke-linejoin: round; transform-origin: 50% 50%; }
\t\t.inside { transform-origin: center; mask: url("#mask_Eyes") }
\t\t.eyes.mask { mask: url("#mask_Head") }
\t\t#nose, .eyes { stroke-opacity: 0; }
\t\t.inner { stroke: #ccc; stroke-width: 9; stroke-linejoin: bevel; }
\t\t.inner2 { stroke: #ccc; stroke-width: 10.5; stroke-linejoin: bevel; }
\t\t.inner3 { stroke: #ccc; stroke-width: 20; stroke-linejoin: bevel; }
\t\t.inner4 { stroke: #ccc; stroke-width: 7; stroke-linejoin: bevel; }
\t\t.outer { stroke: #888; stroke-width: 7; stroke-linejoin: bevel; }
`,
    offset     = 1,
    prevOffset = offset,
    nameReg    = /<((?!(>| )).)+/g,  // RegExp for the object name
    types      = ['g', 'defs', 'mask', 'linearGradient', 'stop'],  // Types of elements for check
    
    stylesArr: any = [];

  elem[0] = '\n\t' + elem[0]

  for (let i = 1, len = elem.length; i < len; i++) {
    if (/style=".+?"/g.test(elem[i])) {
      stylesArr.push(
        `\t\t.style${stylesArr.length} ` +
        elem[i].match(/style=".+?"/g)[0]
      )
    }

    for (let i2 = 0, len = types.length; i2 < len; i2++) {
      if (elem[i - 1].includes('<' + types[i2]       ) &&
          elem[i].includes(   '</' + types[i2] + '>')) { /*skip*/ } else
      if (elem[i - 1].includes('<' + types[i2])      ) { offset++ } else
      if (elem[i].includes(   '</' + types[i2] + '>')) { offset-- }
    }

    for (let i2 = 0; i2 < offset; i2++) {
      elem[i] = '\t' + elem[i]
    }

    if (prevOffset === offset && elem[i - 1].match(nameReg)[0] !== elem[i].match(nameReg)[0]) {
      elem[i - 1] = elem[i - 1] + '\n'
    }

    prevOffset = offset
  }

  stylesArr = stylesArr.filter((item: any, index: any, inputArray: any) => {
    return inputArray.indexOf(item) == index
  })

  stylesArr = stylesArr.join('\n').replace(/style="/g,'{ ').replace(/"/g, ' }')
  
  if ($('input#isSVG').prop('checked') === true) {
    downloadSVG('theFluffiesPony.svg',
      `${header.trim() + styles + stylesArr}\n\t</style>\n${elem.join('\n')}\n</svg>`)

  } else if ($('input#isPNG').prop('checked') === true) {
    download('theFluffiesPony', 'png',
      `${header.trim() + styles + stylesArr}\n\t</style>\n${elem.join('\n')}\n</svg>`)
  } else if ($('input#isJPEG').prop('checked') === true) {
    download('theFluffiesPony', 'jpeg',
      `${header.trim() + styles + stylesArr}\n\t</style>\n${elem.join('\n')}\n</svg>`)
  }
}


function downloadSVG(filename: string, text: string) {
  var e = document.createElement('a');
  
  e.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  e.setAttribute('download', filename);

  e.style.display = 'none';
  document.body.appendChild(e);

  e.click();

  document.body.removeChild(e);
}


function download(name: string, type: string, xml: string) {
  var image = new Image();
  image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(xml)));

  image.onload = function() {
    let canvas = document.createElement('canvas');
    
    canvas.width  = $('#menu-screener input.scr:eq(0)').val()
    canvas.height = $('#menu-screener input.scr:eq(1)').val()
    
    let ctx = canvas.getContext('2d');
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, (canvas.width / 2 - image.width) / 2, 0)
   
    let e = document.createElement('a');
    
    e.style.display = 'none'
    e.download      = name + '.' + type
    e.href          = canvas.toDataURL('image/' + type)
    
    document.body.appendChild(e)
    
    e.click();

    document.body.removeChild(e);
  }
}

export { Save_Image }
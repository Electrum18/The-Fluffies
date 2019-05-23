var $ = require('jquery'),

// elem[i] is one of Elements
// elem[i][0] is Element selector
// elem[i][1] is Attribute / Styles
// elem[i][2] is ID

// Element properties
shorty = (type: string, elem: any[][]) => {
  for (let i = 0, len = elem.length; i < len; i++) {
    if (elem[i][2] === undefined) { elem[i][2] = -1 }
    
    elem[i][2] > -1 ?  // Custom id mode
      $(elem[i][0]).eq(elem[i][2])[type](elem[i][1])
    : $(elem[i][0])[type](elem[i][1])
  }
},

html = (elem: any[][]) => { shorty('html', elem) },
attr = (elem: any[][]) => { shorty('attr', elem) },
css  = (elem: any[][]) => { shorty( 'css', elem) };

export { html, attr, css }
var
// elem[i] is one of Elements
// elem[i][0] is Element selector
// elem[i][1] is Attribute / Styles
// elem[i][2] is ID

// Element properties
shorty = (type: string, elem: string | any[], text: string | object = '', id = -1) => {
  if (elem.constructor.toString().indexOf("Array") === -1) {  // Single - short mode
    id > -1 ?  // Custom id mode
      $(elem).eq(id)[type](text)
    : $(elem)[type](text)

  } else {  // Multiple mode
    for (var i = 0, len = elem.length; i < len; i++) {
      if (elem[i][2] === undefined) { elem[i][2] = -1 }
      
      elem[i][2] > -1 ?  // Custom id mode
        $(elem[i][0]).eq(elem[i][2])[type](elem[i][1])
      : $(elem[i][0])[type](elem[i][1])
} } },

html = (elem: any, text: any, id: any) => { shorty('html', elem, text, id) },
attr = (elem: any, text: any, id: any) => { shorty('attr', elem, text, id) },
css  = (elem: any, text: any, id: any) => { shorty( 'css', elem, text, id) };

export { html, attr, css }
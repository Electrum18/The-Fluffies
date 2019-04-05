var

es = (elem: string) => {  // ELement selector
  return document.querySelectorAll(elem)
},

attr = (elem: any, attr: string[], id = -1) => {  // Element attribute
  if (id > -1 && attr === null) {
    es(elem)[id].getAttribute(attr[0])
  } else {
    if (id > -1) {
      es(elem)[id].setAttribute(attr[0], attr[1])
    } else {
      for (let i = 0; i < es(elem).length; i++) {
        es(elem)[i].setAttribute(attr[0], attr[1])
      }
    }
  }
},

css = (elem: any, css: object, id = -1) => {  // Element styles
  if (id > -1) {
    Object.assign((es(elem)[id] as HTMLElement).style, css)
  } else {
    for (let i = 0; i < es(elem).length; i++) {
      Object.assign((es(elem)[i] as HTMLElement).style, css)
    }
  }
}

export { es, attr, css }
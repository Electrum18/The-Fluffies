var

es = (elem: string) => { return document.querySelectorAll(elem) },

on_ = (elem: any, event = '', func: any = {}, id = -1) => {
  if (elem.constructor.toString().indexOf("Array") === -1 && event !== '') {
    if (id > -1) {
      es(elem)[id].addEventListener(event, func)
    
    } else {
      Array.from(es(elem), e => e.addEventListener(event, func))
    }
  
  } else {
    for (var i = 0, len = elem.length; i < len; i++) {
      if (elem[i][3] === undefined) { elem[i][3] = -1 }

      if (id > -1) {
        es(elem[i][0])[elem[i][3]].addEventListener(elem[i][1], elem[i][2])
      
      } else {
        Array.from(es(elem[i][0]), e => e.addEventListener(elem[i][1], elem[i][2]))
      }
    }
  }
},

css_ = (elem: any, text: any = '', id = -1, get = '') => {
  if (get.toUpperCase() === 'GET' && id > -1) {
    return (es(elem)[id] as HTMLElement).style[text]
  
  } else {
    if (elem.constructor.toString().indexOf("Array") === -1 && text !== '') {
      if (id > -1) {
        Object.assign((es(elem)[id] as HTMLElement).style, text)
      
      } else {
        Array.from(es(elem), e => {
          Object.assign((e as HTMLElement).style, text)
        })
      }
    
    } else {
      for (var i = 0, len = elem.length; i < len; i++) {
        if (elem[i][2] === undefined) { elem[i][2] = -1 }

        if (id > -1) {
          Object.assign((es(elem[i][0])[elem[i][2]] as HTMLElement).style, elem[i][1])
        
        } else {
          Array.from(es(elem[i][0]), e => {
            Object.assign((e as HTMLElement).style, elem[i][1])
          })
        }
      }
    }
  }
},

html_ = (elem: any, text: any = '', id = -1) => {
  if (text.toUpperCase() === 'GET' && id > -1) {
    return (es(elem)[id] as HTMLElement).innerHTML
  
  } else {
    if (elem.constructor.toString().indexOf("Array") === -1 && text !== '') {
      if (id > -1) {
        (es(elem)[id] as HTMLElement).innerHTML = text
      
      } else {
        Array.from(es(elem), e => {
          (e as HTMLElement).innerHTML = text
        })
      }
    
    } else {
      for (var i = 0, len = elem.length; i < len; i++) {
        if (elem[i][2] === undefined) { elem[i][2] = -1 }

        if (id > -1) {
          (es(elem[i][0])[elem[i][2]] as HTMLElement).innerHTML = elem[i][1]
        
        } else {
          Array.from(es(elem[i][0]), e => {
            (e as HTMLElement).innerHTML = elem[i][1]
          })
        }
      }
    }
  }
},

attr_ = (elem: any, text: any = '', id = -1, get = '') => {
  if (get.toUpperCase() === 'GET' && id > -1) {
    return (es(elem)[id] as HTMLElement).getAttribute(text)
  
  } else {
    if (elem.constructor.toString().indexOf("Array") === -1 && text !== '') {
      if (id > -1) {
        Object.assign((es(elem)[id] as HTMLElement).setAttribute, text)
      
      } else {
        Array.from(es(elem), e => {
          Object.assign((e as HTMLElement).setAttribute, text)
        })
      }
    
    } else {
      for (var i = 0, len = elem.length; i < len; i++) {
        if (elem[i][2] === undefined) { elem[i][2] = -1 }

        if (id > -1) {
          Object.assign((es(elem[i][0])[elem[i][2]] as HTMLElement).setAttribute, elem[i][1])
        
        } else {
          Array.from(es(elem[i][0]), e => {
            Object.assign((e as HTMLElement).setAttribute, elem[i][1])
          })
        }
      }
    }
  }
};

export { es, on_, css_, html_, attr_ }
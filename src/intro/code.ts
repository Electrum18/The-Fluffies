var 
  mode   = 0,
  custom = 0,
  date   = new Date(),

  { on_, css_, html_, attr_ } = require('../shorthands_mini.ts'),
  
setMode = (mode: number) => {
  if (mode > 0) {
    css_([
      [            'body', { background: '#333'     }],
      [        '#toNight', {  transform: 'scale(0)' }],
      [        '#toLight', {  transform: 'scale(1)' }],
      ['#about, #support', {      color: '#eee'     }],
      [           '#mode', {      color: '#fff'     }]
    ])
    
    attr_('#shadow feFuncA', { slope: '.5' })

    html_('#mode', 'dark mode')
  } else {
    css_([
      [            'body', { background: '#fff'     }],
      [        '#toNight', {  transform: 'scale(1)' }],
      [        '#toLight', {  transform: 'scale(0)' }],
      ['#about, #support', {      color: '#222'     }],
      [           '#mode', {      color: '#111'     }]
    ])
    
    attr_('#shadow feFuncA', { slope: '.25' })

    html_('#mode', 'light mode')
  }
};


date.getHours() >= 18 || date.getHours() <= 8 ? mode = 1 : mode = 0

setInterval(() => {
  if (custom !== 1) {  
    date.getHours() >= 18 || date.getHours() <= 8 ? mode = 1 : mode = 0
  }
}, 1e3)


on_([
  ['#toNight', 'click', () => {
    date.getHours() >= 18 || date.getHours() <= 8 ? custom = 1 : custom = 0
    
    mode = 1;
    setMode(mode)
  }],

  ['#toLight', 'click', () => {
    date.getHours() < 18 && date.getHours() > 8 ? custom = 1 : custom = 0
    
    mode = 0;
    setMode(mode)
  }],

  ['#about', 'mouseover', () => { css_('#about', { color: '#222' }) }], 
  ['#about',  'mouseout', () => {
    css_('body', 'background-color', 0, 'GET') === 'rgb(255, 255, 255)' ? mode = 0 : mode = 1
    
    mode > 0 ? css_('#about', { color: '#fff' })
             : css_('#about', { color: '#222' })
  }],

  ['#support', 'mouseover', () => { css_('#support', { color: '#222' }) }],
  ['#support',  'mouseout', () => {
    css_('body', 'background-color', 0, 'GET') === 'rgb(255, 255, 255)' ? mode = 0 : mode = 1

    mode > 0 ? css_('#support', { color: '#fff' })
             : css_('#support', { color: '#222' })
  }]
])


setMode(mode)


var tem,
    version: any =
      navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

if (version[1] === 'Chrome') {
  tem = navigator.userAgent.match(/\b(Edge)\/(\d+)/);
  if (tem != null) version = tem;
}

version[1] === 'Edge' ? 
  html_('#brand p:last-of-type', `ATTENTION, DOES NOT WORK IN ${ version[1].toUpperCase() } !!!`) : 

/trident/i.test(version[1]) ?
  html_('#brand p:last-of-type', `ATTENTION, DOES NOT WORK IN IE !!!`)
:  css_('#brand p:last-of-type', { opacity: 0, animation: 'none' })
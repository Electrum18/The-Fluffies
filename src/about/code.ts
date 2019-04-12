var 
  mode   = 0,
  custom = 0,
  date   = new Date(),

  { on_, css_ } = require('../shorthands_mini.ts'),

setMode = (mode: number) => {
  if (mode > 0) {
    css_([
      ['p:not(#copyright) span, h2 span',
                            {      color: '#eee'                     }],
      [             'body', { background: '#333'                     }],
      [         '#toNight', {  transform: 'scale(0)'                 }],
      [         '#toLight', {  transform: 'scale(1)'                 }],
      [           '#title', {      color: '#222', background: '#eee' }],
      ['p:not(#copyright)', {      color: '#bbb'                     }],
      [           'button', {
             color: '#222',
            border: '.5vmin solid #222',
        background: 'transparent'
      }]
    ])
  } else {
    css_([
      ['p:not(#copyright) span, h2 span',
                            {      color: '#444'                     }],
      [             'body', { background: '#fff'                     }],
      [         '#toNight', {  transform: 'scale(1)'                 }],
      [         '#toLight', {  transform: 'scale(0)'                 }],
      [           '#title', {      color: '#eee', background: '#222' }],
      ['p:not(#copyright)', {      color: '#666'                     }],
      [           'button', {
             color: '#eee',
            border: '.5vmin solid #eee',
        background: 'transparent'
      }]
    ])
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

  ['#back, #back button', 'mouseover', () => {
    mode > 0 ? css_('#back button', { color: '#eee', background: '#222' })
             : css_('#back button', { color: '#222', background: '#eee' })
  }],

  ['#back, #back button', 'mouseout', () => {
    $('body').css_('background-color') === 'rgb(255, 255, 255)' ? mode = 0 : mode = 1
    
    mode > 0 ? css_('#back button', { color: '#222', background: '#eee' })
             : css_('#back button', { color: '#eee', background: '#222' })
  }],

  ['#support, #support button', 'mouseover', () => {
    mode > 0 ? css_('#support button', { color: '#eee', background: '#222' })
             : css_('#support button', { color: '#222', background: '#eee' })
  }],
  
  ['#support, #support button', 'mouseout', () => {
    css_('body', 'background-color', 0, 'GET') === 'rgb(255, 255, 255)' ? mode = 0 : mode = 1
  
    mode > 0 ? css_('#support button', { color: '#222', background: '#eee' })
             : css_('#support button', { color: '#eee', background: '#222' })
  }]
])


setMode(mode)
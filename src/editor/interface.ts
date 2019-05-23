
/* global variables */

import { html, css, attr } from '../shorthands_jQuery'
import { Save_Image } from './screener'

let 
  anime = require('anime'),
  $     = require('jquery'),
  //Vue   = require('vue'),

  menu_opened = 0,
  
  Hue = 0, Satur = 100, Light = 50, trueLight = 100,  // HSL + visibility of point in pallete

  piercID = 0,
  Hold    = 0;

/* global variables end */


// Applying first functions

  
$('.menu-bar *').not('#title, #title *').css({ opacity: 0 })

$('.menu-bar').each((i: number) => {
  $('.menu-bar').eq(i).find('*').not('#title, #title *').css({ opacity: 0, 'pointer-events': 'none' })
})

css([ ['#avatar', { bottom: 0 }] ])

setTimeout(() => { $('#avatar').css({ transition: 'all .25s ease' }) }, 1500)

/*Vue.component('bar', {
  props: ['title', 'fav-color', 'fav-color-eye'],

  data: function() {
    return {
      expanded: false,

      open:  { transform: 'translate(-50%, -50%) scale(1)' },
      close: { transform: 'translate(-50%, -50%) scale(0)' },
      
    }
  },

  template: `<div class="menu-bar" :style="{ height: expanded ? 'fit-content' : '6vmin' }">
  <div id="title">
    <slot name="color"></slot>

    <p>{{ title }}</p>

    <div class="mark-arrow" @click="expanded = !expanded">
      <div id="favColor"></div>

      <svg id="arrowDown" viewBox="-110 -150 675 675" :style="expanded ? close : open">
        <path fill="#aaa" d="M434 114l-21-21c-8-7-16-11-26-11s-19 4-26 11L222 232 84 93a37 37 0 0 0-52 0l-21 21c-7 7-11 16-11 26s4 19 11 26l186 186a35 35 0 0 0 52 0l185-186a37 37 0 0 0 0-52z" />
      </svg>

      <svg id="close" viewBox="-17 -18 76 76" :style="expanded ? open : close">
        <path fill="#aaa" d="M28 21L40 9a5 5 0 1 0-7-8L21 14 9 1a5 5 0 0 0-8 8l13 12L1 33a5 5 0 1 0 8 7l12-12 12 12a5 5 0 0 0 7 0c2-2 2-5 0-7L28 21z" />
      </svg>
    </div>
  </div>

  <slot></slot>
</div>`
})

new Vue({ 
  el: '#avatar',
  data: {
    ready: { bottom: '', transition: '' }
  },

  beforeMount() {
    let e: any = this

    setTimeout(() => { e.ready.bottom     = '0%'            }      )
    setTimeout(() => { e.ready.transition = 'all .25s ease' }, 1500)
  },
})

new Vue({ 
  el: '#menu'
})*/



Menu_close()


function rgbToHsl (Color: any) {
  let ColrArr = Color.replace(/[^\d,]/g, '').split(','),
      r = ColrArr[0], g = ColrArr[1], b = ColrArr[2];
  
  r /= 255, g /= 255, b /= 255

  var max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      h, s, l = (max + min) / 2;

  if (max == min) { h = s = 0 }
  else {
    var d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
    }

    h /= 6
  }

  return [h, s, l]
}


function Open_menu() {
  if (menu_opened < 1) {
    css([ ['#menu-circle', { transform: 'translate(50%, 50%) scale(1)' }] ])
  
    attr([ [   '#menu-button #button', { fill: '#333' }],
           ['#menu-button #bars path', { fill: '#fff' }] ])

    menu_opened = 1
  } else {
    Menu_close()
    Menu_editor_close(1)
    Close_MM()

    menu_opened = 0
  }
  return menu_opened
}


function Menu_close () {
  attr([ [   '#menu-button #button', { fill: '#fff' }],
         ['#menu-button #bars path', { fill: '#333' }] ])

  css([
    [             '#menu-screener', {    bottom: '-8vmin'                                     }],
    [               '#menu-circle', { transform: 'translate(50%, 50%) scale(0)'               }],
    ['.menu-bar #title #arrowDown', { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }],
    [    '.menu-bar #title #close', { transform: 'translate(-80%, -50%) scale(0)', opacity: 0 }]
  ])
  
  $('.menu-bar *').not('#title, #title *').css({ opacity: 0 })
}


function Open_menu_editor () {
  attr([ [             '#menu-back', {    r: '165%' }],
         [   '#menu-button #button', { fill: '#333' }],
         ['#menu-button #bars path', { fill: '#fff' }] ])

  css([
    [            '#avatar', {      left: '33%'                      }],
    [ '#menu-button #bars', { transform: 'scale(0)', opacity: 0     }],
    ['#menu-button #close', { transform: 'scale(1)', opacity: 1     }],
    [           '#wrapper', {  overflow: '', 'overflow-x': 'hidden' }],
    [              '#menu', { 'pointer-events': 'all'               }]
  ])

  setTimeout(() => {
    css([ ['.menu-bar', { top: '0', opacity: 1, height: '6vmin', 'pointer-events': 'all' }] ])
  }, 250)

  Menu_close()
}


function Open_screenshoter () {
  attr([ [   '#menu-button #button', { fill: '#fff' }],
         ['#menu-button #bars path', { fill: '#333' }] ])

  css([
    [     '#menu-screener', {    bottom: '0%'                           }],
    [       '#menu-circle', { transform: 'translate(50%, 50%) scale(0)' }],
    [ '#menu-button #bars', { transform: 'scale(0)', opacity: 0         }],
    ['#menu-button #close', { transform: 'scale(1)', opacity: 1         }]
  ])

  $('#menu-screener input.scr:eq(0)').val(1920)
  $('#menu-screener input.scr:eq(1)').val(1080)
}


function Menu_editor_close (allow = 0) {
  css([
    [    '#menu', { 'pointer-events': 'none'                    }],
    [ '#wrapper', {  overflow: 'hidden', 'overflow-x': 'hidden' }],
    ['.menu-bar', { top: '-30vmin', opacity: 0, 'padding-bottom': '0', height: '6vmin',
      'pointer-events': 'none' }]
  ])

  if (allow > 0) {
    css([ ['#menu-button #close', { transform: 'scale(0)', opacity: 0 }],
          [ '#menu-button #bars', { transform: 'scale(1)', opacity: 1 }], ])

    setTimeout(() => {
      attr([ ['#menu-back', {    r: '0%'  }] ])
       css([ [   '#avatar', { left: '50%' }] ])
    }, 250)
  }
}


function Toggle_tab (e: any) {
  let obj = $(e.target).parents('.menu-bar'),
      apply = (h: string, o: number, pe: string, n: number, n2: number, he: string, round: string) => {
        obj.css({ height: h })
        obj.find('*').not('#title, #title *')
          .css({ opacity: o, 'pointer-events': pe, height: he })

        obj.find('#title #arrowDown').css({ transform:`translate(-50%, -50%) scale(${ n })`,
          opacity: n  })
        obj.find('#title #close').css({ transform:`translate(-50%, -50%) scale(${ n2 })`,
          opacity: n2 })

        if (obj.index() !== $('.menu-bar').length) {
          let  b: any = obj.find('#title').css('border-radius').match(/\S+/g),
              b2: any = $('.menu-bar').eq(obj.index()).find('#title')
                .css('border-radius').match(/\S+/g);

          for (var i = 0; i < b.length; i++ ) { b[i]  =  b[i].replace(/undefined/g, '0') }
          for (var i = 0; i < b2.length; i++) { b2[i] = b2[i].replace(/undefined/g, '0') }

          b.length  < 4 ?  b[3] = 0 : void 0
          b2.length < 4 ? b2[3] = 0 : void 0

          $('.menu-bar').eq(obj.index() - 1).find('#title')
            .css({ 'border-radius': `${ b[0] } 0 0 ` + round  })
          $('.menu-bar').eq(obj.index()    ).find('#title')
            .css({ 'border-radius': round + ` 0 0 ${ b2[3] }` })
        } else {
          let b = obj.find('#title').css('border-radius').match(/\S+/g)

          $('.menu-bar').eq(obj.index() - 1).find('#title')
            .css({ 'border-radius': `${ b[0] } 0 0 1.5vmax` })
        }
      };

  obj.height() === $(e.target).parent().height() ? 
    apply(     '', 1,     '', 0, 1, '',  '1.5vmax') 
  : apply('6vmin', 0, 'none', 1, 0, '1%',      '0')
}


function Open_MM () {
  let ang = 0;
  Menu_editor_close()

  attr([ ['#menu svg', { preserveAspectRatio: 'xMaxYMid meet' }] ])

  anime({
    targets: '#mask_Menu path',
    d: [{ value: ['M10 0c0 255 0 545 0 800h625V0h-625z', 'M-400 0c108 255 108 545 0 800h625V0h-625z'] }],
    easing: 'easeInOutQuart',
    duration: 250
  })

  css([ [  '#avatar', {         left: '30vmax' }],
        ['.MM-block', {        right: '-1%'    }],
        [    '#menu', { 'overflow-x': '',
                        'overflow-y': ''       }] ])

  $('body').mousewheel((event: any) =>{ 
    ang += event.deltaY * 3

    if (ang < 0) { ang = 0 } else 
    if (ang > ($('.MM-bar').length - 1) * 8) 
      { ang = ($('.MM-bar').length - 1) * 8 }
    
    $('.MM-bar').each((i:number) => {
      $('.MM-bar').eq(i).css({ transform: `translate(-110%, -50%) rotate(${ -ang + (i * 8) }deg)` })
    })
  })
}


function Close_MM () {
  attr([ ['#menu svg', { preserveAspectRatio: 'none' }] ])

  anime({
    targets: '#mask_Menu path',
    d: [{ value: ['M-400 0c108 255 108 545 0 800h625V0h-625z', 'M10 0c0 255 0 545 0 800h625V0h-625z'] }],
    easing: 'easeInOutQuart',
    duration: 250
  })

  css([ ['.MM-block', {        right: '-150%'  }],
        [    '#menu', { 'overflow-x': 'hidden' }] ])
}


function Circle_Ang (x: any, y: any) {
  let mouseX = x - ($('#color_pallete #body').offset().left + ($('#color_pallete #body').width() / 2)), 
      mouseY = ($('#color_pallete #body').offset().top + ($('#color_pallete #body').height() / 2)) - y,

      Ang = Math.atan2(mouseX, mouseY) * 180 / Math.PI;

  Hue = Ang

  attr([ ['#body #color', { 'stop-color': `hsl(${ Hue }, 100%, 50%)` }] ])

  css([ [        '#color_circle', {  transform: `translate(-50%, -1075%) rotate(${ Ang }deg)` }],
        ['#color_pallete #color', { background: `hsl(${ Hue }, ${ Satur }%, ${ Light }%)`     }] ])
  
  setColor('#color_pallete #color')
}


function Box_Ang (x: any, y: any) {
  let X = (x - $('#body #box').offset().left) / $('#body #box').outerWidth(),
      Y = (y - $('#body #box').offset().top ) / $('#body #box').outerHeight(),

      trnsX = (1900 * X) - 1000,
      trnsY = (1900 * Y) - 1000;

  X > 1 ? (X = 1, trnsX = 900) : X < 0 ? (X = 0, trnsX = -1000) : void 0
  Y > 1 ? (Y = 1, trnsY = 900) : Y < 0 ? (Y = 0, trnsY = -1000) : void 0

  Satur = 100 * X, Light = 15 + (-(100 * Y) + (50 * X * Y) - (50 * X) + 100) * 0.70,
  trueLight = -(100 * Y) + 100

  css([ [           '#color_box', {  transform: `translate(${ trnsX }%, ${ trnsY }%)`     }],
        [    '#color_box circle', {     stroke: Y > 0.5 ? '#fff' : '#000'                 }],
        ['#color_pallete #color', { background: `hsl(${ Hue }, ${ Satur }%, ${ Light }%)` }] ])

  setColor('#color_pallete #color')
}


function setColor (e: string) {
  let Color = $(e).css('background-color'),
      ColrArr: any[] = Color.match(/\d+/g),

      text = $(e).parents('#color_pallete').find('p.h').text(),

      Target: any, Type: number, HSL: number[], mainObj: any;

  switch (text) {
    case 'mane': Type = 1,
      Target = '.Hair #front, #back, .Head #hair_Front, ' +
        '.Hair2 #front, .HairBack #tail, .HairBack2 #tail, .HairBack3 #back'
    break

    case 'eyes': Type = 2; break
    case 'fur':  Type = 3; break
  }

  if (/\w+ \w+ ear #\d+/g.test(text)) {
    if (text === text.match(/\w+ \w+ ear #\d+/g)[0]) Type = 4
  }

  switch (Type) {
    case 1:
      mainObj = $('.menu-bar').eq(1);

      attr([ [Target, { fill: $(e).css('background-color') }] ])

      css([
        ['.menu-bar:eq(1) #color', { background: $(e).css('background-color') }],
        [Target, 
          { stroke: `rgb(${ ColrArr[0] / 1.5 },${ ColrArr[1] / 1.5 },${ ColrArr[2] / 1.5 })` }],
      ])
      
      mainObj.find('#favColor').css({ background: $('.Hair #front').css('fill') })

      HSL = rgbToHsl($('.Hair #front').css('fill'));
      Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100
    break
    
    case 2:
      mainObj = $('.menu-bar').eq(0);

      css([
        ['.menu-bar:eq(0) #color', {   background: $('defs #grad_Eyes #1').css('stop-color') }],
        [    'defs #grad_Eyes #1', { 'stop-color': $(e).css('background-color')              }],
        [    'defs #grad_Eyes #2', { 'stop-color':
          `rgb(${ ColrArr[0] / 1.5 },${ ColrArr[1] / 1.5 },${ ColrArr[2] / 1.5 })` }]
      ])
        
      HSL = rgbToHsl($('defs #grad_Eyes #1').css('stop-color'));
      Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100

      mainObj.find('#sliderBox svg > path').eq(0)
        .css({ stroke: $('defs #grad_Eyes #1').css('stop-color') })
      mainObj.find('p span#number:eq(0), p span#number:eq(1), p span#number:eq(2), #favColor, input#eyesScale')
        .css({ background: $('defs #grad_Eyes #1').css('stop-color') })
    break

    case 3:
      mainObj = $('.menu-bar').eq(2);

      $('.Head path, .Neck path')
        .not('.inner, .inner2, .inner3, .inner4, .HairBack3 #back, .eyes, #mouth')
        .not('#earLeftPiercing path, #earRightPiercing path')
        .not('#fangsLeft, #fangsRight')
        .attr({ fill: $(e).css('background-color') })
        .css( { stroke: `rgb(${ ColrArr[0] / 1.5 },${ ColrArr[1] / 1.5 },${ ColrArr[2] / 1.5 })` })

      attr([ 
        ['.Neck .inner, .Head .inner2, .Head .inner3, .Head .inner4',
          { fill: $(e).css('background-color') }]
      ])
      
      css([
        ['.Neck .inner, .Head .inner2, .Head .inner3, .Head .inner4',
                   { stroke: $(e).css('background-color')                            }],
        ['#mouth', { 
          stroke: `rgb(${ ColrArr[0] / 1.5 },${ ColrArr[1] / 1.5 },${ ColrArr[2] / 1.5 })` }],
        [     '.menu-bar:eq(2) #color', { background: $('.Head #head').css('fill')   }]
      ])
      
      mainObj.find('#favColor').css({ background: $('.Head #head').css('fill') })
      
      HSL = rgbToHsl($('.Head #head').css('fill'));
      Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100
    break

    case 4:
      css([
        [`.menu-bar #block:eq(${ piercID }) p.sm span`, 
                              { background: $(e).css('background-color') }         ],
        ['.menu-bar #color2', { background: $(e).css('background-color') }, piercID]
      ])

      if (text.match(/\w+/g)[1] === 'left') {
        $(`#earLeftPiercing path:eq(${piercID})`)
          .attr({ fill: $(e).css('background-color') })
          .css( { stroke: `rgb(${ ColrArr[0] / 1.5 },${ ColrArr[1] / 1.5 },${ ColrArr[2] / 1.5 })` })
      } else {
        $(`#earRightPiercing path:eq(${piercID})`)
          .attr({ fill: $(e).css('background-color') })
          .css( { stroke: `rgb(${ ColrArr[0] / 1.5 },${ ColrArr[1] / 1.5 },${ ColrArr[2] / 1.5 })` })
      }
    break

    default: return
  }
}


function getColor (name: string) {
  let id = piercID,
      Target = ['.Head #head', 'defs #grad_Eyes #1', '.Hair #front',
        `#earRightPiercing path:eq(${ id })`, `#earLeftPiercing path:eq(${ id })`],
      Type = 0;

  switch (name) {
    case 'Fur':  Type = 0; break
    case 'Eyes': Type = 1; break
    case 'Mane': Type = 2; break
  }

  if (/right ear #\d+/g.test(name) === true) Type = 3
  if (/left ear #\d+/g.test(name)  === true) Type = 4


  let HSL = rgbToHsl(Type === 1 ? $(Target[Type]).css('stop-color') : $(Target[Type]).css('fill'));

  Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100
  
  attr([ ['#body #color', { 'stop-color': `hsl(${ Hue }, 100%, 50%)` }] ])

  css([ 
    [        '#color_circle', {  transform: `translate(-50%, -1075%) rotate(${ Hue }deg)` }],
    ['#color_pallete #color', { background: `hsl(${ Hue }, ${ Satur }%, ${ Light }%)`     }],
    [           '#color_box', { 
      transform: `translate(${ (19 * Satur) - 1000 }%, ${ -(19 * trueLight) + 900 }%)`
    }],
    [    '#color_box circle', { stroke: trueLight < 50 ? '#fff' : '#000' }] 
  ])
}


function Box_Scale (x: any, y: any, id: number) {
  let X =      (x - $('#menu #sliderBox').eq(id).offset().left) / $('#menu #sliderBox').eq(id).outerWidth(),
      Y = 1 - ((y - $('#menu #sliderBox').eq(id).offset().top ) / $('#menu #sliderBox').eq(id).outerHeight()),

      rangeX, rangeY;


  X > 1 ? X = 1 : X < 0 ? X = 0 : void 0
  Y > 1 ? Y = 1 : Y < 0 ? Y = 0 : void 0

  if (id === 0) {
    if (X < 0.35 && Y < 0.35) { Y < X ? X = 0.35 : Y = 0.35 }
    
    rangeX = 10 + X * 115
    rangeY = 10 + Y * 115
  } else {
    rangeX = X * 100
    rangeY = Y * 100
  }

  html([ ['p span#number', Math.round(rangeX), id + id + 1],
         ['p span#number', Math.round(rangeY), id + id + 2] ])

  if (id === 1) {
    css([
      ['#sliderBox #tapPoint', { transform: `translate(${ (755 * X) - 25 }%, ${ -755 * Y + 680 }%)` }, id]
    ])
  } else {
    css([
      ['#sliderBox #tapPoint', { transform: `translate(${ (755 * X) - 50 }%, ${ -730 * Y + 365 }%)` }, id]
    ])
  }
}


$(               '#takePhoto').click((e: any) => { switch (e.which) { case 1: default: Save_Image()        }})
$(    '#menu-circle #capture').click((e: any) => { switch (e.which) { case 1: default: Open_screenshoter() }})
$(             '#menu-button').click((e: any) => { switch (e.which) { case 1: default: Open_menu()         }})
$('#menu-circle #menu-avatar').click((e: any) => { switch (e.which) { case 1: default: Open_menu_editor()  }})
$(          '#menu_of_models').click((e: any) => { switch (e.which) { case 1: default: Open_MM()           }})
$('#menu .mark-arrow').not('#favColor')
  .click((e: any) => { switch (e.which) { case 1: default: Toggle_tab(e) } })


$('body') // Change avatar on hold after click
  .mousedown((e: any) => {
    // dont delete this 'debugger' pls
    //console.log(e.target.id, $(e.target).attr('class'), $(e.target).parent().attr('id'))

    if ($(e.target).index('.menu-bar #sliderBox') === 0 && e.target.id === 'sliderBox' )
                                       { switch (e.which) { case 1: default: Hold = 3 }
    } else if ($(e.target).index('.menu-bar #sliderBox') === 1 && e.target.id === 'sliderBox' )
                                       { switch (e.which) { case 1: default: Hold = 4 }
    } else if ($(e.target).parent().attr('id') === 'picker' )
                                       { switch (e.which) { case 1: default: Hold = 1 }
    } else if (e.target.id === 'box' ) { switch (e.which) { case 1: default: Hold = 2 }
    } else { return }
  })
  .mouseup(  (e: any) => { switch (e.which) { case 1: default: Hold = 0 } })
  .mousemove((e: any) => {
    switch (Hold) {
      case 1: Circle_Ang(e.pageX, e.pageY); break
      case 2: Box_Ang(   e.pageX, e.pageY); break
      case 3: Box_Scale( e.pageX, e.pageY, 0); break
      case 4: Box_Scale( e.pageX, e.pageY, 1)
    }
  })
  .click((e: any) => {
    switch ($(e.target).attr('id')) {
      case 'color':
        let regExp = /\S+/g,
            text = regExp.exec($(e.target).parents('.menu-bar').find('#title p').text());

        getColor(text[0])
            
        $('#color_pallete').css({ top: '0%', opacity: 1, 'pointer-events': 'all'})
        $('#color_pallete p.h').text(text[0].toLowerCase())
      break
      
      case 'close':
        $(e.target).parents('#color_pallete')
          .css({ top: '-40vmax', opacity: 0, 'pointer-events': 'none' })
      break
      
      default: return
    }
  })


window.addEventListener('touchmove', (e: any) => {
  switch (Hold) {
    case 1: Circle_Ang(e.touches[0].pageX, e.touches[0].pageY); break
    case 2: Box_Ang(   e.touches[0].pageX, e.touches[0].pageY); break
    case 3: Box_Scale( e.touches[0].pageX, e.touches[0].pageY, 0)
  }
})


// Editor menu bars system


$('.menu-bar').each((i:number) => {
  let regExp = /\S+/g,
      text = regExp.exec($('.menu-bar').eq(i).find('#title p').text())[0],
      obj  = $('.menu-bar').eq(i).find('#color'), 
      
      find = (selector: string) => {
        return $('.menu-bar').eq(i).find(selector)
      },
      
      HSL: number[];

  switch (text) {
    case 'Mane':
                    obj.css({ background: $('.Hair #front').css('fill') })
      find('#favColor').css({ background: $('.Hair #front').css('fill') })
      
      HSL = rgbToHsl($('.Hair #front').css('fill'));
      Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100
    break

    case 'Eyes':
                    obj.css({ background: $('defs #grad_Eyes #1').css('stop-color') })
      find('#favColor').css({ background: $('defs #grad_Eyes #1').css('stop-color') })

      HSL = rgbToHsl($('defs #grad_Eyes #1').css('stop-color'));
      Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100

      find('#sliderBox svg > path').eq(0)
        .css({ stroke: $('defs #grad_Eyes #1').css('stop-color') })
      
      find('p span#number:eq(0), p span#number:eq(1), p span#number:eq(2)')
        .css({ background: $('defs #grad_Eyes #1').css('stop-color') })
      
      find('input#eyesScale')
        .css({ background: $('defs #grad_Eyes #1').css('stop-color') })
    break

    case 'Fur':
                    obj.css({ background: $('.Head #head').css('fill') })
      find('#favColor').css({ background: $('.Head #head').css('fill') })

      HSL = rgbToHsl($('.Head #head').css('fill'));
      Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100
    break

    default: return
  }
})


// Piercing system


$('p.h span span').click((e: any) => {
  let 
    $$   = $(e.target),
    side = $$.parent().text().match(/\w+ /g)[0]
      .split(' ')
      .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' '),

    sideID = $$.parents('.menu-bar').children('#block').length + 1,
      
    path = '';

  if ($$.text() === 'point') {
    path = 'M-14,-2a12,12 0 1,0 24,0a12,12 0 1,0 -24,0'
  } else {
    path = 'M8.7 3.3h-21.3c-3 0-5.4-2.4-5.4-5.3s2.4-5.3 5.3-5.3H8.7C11.6-7.3 14-4.9 14-2s-2.4 5.3-5.3 5.3z'
  };

  $('p.h span span').parents('p.h').before(
    `<div id="block">
      <svg id="close2" viewBox="-12 -12 64 64">
        <path fill="#f35" d="M28 21L40 9a5 5 0 1 0-7-8L21 14 9 1a5 5 0 0 0-8 8l13 12L1 33a5 5 0 1 0 8 7l12-12 12 12a5 5 0 0 0 7 0c2-2 2-5 0-7L28 21z"/>
      </svg>
      <p class="h"> ${ $$.text() } ${ side.toLowerCase() }ear #${ sideID } </p>
    
      
      <svg id="color2" viewBox="-21 -21 683 682">
        <path fill="#333" d="M640 315A318 318 0 0 0 320 0 318 318 0 0 0 0 320a318 318 0 0 0 319 320 92 92 0 0 0 91-108 107 107 0 0 1 30-92 106 106 0 0 1 92-30 92 92 0 0 0 108-95zM147 192a56 56 0 1 1 0 113 56 56 0 0 1 0-113zm0 256a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm101 102a56 56 0 1 1 0-113 56 56 0 0 1 0 113zm0-347a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm144 0a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm101 102a56 56 0 1 1 0-113 56 56 0 0 1 0 113zm0 0">
      </svg>
      <p class="h"> set color </p>

      <p class="sm"> position
        <span id="number" style="position: absolute; margin: 0 1vmin 0 0; right: 0">0</span>
      </p>
      <input id="piercPos" type="range" min="0" max="100" value="0"></input>
      
      <p class="sm"> scale
        <span id="number" style="position: absolute; margin: 0 1vmin 0 0; right: 0">0</span>
      </p>
      <input id="piercScl" type="range" min="50" max="100" value="50"></input>
    </div>`
  )

  $$ = $('.menu-bar #block')

  $$.eq($$.length - 1).find('svg:first-child').after('<div class="line"></div>')

  html([
    ['#block #number', 0, $$.length * 2 - 2 ],
    ['#block #number', 1, $$.length * 2 - 1 ]
  ])

  side = side.replace(/\s/g, '')

  $(`#ear${ side }Piercing`).append('<path class="piercing"></path>')

  $$ = $(`#ear${ side }Piercing path`);

  let 
    elem  = $(`#ear${ side }Front`).get(0),
    elem2 = $(`#ear${ side }`).get(0),
    Pos   = elem.getPointAtLength(0);
  
    Pos.x  === 0 ? Pos = elem2.getPointAtLength(0) : void 0

  let 
    ParPos = elem.getBBox() || elem2.getBBox(),

    deltaX = Pos.x - (ParPos.x + ParPos.width  / 1.5),
    deltaY = Pos.y - (ParPos.y + ParPos.height / 2  ),
    
    DiffAng = Math.atan2(deltaX, deltaY) * 180 / Math.PI;

  $$.eq($$.length - 1)
    .css({ transform: `translate(${ Pos.x }px, ${ Pos.y }px) scale(1) rotate(${ -DiffAng + 90 }deg)` })
    .attr({
      d:      path,
      fill:   '#fc4',
      stroke: '#ca2',
      'stroke-width': 6
    })

  $$ = $("#avatar")

  $$.html($$.html())

  $('#block #close2').click((e: any) => {
    if ($(e.target).parent().index() - 1 >= 0) {
      $(`#ear${ side }Piercing path`).eq($(e.target).parent().index() - 1).remove()
    }

    $(e.target).parents('#block').empty().remove()
  })

  $('#block #piercPos, #block #piercScl').mousemove((e: any) => {
    let
      $$  = $(e.target).parent('#block').find('#piercPos').val(),
      $$2 = $(e.target).parent('#block').find('#piercScl').val(),

      elem  = $(`#ear${ side }Front`).get(0),
      elem2 = $(`#ear${ side }`).get(0),

      Length = elem.getTotalLength(),
      Pos    = elem.getPointAtLength($$ / 100 * Length);

    Length === 0 ? Length = elem2.getTotalLength()                    : void 0
    Pos.x  === 0 ? Pos    = elem2.getPointAtLength($$ / 100 * Length) : void 0
    
    let ParPos = elem.getBBox();

    if (elem.getBBox().x === 0) ParPos = elem2.getBBox()

    let
      deltaX = Pos.x - (ParPos.x + ParPos.width  / 1.5),
      deltaY = Pos.y - (ParPos.y + ParPos.height / 2  ),
      
      DiffAng = -Math.atan2(deltaX, deltaY) * 180 / Math.PI;
    
    css([
      [`#ear${ side }Piercing path`, {
        transform: `translate(${ Pos.x }px, ${ Pos.y }px) scale(${ $$2 / 50 }) rotate(${ DiffAng + 90 }deg)`
      }, $(e.target).parent().index() - 1] 
    ])

    attr([
      [`#ear${ side }Piercing path`, { 'stroke-width': 6 / ($$2 / 50) },
        $(e.target).parent().index() - 1]
    ])

    $(e.target).parent().find('.sm #number').eq(0).html($$)
    $(e.target).parent().find('.sm #number').eq(1).html(Math.round($$2 / 5) / 10) 
  })

  let $$2 = $(e.target);

  $('#block #color2').click((e: any) => {
    piercID = $(e.target).parent().index() - 1

    $('#color_pallete').css({ top: '0%', opacity: 1, 'pointer-events': 'all'})
    $('#color_pallete p.h').text(`${ $$2.text() } ${ side.toLowerCase() } ear #${ sideID }`)
  })
  
  getColor(`${side.toLowerCase()} ear #${sideID}`)

  css([
    [`.menu-bar #block:eq(${ sideID - 1 }) p.sm span`, { background: '#fc4' }],
    [  `.menu-bar #block:eq(${ sideID - 1 }) #color2`, { background: '#fc4' }]
  ])
})


// Applying first piercing settings


$('#block #close2').click((e: any) => {
  let $$ = $(e.target)

  if ($$.parent().index() - 1 >= 0) {
    $(`#earRightPiercing path`).eq($$.parent().index() - 1).remove()
  }

  $$.parents('#block').empty().remove()
})


$('#block input#piercPos, #block input#piercScl').mousemove((e: any) => {
  let
    $$  = $(e.target).parent('#block').find('#piercPos').val(),
    $$2 = $(e.target).parent('#block').find('#piercScl').val(),

    elem  = $(`#earRightFront`).get(0),
    elem2 = $(`#earRight`).get(0),

    Length = elem.getTotalLength(),
    Pos    = elem.getPointAtLength($$ / 100 * Length);

  Length === 0 ? Length = elem2.getTotalLength()                    : void 0
  Pos.x  === 0 ? Pos    = elem2.getPointAtLength($$ / 100 * Length) : void 0
  
  let ParPos = elem.getBBox();

  if (elem.getBBox().x === 0) ParPos = elem2.getBBox()

  let
    deltaX = Pos.x - (ParPos.x + ParPos.width  / 1.5),
    deltaY = Pos.y - (ParPos.y + ParPos.height / 2  ),
    
    DiffAng = -Math.atan2(deltaX, deltaY) * 180 / Math.PI;
  
  css([
    [`#earRightPiercing path`, {
      transform: `translate(${ Pos.x }px, ${ Pos.y }px) scale(${ $$2 / 50 }) rotate(${ DiffAng + 90 }deg)`
    }, $(e.target).parent().index() - 1]
  ])

  attr([
    [`#earRightPiercing path`, { 'stroke-width': 6 / ($$2 / 50) },
      $(e.target).parent().index() - 1]
  ])

  $(e.target).parent().find('.sm #number').eq(0).html($$)
  $(e.target).parent().find('.sm #number').eq(1).html(Math.round($$2 / 5) / 10) 
})


$('#block #color2').click((e: any) => {
  piercID = $(e.target).parent().index() - 1

  $('#color_pallete').css({ top: '0%', opacity: 1, 'pointer-events': 'all'})
  $('#color_pallete p.h').text(`ring right ear #1`)
})
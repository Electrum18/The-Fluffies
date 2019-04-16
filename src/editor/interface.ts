let { html, css, attr } = require('../shorthands_jQuery.ts'),
    anime = require('anime'),
    $     = require('jquery'),


rgbToHsl = (Color: any) => {
  let ColrArr = Color.replace(/[^\d,]/g, '').split(','),
      r = ColrArr[0], g = ColrArr[1], b = ColrArr[2];
  
  r /= 255, g /= 255, b /= 255

  var max = Math.max(r, g, b), min = Math.min(r, g, b),
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
},

menu_opened = 0,


Open_menu = () => {
  if (menu_opened < 1) {
    css('#menu-circle', { transform: 'translate(50%, 50%) scale(1)' })
  
    attr([ ['#menu-button #button', { fill: '#333' }],
           [  '#menu-button #bars path', { fill: '#fff' }] ])

    menu_opened = 1
  } else {
    Menu_close()
    Menu_editor_close(1)
    Close_MM()

    menu_opened = 0
  }
  return menu_opened
},


Menu_close = () => {
  attr([ [   '#menu-button #button', { fill: '#fff' }],
         ['#menu-button #bars path', { fill: '#333' }] ])

  css([
    [               '#menu-circle', { transform: 'translate(50%, 50%) scale(0)'               }],
    ['.menu-bar #title #arrowDown', { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }],
    [    '.menu-bar #title #close', { transform: 'translate(-80%, -50%) scale(0)', opacity: 0 }]
  ])
  
  $('.menu-bar *').not('#title, #title *').css({ opacity: 0 })
},


Open_menu_editor = () => {
  attr([ [             '#menu-back', {    r: '165%' }],
         [   '#menu-button #button', { fill: '#333' }],
         ['#menu-button #bars path', { fill: '#fff' }] ])

  css([ 
    [            '#avatar', {      left: '33%'                  }],
    [ '#menu-button #bars', { transform: 'scale(0)', opacity: 0 }],
    ['#menu-button #close', { transform: 'scale(1)', opacity: 1 }],
    [              '#menu', { 'pointer-events': 'all'           }] 
  ])

  setTimeout(() => {
    css('.menu-bar', { top: '0', opacity: 1, height: '6vmin', 'pointer-events': 'all' })
  }, 250)

  Menu_close()
},

Menu_editor_close = (allow = 0) => {
  css([
    [    '#menu', { 'pointer-events': 'none' }],
    ['.menu-bar', { top: '-30vmin', opacity: 0, 'padding-bottom': '0', height: '6vmin',
      'pointer-events': 'none' }]
  ])

  if (allow > 0) {
    css([ ['#menu-button #close', { transform: 'scale(0)', opacity: 0 }],
          [ '#menu-button #bars', { transform: 'scale(1)', opacity: 1 }], ])

    setTimeout(() => {
      attr('#menu-back', {    r: '0%'  })
       css(   '#avatar', { left: '50%' })
    }, 250)
  }
},


Toggle_tab = (e: any) => {
  let obj = $(e.target).parents('.menu-bar'),
      apply = (h: string, o: number, pe: string, n: number, n2: number, round: string) => {
        obj.css({ height: h })
        obj.find('*').not('#title, #title *').css({ opacity: o, 'pointer-events': pe })

        obj.find('#title #arrowDown').css({ transform:`translate(-50%, -50%) scale(${n})`,
          opacity: n  })
        obj.find('#title #close').css({ transform:`translate(-50%, -50%) scale(${n2})`,
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
            .css({ 'border-radius': `${b[0]} 0 0 ` + round  })
          $('.menu-bar').eq(obj.index()    ).find('#title')
            .css({ 'border-radius': round + ` 0 0 ${b2[3]}` })
        } else {
          let b = obj.find('#title').css('border-radius').match(/\S+/g)

          $('.menu-bar').eq(obj.index() - 1).find('#title')
            .css({ 'border-radius': `${b[0]} 0 0 1.5vmax` })
        }
      };

  obj.height() === $(e.target).parent().height() ? 
    apply(     '', 1,     '', 0, 1, '1.5vmax') 
  : apply('6vmin', 0, 'none', 1, 0,       '0')
},


Open_MM = () => {
  let ang = 0;
  Menu_editor_close()

  attr('#menu svg', { preserveAspectRatio: 'xMaxYMid meet' })

  anime({
    targets: '#mask_Menu path',
    d: [{ value: ['M10 0c0 255 0 545 0 800h625V0h-625z', 'M-400 0c108 255 108 545 0 800h625V0h-625z'] }],
    easing: 'easeInOutQuart',
    duration: 250
  })

  css([ [  '#avatar', {  left: '30vmax' }],
        ['.MM-block', { right: '-1%'    }] ])

  $('body').mousewheel((event: any) =>{ 
    ang += event.deltaY * 3

    if (ang < 0) { ang = 0 } else 
    if (ang > ($('.MM-bar').length - 1) * 8) 
      { ang = ($('.MM-bar').length - 1) * 8 }
    
    $('.MM-bar').each((i:number) => {
      $('.MM-bar').eq(i).css({ transform: `translate(-110%, -50%) rotate(${-ang + (i * 8)}deg)` })
    })
  })
},


Close_MM = () => {
  attr('#menu svg', { preserveAspectRatio: 'none' })

  anime({
    targets: '#mask_Menu path',
    d: [{ value: ['M-400 0c108 255 108 545 0 800h625V0h-625z', 'M10 0c0 255 0 545 0 800h625V0h-625z'] }],
    easing: 'easeInOutQuart',
    duration: 250
  })

  css('.MM-block', { right: '-150%' })
},


Hue = 0, Satur = 100, Light = 50, trueLight = 100,


Circle_Ang = (x: any, y: any) => {
  let mouseX = x - ($('#color_pallete #body').offset().left + ($('#color_pallete #body').width() / 2)), 
      mouseY = ($('#color_pallete #body').offset().top + ($('#color_pallete #body').height() / 2)) - y,

      Ang = Math.atan2(mouseX, mouseY) * 180 / Math.PI;

  Hue = Ang

  attr('#body #color', { 'stop-color': `hsl(${ Hue }, 100%, 50%)` })

  css([ [        '#color_circle', {  transform: `translate(-50%, -1075%) rotate(${ Ang }deg)` }],
        ['#color_pallete #color', { background: `hsl(${ Hue }, ${ Satur }%, ${ Light }%)`     }] ])
  
  setColor('#color_pallete #color')
},


Box_Ang = (x: any, y: any) => {
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
},


setColor = (e: string) => {
  let Color = $(e).css('background-color'),
      ColrArr: any[] = Color.match(/\d+/g),

      Target: any, Type: number, HSL: number[], mainObj: any;

  switch ($(e).parents('#color_pallete').find('p.h').text()) {
    case 'fur':  Type = 3; break
    case 'eyes': Type = 2; break
    case 'mane': Type = 1,
      Target = '.Hair #front, #back, .Head #hair_Front, ' +
        '.Hair2 #front, .HairBack #tail, .HairBack2 #tail, .HairBack3 #back'
  }

  switch (Type) {
    case 2:
      mainObj = $('.menu-bar').eq(0);

      css([
        ['.menu-bar:eq(0) #color', {   background: $('defs #grad_Eyes #1').css('stop-color') }],
        [    'defs #grad_Eyes #1', { 'stop-color': $(e).css('background-color')              }],
        [    'defs #grad_Eyes #2', { 'stop-color':
          `rgb(${ColrArr[0] / 1.5},${ColrArr[1] / 1.5},${ColrArr[2] / 1.5})` }]
      ])
        
      HSL = rgbToHsl($('defs #grad_Eyes #1').css('stop-color'));
      Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100

      mainObj.find('#sliderBox svg > path').eq(0)
        .css({ stroke: $('defs #grad_Eyes #1').css('stop-color') })
      mainObj.find('p span#number:eq(0), p span#number:eq(1), p span#number:eq(2), #favColor, input#eyesScale')
        .css({ background: $('defs #grad_Eyes #1').css('stop-color') })
    break

    case 1:
      mainObj = $('.menu-bar').eq(1);

      attr(Target, { fill: $(e).css('background-color') })

      css([
        ['.menu-bar:eq(1) #color', { background: $(e).css('background-color') }],
        [Target, 
          { stroke: `rgb(${ColrArr[0] / 1.5},${ColrArr[1] / 1.5},${ColrArr[2] / 1.5})` }],
      ])
      
      mainObj.find('#favColor').css({ background: $('.Hair #front').css('fill') })

      HSL = rgbToHsl($('.Hair #front').css('fill'));
      Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100
    break

    case 3:
      mainObj = $('.menu-bar').eq(2);

      $('.Head path, .Neck path').not('.inner, .inner2, .inner3, .HairBack3 #back, .eyes, #mouth')
        .attr({ fill: $(e).css('background-color') })
        .css( { stroke: `rgb(${ColrArr[0] / 1.5},${ColrArr[1] / 1.5},${ColrArr[2] / 1.5})` })

      attr('.Neck .inner, .Head .inner2, .Head .inner3', { fill: $(e).css('background-color') })
      
      css([
        ['.Neck .inner, .Head .inner2, .Head .inner3',
                   { stroke: $(e).css('background-color')                            }],
        ['#mouth', { 
          stroke: `rgb(${ColrArr[0] / 1.5},${ColrArr[1] / 1.5},${ColrArr[2] / 1.5})` }],
        [     '.menu-bar:eq(2) #color', { background: $('.Head #head').css('fill')   }]
      ])
      
      mainObj.find('#favColor').css({ background: $('.Head #head').css('fill') })
      
      HSL = rgbToHsl($('.Head #head').css('fill'));
      Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100
    break

    default: return
  }
},


getColor = (name: string) => {
  let Target = ['.Head #head', 'defs #grad_Eyes #1', '.Hair #front'],
      Type = 0;

  switch (name) {
    case 'Mane': Type = 2; break
    case 'Eyes': Type = 1; break
    case 'Fur':  Type = 0; break
  }

  let HSL = rgbToHsl(Type === 1 ? $(Target[Type]).css('stop-color') : $(Target[Type]).css('fill'));

  Hue = HSL[0] * 360, Satur = HSL[1] * 100, Light = HSL[2] * 100
  
  attr('#body #color', { 'stop-color': `hsl(${ Hue }, 100%, 50%)` })

  css([ 
    [        '#color_circle', {  transform: `translate(-50%, -1075%) rotate(${ Hue }deg)` }],
    ['#color_pallete #color', { background: `hsl(${ Hue }, ${ Satur }%, ${ Light }%)`     }],
    [           '#color_box', { 
      transform: `translate(${ (19 * Satur) - 1000 }%, ${ -(19 * trueLight) + 900 }%)`
    }],
    [    '#color_box circle', { stroke: trueLight < 50 ? '#fff' : '#000' }] 
  ])
},


Box_Scale = (x: any, y: any, id: number) => {
  let X =      (x - $('#menu #sliderBox').eq(id).offset().left) / $('#menu #sliderBox').eq(id).outerWidth(),
      Y = 1 - ((y - $('#menu #sliderBox').eq(id).offset().top ) / $('#menu #sliderBox').eq(id).outerHeight());

  if (X < 0.35 && Y < 0.35) { Y < X ? X = 0.35 : Y = 0.35 }

  X > 1 ? X = 1 : X < 0 ? X = 0 : void 0
  Y > 1 ? Y = 1 : Y < 0 ? Y = 0 : void 0

  html([ ['p span#number', Math.round(10 + X * 115), id + 1],
         ['p span#number', Math.round(10 + Y * 115), id + 2] ])

  css('#sliderBox #tapPoint', { transform: `translate(${(755 * X) - 50}%, ${-730 * Y + 365}%)` }, id)
},


Hold = 0;

$(             '#menu-button').click((e: any) => { switch (e.which) { case 1: default: Open_menu()        }})
$('#menu-circle #menu-avatar').click((e: any) => { switch (e.which) { case 1: default: Open_menu_editor() }})
$(          '#menu_of_models').click((e: any) => { switch (e.which) { case 1: default: Open_MM()          }})
$('#menu .mark-arrow').not('#favColor')
  .click((e: any) => { switch (e.which) { case 1: default: Toggle_tab(e) } })

Menu_close()


$('body') // Change avatar on hold after click
  .mousedown((e: any) => {
    // dont delete this 'debugger' pls
    //console.log(e.target.id, $(e.target).attr('class'), $(e.target).parent().attr('id'))
    if ($(e.target).index('.menu-bar #sliderBox') === 0 && e.target.id === 'sliderBox' )
                                       { switch (e.which) { case 1: default: Hold = 3 }
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
      case 3: Box_Scale( e.pageX, e.pageY, 0)
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


$('.menu-bar *').not('#title, #title *').css({ opacity: 0 })
css('#avatar', { bottom: 0 })

setTimeout(() => { $('#avatar').css({ transition: 'all .25s ease' }) }, 1500)


$('.menu-bar').each((i: number) => {
  $('.menu-bar').eq(i).find('*').not('#title, #title *').css({ opacity: 0, 'pointer-events': 'none' })
})
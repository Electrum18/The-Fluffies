// JSON coordinates import's

import * as svg from './pony/body.json'
import * as svgHairs from './pony/hair.json'
import * as svgEmotes from './pony/emotions.json'

var { css, attr } = require('../shorthands_jQuery.ts'),
    polymorph = require('polymorph'),

       svgBody: any = [],    svgBodyName: string[] = [],   svgs: any = svg,
       svgHair: any = [],    svgHairName: string[] = [],  svgHs: any = svgHairs,
    svgEmotion: any = [], svgEmotionName: string[] = [], svgEms: any = svgEmotes;

for (var key in svg) {
  svgBody.push(svgs[key])
  if (svg.hasOwnProperty(key)) { svgBodyName.push('#' + key) }
}

for (var key in svgHairs) {
  svgHair.push(svgHs[key])
  if (svgHairs.hasOwnProperty(key)) { svgHairName.push('#' + key) }
}

for (var key in svgEmotes) {
  svgEmotion.push(svgEms[key])
  if (svgEmotes.hasOwnProperty(key)) { svgEmotionName.push('#' + key) }
}

// JSON import's end


var Set_Attr = (ratioX: number, Scale: number) => {  // Direct application to objects
  let sclPpl_LX = +$('.menu-bar p.X span:eq(0)').html() / 100,
      sclPpl_LY = +$('.menu-bar p.sm.num span:eq(0)').html() / 100,
      sclIris   = +$('input#eyesScale').val() / 100,

      left  = ((($( '#eye_Left').position().left - 
        $('#avatar').offset().left) / $('#avatar').width()) * 1024) + 80,

      right = ((($('#eye_Right').position().left - 
        $('#avatar').offset().left) / $('#avatar').width()) * 1024) + 80,

      top =  ((($('#eye_Right').position().top - 
        $('#avatar').offset().top) / $('#avatar').height()) * 1024) + 48;

  Scale > 0 ? ( right = right + (ratioX * right * 0.15)  )
            : ( left = 1024 - left, right = 1024 - right )

  attr([ 
    ['#headClip, #headClip2, #headClip3, #headClip4', 
                        { d: $('#head').attr('d')      }],
    [     '#noseClip',  { d: $('#nose').attr('d')      }],
    [ '#eyeClip_Left',  { d: $('#eye_Left').attr('d')  }],
    ['#eyeClip_Right',  { d: $('#eye_Right').attr('d') }],
    ['#earClip_Right',  { d: $('#ear_Right').attr('d') }],
    ['#earClip_Right2', { d: $('#ear_Right_Front').attr('d') || $('#ear_Right').attr('d') }],
    
    [ '#eyeIris_Left', { 
      cx: left - 6,
      cy: top,
      rx: (7.5  * sclIris) + '%',
      ry: (13.5 * sclIris) + '%' 
    }],
    
    ['#eyePupil_Left', {
      cx: left - 6 + (6 * sclPpl_LX) - (15 * sclIris),
      cy: top,
      rx: (6  * sclPpl_LX * sclIris) + '%',
      ry: (10 * sclPpl_LY * sclIris) + '%',
      'transform-origin': `${ left - 21 }px ${ top }px` 
    }],
    
    [ '#eyeGlare_Left', { cx: left - 21, cy: top, rx: 3    + '%', ry: 5.5 + '%' }],
    ['#eyeGlare2_Left', { cx: left - 21, cy: top, rx: 1.25 + '%', ry: 2   + '%' }],
    
    [ '#eyeIris_Right', {
      cx: right + 8,
      cy: top,
      rx: (7.5  * sclIris) + '%',
      ry: (13.5 * sclIris) + '%'
    }],
    
    ['#eyePupil_Right', { 
      cx: right + 8 - (6 * sclPpl_LX) + (15 * sclIris),
      cy: top,
      rx: (6  * sclPpl_LX * sclIris) + '%',
      ry: (10 * sclPpl_LY * sclIris) + '%',
      'transform-origin': `${ right + 23 }px ${ top }px`
    }],
    
    [ '#eyeGlare_Right', { cx: right + 23, cy: top, rx: 3    + '%', ry: 5.5 + '%' }],
    ['#eyeGlare2_Right', { cx: right + 23, cy: top, rx: 1.25 + '%', ry: 2   + '%' }]
  ])
  
  css([ 
    [  '#eyeGlare_Left', { 'transform-origin': `${  left - 21 + 100 }px ${ top - 65 }px` }],
    [ '#eyeGlare2_Left', { 'transform-origin': `${  left - 21       }px ${ top      }px` }],
    [ '#eyeGlare_Right', { 'transform-origin': `${ right + 23 + 100 }px ${ top - 65 }px` }],
    ['#eyeGlare2_Right', { 'transform-origin': `${ right + 23       }px ${ top      }px` }] 
  ])

  $('#eyeGlare_Left').parent('g').css({
    transform: `scale(${ -Scale }, 1)`,
    'transform-origin': `${ left - 21 }px ${ top }px`
  })

  $('#eyeGlare_Right').parent('g').css({
    transform: `scale(${ -Scale }, 1)`,
    'transform-origin': `${ right + 23 }px ${ top }px`
  })

  return ratioX
},

Animate = (angX = 0, angY = 0) => { // Animation process (objects calculation)
  let ApplyBody = (part: any, frame: number, X_type: number) => {
    // Morph calculation of body - head part
    if (isNaN(part)) { part = svgBodyName.indexOf('#' + part) }  // Translate name to index

    let id = '',
        X = Math.round(X_type * 10) / 900,
        interpolatorX = polymorph.interpolate(
          [svgBody[part][frame], svgBody[part][frame - 1]], { precision: 1 }
        );

    switch (part) {
      case 2:  id = 'chin'; break
      case 4:  id = 'nose'; break
      case 18: id = 'jaw';  break
      default: id = ''
    }

    if (id.length > 0) {
      var indx = 0;

      let interpolatorEmotes = polymorph.interpolate(
        [svgEmotion[indx][id][frame], svgEmotion[indx][id][frame - 1]], { precision: 1 }
      );

      var interpolatorTwos = polymorph.interpolate([interpolatorX(X), interpolatorEmotes(X)], { precision: 1 });
    }
    
    switch (part) {
      case 2: case 4: case 18: 
        $(svgBodyName[part]).attr('d', interpolatorTwos(emoteProps['jaw_Open'] / 100)); break

      //case 18: 
      //  indx = 1; $(svgBodyName[part]).attr('d', interpolatorTwos(emoteProps['sad'] / 100)); break
      
      case 5: case 7:
        if (angY >= 0 && Ang_alv_X === 0) {
          $(svgBodyName[part]).attr('d', '')
          $(svgBodyName[part] + '_Front').attr('d', interpolatorX(X))
        } else {
          $(svgBodyName[part]).attr('d', interpolatorX(X))
          $(svgBodyName[part] + '_Front').attr('d', '')
        }; break

      case 6: case 8:
        if (angY < 0 && Ang_alv_X < 22.5) {
          $(svgBodyName[part]).attr('d', interpolatorX(X))
          $(svgBodyName[part] + '_Front').attr('d', '')
        } else {
          $(svgBodyName[part]).attr('d', '')
          $(svgBodyName[part] + '_Front').attr('d', interpolatorX(X))
        }; break

      default: $(svgBodyName[part]).attr('d', interpolatorX(X))
    }
  },

  ApplyHair = (part: any, frame: number, X_type: number, type: string) => {  // Morph calculation of hair part
    if (isNaN(part)) { part = svgHairName.indexOf('#' + part) }  // Translate name to index

    let X = Math.round(X_type * 10) / 900,
        interpolate = () => {  // X interpolation from center of frames like a function
            let parts = svgHair[part][type].main;
            
            if (angX > 0) { return polymorph.interpolate([parts[frame], parts[frame - 1]], { precision: 1 }) }
                     else { return polymorph.interpolate([parts[frame], parts[frame + 1]], { precision: 1 }) }
        },

        interpolatorX = interpolate();

    switch (type) {
      case 'tail':
        angX > 0 || (angX > -45 && angX <= 0 && angY < 0 && hairType === 'Spiky to side') ?
          ($('g.HairBack #tail').attr('d', interpolatorX(X)), $('g.HairBack2 #tail').attr('d', ''))
        : ($('g.HairBack #tail').attr('d', ''), $('g.HairBack2 #tail').attr('d', interpolatorX(X)))
        break

      case 'back':
        if (part !== 2 && part !== 3) {  // not hairType = Spikes && Big Bang
          angX < 0 ?
            ($('g.HairBack3 #back').attr('d', interpolatorX(X)), $('g.Hair #back').attr('d', ''))
          : ($('g.HairBack3 #back').attr('d', ''), $('g.Hair #back').attr('d', interpolatorX(X)))
        } else {
          $('g.HairBack3 #back').attr('d', interpolatorX(X))
          $('g.Hair #back').attr('d', '')
        }
        break

      case 'front':
        if (part === 1) {  // hairType = Curly
          angX > 0 ?
            ($( 'g.Hair #front').attr('d', interpolatorX(X)), $('g.Hair2 #front').attr('d', ''))
          : ($('g.Hair2 #front').attr('d', interpolatorX(X)), $('g.Hair #front').attr('d',  ''))
        } else {
          $('g.Hair #front').attr('d', interpolatorX(X))
          $('g.Hair2 #front').attr('d', '')
        }
        break

      default: return
    }
  },

  Ang_alv_X = angX < 0 ? -angX : angX,

  stageFrame_X: number , frame: number;

    ApplyBody('head',  1, Ang_alv_X)
    ApplyBody('head2', 1, Ang_alv_X)

  // Objects frames

                     Ang_alv_X >= 32.5 ? (stageFrame_X = (Ang_alv_X - 32.5) * 1.55, frame = 1) :
  Ang_alv_X <= 32.5 && Ang_alv_X >  25 ? (stageFrame_X = (Ang_alv_X - 25) * 12.55,  frame = 2) :
                       Ang_alv_X <= 25 ? (stageFrame_X = Ang_alv_X * 3.67,          frame = 3) : void 0

    ApplyBody('chin_angle', frame, stageFrame_X) 

  Ang_alv_X <= 25   && Ang_alv_X >  15 ? (stageFrame_X = (Ang_alv_X - 15) * 9.1,    frame = 3) :
                       Ang_alv_X <= 15 ? (stageFrame_X = 0,                         frame = 3) : void 0

    ApplyBody('chin', frame, stageFrame_X)

  Ang_alv_X < 15 ? (stageFrame_X = Ang_alv_X * 6, frame = 4) : void 0

    ApplyBody('bridge', frame, stageFrame_X)
    ApplyBody('nose',   frame, stageFrame_X)

    ApplyBody('mouth',  frame, stageFrame_X)

    ApplyBody('nostril_left',  frame, stageFrame_X)
    ApplyBody('nostril_right', frame, stageFrame_X)

  Ang_alv_X >= 45 ?
    (stageFrame_X = (Ang_alv_X - 45) * 2, frame = 1) :
    (stageFrame_X = Ang_alv_X * 2,        frame = 2)

  let obj = 5;
  while(obj < 13) {
    obj <= 8 ? ApplyBody(obj, frame, stageFrame_X) :
           ApplyBody(obj + 2, frame, stageFrame_X)
    obj++
  }

  Ang_alv_X >= 30 ? 
    (stageFrame_X = (Ang_alv_X - 30) * 1.5, frame = 1) :
    (stageFrame_X = Ang_alv_X * 3,          frame = 2)

    ApplyBody('eye_Left',  frame, stageFrame_X)
    ApplyBody('eye_Right', frame, stageFrame_X)

  Ang_alv_X >= 45 ? 
    (stageFrame_X = (Ang_alv_X - 45) * 2, frame = angX > 0 ? 1 : 3) :
    (stageFrame_X = Ang_alv_X * 2,        frame = 2               )

  ApplyHair(hairType, frame, stageFrame_X, 'front')
  
  hairType !== "Big Bang" ?
    ApplyHair(hairType, frame, stageFrame_X, 'tail')
  : $('g.HairBack #tail, g.HairBack2 #tail').attr('d', '')

  hairType !== "Float" && hairType !== "Big Bang" ?
    ApplyHair(hairType, frame, stageFrame_X, 'back')
  : $('g.Hair #back, g.HairBack3 #back').attr('d', '')
},

Scale = 1, angX = 30 / 90, angY = 0,

Transition = (x: number, y: number) => {  // "Avatar" changes - applying
  let ratioX = x / ($('#avatar').width()  / 2  ),
      ratioY = y / ($('#avatar').height() / 1.5);

  angX = ratioX > 1    ? 1    : ratioX < -1    ? -1    : ratioX > -0.03 && ratioX < 0.03 ? 0 : ratioX;
  angY = ratioY > 0.33 ? 0.33 : ratioY < -0.66 ? -0.66 : ratioY > -0.03 && ratioY < 0.03 ? 0 : ratioY;
  
  let alvPositX = angX < 0 ? -angX : angX,  // Alvays positive X
      pow = Math.pow(1 - alvPositX, 10),
      
      Atan = Math.atan2(alvPositX, angY) * 180 / Math.PI,
      Rotate = 90 * angX - Atan * angX;
      Scale  = angX > 0 ? 1 : -1;

  ratioX < 0  ? Rotate = -Rotate                          : void 0
  Rotate > 30 ? Rotate = 30 : Rotate < -30 ? Rotate = -30 : void 0

  Animate(angX * 90, angY * 90)
  
  css([
    ['.move, #eyeClip_Left, #eyeClip_Right', 
                     { transform: `translate(0, ${ angY * 12 * pow }%)`                }],
    [       '.Head', { transform: `scale(${ Scale }, 1) rotate(${ Rotate }deg)`        }],
    [   '#headClip', { transform: `translate(0, ${ -angY * 12 * pow }%)`               }],
    [    '.moveEar', { transform: `translate(0, ${ -angY * 4 * pow }%)`                }],
    ['.moveEarClip', { transform: `translate(99%, ${ -angY * 6 * pow }%) scale(-1, 1)` }],
    [       '.Neck', { transform: `scale(${ Scale }, 1)`                               }]
  ])

  let alvPosOffset = angY >= 0 ? angY * 22 : angY * 6,  // Always positive offset
       scaleOffset =
          angY >= 0 ? 1 + ((angY / 2) * pow)
                    : 1 + ((0.25 - ((1 - angY) / 4)) * pow);

  $('.Hair, .Hair2')
    .css('transform',
      hairType !== "Spiky to side" && hairType !== "Big Bang" ? 
        angX >= 0 ? 
          `rotate(${  Rotate }deg) translate(0, ${ alvPosOffset * pow }%) scale(1, ${ scaleOffset })` 
        : `rotate(${ -Rotate }deg) translate(0, ${ alvPosOffset * pow }%) scale(1, ${ scaleOffset })`

      : angX > 0 ? 
         `rotate(${  Rotate }deg) translate(0, ${ alvPosOffset * pow }%) scale(-1, ${ scaleOffset })` 
       : `rotate(${ -Rotate }deg) translate(0, ${ alvPosOffset * pow }%) scale(1,  ${ scaleOffset })`
    )

  $('.HairBack3')
    .css('transform',
      hairType !== "Spiky to side" && hairType !== "Big Bang" ?
        angX >= 0 ? 
          `translate(0, ${ alvPosOffset * pow }%) scale(-1, ${ scaleOffset })` 
        : `translate(0, ${ alvPosOffset * pow }%) scale(-1, ${ scaleOffset })`
      
      : angX >= 0 ? 
          `translate(0, ${ (alvPosOffset * pow) / 5 }%) scale(-1, 1)` 
        : `translate(0, ${ (alvPosOffset * pow) / 5 }%) scale(-1, 1)`
    )

  hairType === "Spiky to side" || hairType === "Big Bang" ?
    $('.HairBack, .HairBack2')
      .css('transform',
          angX > 0 ?
            `rotate(${  Rotate / 3 }deg) scale(-1, 1)`
          : `rotate(${ -Rotate / 3 }deg) scale(1,  1)`
      )
  : $('.HairBack, .HairBack2').css('transform', '')


  Set_Attr(angX, Scale)
},

Hold = 0, lastX = 0, lastY = 0, resultX = 0.3333, resultY = 0,

hairType = 'Spiky to side',

emoteProps = {  // Emotion properties
  jaw_Open: 0,
  sad: 0
};

Animate(30), Set_Attr(1, 1)  // Apply first frame

$('body')  // Change avatar by mouse
  .mousedown((e: any) => {
    if (e.target.id !== 'menu-back' && $(e.target).attr('class')          !== 'transition' ||          
        e.target.id !== 'slider'    && $(e.target).parent().attr('class') !== 'info' ) {
      
      if (e.target.id === 'avatar' && $(e.target).attr('class') === 'transition' && 
        $(e.target).parent().attr('class') === undefined ) {

        switch (e.which) { case 1: default: lastX = e.pageX, lastY = e.pageY, Hold = 1 }
      } else if ( e.target.id === 'sliderBox' ) {
        switch (e.which) { case 1: default: lastX = e.pageX, lastY = e.pageY, Hold = 2 }
      } else { return }
    }   else { return }
  })
  .mouseup  ((e: any) => { switch (e.which) { case 1: default: Hold = 0 } })
  .mousemove((e: any) => { if (Hold === 1) {
    let mousex = e.pageX, mousey = e.pageY;

    resultX = resultX +  (mousex - lastX)
    resultY = resultY + ((mousey - lastY) * 3)
    
    let ratioX = Math.abs(resultX) / ($('#avatar').width()  / 2  ),
        ratioY = Math.abs(resultY) / ($('#avatar').height() / 1.5);
 
    ratioX > 1 ? (resultX = resultX > 0 ? $('#avatar').width()  / 2   : -$('#avatar').width()  / 2  ) : void 0
    ratioY > 1 ? (resultY = resultY > 0 ? $('#avatar').height() / 1.5 : -$('#avatar').height() / 1.5) : void 0

    Transition(resultX, resultY)

    lastX = mousex, lastY = mousey
    return { resultX, resultY }
  
  } else if (Hold === 2) {
    Set_Attr(angX, Scale)
  }
})

window.addEventListener('touchmove', (e: any) => {  // Phone compatibility (for extra situations)
  let mousex = e.touches[0].pageX, mousey = e.touches[0].pageY

  resultX = resultX +  (mousex-lastX)
  resultY = resultY + ((mousey-lastY) * 3)
    
  let ratioX = Math.abs(resultX) / ($('#avatar').width()  / 2  ),
      ratioY = Math.abs(resultY) / ($('#avatar').height() / 1.5);

  ratioX > 1 ? (resultX = resultX > 0 ? $('#avatar').width()  / 2   : -$('#avatar').width()  / 2  ) : void 0
  ratioY > 1 ? (resultY = resultY > 0 ? $('#avatar').height() / 1.5 : -$('#avatar').height() / 1.5) : void 0

  Transition(resultX, resultY)

  lastX = mousex, lastY = mousey
  return { resultX, resultY }
})

$('input#eyesScale').mousedown(() => {
  $('input#eyesScale').mousemove(() => {
    Set_Attr(angX, Scale)
    $('.menu-bar:eq(0) p span#number:eq(0)').html($('input#eyesScale').val().toString())
  })
})

$('input#jawOpen').mousedown(() => {
  $('input#jawOpen').mousemove(() => {
    emoteProps['jaw_Open'] = +$('input#jawOpen').val()
    //emoteProps['sad'] = $('input#jawOpen').val()
    
    Animate(angX * 90, angY * 90)
    Set_Attr(angX, Scale)

    $('.menu-bar:eq(3) p span#number').html($('input#jawOpen').val().toString())
  })
})

$('.MM-block').mousedown((e: any) => {
  if ($(e.target).children().eq(0).text().length === 0) { return }

  hairType =  $(e.target).children().eq(0).text()

  $('#menu .menu-bar p.name').html(hairType)

  Transition(resultX, resultY)
})

$('#menu .menu-bar p.name').html(hairType)
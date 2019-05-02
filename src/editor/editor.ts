
// JSON coordinates import's

import * as svg from './pony/body.json'
import * as svgHairs from './pony/hair.json'
import * as svgEmotes from './pony/emotions.json'


/* global variables */

let { css, attr } = require('../shorthands_jQuery.ts'),
    polymorph = require('polymorph'),

       svgBody: any = [],    svgBodyName: string[] = [],   svgs: any = svg,
       svgHair: any = [],    svgHairName: string[] = [],  svgHs: any = svgHairs,
    svgEmotion: any = [], svgEmotionName: string[] = [], svgEms: any = svgEmotes,

  
  Angle = 10,

  Scale = 1,
  Hold  = 0,

  angX  = Angle / 90,
  angY  = 0,

  lastX = 0,
  lastY = 0,

  resultX = ((Angle / 2.45) / 90) * window.innerWidth,
  resultY = 0,

  hairType = 'Spiky to side',

  emoteProps = {  // Emotion properties
    jaw_Open: 0,
    sad: 100
  };


/* global variables end */


for (let key in svg) {
  svgBody.push(svgs[key])
  
  if (svg.hasOwnProperty(key)) svgBodyName.push('#' + key)
}

for (let key in svgHairs) {
  svgHair.push(svgHs[key])
  
  if (svgHairs.hasOwnProperty(key)) svgHairName.push('#' + key)
}

for (let key in svgEmotes) {
  svgEmotion.push(svgEms[key])
  
  if (svgEmotes.hasOwnProperty(key)) svgEmotionName.push('#' + key)
}

// JSON import's end


// Applying first functions

Animate(10), Set_Attr(angX, angY, Scale)  // Apply first frame


function Set_Attr (ratioX: number, ratioY: number, Scale: number) {  // Direct application to objects
  let sclPpl_LX = $('.menu-bar p.X span:eq(0)').html() / 100,
      sclPpl_LY = $('.menu-bar p.sm.num span:eq(0)').html() / 100,
      sclIris   = $('input#eyesScale').val() / 100,

      bboxEyeLeft  =  $('#eye_Left').get(0).getBBox(),
      bboxEyeRight = $('#eye_Right').get(0).getBBox(),

      Ang_alv_X = ratioX < 0 ? -ratioX : ratioX,

      left  = {
          x: bboxEyeLeft.x + 80,
        top: bboxEyeLeft.y + bboxEyeLeft.height / 2 + 16
      },
      
      right = {
          x: bboxEyeRight.x + 80,
        top: bboxEyeRight.y + bboxEyeRight.height / 2 + 16
      };

  left.top  = left.top  * (1 + (ratioY / 4) * (1 - Ang_alv_X))
  right.top = right.top * (1 + (ratioY / 4) * (1 - Ang_alv_X))

  ratioX > 0 ?
    ratioX >= 1/3 ? 
      right.x = right.x + (40 + 16   * ratioX) 
    : right.x = right.x + (56 * 2.66 * ratioX)

  : ratioX <= -1/3 ?
      right.x = right.x + (40 + 16   * -ratioX)
    : right.x = right.x + (56 * 2.66 * -ratioX)

  attr([
    ['#headClip, #headClip2, #headClip3, #headClip4', 
                        { d: $('#head').attr('d')            }],
    [      '#noseClip', { d: $('#nose').attr('d')            }],
    [  '#eyeClip_Left', { d: $('#eye_Left').attr('d')        }],
    [ '#eyeClip_Right', { d: $('#eye_Right').attr('d')       }],
    [ '#earClip_Right', { d: $('#ear_Right').attr('d')       }],
    ['#earClip_Right2', { d: $('#ear_Right_Front').attr('d') || $('#ear_Right').attr('d') }],
    /*[ '#ear_Left_Zone', { d: $('#ear_Left').attr('d')  || $('#ear_Left_Front').attr('d')  }],
    ['#ear_Right_Zone', { d: $('#ear_Right').attr('d') || $('#ear_Right_Front').attr('d') }],*/

    [ '#eyeIris_Left', { 
      cx: left.x - 6,
      cy: left.top,
      rx: (7.5  * sclIris) + '%',
      ry: (13.5 * sclIris) + '%' 
    }],
    
    ['#eyePupil_Left', {
      cx: left.x - 6 + (6 * sclPpl_LX) - (15 * sclIris),
      cy: left.top,
      rx: (6  * sclPpl_LX * sclIris) + '%',
      ry: (10 * sclPpl_LY * sclIris) + '%',
      'transform-origin': `${ left.x - 21 }px ${ left.top }px` 
    }],
    
    [ '#eyeGlare_Left', { cx: left.x - 21, cy: left.top, rx: 3    + '%', ry: 5.5 + '%' }],
    ['#eyeGlare2_Left', { cx: left.x - 21, cy: left.top, rx: 1.25 + '%', ry: 2   + '%' }],
    
    [ '#eyeIris_Right', {
      cx: right.x + 8,
      cy: right.top,
      rx: (7.5  * sclIris) + '%',
      ry: (13.5 * sclIris) + '%'
    }],
    
    ['#eyePupil_Right', { 
      cx: right.x + 8 - (6 * sclPpl_LX) + (15 * sclIris),
      cy: right.top,
      rx: (6  * sclPpl_LX * sclIris) + '%',
      ry: (10 * sclPpl_LY * sclIris) + '%',
      'transform-origin': `${ right.x + 23 }px ${ right.top }px`
    }],
    
    [ '#eyeGlare_Right', { cx: right.x + 23, cy: right.top, rx: 3    + '%', ry: 5.5 + '%' }],
    ['#eyeGlare2_Right', { cx: right.x + 23, cy: right.top, rx: 1.25 + '%', ry: 2   + '%' }]
  ])
  
  css([ 
    [  '#eyeGlare_Left', { 'transform-origin': `${  left.x - 21 + 100 }px ${ left.top  - 65 }px` }],
    [ '#eyeGlare2_Left', { 'transform-origin': `${  left.x - 21       }px ${ left.top       }px` }],
    [ '#eyeGlare_Right', { 'transform-origin': `${ right.x + 23 + 100 }px ${ right.top - 65 }px` }],
    ['#eyeGlare2_Right', { 'transform-origin': `${ right.x + 23       }px ${ right.top      }px` }] 
  ])

  $('#eyeGlare_Left').parent('g').css({
    transform: `scale(${ -Scale }, 1)`,
    'transform-origin': `${ left.x - 21 }px ${ left.top }px`
  })

  $('#eyeGlare_Right').parent('g').css({
    transform: `scale(${ -Scale }, 1)`,
    'transform-origin': `${ right.x + 23 }px ${ right.top }px`
  })

  return { ratioX, ratioY }
}


function Animate (angX = 0, angY = 0) { // Animation process (objects calculation)
  function ApplyBody (part: any, frame: number, X_type: number) {
    // Morph calculation of body - head part

    if (isNaN(part)) part = svgBodyName.indexOf('#' + part)  // Translate name to index

    let id = '',
        X  = Math.round(X_type * 10) / 900,

        morphX = polymorph.interpolate(
          [svgBody[part][frame], svgBody[part][frame - 1]], { precision: 0 }
        );

    switch (part) {
      case 2: id = 'chin'; break
      case 4: id = 'nose'; break
    }

    if (part === 18 || part === 27) {
      let 
        morphOpen = polymorph.interpolate(
          [ svgEmotion[0]['jaw'][frame    ],
            svgEmotion[0]['jaw'][frame - 1] ], { precision: 0 }
        ),

        morphSad = polymorph.interpolate(
          [ svgEmotion[1]['jaw'][frame    ],
            svgEmotion[1]['jaw'][frame - 1] ], { precision: 0 }
        ),

        morphSadOpen = polymorph.interpolate(
          [ svgEmotion[2]['jaw'][frame    ],
            svgEmotion[2]['jaw'][frame - 1] ], { precision: 0 }
        );

      var Happy = polymorph.interpolate([  morphX(X),    morphOpen(X)], { precision: 0 }),
          Sad   = polymorph.interpolate([morphSad(X), morphSadOpen(X)], { precision: 0 });

      var morphEmotes = polymorph.interpolate(
            [ Happy(0),
              Sad(  0) ],
            { precision: 0 }
          );

    } else if (part === 2 || part === 4) {
      let morphJaw = polymorph.interpolate(
            [ svgEmotion[0][id][frame],
              svgEmotion[0][id][frame - 1] ], { precision: 0 },
          );

      var Jaw = polymorph.interpolate([morphX(X), morphJaw(X)], { precision: 0 });
    }
    
    switch (part) {
      case 2: case 4: 
        $(svgBodyName[part]).attr('d', Jaw(emoteProps['jaw_Open'] / 100)); break

      case 18: case 27: 
        $(svgBodyName[part]).attr('d', Happy(emoteProps['jaw_Open'] / 100)); break
      
      case 5: case 7: case 19: case 21: case 23:
        if (part === 21 || part === 23) {
          if ($('#checkbox input#haveTassels').prop('checked') === false) {
            $(svgBodyName[part]           ).attr('d', '')
            $(svgBodyName[part] + '_Front').attr('d', '')

            return
          }
        }

        if (angY >= 0 && Ang_alv_X === 0) {
          $(svgBodyName[part]           ).attr('d', ''              )
          $(svgBodyName[part] + '_Front').attr('d', morphX(X))
        } else {
          $(svgBodyName[part]           ).attr('d', morphX(X))
          $(svgBodyName[part] + '_Front').attr('d', ''              )
        }; break

      case 6: case 8: case 20: case 22: case 24:
        if (part === 22 || part === 24) {
          if ($('#checkbox input#haveTassels').prop('checked') === false) {
            $(svgBodyName[part]           ).attr('d', '')
            $(svgBodyName[part] + '_Front').attr('d', '')

            return
          }
        }

        if (angY < 0 && Ang_alv_X < 22.5) {
          $(svgBodyName[part]           ).attr('d', morphX(X))
          $(svgBodyName[part] + '_Front').attr('d', ''              )
        } else {
          $(svgBodyName[part]           ).attr('d', ''              )
          $(svgBodyName[part] + '_Front').attr('d', morphX(X))
        }; break

      case 25: case 26:
        if (part === 25 || part === 26) {
          if ($('#checkbox input#haveFangs').prop('checked') === false) {
            $(svgBodyName[part] ).attr('d', '')

            return
          }
        }

        $(svgBodyName[part]).attr('d', morphX(X))
        break

      default: $(svgBodyName[part]).attr('d', morphX(X))
    }
  }


  function ApplyHair (part: any, frame: number, X_type: number, type: string) {
    // Morph calculation of hair part

    if (isNaN(part)) { part = svgHairName.indexOf('#' + part) }  // Translate name to index

    let X = Math.round(X_type * 10) / 900,
        interpolate = () => {  // X interpolation from center of frames like a function
          let parts = svgHair[part][type].main;
          
          if (angX > 0) {
            return polymorph.interpolate([parts[frame], parts[frame - 1]], { precision: 0 })
          } else {
            return polymorph.interpolate([parts[frame], parts[frame + 1]], { precision: 0 })
          }
        },

        interpolatorX = interpolate();


    switch (type) {
      case 'tail':
        (angX > 0 || (angX > -45 && angX <= 0) ||
           (hairType === 'Spiky to side' || hairType === 'Curly ends')) ?
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
  }


  let Ang_alv_X = angX < 0 ? -angX : angX,

      stageFrame_X: number , frame: number;

    ApplyBody( 'head', 1, Ang_alv_X)
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
    ApplyBody(  'nose', frame, stageFrame_X)

    ApplyBody(      'mouth',  frame, stageFrame_X)
    ApplyBody( 'mouthOuter',  frame, stageFrame_X)
    ApplyBody( 'fangs_Left',  frame, stageFrame_X)
    ApplyBody('fangs_Right',  frame, stageFrame_X)

    ApplyBody( 'nostril_left', frame, stageFrame_X)
    ApplyBody('nostril_right', frame, stageFrame_X)

  Ang_alv_X >= 45 ?
    (stageFrame_X = (Ang_alv_X - 45) * 2, frame = 1) :
    (stageFrame_X = Ang_alv_X * 2,        frame = 2)

    ApplyBody( 'ear_Left_Pinna', frame, stageFrame_X)
    ApplyBody('ear_Right_Pinna', frame, stageFrame_X)
    
    ApplyBody( 'ear_Left_Tassel', frame, stageFrame_X)
    ApplyBody('ear_Right_Tassel', frame, stageFrame_X)
    
    ApplyBody( 'ear_Left_Tassel_Inside', frame, stageFrame_X)
    ApplyBody('ear_Right_Tassel_Inside', frame, stageFrame_X)


  let obj = 5;
  while(obj < 13) {
    obj <= 8 ? ApplyBody(obj,     frame, stageFrame_X) :
               ApplyBody(obj + 2, frame, stageFrame_X)
    obj++
  }

  Ang_alv_X >= 30 ? 
    (stageFrame_X = (Ang_alv_X - 30) * 1.5, frame = 1) :
    (stageFrame_X = Ang_alv_X * 3,          frame = 2)

    ApplyBody( 'eye_Left', frame, stageFrame_X)
    ApplyBody('eye_Right', frame, stageFrame_X)

  Ang_alv_X >= 45 ? 
    (stageFrame_X = (Ang_alv_X - 45) * 2, frame = angX > 0 ? 1 : 3) :
    (stageFrame_X = Ang_alv_X * 2,        frame = 2               )

  ApplyHair(hairType, frame, stageFrame_X, 'front')
  
  hairType !== 'Big Bang' ?
    ApplyHair(hairType, frame, stageFrame_X, 'tail')
  : $('g.HairBack #tail, g.HairBack2 #tail').attr('d', '')

  hairType !== 'Float' && hairType !== 'Big Bang' ?
    ApplyHair(hairType, frame, stageFrame_X, 'back')
  : $('g.Hair #back, g.HairBack3 #back').attr('d', '')
}


function Transition (x: number, y: number) {  // "Avatar" changes - applying
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
      hairType !== 'Spiky to side' && hairType !== 'Big Bang' ? 
        angX >= 0 ? 
          `rotate(${  Rotate }deg) translate(0, ${ alvPosOffset * pow }%) scale(1, ${ scaleOffset })` 
        : `rotate(${ -Rotate }deg) translate(0, ${ alvPosOffset * pow }%) scale(1, ${ scaleOffset })`

      : angX > 0 ? 
         `rotate(${  Rotate }deg) translate(0, ${ alvPosOffset * pow }%) scale(-1, ${ scaleOffset })` 
       : `rotate(${ -Rotate }deg) translate(0, ${ alvPosOffset * pow }%) scale(1,  ${ scaleOffset })`
    )

  $('.HairBack3')
    .css('transform',
      hairType !== 'Spiky to side' && hairType !== 'Big Bang' ?
        angX >= 0 ? 
          `translate(0, ${ alvPosOffset * pow }%) scale(-1, ${ scaleOffset })` 
        : `translate(0, ${ alvPosOffset * pow }%) scale(-1, ${ scaleOffset })`
      
      : angX >= 0 ? 
          `translate(0, ${ (alvPosOffset * pow) / 5 }%) scale(-1, 1)` 
        : `translate(0, ${ (alvPosOffset * pow) / 5 }%) scale(-1, 1)`
    )

  hairType === 'Spiky to side' || hairType === 'Big Bang' ?
    $('.HairBack, .HairBack2')
      .css('transform',
          angX > 0 ?
            `rotate(${  Rotate / 3 }deg) scale(-1, 1)`
          : `rotate(${ -Rotate / 3 }deg) scale(1,  1)`
      )
  : $('.HairBack, .HairBack2').css('transform', '')

  $('#earRightPiercing path').each((i: number) => {
    let 
      $$  = $('.menu-bar #block').eq(i - 1).find('p #number').eq(0).html(),
      $$2 = $('.menu-bar #block').eq(i - 1).find('p #number').eq(1).html(),
        
      elem  = $('#ear_Right_Front').get(0),
      elem2 = $('#ear_Right').get(0),

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

    css('#earRightPiercing path', { 
      transform: `translate(${Pos.x}px, ${Pos.y}px) scale(${$$2}) rotate(${DiffAng + 90}deg)`
    }, i - 1)
  })

  $('#earLeftPiercing path').each((i: number) => {
    let 
      $$  = $('.menu-bar #block').eq(i - 1).find('p #number').eq(0).html(),
      $$2 = $('.menu-bar #block').eq(i - 1).find('p #number').eq(1).html(),
        
      elem  = $('#ear_Left_Front').get(0),
      elem2 = $('#ear_Left').get(0),

      Length = elem.getTotalLength(),
      Pos    = elem.getPointAtLength($$ / 100 * Length);
    
    Length === 0 ? Length = elem2.getTotalLength()                    : void 0
    Pos.x  === 0 ? Pos    = elem2.getPointAtLength($$ / 100 * Length) : void 0

    let ParPos = elem.getBBox();

    if (elem.getBBox().x === 0) ParPos = elem2.getBBox()

    let
      deltaX = Pos.x - (ParPos.x + ParPos.width  / 1.5),
      deltaY = Pos.y - (ParPos.y + ParPos.height / 2  ),
      
      DiffAng = Math.atan2(deltaX, deltaY) * 180 / Math.PI;

    if (elem2.getBBox().x !== 0) DiffAng = -DiffAng + 20

    css('#earLeftPiercing path', {
      transform: `translate(${Pos.x}px, ${Pos.y}px) scale(${$$2 / 50}) rotate(${DiffAng + 90}deg)`
  }, i - 1)
  })

  Set_Attr(angX, angY, Scale)
}


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
    let mousex = e.pageX,
        mousey = e.pageY;

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
    Set_Attr(angX, angY, Scale)
  }
})


window.addEventListener('touchmove', (e: any) => {  // Phone compatibility (for extra situations)
  let mousex = e.touches[0].pageX,
      mousey = e.touches[0].pageY

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
    Set_Attr(angX, angY, Scale)
    $('.menu-bar:eq(0) p span#number:eq(0)').html($('input#eyesScale').val().toString())
  })
})

$('input#jawOpen').mousedown(() => {
  $('input#jawOpen').mousemove(() => {
    emoteProps['jaw_Open'] = +$('input#jawOpen').val()
    //emoteProps['sad'] = $('input#jawOpen').val()
    
    Animate(angX * 90, angY * 90)
    Set_Attr(angX, angY, Scale)

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


// If tassels enabled

$('#checkbox input#haveTassels').change((e: any) => {
  $(e.target).prop('checked') === false ?
    attr([
      ['path#ear_Left_Tassel,        path#ear_Left_Tassel_Inside',        { d: '' }],
      ['path#ear_Left_Tassel_Front,  path#ear_Left_Tassel_Inside_Front',  { d: '' }],
      ['path#ear_Right_Tassel,       path#ear_Right_Tassel_Inside',       { d: '' }],
      ['path#ear_Right_Tassel_Front, path#ear_Right_Tassel_Inside_Front', { d: '' }]
    ])
  
  : Transition(resultX, resultY)
})

$('#checkbox input#haveFangs').change((e: any) => {
  $(e.target).prop('checked') === false ?
    attr('path#fangs_Left, path#fangs_Right', { d: '' })
  
  : Transition(resultX, resultY)
})
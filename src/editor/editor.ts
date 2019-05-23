
// JSON coordinates import's

import * as body from './pony/body.json'
import * as hair from './pony/hair.json'
import * as emotion from './pony/emotions.json'

/* global variables */

import { css, attr } from '../shorthands_jQuery'

let             $ = require('jquery'),
  { interpolate } = require('polymorph'),

     svgHair: any = hair,
  svgEmotion: any = emotion,

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

  jawType = {  // Emotion properties
    open: 0,
    sad: 0,
    surprised: 0
  },

  svg: any  = { hair, emotion },
  path: any = {},

  svgHairName = Object.keys(svg.hair),
  svgBodyName = Object.keys(path);

/* global variables end */

$('g.scale path').each((i: number, e: any) => {
  if (!e.id || e.id === 'tail' || e.id === 'back' || e.id === 'front' || e.id === 'mouthOuter') return
  
  applySvg(e.id)
});

path.mouthOuter = path.mouth  // It is the same

// JSON import's end

// Applying first functions

Animate(10), Set_Attr(angX, angY, Scale)  // Apply first frame


function applySvg (text: string) {
  let pathTo = text.split(/(?=[A-Z])/);

  if(pathTo[pathTo.length - 1] === 'Front' ||
     pathTo[pathTo.length - 1] === 'Zone') return

  function give(inPath: any, i: number) {
    if (i < pathTo.length) {
      let name = pathTo[i].toLowerCase();

      give(inPath[name], i + 1)
    
    } else {
      if (Array.isArray(inPath)) {
        path[text] = inPath
        
      } else {
        give(inPath['basic'], i)
      }
    }
  }

  give(body, 0)
}

function Set_Attr (ratioX: number, ratioY: number, Scale: number) {  // Direct application to objects
  let sclPpl_LX = $('.menu-bar p.X span:eq(0)').html()      / 100,  // Scale of pupil X
      sclPpl_LY = $('.menu-bar p.sm.num span:eq(0)').html() / 100,  // Scale of pupil Y
      sclIris   = $('input#eyesScale').val() / 100,

      eyePos_X = $('.menu-bar p.X span:eq(1)').html()      / 100 * 2 - 1,  // Position of eye X
      eyePos_Y = $('.menu-bar p.sm.num span:eq(1)').html() / 100 * 2 - 1,  // Position of eye Y

      focus = 1 - $('.menu-bar p.sm span:eq(3)').html() / 100,  // eyes focus (inverse value)
      derp  =     $('.menu-bar p.sm span:eq(4)').html() / 100,  // eyes derp

      bboxEyeLeft  =  $('#eyeLeft').get(0).getBBox(),
      bboxEyeRight = $('#eyeRight').get(0).getBBox(),

      Ang_alv_X = ratioX < 0  ? -ratioX : ratioX,
      valX      = ratioX <= 0 ? 60 : -60,

      left  = {
          x: bboxEyeLeft.x + 80 - (eyePos_X * valX) - (focus * 40),
        top: bboxEyeLeft.y + bboxEyeLeft.height  / 2 + 16 - (eyePos_Y * 60) - (derp * valX)
      },
      
      right = {
          x: bboxEyeRight.x + 80 - (eyePos_X * valX) + (focus * 40),
        top: bboxEyeRight.y + bboxEyeRight.height / 2 + 16 - (eyePos_Y * 60) + (derp * valX)
      };

  if ($('input#isAbsolute').prop('checked') === true) {
    left  = {
        x: 656 + (Ang_alv_X * 96) - (eyePos_X * valX) - (focus * valX),
      top: 560 - (eyePos_Y  * 60) - (derp * valX)
    }
    
    right = {
        x: 368 + (Ang_alv_X * 96) - (eyePos_X * valX) + (focus * valX),
      top: 560 - (eyePos_Y  * 60) + (derp * valX)
    }
  } else {
    left.top  = left.top  * (1 + (ratioY / 4) * (1 - (Ang_alv_X)))
    right.top = right.top * (1 + (ratioY / 4) * (1 - (Ang_alv_X)))
  }

  ratioX > 0 ?
    ratioX >= 1/3 ? 
      right.x = right.x + (40 + 16   * ratioX)
    : right.x = right.x + (56 * 2.66 * ratioX)

  : ratioX <= -1/3 ?
      right.x = right.x + (40 + 16   * -ratioX)
    : right.x = right.x + (56 * 2.66 * -ratioX)

  attr([
    ['#headClip, #headClip2, #headClip3, #headClip4', 
                       { d: $('#head').attr('d')     }],
    [     '#noseClip', { d: $('#nose').attr('d')     }],
    [  '#eyeClipLeft', { d: $('#eyeLeft').attr('d')  }],
    [ '#eyeClipRight', { d: $('#eyeRight').attr('d') }],
    [ '#earClipRight', { d: $('#earRight').attr('d') }],
    ['#earClipRight2', { d: $('#earRightFront').attr('d') || $('#earRight').attr('d') }],
    [    '#mouthClip', { d: $('#mouth').attr('d')    }],
    /*[ '#ear_Left_Zone', { d: $('#ear_Left').attr('d')  || $('#ear_Left_Front').attr('d')  }],
    ['#ear_Right_Zone', { d: $('#ear_Right').attr('d') || $('#ear_Right_Front').attr('d') }],*/

    ['#eyeIrisLeft', { 
      cx: left.x - 6,
      cy: left.top,
      rx: (7.5  * sclIris) + '%',
      ry: (13.5 * sclIris) + '%' 
    }],
    
    ['#eyePupilLeft', {
      cx: left.x - 6 + (6 * sclPpl_LX) - (15 * sclIris),
      cy: left.top,
      rx: (6  * sclPpl_LX * sclIris) + '%',
      ry: (10 * sclPpl_LY * sclIris) + '%',
      'transform-origin': `${ left.x - 21 }px ${ left.top }px` 
    }],
    
    ['#eyeGlareLeft', {
      cx: left.x - 21,
      cy: left.top,
      rx: 3   + '%',
      ry: 5.5 + '%'
    }],
    
    ['#eyeGlare2Left', {
      cx: left.x - 21,
      cy: left.top,
      rx: 1.25 + '%',
      ry: 2    + '%'
    }],
    

    ['#eyeIrisRight', {
      cx: right.x + 8,
      cy: right.top,
      rx: (7.5  * sclIris) + '%',
      ry: (13.5 * sclIris) + '%'
    }],
    
    ['#eyePupilRight', { 
      cx: right.x + 8 - (6 * sclPpl_LX) + (15 * sclIris),
      cy: right.top,
      rx: (6  * sclPpl_LX * sclIris) + '%',
      ry: (10 * sclPpl_LY * sclIris) + '%',
      'transform-origin': `${ right.x + 23 }px ${ right.top }px`
    }],
    
    ['#eyeGlareRight', {
      cx: right.x + 23,
      cy: right.top,
      rx: 3   + '%',
      ry: 5.5 + '%'
    }],

    ['#eyeGlare2Right', {
      cx: right.x + 23,
      cy: right.top,
      rx: 1.25 + '%',
      ry: 2    + '%'
    }]
  ])
  
  css([ 
    ['#eyeGlareLeft', {
      transform: 'rotate(45deg)',
      'transform-origin': `${ left.x - 21 + 80 }px ${ left.top - 80 }px`
    }],

    ['#eyeGlare2Left', {
      transform: 'rotate(45deg)',
      'transform-origin': `${ left.x - 21 + 70 }px ${ left.top - 10 }px`
    }],

    ['#eyeGlareRight', {
      transform: 'rotate(45deg)',
      'transform-origin': `${ right.x + 23 + 80 }px ${ right.top - 80 }px`
    }],

    ['#eyeGlare2Right', {
      transform: 'rotate(45deg)',
      'transform-origin': `${ right.x + 23 + 70 }px ${ right.top - 10 }px`
    }] 
  ])

  $('#eyeGlareLeft').parent('g').css({
    transform: `scale(${ -Scale }, 1)`,
    'transform-origin': `${ left.x - 21 }px ${ left.top }px`
  })

  $('#eyeGlareRight').parent('g').css({
    transform: `scale(${ -Scale }, 1)`,
    'transform-origin': `${ right.x + 23 }px ${ right.top }px`
  })

  return { ratioX, ratioY }
}


function Animate (angX = 0, angY = 0) { // Animation process (objects calculation)
  function ApplyBody (part: any, frame: number, X_type: number) {
    // Morph calculation of body - head part

    if (!isNaN(part)) part = svgBodyName[part]  // Translate index to name
    
    let round = { precision: 0 },
        X     = Math.round(X_type * 10) / 900,
        dom   = '#' + part,  // Translate names to elements names

        morphX = interpolate([path[part][frame], path[part][frame - 1]], round);
  
    function elem (object: string[]) {
      let morph = interpolate([object[frame], object[frame - 1]], round);

      return interpolate([morphX(X), morph(X)], round);
    }

    function setEyelid (element: string[], element2: string[], second: string, input: string) {
      if ($(input).val() <= 1) {
        angX > 0 ? $(second).attr('d', '') : $(dom).attr('d', '')

        return
      }

      let 
        secElem   = second.replace('#', ''),  // Get secont element

        morphSecX = interpolate([path[secElem][frame], path[secElem][frame - 1]], round),
        morphSec  = interpolate([element2[frame],         element2[frame - 1]        ], round),
        
        morphSumm = interpolate([morphSecX(X), morphSec(X)], round);  // Y axis of anims second element
      
      morph = elem(element)

      angX > 0 ?
        $(second).attr('d', morphSumm($(input).val() / 100))
      : $(dom   ).attr('d', morph(    $(input).val() / 100))
    }
        
    let morph;  // Creating empty variables

    switch (part) {
      case 'chin': case 'nose':
        let Jaw = elem(svgEmotion.open[part]);

        $(dom).attr('d', Jaw(jawType.open / 100)); break

      case 'mouth':
        let mode = 'basic';
        
        if ($('#checkbox input#haveCatlike').prop('checked') === true) {
          mode = 'catlike'

          morphX = interpolate([
            svgEmotion.catlike.jaw[frame], svgEmotion.catlike.jaw[frame - 1]
          ], round)
        }

        let jawOpen = svgEmotion.open.jaw[mode],  // Buffering
            jawSad  = svgEmotion.sad.jaw[mode],   // Buffering
          //jawSurprised  = svgEmotion.surprised.jaw,   // Buffering

          morphOpen = interpolate([jawOpen[frame], jawOpen[frame - 1]], round),

          morphSad     = interpolate([jawSad.closed[frame], jawSad.closed[frame - 1]], round),
          morphSadOpen = interpolate([jawSad.open[  frame],   jawSad.open[frame - 1]], round),

          //morphSurprised = interpolate([jawSurprised[frame], jawSurprised[frame - 1]], round),

          Happy = interpolate([  morphX(X),    morphOpen(X)], round),
          Sad   = interpolate([morphSad(X), morphSadOpen(X)], round),

          morphEmotes  = interpolate([Happy(jawType.open / 100), Sad(jawType.open / 100)], round );
          /*morphEmotes2 = interpolate([
            morphEmotes(jawType.sad / 100), morphSurprised(X)
          ], round );*/

        $(dom).attr('d', morphEmotes(jawType.sad / 100)); break
        
      case 'mouthOuter':
        let mode2 = 'basic';

        if ($('#checkbox input#haveCatlike').prop('checked') === true) {
          mode = 'catlike'

          morphX = interpolate([
            svgEmotion.catlike.jaw[frame], svgEmotion.catlike.jaw[frame - 1]
          ], round)
        }

        let jawSad2 = svgEmotion.sad.jaw[mode2],   // Buffering

          morphSad2 = interpolate([jawSad2.closed[frame], jawSad2.closed[frame - 1]], round),
          morphMood = interpolate([            morphX(X),              morphSad2(X)], round);

        $(dom).attr('d', morphMood(jawType.sad / 100)); break

      case 'earLeft': case 'earLeftInside': case 'earLeftPinna':
      case 'earLeftTassel': case 'earLeftTasselInside':
        
        if (part === '#earLeftTassel' || part === '#earLeftTasselInside') {
          if ($('#checkbox input#haveTassels').prop('checked') === false) {
            $(dom          ).attr('d', '')
            $(dom + 'Front').attr('d', '')

            return
          }
        }

        if (angY >= 0 && Ang_alv_X === 0) {
          $(dom          ).attr('d', ''       )
          $(dom + 'Front').attr('d', morphX(X))
        } else {
          $(dom          ).attr('d', morphX(X))
          $(dom + 'Front').attr('d', ''       )
        }; break


      case 'earRight': case 'earRightInside': case 'earRightPinna':
      case 'earRightTassel': case 'earRightTasselInside':
        
        if (part === '#earRightTassel' || part === '#earRightTasselInside') {
          if ($('#checkbox input#haveTassels').prop('checked') === false) {
            $(dom           ).attr('d', '')
            $(dom + 'Front').attr('d', '')

            return
          }
        }

        if (angY < 0 && Ang_alv_X < 22.5) {
          $(dom          ).attr('d', morphX(X))
          $(dom + 'Front').attr('d', ''       )
        } else {
          $(dom          ).attr('d', ''       )
          $(dom + 'Front').attr('d', morphX(X))
        }; break

      case 'fangsLeft': case 'fangsRight':
        if ($('#checkbox input#haveFangs').prop('checked') === false) {
          $(dom ).attr('d', '')

          return
        }
        
        $(dom).attr('d', morphX(X))
        break

      case 'eyeLeftLidDown':
        setEyelid(svgEmotion.eyelid.left.up.basic, svgEmotion.eyelid.right.up.basic,
          '#eyeRightLidDown', 'input#leftDownLid')
        break

      case 'eyeRightLidDown':
        setEyelid(svgEmotion.eyelid.right.up.basic, svgEmotion.eyelid.left.up.basic,
          '#eyeLeftLidDown', 'input#rightDownLid')
        break

      case 'eyeLeftLidUp':
        setEyelid(svgEmotion.eyelid.left.down, svgEmotion.eyelid.right.down,
          '#eyeRightLidUp', 'input#leftUpLid')
        break

      case 'eyeRightLidUp':
        setEyelid(svgEmotion.eyelid.right.down, svgEmotion.eyelid.left.down,
          '#eyeLeftLidUp', 'input#rightUpLid')
        break

      case 'eyeLeftLidDownFill':
        setEyelid(path['eyeLeft'], path['eyeRight'],
          '#eyeRightLidDownFill', 'input#leftDownLid')
        break

      case 'eyeRightLidDownFill':
        setEyelid(path['eyeRight'], path['eyeLeft'],
          '#eyeLeftLidDownFill', 'input#rightDownLid')
        break

      case 'eyeLeftLidUpFill':
        setEyelid(svgEmotion.eyelid.left.up.fill, svgEmotion.eyelid.right.up.fill,
          '#eyeRightLidUpFill', 'input#leftUpLid')
        break

      case 'eyeRightLidUpFill':
        setEyelid(svgEmotion.eyelid.right.up.fill, svgEmotion.eyelid.left.up.fill,
          '#eyeLeftLidUpFill', 'input#rightUpLid')
        break

      default: $(dom).attr('d', morphX(X))
    }
  }


  function ApplyHair (part: any, frame: number, X_type: number, type: string) {
    // Morph calculation of hair part

    if (!isNaN(part)) part = svgHairName[part]  // Translate index to name

    let X = Math.round(X_type * 10) / 900,

        interpolate2 = () => {
          // X interpolation from center of frames like a function
          
          let parts = svgHair[part][type].main;
          
          if (angX > 0) {
            return interpolate([parts[frame], parts[frame - 1]], { precision: 0 })
          } else {
            return interpolate([parts[frame], parts[frame + 1]], { precision: 0 })
          }
        },

        interpolatorX = interpolate2();


    switch (type) {
      case 'tail':
        (angX > 0 || (angX > -45 && angX <= 0) ||
           (hairType === 'Spiky to side' || hairType === 'Curly ends')) ?
          ($('g.HairBack #tail').attr('d', interpolatorX(X)), $('g.HairBack2 #tail').attr('d', ''))
        : ($('g.HairBack #tail').attr('d', ''), $('g.HairBack2 #tail').attr('d', interpolatorX(X)))
        break

      case 'back':
        if (part !== 'Spiky to side' && part !== 'Big Bang') {  // not hairType = Spikes && Big Bang
          angX < 0 ?
            ($('g.HairBack3 #back').attr('d', interpolatorX(X)), $('g.Hair #back').attr('d', ''))
          : ($('g.HairBack3 #back').attr('d', ''), $('g.Hair #back').attr('d', interpolatorX(X)))
        } else {
          $('g.HairBack3 #back').attr('d', interpolatorX(X))
          $('g.Hair #back').attr('d', '')
        }
        break

      case 'front':
        if (part === 'Curly ends') {  // hairType = Curly
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

    ApplyBody('chinAngle', frame, stageFrame_X) 

  Ang_alv_X <= 25 && Ang_alv_X >  15 ? (stageFrame_X = (Ang_alv_X - 15) * 9.1,    frame = 3) :
                     Ang_alv_X <= 15 ? (stageFrame_X = 0,                         frame = 3) : void 0

    ApplyBody('chin', frame, stageFrame_X)

  Ang_alv_X < 15 ? (stageFrame_X = Ang_alv_X * 6, frame = 4) : void 0

    ApplyBody('bridge', frame, stageFrame_X)
    ApplyBody(  'nose', frame, stageFrame_X)

    ApplyBody(     'mouth',  frame, stageFrame_X)
    ApplyBody('mouthOuter',  frame, stageFrame_X)
    ApplyBody( 'fangsLeft',  frame, stageFrame_X)
    ApplyBody('fangsRight',  frame, stageFrame_X)

    ApplyBody( 'nostrilLeft', frame, stageFrame_X)
    ApplyBody('nostrilRight', frame, stageFrame_X)
    
    ApplyBody('teethUpper', frame, stageFrame_X)
    ApplyBody('teethLower', frame, stageFrame_X)
    
    ApplyBody('tongue', frame, stageFrame_X)

  Ang_alv_X >= 45 ?
    (stageFrame_X = (Ang_alv_X - 45) * 2, frame = 1) :
    (stageFrame_X = Ang_alv_X * 2,        frame = 2)

    ApplyBody( 'earLeft', frame, stageFrame_X)
    ApplyBody('earRight', frame, stageFrame_X)

    ApplyBody( 'earLeftInside', frame, stageFrame_X)
    ApplyBody('earRightInside', frame, stageFrame_X)

    ApplyBody( 'earLeftPinna', frame, stageFrame_X)
    ApplyBody('earRightPinna', frame, stageFrame_X)
    
    ApplyBody( 'earLeftTassel', frame, stageFrame_X)
    ApplyBody('earRightTassel', frame, stageFrame_X)
    
    ApplyBody( 'earLeftTasselInside', frame, stageFrame_X)
    ApplyBody('earRightTasselInside', frame, stageFrame_X)

    ApplyBody(          'neck', frame, stageFrame_X)
    ApplyBody('neckBack_right', frame, stageFrame_X)
    ApplyBody('neckFront_left', frame, stageFrame_X)
    
    ApplyBody('chest', frame, stageFrame_X)

  Ang_alv_X >= 30 ? 
    (stageFrame_X = (Ang_alv_X - 30) * 1.5, frame = 1) :
    (stageFrame_X = Ang_alv_X * 3,          frame = 2)

    ApplyBody( 'eyeLeft', frame, stageFrame_X)
    ApplyBody('eyeRight', frame, stageFrame_X)

    ApplyBody( 'eyeLeftLidDown', frame, stageFrame_X)
    ApplyBody('eyeRightLidDown', frame, stageFrame_X)

    ApplyBody( 'eyeLeftLidUp', frame, stageFrame_X)
    ApplyBody('eyeRightLidUp', frame, stageFrame_X)

    ApplyBody( 'eyeLeftLidDownFill', frame, stageFrame_X)
    ApplyBody('eyeRightLidDownFill', frame, stageFrame_X)

    ApplyBody( 'eyeLeftLidUpFill', frame, stageFrame_X)
    ApplyBody('eyeRightLidUpFill', frame, stageFrame_X)

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
    ['.move, #eyeClipLeft, #eyeClipRight, #mouthClip', 
                     { transform: `translate(0, ${ angY * 12 * pow }%)`                }],
    ['.Head #tongue', 
      { transform: `translate(0, ${ angY * 12 * pow - (3 - $('input#jawOpen').val() / 33) }%)` }],
    ['.Head #teethUpper', 
      { transform: `translate(0, ${ angY * 12 * pow - (3 - $('input#teethUpper').val() / 33) }%)` }],
    ['.Head #teethLower', 
      { transform: `translate(0, ${ angY * 12 * pow + (5 - $('input#teethLower').val() / 20) }%)` }],
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
        
      elem  = $('#earRightFront').get(0),
      elem2 = $('#earRight').get(0),

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

    css([ ['#earRightPiercing path', { 
      transform: `translate(${Pos.x}px, ${Pos.y}px) scale(${$$2}) rotate(${DiffAng + 90}deg)`
    }, i - 1] ])
  })

  $('#earLeftPiercing path').each((i: number) => {
    let 
      $$  = $('.menu-bar #block').eq(i - 1).find('p #number').eq(0).html(),
      $$2 = $('.menu-bar #block').eq(i - 1).find('p #number').eq(1).html(),
        
      elem  = $('#earLeftFront').get(0),
      elem2 = $('#earLeft').get(0),

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

    css([ ['#earLeftPiercing path', {
      transform: `translate(${Pos.x}px, ${Pos.y}px) scale(${$$2 / 50}) rotate(${DiffAng + 90}deg)`
    }, i - 1] ])
  })

  Set_Attr(angX, angY, Scale)
}

function checkVal (val: string, val2: string, secNum: number) {
  // Checks if value more than other, than decrease second
  
  if ($(val).val() > 100 - $(val2).val()) {
    $(val2).val(100 - $(val).val())
    $(`.menu-bar:eq(0) p span#number:eq(${ secNum })`).html($(val2).val() + '')
  }
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


// If sliders changes


$('input#eyesScale').mousedown(() => {
  $('input#eyesScale').mousemove(() => {
    Set_Attr(angX, angY, Scale)
    $('.menu-bar:eq(0) p span#number:eq(0)').html($('input#eyesScale').val() + '')
  })
})

$('input#jawOpen').mousedown(() => {
  $('input#jawOpen').mousemove(() => {
    jawType.open = $('input#jawOpen').val()
    
    Animate(angX * 90, angY * 90)
    Set_Attr(angX, angY, Scale)
    Transition(resultX, resultY)

    $('.menu-bar:eq(4) p span#number:eq(0)').html($('input#jawOpen').val() + '')
  })
})

$('input#jawSad').mousedown(() => {
  $('input#jawSad').mousemove(() => {
    jawType.sad = $('input#jawSad').val()

    if(jawType.surprised > 0) {
      if (jawType.sad > 50) { jawType.surprised = 100 - jawType.sad     } else
      if (jawType.sad < 50) { jawType.surprised =       jawType.sad * 2 }

    } else if (jawType.surprised < 0) { jawType.surprised = 0 }
    
    Animate(angX * 90, angY * 90)
    Set_Attr(angX, angY, Scale)

    //                 $('input#jawSurprised').val( jawType.surprised)
    $('.menu-bar:eq(4) p span#number:eq(1)').html(jawType.sad)
    //$('.menu-bar:eq(3) p span#number:eq(2)').html(jawType.surprised)
  })
})

$('input#teethUpper').mousedown(() => {
  $('input#teethUpper').mousemove(() => {
    Transition(resultX, resultY)

    $('.menu-bar:eq(4) p span#number:eq(2)').html($('input#teethUpper').val() + '')
  })
})

$('input#teethLower').mousedown(() => {
  $('input#teethLower').mousemove(() => {
    Transition(resultX, resultY)

    $('.menu-bar:eq(4) p span#number:eq(3)').html($('input#teethLower').val() + '')
  })
})

/*$('input#jawSurprised').mousedown(() => {
  $('input#jawSurprised').mousemove(() => {
    if(jawType.sad > 50) { jawType.sad = 100 - $('input#jawSurprised').val() / 2 } else
    if(jawType.sad < 50) { jawType.sad =       $('input#jawSurprised').val() / 2 }

    jawType.surprised = $('input#jawSurprised').val()
    
    Animate(angX * 90, angY * 90)
    Set_Attr(angX, angY, Scale)

                           $('input#jawSad').val( jawType.sad      )
    $('.menu-bar:eq(3) p span#number:eq(1)').html(jawType.sad      )
    $('.menu-bar:eq(3) p span#number:eq(2)').html(jawType.surprised)
  })
})*/

$('input#eyeFocus').mousedown(() => {
  $('input#eyeFocus').mousemove(() => {
    Set_Attr(angX, angY, Scale)

    $('.menu-bar:eq(0) p span#number:eq(5)').html($('input#eyeFocus').val() + '')
  })
})

$('input#eyeDerp').mousedown(() => {
  $('input#eyeDerp').mousemove(() => {
    Set_Attr(angX, angY, Scale)

    $('.menu-bar:eq(0) p span#number:eq(6)').html($('input#eyeDerp').val() + '')
  })
})

$('input#leftUpLid').mousedown(() => {
  $('input#leftUpLid').mousemove(() => {
    checkVal('input#leftUpLid', 'input#leftDownLid', 4)
    Animate(angX * 90, angY * 90)

    $('.menu-bar:eq(0) p span#number:eq(7)').html($('input#leftUpLid').val() + '')
  })
})

$('input#leftDownLid').mousedown(() => {
  $('input#leftDownLid').mousemove(() => {
    checkVal('input#leftDownLid', 'input#leftUpLid', 3)
    Animate(angX * 90, angY * 90)

    $('.menu-bar:eq(0) p span#number:eq(8)').html($('input#leftDownLid').val() + '')
  })
})

$('input#rightUpLid').mousedown(() => {
  $('input#rightUpLid').mousemove(() => {
    checkVal('input#rightUpLid', 'input#rightDownLid', 6)
    Animate(angX * 90, angY * 90)

    $('.menu-bar:eq(0) p span#number:eq(9)').html($('input#rightUpLid').val() + '')
  })
})

$('input#rightDownLid').mousedown(() => {
  $('input#rightDownLid').mousemove(() => {
    checkVal('input#rightDownLid', 'input#rightUpLid', 5)
    Animate(angX * 90, angY * 90)

    $('.menu-bar:eq(0) p span#number:eq(10)').html($('input#rightDownLid').val() + '')
  })
})

// If menu of models scrolled


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
      ['path#earLeftTassel,       path#earLeftTasselInside',       { d: '' }],
      ['path#earLeftTasselFront,  path#earLeftTasselInsideFront',  { d: '' }],
      ['path#earRightTassel,      path#earRightTasselInside',      { d: '' }],
      ['path#earRightTasselFront, path#earRightTasselInsideFront', { d: '' }]
    ])
  
  : Transition(resultX, resultY)
})

// If fangs enabled

$('#checkbox input#haveFangs').change((e: any) => {
  $(e.target).prop('checked') === false ?
    attr([ ['path#fangsLeft, path#fangsRight', { d: '' }] ])
  
  : Transition(resultX, resultY)
})

$('#checkbox input#haveCatlike').change((e: any) => {
  Transition(resultX, resultY)
})
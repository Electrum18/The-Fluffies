import * as svg from './pony/female.json'
import * as svgHairs from './pony/hair.json'

var $         = require('jquery'),
    polymorph = require('polymorph'),

    svgBody: any = [], svgBodyName: string[] = [], svgs:  any = svg,
    svgHair: any = [], svgHairName: string[] = [], svgHs: any = svgHairs;

for (var key in svg) {
  svgBody.push(svgs[key])
  if (svg.hasOwnProperty(key)) {svgBodyName.push('#' + key)}
}
for (var key in svgHairs) {
  svgHair.push(svgHs[key])
  if (svgHairs.hasOwnProperty(key)) {svgHairName.push('#' + key)}
}

var Set_Attr = (ratioX: number, Scale: number, sclPpl_LX = 1, sclPpl_LY = 1) => {
  let left  = ((($( '#eye_Left').position().left - $('#avatar').offset().left) / $('#avatar').width()) * 1024) + 80,
      right = ((($('#eye_Right').position().left - $('#avatar').offset().left) / $('#avatar').width()) * 1024) + 80,

      top = {
        left:  ((($( '#eye_Left').position().top - $('#avatar').offset().top) / $('#avatar').height()) * 1024) + 48,
        right: ((($('#eye_Right').position().top - $('#avatar').offset().top) / $('#avatar').height()) * 1024) + 48
      };

  Scale > 0 ? ( right = right + (ratioX * right * 0.15)  )
            : ( left = 1024 - left, right = 1024 - right )

  $(     '#headClip').attr('d', $('#head')     .attr('d'))
  $( '#eyeClip_Left').attr('d', $('#eye_Left') .attr('d'))
  $('#eyeClip_Right').attr('d', $('#eye_Right').attr('d'))

  $( '#eyeIris_Left').attr({cx: left - 6,  cy: top.left, rx: 7.5 + '%',             ry: 13.5 + '%'})
  $('#eyePupil_Left').attr({cx: left - 21, cy: top.left, rx: (6 * sclPpl_LX) + '%', ry: (10 * sclPpl_LY) + '%',
    'transform-origin': `${left  - 21}px ${top.left}px`
  })
  $('#eyeGlare_Left').attr({cx: left + 40, cy: top.left - 50, rx: 2.5 + '%', ry: 4.5 + '%' })
  //$('#eyeGlare_Left') .css('transform-origin', `${left}px ${top.left}px`)

  $( '#eyeIris_Right').attr({cx: right + 8,  cy: top.right, rx: 7.5 + '%',             ry: 13.5 + '%'})
  $('#eyePupil_Right').attr({cx: right + 23, cy: top.right, rx: (6 * sclPpl_LX) + '%', ry: (10 * sclPpl_LY) + '%',
    'transform-origin': `${right  + 23}px ${top.right}px`
  })
  $('#eyeGlare_Right').attr({cx: right + 40, cy: top.right - 50, rx: 2.5 + '%', ry: 4.5 + '%' })
  //$('#eyeGlare_Right') .css('transform-origin', `${right}px ${top.right}px`)

  return ratioX
},

Animate = (angX = 0, angY = 0) => { // Процесс анимации
  let ApplyBody = (part: any, frame: number, X: number) => {  // Просчет кадров
    if (isNaN(part)) { part = svgBodyName.indexOf('#' + part) }

    let Y             = Math.round(Ang_alv_Y * 10) / 900,
        interpolatorX = polymorph.interpolate([svgBody[part][0][frame], svgBody[part][0][frame - 1]],
          { precision: 1 });

    if (part > 0 && part < 11 && part !== 3) {
      if (angY <= 0) {
        var interpolatorY = polymorph.interpolate([svgBody[part][1][frame], svgBody[part][1][frame - 1]],
          { precision: 1 })
      } else {
        var interpolatorY = polymorph.interpolate([svgBody[part][2][frame], svgBody[part][2][frame - 1]],
          { precision: 1 })
			}

      let interpolatorAll = polymorph.interpolate([interpolatorX(X), interpolatorY(X)], { precision: 1 })
      switch (part) {
        case 5: case 7:
					if (angY >= 0 && Ang_alv_X === 0) {
            $(svgBodyName[part]).attr('d', '')
            $(svgBodyName[part] + '_Front').attr('d', interpolatorAll(Y))
          } else {
            $(svgBodyName[part]).attr('d', interpolatorAll(Y))
            $(svgBodyName[part] + '_Front').attr('d', '')
          }; break

        case 6: case 8:
          if (angY < 0 && Ang_alv_X < 22.5) {
            $(svgBodyName[part]).attr('d', interpolatorAll(Y))
            $(svgBodyName[part] + '_Front').attr('d', '')
          } else {
            $(svgBodyName[part]).attr('d', '')
            $(svgBodyName[part] + '_Front').attr('d', interpolatorAll(Y))
          }; break

        default: $(svgBodyName[part]).attr('d', interpolatorAll(Y)); break
      }
    } else { $(svgBodyName[part]).attr('d', interpolatorX(X)) }
  },

  ApplyHair = (part: any, frame: number, X: number, type: string) => {
    if (isNaN(part)) { part = svgHairName.indexOf('#' + part) }

    let Y             = Math.round(Ang_alv_Y * 10) / 900,
        interpolatorX = angX > 0 ?
            polymorph.interpolate([svgHair[part][type].main[0][frame], svgHair[part][type].main[0][frame - 1]],
              { precision: 1 })
          : polymorph.interpolate([svgHair[part][type].main[0][frame], svgHair[part][type].main[0][frame + 1]],
              { precision: 1 });

    if (type != 'tail') {
      if (angY <= 0) {
        var interpolatorY = angX > 0 ?
          polymorph.interpolate([svgHair[part][type].main[1][frame], svgHair[part][type].main[1][frame - 1]],
            { precision: 1 })
        : polymorph.interpolate([svgHair[part][type].main[1][frame], svgHair[part][type].main[1][frame + 1]],
            { precision: 1 })
      } else {
        var interpolatorY = angX > 0 ?
          polymorph.interpolate([svgHair[part][type].main[2][frame], svgHair[part][type].main[2][frame - 1]],
            { precision: 1 })
        : polymorph.interpolate([svgHair[part][type].main[2][frame], svgHair[part][type].main[2][frame + 1]], 
            { precision: 1 })
      }

      let interpolatorAll = polymorph.interpolate([interpolatorX(X), interpolatorY(X)], { precision: 1 })
      $('g.Hair #front').attr('d', interpolatorAll(Y)) 
    } else {
      angX > 0 ? 
        ($('g.HairBack #tail').attr('d', interpolatorX(X)), $('g.HairBack2 #tail').attr('d', ''))
      : ($('g.HairBack #tail').attr('d', ''), $('g.HairBack2 #tail').attr('d', interpolatorX(X)))
    }
  },

  Ang_alv_X = angX < 0 ? -angX : angX,
  Ang_alv_Y = angY < 0 ? -angY : angY,

  stageFrame_X: number , frame: number;

  $(        '#head2').attr('d', $('#head').attr('d')     )
  $(     '#headClip').attr('d', $('#head').attr('d')     )
  $(    '#headClip2').attr('d', $('#head').attr('d')     )
  $( '#eyeClip_Left').attr('d', $('#eye_Left').attr('d') )
  $('#eyeClip_Right').attr('d', $('#eye_Right').attr('d'))

  ApplyBody('head', 1, Math.round(Ang_alv_X * 10) / 900)

  // Ид, Кол-во кадров
  
                     Ang_alv_X >= 45  ? (stageFrame_X = (Ang_alv_X - 45) * 2,   frame = 1) :
  Ang_alv_X <= 45 && Ang_alv_X > 22.5 ? (stageFrame_X = (Ang_alv_X - 22.5) * 4, frame = 2) :
                     Ang_alv_X < 22.5 ? (stageFrame_X = Ang_alv_X * 4,          frame = 3) : void 0

  ApplyBody('chin',       frame, Math.round(stageFrame_X * 10) / 900)
  ApplyBody('chin_angle', frame, Math.round(stageFrame_X * 10) / 900)

                       Ang_alv_X >= 45   ? (stageFrame_X = (Ang_alv_X - 45) * 2,    frame = 1) :
  Ang_alv_X <= 45  &&  Ang_alv_X > 22.5  ? (stageFrame_X = (Ang_alv_X - 22.5) * 4,  frame = 2) :
  Ang_alv_X <= 22.5 && Ang_alv_X > 11.25 ? (stageFrame_X = (Ang_alv_X - 11.25) * 8, frame = 3) :
                       Ang_alv_X < 11.25 ? (stageFrame_X = Ang_alv_X * 8,           frame = 4) : void 0

  ApplyBody('bridge', frame, Math.round(stageFrame_X * 10) / 900)
  ApplyBody('nose',   frame, Math.round(stageFrame_X * 10) / 900)

  Ang_alv_X >= 45 ? (stageFrame_X = (Ang_alv_X - 45) * 2, frame = 1) :
  Ang_alv_X <  45 ? (stageFrame_X = Ang_alv_X * 2,        frame = 2) : void 0

  if (stageFrame_X > 90) {stageFrame_X = 90}

  let obj = 5;
  while(obj < 13) {
    obj <= 8 ? ApplyBody(obj, frame, Math.round(stageFrame_X * 10) / 900) :
           ApplyBody(obj + 2, frame, Math.round(stageFrame_X * 10) / 900)
    obj++
  }

  Ang_alv_X >= 30 ? (stageFrame_X = (Ang_alv_X - 30) * 3, frame = 1) :
  Ang_alv_X < 45    ? (stageFrame_X = Ang_alv_X * 3,          frame = 2) : void 0

  if (stageFrame_X > 90) {stageFrame_X = 90}

  ApplyBody('eye_Left',  frame, Math.round(stageFrame_X * 10) / 900)
  ApplyBody('eye_Right', frame, Math.round(stageFrame_X * 10) / 900)

  Ang_alv_X >= 45 ? (stageFrame_X = (Ang_alv_X - 45) * 2, frame = angX > 0 ? 1 : 3) :
  Ang_alv_X <  45 ? (stageFrame_X = Ang_alv_X * 2,        frame = 2               ) : void 0

  ApplyHair(hairType, frame, Math.round(stageFrame_X * 10) / 900, 'front')
  ApplyHair(hairType, frame, Math.round(stageFrame_X * 10) / 900, 'tail' )
},

Scale = 1, ratioX = 1,

Transition = (xCoor: number, yCoor: number) => {  // Изменение аватара
    xCoor > $('#avatar').width()  / 2   ? xCoor = $('#avatar').width()  / 2
  : yCoor > $('#avatar').height() / 2.5 ? yCoor = $('#avatar').height() / 2.5

  : xCoor < -($('#avatar').width()  / 2) ? xCoor = -($('#avatar').width()  / 2)
  : yCoor < -($('#avatar').height() / 2) ? yCoor = -($('#avatar').height() / 2) : void 0

  let Atan = Math.atan2(xCoor < 0 ? -xCoor : xCoor, yCoor) * 180 / Math.PI,

      ratioX = xCoor / ($('#avatar').width()  / 2  ),
      ratioY = yCoor / ($('#avatar').height() / 1.5),

      angX = ratioX > 1 ? 1 : ratioX < -1 ? -1 : ratioX > -0.05 && ratioX < 0.05 ? 0 : ratioX,
      angY = ratioY > 1 ? 1 : ratioY < -1 ? -1 : ratioY > -0.05 && ratioY < 0.05 ? 0 : ratioY,

      Moving = 90 * (1 - angX) + Atan * angX,
      Rotate = 180 - (xCoor >= 0 ? Moving : Moving) - 90;
      Scale  = xCoor >= 0 ? 1 : -1;

  ratioX < 0  ? Rotate = -Rotate                          : void 0
  Rotate > 30 ? Rotate = 30 : Rotate < -30 ? Rotate = -30 : void 0

  Animate(angX * 90, angY * 90)
  
  $('.Head').css('transform', `scale(${ Scale }, 1) rotate(${ Rotate }deg)`)
  $('.Neck').css('transform', `scale(${ Scale }, 1)`)
  $('.Hair').css('transform', ratioX > 0 ? `rotate(${ Rotate }deg)` : `rotate(${ -Rotate }deg)`)
  $('.HairBack2').css('transform', `translate(0%, ${ -ratioY }%)`)

  Set_Attr(ratioX, Scale, $('input#sliderX').val() / 100, $('input#sliderY').val() / 100)

  return { Scale, ratioX }
},

Hold = false, mousex = 0, mousey = 0, lastX = 0, lastY = 0, resultX = 0, resultY = 0,

hairType = 'Twilight Sparkle';

Animate(30), Set_Attr(1, 1)  // Приминение начальной установки кадра

$('body')  // Изменение аватара при нажатии мышью (поддержка телефонов)
.mousedown((e: any) => {
  if (e.target.id !== 'menu-back' && $(e.target).attr('class')          !== 'transition' ||          
      e.target.id !== 'slider'    && $(e.target).parent().attr('class') !== 'info' ) {
    
    if (               $(e.target).parent().attr('class') === 'Head'     ||
      e.target.id === ''     && $(e.target).attr('class') === 'morphing' ||
      e.target.id === 'menu' && $(e.target).attr('class') === undefined ) {

      switch (e.which) { case 1: default: lastX = e.pageX, lastY = e.pageY, Hold = true }
    } else { return }
  }   else { return }
})
.mouseup  ((e: any) => { switch (e.which) { case 1: default: Hold = false } })
.mousemove((e: any) => { if (Hold) {
  mousex = e.pageX, mousey = e.pageY

  resultX = resultX + (mousex-lastX)
  resultY = resultY + ((mousey-lastY) * 3)

  Transition(resultX, resultY)

  lastX = mousex, lastY = mousey
} })

window.addEventListener('touchmove', (e: any) => { 
  mousex = e.touches[0].pageX, mousey = e.touches[0].pageY

  resultX = resultX + (mousex-lastX)
  resultY = resultY + ((mousey-lastY) * 3)

  Transition(resultX, resultY)

  lastX = mousex, lastY = mousey
})

$('input#sliderX').mousedown(() => {
  $('input#sliderX').mousemove(() => { Set_Attr(ratioX, Scale, $('input#sliderX').val() / 100,
    $('input#sliderY').val() / 100) })
})

$('input#sliderY').mousedown(() => {
  $('input#sliderY').mousemove(() => { Set_Attr(ratioX, Scale, $('input#sliderX').val() / 100,
    $('input#sliderY').val() / 100) })
})

$('.MM-block').mousedown((e: any) => {
  hairType = $(e.target).children().text() != '' ? $(e.target).children().text() : hairType
  Transition(resultX, resultY)
})

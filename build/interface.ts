let $     = require('jquery'),
    anime = require('anime'),
    menu_opened = 0,

Open_menu = () => {
  if (menu_opened < 1) {
    $(        '#menu-circle').css({ transform: 'translate(50%, 50%) scale(1)' })
    $('#menu-button #button').attr({ fill: '#333' })

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
  $(        '#menu-circle').css({ transform: 'translate(50%, 50%) scale(0)' })
  $('#menu-button #button').attr({ fill: '#fff' })
},

Open_menu_editor = () => {
  $(          '#menu-back').attr({ r: '165%'   })
  $(             '#avatar').css({  left: '33%' })
  $('#menu-button #button').attr({ fill: '#333' })

  setTimeout(() => { $('.menu-bar').css({ top: '0', opacity: 1 }) }, 250)
  Menu_close()
},

Menu_editor_close = (allow = 0) => {
  $('.menu-bar').css({ top: '-10%', opacity: 0, 'padding-bottom': '0' })

  if (allow > 0) {
    setTimeout(() => {
      $('#menu-back').attr({ r: '0%'     })
      $('#avatar')   .css({  left: '50%' })
    }, 250)
  }
},

Toggle_tab = (e: any) => {
  $(e.target).parents('.menu-bar').height() === $(e.target).parent().height() ?
    $(e.target).parents('.menu-bar').css({ height: '' })
  : $(e.target).parents('.menu-bar').css({ height: '7.5vmin'  })
},

Open_MM = () => {
  let ang = 0;
  Menu_editor_close()

  $('#menu svg').attr({ preserveAspectRatio: 'xMaxYMid meet' })

  anime({
    targets: '#mask_Menu path',
    d: [{ value: ['M10 0c0 255 0 545 0 800h625V0h-625z', 'M-400 0c108 255 108 545 0 800h625V0h-625z'] }],
    easing: 'easeInOutQuart',
    duration: 250
  })

  $('#avatar').css({   left: '30vmax' })
  $('.MM-block').css({ right: '-1%'   })

  $('body').mousewheel((event: any) =>{
    ang += event.deltaY * 2

    if (ang < 0) { ang = 0 } else if (ang > ($('.MM-bar').length - 1) * 8) { ang = ($('.MM-bar').length - 1) * 8 }
    
    $('.MM-bar').each((i:number ) => {
      $('.MM-bar').eq(i).css({ transform: `translate(-110%, -50%) rotate(${-ang + (i * 8)}deg)` })
    })
  })
},

Close_MM = () => {
  $('#menu svg').attr({ preserveAspectRatio: 'none' })

  anime({
    targets: '#mask_Menu path',
    d: [{ value: ['M-400 0c108 255 108 545 0 800h625V0h-625z', 'M10 0c0 255 0 545 0 800h625V0h-625z'] }],
    easing: 'easeInOutQuart',
    duration: 250
  })

  $('.MM-block').css({ right: '-150%' })
};

$(             '#menu-button').click((e: any) => { switch (e.which) { case 1: default: Open_menu()        }})
$('#menu-circle #menu-avatar').click((e: any) => { switch (e.which) { case 1: default: Open_menu_editor() }})
$(        '#menu .mark-arrow').click((e: any) => { switch (e.which) { case 1: default: Toggle_tab(e)      }})
$(          '#menu_of_models').click((e: any) => { switch (e.which) { case 1: default: Open_MM()          }})

$('i.material-icons').click((e: any) => { switch (e.which) {
  case 1: default:
    switch ($(e.target).parents('.menu-bar').find('#title p').text()) {
      case 'Mane': 
        
        $(e.target).css({ background: $('.Hair #front').css('fill') }) 
        break
      default: $(e.target).css({ background: '#fa3' })
    }
  }
})
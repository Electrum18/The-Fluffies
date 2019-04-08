var mode   = 0,
    custom = 0,
    date   = new Date(),

setMode = (mode: number) => {
  mode > 0 ? (
       $('body').css({ background: '#333' }),
     $('#title').css({ color: '#333', 'text-shadow': '0 0 0.5vmin rgba(0,0,0,1)' }),
    $('i#night').css({ transform: 'scale(0)' }),
    $('i#light').css({ transform: 'scale(1)' }),
    
    $('#about, #support').css({ color: '#eee' }),
    $('#brand path:not(:last-of-type)').css({ fill: '#333' }),
    $('#shadow feFuncA').attr({ slope: '.5' })
  ) : (
       $('body').css({ background: '#fff' }),
     $('#title').css({ color: '#fff', 'text-shadow': '0 0 0.5vmin rgba(0,0,0,.25)' }),
    $('i#night').css({ transform: 'scale(1)' }),
    $('i#light').css({ transform: 'scale(0)' }),
    
    $('#about, #support').css({ color: '#222' }),
    $('#brand path:not(:last-of-type)').css({ fill: '#fff' }),
    $('#shadow feFuncA').attr({ slope: '.25' })
  )
};


date.getHours() >= 18 || date.getHours() <= 8 ? mode = 1 : mode = 0

setInterval(() => {
  if (custom !== 1) {  
    date.getHours() >= 18 || date.getHours() <= 8 ? mode = 1 : mode = 0
  }
}, 1e3)


$('i#night').click(() => {
  date.getHours() >= 18 || date.getHours() <= 8 ? custom = 1 : custom = 0
  
  mode = 1;
  setMode(mode)
})

$('i#light').click(() => {
  date.getHours() < 18 && date.getHours() > 8 ? custom = 1 : custom = 0
  
  mode = 0;
  setMode(mode)
})


$('#about').hover(() => {
  $('#about').css({ color: '#222' })
}, () => {
  $('body').css('background-color') === 'rgb(255, 255, 255)' ? mode = 0 : mode = 1
  
  mode > 0 ? $('#about').css({ color: '#fff' })
           : $('#about').css({ color: '#222' })
})

$('#support').hover(() => {
  $('#support').css({ color: '#222' })
}, () => {
  $('body').css('background-color') === 'rgb(255, 255, 255)' ? mode = 0 : mode = 1

  mode > 0 ? $('#support').css({ color: '#fff' })
           : $('#support').css({ color: '#222' })
})


setMode(mode)


var tem,
    version: any = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

if(version[1] === 'Chrome'){
  tem = navigator.userAgent.match(/\b(Edge)\/(\d+)/);
  if (tem != null) version = tem;
}

version[1] === 'Firefox' ? 
  $('#brand p:last-of-type').html(`ATTENTION, DOES NOT WORK IN ${ version[1].toUpperCase() } !!!`) :
version[1] === 'Edge' ? 
  $('#brand p:last-of-type').html(`ATTENTION, DOES NOT WORK IN ${ version[1].toUpperCase() } !!!`) : 
/trident/i.test(version[1]) ?
  $('#brand p:last-of-type').html(`ATTENTION, DOES NOT WORK IN IE !!!`)
: $('#brand p:last-of-type').css({ opacity: 0, animation: 'none' })
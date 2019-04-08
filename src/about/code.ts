var mode   = 0,
    custom = 0,
    date   = new Date(),

setMode = (mode: number) => {
  mode > 0 ? (
       $('body').css({ background: '#333' }),
    $('i#night').css({ transform: 'scale(0)' }),
    $('i#light').css({ transform: 'scale(1)' }),

               $('#title').css({ color: '#222', background: '#eee' }),
               $('button').css({ color: '#222', border: '.5vmin solid #222', background: 'transparent' }),
    $('p:not(#copyright)').css({ color: '#bbb' }),
    $('p:not(#copyright) span, h2 span').css({ color: '#eee' })
  ) : (
       $('body').css({ background: '#fff' }),
    $('i#night').css({ transform: 'scale(1)' }),
    $('i#light').css({ transform: 'scale(0)' }),
    
               $('#title').css({ color: '#eee', background: '#222' }),
               $('button').css({ color: '#eee', border: '.5vmin solid #eee', background: 'transparent' }),
    $('p:not(#copyright)').css({ color: '#666' }),
    $('p:not(#copyright) span, h2 span').css({ color: '#444' })
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

$('#back, #back button').hover(() => {
  mode > 0 ? $('#back button').css({ color: '#eee', background: '#222' })
           : $('#back button').css({ color: '#222', background: '#eee' })
}, () => {
  $('body').css('background-color') === 'rgb(255, 255, 255)' ? mode = 0 : mode = 1
  
  mode > 0 ? $('#back button').css({ color: '#222', background: '#eee' })
           : $('#back button').css({ color: '#eee', background: '#222' })
})

$('#support, #support button').hover(() => {
  mode > 0 ? $('#support button').css({ color: '#eee', background: '#222' })
           : $('#support button').css({ color: '#222', background: '#eee' })
}, () => {
  $('body').css('background-color') === 'rgb(255, 255, 255)' ? mode = 0 : mode = 1
  
  mode > 0 ? $('#support button').css({ color: '#222', background: '#eee' })
           : $('#support button').css({ color: '#eee', background: '#222' })
})


setMode(mode)
$(document).ready(() => {
  $('#brand, #brandBack').css({ top: '20%', opacity: 1    })
  
  setTimeout(() => {
    $('#brand, #brandBack').css({ transition: 'none'                         })
     $('#brandBack #title').css({ transform: 'translateY(-133%)', opacity: 1 })

    setTimeout(() => {
       $('#brandBack #title').css({ transition: 'none'                         })
            $('#brandBack p').css({ transform: 'translateY(150%)',  opacity: 1 })
                 $('#button').css({ top: '80%',  opacity: 1                    })
                  $('#phone').css({ top: '-1vmin',  opacity: 1                 })
      
      setTimeout(() => { $('#brandBack p, #phone, #button').css({ transition: 'none' }) }, 1500)
      setTimeout(() => {
        $('#about').css({ top: '110%', left: '-18%', opacity: 1 })
         $('#help').css({ top: '110%', left: '122%', opacity: 1 })

        setTimeout(() => { $('#about, #help').css({ transition: 'none' }) }, 1e3)
      }, 250)
    }, 1e3)
  }, 1e3)
})
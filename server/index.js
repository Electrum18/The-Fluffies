/* eslint-disable no-console */

let io

try {
  io = require('socket.io').listen(5000)

  console.log('connection:  \x1B[40m\x1B[32m SUCCESS \x1B[0m')
} catch (err) {
  console.log('connection:  \x1B[40m\x1B[31m ERROR \x1B[0m')

  return
}

const sendMessage = (mes, type = false, socket = false) => {
  // Message type

  if (type === 'ann') {
    // Announce

    mes.notMessage = true

    if (socket) {
      socket.emit('get announce', mes)
    } else {
      io.emit('get announce', mes)
    }
  } else if (type === 'first') {
    // Greetings

    mes.notMessage = true

    messages.push(mes)

    if (mes.length > maxMessages) {
      messages.shift()
    }

    io.emit('get first', messages)
  } else {
    // Basic

    messages.push(mes)

    if (mes.length > maxMessages) {
      messages.shift()
    }

    io.emit('get message', mes)
  }
}

const maxMessages = 100
const messages = []
const users = []

let length = 0

console.log('variables:   \x1B[40m\x1B[32m ONLINE \x1B[0m')

// Socket event listeners

io.on('connection', (socket) => {
  // Emit data to entered client

  length++

  io.emit('get users', length)

  socket.emit('get first', messages, 'first')

  sendMessage(
    {
      text: 'Welcome to The Fluffies - Feijoa version, enjoy! :3'
    },
    'ann',
    socket
  )

  socket.emit('isnt nickname') // Reset on reconect server

  // Receiving messages to the server

  socket.on('send message', (msg) => {
    if (msg.text.length > 99) return // Text limit

    if (!msg.name.trim() || msg.name.length > 15) {
      socket.emit('isnt nickname')

      return
    }

    // Message assembly

    msg.text = msg.text.charAt(0).toUpperCase() + msg.text.slice(1) // Capitalize
    msg.id = users[socket.id].id

    messages.push(msg)

    if (messages.length > maxMessages) {
      messages.shift()
    }

    // Send messages to client

    io.emit('get message', msg)
  })

  // Checking name

  socket.on('check name', (name) => {
    name = name.trim()

    if (!name || name.length < 2 || name.length > 15) {
      socket.emit('isnt nickname')

      return
    }

    // Duplicate check

    const sockets = Object.keys(users)

    for (let i = 0, len = sockets.length; i < len; i++) {
      if (users[sockets[i]].name === name) {
        socket.emit('isnt nickname')

        return
      }
    }

    // Add to users list

    users[socket.id] = {
      name,
      id: Math.round(Math.random() * 999999)
    }

    // Broadcast to users about connected client

    sendMessage(
      {
        text: '#' + users[socket.id].id + ' joined as ' + users[socket.id].name
      },
      'ann'
    )
  })

  // Removing connected client from list

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      sendMessage(
        {
          text: users[socket.id].name + ' disconnected'
        },
        'ann'
      )
    }

    delete users[socket.id]

    length--

    io.emit('get users', length)
  })
})

console.log('socket:      \x1B[40m\x1B[32m ONLINE \x1B[0m')
console.log('all systems: \x1B[40m\x1B[32m NOMINAL \x1B[0m')

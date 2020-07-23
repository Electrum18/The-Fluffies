/* eslint-disable no-console */

const passportSocketIo = require('passport.socketio')

const keys = require('../config/keys')

function initSocket(io, sessionStore, users, usersPublic, alias) {
  const maxMessages = 100
  const messages = []

  io.use(
    passportSocketIo.authorize({
      cookieParser: require('cookie-parser'),
      key: keys.session.key,
      secret: keys.session.secret,
      store: sessionStore
    })
  )

  io.on('connection', (socket) => {
    const user = socket.request.user

    if (!users[user._id]) {
      users[user._id] = []

      usersPublic.push({
        name: user.name,
        avatar: user.avatars[user.current.avatar],
        badges: user.badges,
        level: user.level
      })

      alias.push(user._id.toString())
    }

    users[user._id].push(socket.id)

    io.emit('get users', usersPublic)
    io.emit('get users count', usersPublic.length)
    io.emit('get messages', messages)

    socket.on('send message', (msg) => {
      if (msg.length > 100) return // Text limit

      const message = {
        name: user.name,
        avatar: user.avatars[user.current.avatar],
        level: user.level,
        text: msg.charAt(0).toUpperCase() + msg.slice(1) // Capitalize
      }

      messages.push(message)

      if (messages.length > maxMessages) {
        messages.shift()
      }

      // Send messages to client

      io.emit('get message', message)
    })

    socket.on('disconnect', () => {
      users[user._id].splice(users[user._id].indexOf(socket.id), 1)

      if (users[user._id].length < 1) {
        delete users[user._id]

        const aliasIndex = alias.indexOf(socket.id.toString())

        usersPublic.splice(aliasIndex, 1)
        alias.splice(aliasIndex, 1)
      }

      io.emit('get users', usersPublic)
      io.emit('get users count', usersPublic.length)
    })
  })
}

module.exports = initSocket

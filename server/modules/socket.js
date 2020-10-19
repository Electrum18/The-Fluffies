/* eslint-disable no-console */

const passportSocketIo = require('passport.socketio')

const keys = require('../config/keys')
const Message = require('../models/message-model')

const day = 24 * 60 * 60 * 1000

async function initSocket(io, sessionStore, users, usersPublic, alias, patreon) {
  const maxMessages = 100
  const messages = []

  let guests = 0

  await loadMessageDB(messages)

  io.use(
    passportSocketIo.authorize({
      cookieParser: require('cookie-parser'),
      key: keys.session.key,
      secret: keys.session.secret,
      store: sessionStore,

      success: onAuthorizeSuccess,
      fail: onAuthorizeFail
    })
  )

  io.on('connection', (socket) => {
    const user = socket.request.user

    if (user.logged_in) {
      if (!users[user._id]) {
        users[user._id] = []

        usersPublic.push({
          name: user.name,
          avatar: user.avatars[user.current.avatar],
          badges: user.badges,
          level: user.level,
          patron: user.ids.patreon && patreon.pledges[user.ids.patreon]
        })

        alias.push(user._id.toString())
      }

      users[user._id].push(socket.id)

      socket.emit('is authorized', true)
    } else {
      guests++
    }

    io.emit('get users', usersPublic)
    io.emit('get users count', usersPublic.length + guests)
    io.emit('get messages', messages)

    socket.on('send message', (msg) => {
      if (msg.length > 100 || !user.logged_in) return // Text limit

      const message = {
        name: user.name,
        avatar: user.avatars[user.current.avatar],
        level: user.level,
        text: msg.charAt(0).toUpperCase() + msg.slice(1), // Capitalize
        patron: user.ids.patreon && patreon.pledges[user.ids.patreon]
      }

      messages.push(message)

      if (messages.length > maxMessages) {
        messages.shift()
      }

      // Send messages to client

      io.emit('get message', message)
    })

    socket.on('disconnect', () => {
      if (user.logged_in) {
        users[user._id].splice(users[user._id].indexOf(socket.id), 1)

        if (users[user._id].length < 1) {
          delete users[user._id]

          const aliasIndex = alias.indexOf(socket.id.toString())

          usersPublic.splice(aliasIndex, 1)
          alias.splice(aliasIndex, 1)
        }
      } else {
        guests--
      }

      io.emit('get users', usersPublic)
      io.emit('get users count', usersPublic.length + guests)
    })
  })

  setInterval(() => addMessagesDB(messages), day)
}

function onAuthorizeSuccess(_, accept) {
  accept(null, true)
}

function onAuthorizeFail(_, message, error, accept) {
  if (error) throw new Error(message)

  accept(null, false)
}

function addMessagesDB(messages) {
  Message.deleteMany({}).then(() => {
    Message.insertMany(messages).then(() => undefined)
  })
}

async function loadMessageDB(messages) {
  for await (const message of Message.find()) {
    messages.push({
      name: message.name,
      avatar: message.avatar,
      level: message.level,
      text: message.text,
      patron: message.patron
    })
  }
}

module.exports = initSocket

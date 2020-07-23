/* eslint-disable no-console */

const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

let io = require('socket.io')

const keys = require('./config/keys')

const initSocket = require('./modules/socket')
const initOAuth = require('./modules/oauth')

io = io.listen(keys.ports.socket)

mongoose.connect(
  keys.mongodb.dbURI,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },

  () => {
    console.log('Connected to MongoDB')
  }
)

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  secret: keys.mongodb.secret
})

const users = {}
const usersPublic = []
const alias = []

initOAuth(keys.ports.oauth, session, sessionStore, io, usersPublic, alias)
initSocket(io, sessionStore, users, usersPublic, alias)

console.log('Socket service launched on port: ' + keys.ports.socket)

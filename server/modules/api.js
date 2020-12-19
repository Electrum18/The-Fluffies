/* eslint-disable no-console */

const app = require('express')()
const cors = require('cors')
const passport = require('passport')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const keys = require('../config/keys')
const User = require('../models/user-model')

const { serverURL } = require('../misc/url')

const authRouter = require('../routes/auth')
const userRouter = require('../routes/user')

Sentry.init({
  dsn: 'https://6bdf01f9d14b4394997950b3e68be358@o491620.ingest.sentry.io/5557616',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  tracesSampleRate: 1.0
})

function initOAuth(port, session, sessionStore, io, usersPublic, alias, patreon) {
  require('../strategies/google')(passport)
  require('../strategies/vkontakte')(passport)
  require('../strategies/patreon')(passport)

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user)
    })
  })

  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.tracingHandler())

  app.use(
    session({
      key: keys.session.key,
      secret: keys.session.secret,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,

      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
      }
    })
  )

  app.use(cookieParser())
  app.use(bodyParser.json())

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(cors({ origin: serverURL, credentials: true }))

  app.use('/auth', authRouter)
  app.use('/user', userRouter(io, usersPublic, alias, patreon))

  app.get('/patrons', (_req, res) => {
    res.send(patreon.patrons)
  })

  app.get('*', (_req, res) => {
    res.redirect(keys.protocol + '://' + keys.host + '/')
  })

  app.use(Sentry.Handlers.errorHandler())

  app.listen(port, () => console.log('Express server launched on port: ' + port))
}

module.exports = initOAuth

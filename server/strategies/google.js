const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const jsonScheme = require('../config/user-scheme.json')

const keys = require('../config/keys')
const User = require('../models/user-model')

const halfOfDay = 12 * 60 * 60 * 1000
const fiveMins = 5 * 60 * 1000

function updateUser(user, currentUser, done) {
  currentUser.updateOne({ 'date.last': Date.now() }).then(() => {
    currentUser.updateOne({ 'avatars.google': user._json.picture }).then(() => {
      currentUser.updateOne({ 'emails.google': user._json.email }).then(() => {
        done(null, currentUser)
      })
    })
  })
}

function activateGoogleStrategy(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
      },
      (_accessToken, _refreshToken, user, done) => {
        User.findOne({ 'ids.google': user.id }).then((currentUser) => {
          if (currentUser) {
            const now = Date.now()

            if (currentUser.levelGiven && now - currentUser.date.levelTimeout > halfOfDay) {
              currentUser.updateOne({ levelGiven: false }).then(() => {
                currentUser.updateOne({ 'date.levelTimeout': now + fiveMins }).then(() => {
                  updateUser(user, currentUser, done)
                })
              })
            } else if (!currentUser.levelGiven && now - currentUser.date.levelTimeout > fiveMins) {
              currentUser.updateOne({ levelGiven: true }).then(() => {
                if (currentUser.level < 7) {
                  currentUser.updateOne({ level: currentUser.level + 1 }).then(() => {
                    updateUser(user, currentUser, done)
                  })
                } else {
                  updateUser(user, currentUser, done)
                }
              })
            } else {
              updateUser(user, currentUser, done)
            }
          } else {
            const now = Date.now()

            jsonScheme.ids.google = user.id
            jsonScheme.current.avatar = 'google'
            jsonScheme.name = user._json.name
            jsonScheme.avatars.google = user._json.picture
            jsonScheme.emails.google = user._json.email

            jsonScheme.date = {
              first: now,
              last: now,
              levelTimeout: now + fiveMins
            }

            new User(jsonScheme).save().then((newUser) => {
              done(null, newUser)
            })
          }
        })
      }
    )
  )
}

module.exports = activateGoogleStrategy

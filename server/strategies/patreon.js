/* eslint-disable space-before-function-paren */

const PatreonStrategy = require('passport-patreon').Strategy

const jsonScheme = require('../config/user-scheme.json')
const defaulty = require('../config/defaulty.js')

const keys = require('../config/keys')
const User = require('../models/user-model')

const halfOfDay = 12 * 60 * 60 * 1000
const fiveMins = 5 * 60 * 1000

function activatePatreonStrategy(passport) {
  passport.use(
    new PatreonStrategy(
      {
        clientID: keys.patreon.clientID,
        clientSecret: keys.patreon.clientSecret,
        callbackURL: '/auth/patreon/redirect',
        passReqToCallback: true
      },
      async function (req, _accessToken, _refreshToken, user, done) {
        if (req.user) {
          const similarUser = await User.findOne({ 'ids.patreon': user.id })

          if (similarUser) {
            done(null, false, { message: 'Collision found' })
          } else {
            const currentUser = await User.findById(req.user._id)
            await currentUser.updateOne({
              'ids.patreon': user.id,
              'date.last': Date.now(),
              'avatars.patreon': user.avatar,
              'emails.patreon': user._json.attributes.email
            })

            done(null, currentUser)
          }
        } else {
          const currentUser = await User.findOne({ 'ids.patreon': user.id })

          if (currentUser) {
            const now = Date.now()
            const currentTime = now - currentUser.date.levelTimeout

            let values = {}

            if (currentUser.levelGiven && currentTime > halfOfDay) {
              values = {
                levelGiven: false,
                'date.levelTimeout': now + fiveMins
              }
            } else if (!currentUser.levelGiven && currentTime > 0) {
              values = {
                levelGiven: true,
                level: currentUser.level < 7 ? currentUser.level + 1 : 7
              }
            }

            await currentUser.updateOne({
              ...values,
              'date.last': Date.now(),
              'avatars.patreon': user.avatar,
              'emails.patreon': user._json.attributes.email
            })

            done(null, currentUser)
          } else {
            const now = Date.now()

            jsonScheme.ids.patreon = user.id
            jsonScheme.current.avatar = 'patreon'
            jsonScheme.name = user.name
            jsonScheme.avatars.patreon = user.avatar
            jsonScheme.emails.patreon = user._json.attributes.email

            jsonScheme.date = {
              first: now,
              last: now,
              lastChecked: now,
              levelTimeout: now + fiveMins
            }

            jsonScheme.saves.push(defaulty)

            const newUser = new User(jsonScheme)
            await newUser.save()

            done(null, newUser)
          }
        }
      }
    )
  )
}

module.exports = activatePatreonStrategy

/* eslint-disable space-before-function-paren */

const VKontakteStrategy = require('passport-vkontakte').Strategy

const jsonScheme = require('../config/user-scheme.json')
const defaulty = require('../config/defaulty.js')

const keys = require('../config/keys')
const User = require('../models/user-model')

const halfOfDay = 12 * 60 * 60 * 1000
const fiveMins = 5 * 60 * 1000

function activateVKontakteStrategy(passport) {
  passport.use(
    new VKontakteStrategy(
      {
        clientID: keys.vk.clientID,
        clientSecret: keys.vk.clientSecret,
        callbackURL: '/auth/vkontakte/redirect'
      },
      async function (req, _accessToken, _refreshToken, _params, user, done) {
        if (req.user) {
          const similarUser = await User.findOne({ 'ids.vk': user.id })

          if (similarUser) {
            done(null, false, { message: 'Collision found' })
          } else {
            const currentUser = await User.findById(req.user._id)
            await currentUser.updateOne({
              'ids.vk': user.id,
              'date.last': Date.now(),
              'avatars.vk': user._json.photo_200,
              'emails.vk': user.emails[0] && user.emails[0].value ? user.emails[0].value : undefined
            })

            done(null, currentUser)
          }
        } else {
          const currentUser = await User.findOne({ 'ids.vk': user.id })

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
              'avatars.vk': user._json.photo_200,
              'emails.vk': user.emails[0] && user.emails[0].value ? user.emails[0].value : undefined
            })

            done(null, currentUser)
          } else {
            const now = Date.now()

            jsonScheme.ids.vk = user.id
            jsonScheme.current.avatar = 'vk'
            jsonScheme.name = user.displayName
            jsonScheme.avatars.vk = user._json.photo_200
            jsonScheme.emails.vk =
              user.emails[0] && user.emails[0].value ? user.emails[0].value : undefined

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

module.exports = activateVKontakteStrategy

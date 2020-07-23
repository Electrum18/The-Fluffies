const router = require('express').Router()

const User = require('../models/user-model')

const halfOfDay = 12 * 60 * 60 * 1000
const fiveMins = 5 * 60 * 1000

function initRouter(io, usersPublic, alias) {
  function updateUsersList(currentUser, target, value) {
    const aliasIndex = alias.indexOf(currentUser._id.toString())

    if (aliasIndex > -1) {
      usersPublic[aliasIndex][target] = value

      io.emit('get users', usersPublic)
    }
  }

  router.use((req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.status(401).json({
        error: 'User not authenticated'
      })
    }
  })

  router.get('/', (req, res) => {
    let user = req.user

    const now = Date.now()

    if (user.levelGiven && now - user.date.levelTimeout > halfOfDay) {
      User.findById(user._id).then((currentUser) => {
        currentUser.updateOne({ levelGiven: false }).then(() => {
          currentUser.updateOne({ 'date.levelTimeout': now + fiveMins }).then(() => {
            user = currentUser
          })
        })
      })
    } else if (!user.levelGiven && now - user.date.levelTimeout > fiveMins) {
      User.findById(user._id).then((currentUser) => {
        currentUser.updateOne({ levelGiven: true }).then(() => {
          if (currentUser.level < 7) {
            currentUser.updateOne({ level: currentUser.level + 1 }).then(() => {
              updateUsersList(currentUser, 'level', currentUser.level + 1)

              user = currentUser
            })
          } else {
            user = currentUser
          }
        })
      })
    }

    res.json({
      id: user._id,
      nickname: user.name,
      avatar: user.avatars[user.current.avatar],
      avatars: user.avatars,
      badges: user.badges,
      level: user.level,
      allowMailing: user.mailing,
      saves: user.saves,
      left: user.date.levelTimeout - now,
      levelGiven: user.levelGiven
    })
  })

  router.post('/change/name', (req, res) => {
    const body = req.body

    if (body && body.nickname) {
      const nickname = body.nickname
      const nameLen = nickname.length

      if (nameLen > 5 && nameLen <= 30) {
        User.findById(req.user._id).then((currentUser) => {
          if (currentUser) {
            currentUser.updateOne({ name: body.nickname }).then(() => {
              updateUsersList(currentUser, 'name', body.nickname)
            })
          }
        })
      }
    }

    res.end()
  })

  return router
}

module.exports = initRouter

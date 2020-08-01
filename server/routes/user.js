/* eslint-disable space-before-function-paren */

const router = require('express').Router()
const jwt = require('jwt-simple')

const User = require('../models/user-model')

const halfOfDay = 12 * 60 * 60 * 1000
const fiveMins = 5 * 60 * 1000

const keys = require('../config/keys')
const defaulty = require('../config/defaulty.js')

function httpBadRequest(res) {
  res.status(400).end()
}

function httpAccepted(res) {
  res.status(202).end()
}

function initRouter(io, usersPublic, alias, patreon) {
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

  router.get('/', async function (req, res) {
    let user = req.user

    const now = Date.now()

    if (user.levelGiven && now - user.date.levelTimeout >= halfOfDay) {
      const currentUser = await User.findById(user._id)
      await currentUser.updateOne({ levelGiven: false, 'date.levelTimeout': now + fiveMins })

      user = currentUser
    } else if (!user.levelGiven && now - user.date.levelTimeout >= 0) {
      const currentUser = await User.findById(user._id)
      await currentUser.updateOne({ levelGiven: true })

      if (currentUser.level < 7) {
        await currentUser.updateOne({ level: currentUser.level + 1 })
        updateUsersList(currentUser, 'level', currentUser.level + 1)
      }

      user = currentUser
    }

    res.send(
      jwt.encode(
        {
          id: user._id,
          nickname: user.name,
          avatar: user.avatars[user.current.avatar],
          current: user.current.avatar,
          avatars: user.avatars,
          badges: user.badges,
          level: user.level,
          allowMailing: user.mailing,
          left: user.date.levelTimeout - now,
          levelGiven: user.levelGiven,
          patron: user.ids.patreon && patreon.pledges[user.ids.patreon]
        },
        keys.rest_secret || ''
      )
    )
  })

  router.post('/unlink', async function (req, res) {
    const body = req.body

    if (body && (body.account !== undefined || body.account !== null)) {
      const currentUser = await User.findById(req.user._id)
      await currentUser.updateOne({
        ['ids.' + body.account]: '',
        ['avatars.' + body.account]: '',
        ['emails.' + body.account]: ','
      })

      if (body.account === req.user.current.avatar) {
        let newCurrent

        if (req.user.ids.google) {
          newCurrent = 'google'
        } else if (req.user.ids.vk) {
          newCurrent = 'vk'
        } else if (req.user.ids.twitter) {
          newCurrent = 'twitter'
        } else if (req.user.ids.patreon) {
          newCurrent = 'patreon'
        }

        await currentUser.updateOne({ 'current.avatar': newCurrent })
      }

      httpAccepted(res)
    } else {
      httpBadRequest(res)
    }
  })

  router.post('/lang', async function (req, res) {
    const body = req.body

    if (body && body.lang && (body.lang === 'ru' || body.lang === 'en')) {
      const currentUser = await User.findById(req.user._id)
      await currentUser.updateOne({ 'current.lang': body.lang })

      httpAccepted(res)
    } else {
      httpBadRequest(res)
    }
  })

  router.post('/change/name', async function (req, res) {
    const body = req.body

    if (body && body.nickname) {
      const nickname = body.nickname
      const nameLen = nickname.length

      if (nameLen > 5 && nameLen <= 30) {
        const currentUser = await User.findById(req.user._id)
        await currentUser.updateOne({ name: nickname })

        updateUsersList(currentUser, 'name', nickname)
        httpAccepted(res)
      } else {
        httpBadRequest(res)
      }
    } else {
      httpBadRequest(res)
    }
  })

  router.post('/change/mailing', async function (req, res) {
    const body = req.body

    if (body && (body.mailing !== undefined || body.mailing !== null)) {
      const currentUser = await User.findById(req.user._id)
      await currentUser.updateOne({ mailing: body.mailing })

      httpAccepted(res)
    } else {
      httpBadRequest(res)
    }
  })

  router.post('/change/current', async function (req, res) {
    const body = req.body

    if (
      body &&
      (body.current !== undefined || body.current !== null) &&
      req.user.avatars[body.current].length
    ) {
      const currentUser = await User.findById(req.user._id)
      await currentUser.updateOne({ 'current.avatar': body.current })

      updateUsersList(currentUser, 'avatar', currentUser.avatars[body.current])
      httpAccepted(res)
    } else {
      httpBadRequest(res)
    }
  })

  router.get('/saves', (req, res) => {
    res.json({ saves: req.user.saves })
  })

  router.get('/saves/limits', (req, res) => {
    res.send(
      jwt.encode(
        {
          level: req.user.level,
          count: req.user.saves.length,
          patron: req.user.ids.patreon && patreon.pledges[req.user.ids.patreon]
        },
        keys.rest_secret || ''
      )
    )
  })

  router.post('/saves/characters', async function (req, res) {
    const body = req.body

    if (body && body.saves) {
      const saves = body.saves.slice(0, 50)

      if (saves.length < 1) saves.push(defaulty)

      const currentUser = await User.findById(req.user._id)
      await currentUser.updateOne({ saves })

      httpAccepted(res)
    } else {
      httpBadRequest(res)
    }
  })

  return router
}

module.exports = initRouter

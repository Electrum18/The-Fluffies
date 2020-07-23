const passport = require('passport')
const router = require('express').Router()

const redirect = require('../misc/redirect')

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  redirect(req, res)
})

router.get('/logout', (req, res) => {
  req.logout()

  redirect(req, res)
})

module.exports = router

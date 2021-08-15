const passport = require('passport')
const router = require('express').Router()

const redirect = require('../misc/redirect')

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  redirect
)

router.get(
  '/vkontakte',
  passport.authenticate('vkontakte', { scope: ['email'] })
)

router.get(
  '/vkontakte/redirect',
  passport.authenticate('vkontakte', { failureRedirect: '/' }),
  redirect
)

router.get('/patreon', passport.authenticate('patreon'))
router.get(
  '/patreon/redirect',
  passport.authenticate('patreon', { failureRedirect: '/' }),
  redirect
)

router.get('/logout', (req, res) => {
  req.logout()

  redirect(req, res)
})

module.exports = router

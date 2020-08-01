const websiteUrl = require('./url')

function redirect(req, res) {
  if (req.cookies.i18n_redirected === 'ru') {
    res.redirect(websiteUrl + '/ru/editor/')
  } else {
    res.redirect(websiteUrl + '/editor/')
  }
}

module.exports = redirect

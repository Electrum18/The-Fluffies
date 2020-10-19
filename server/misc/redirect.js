const { websiteURL } = require('./url')

function redirect(req, res) {
  if (req.cookies !== undefined && req.cookies.i18n_redirected === 'ru') {
    res.redirect(websiteURL + '/ru/editor/')
  } else {
    res.redirect(websiteURL + '/editor/')
  }
}

module.exports = redirect

const keys = require('../config/keys')

const websiteURL = keys.protocol + '://' + keys.host
const serverURL = websiteURL + ':' + keys.port

module.exports = { websiteURL, serverURL }

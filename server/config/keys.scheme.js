module.exports = {
  host: 'localhost',
  port: 3000,
  protocol: 'http',

  rest_secret: '',

  ports: {
    socket: 5000,
    oauth: 5001
  },

  mongodb: {
    dbURI: '',
    secret: ''
  },

  google: {
    clientID: '',
    clientSecret: '',

    email: {
      user: '',
      pass: ''
    }
  },

  vk: {
    clientID: '',
    clientSecret: ''
  },

  twitter: {
    campaignID: '',
    refreshToken: '',
    clientID: '',
    clientSecret: ''
  },

  patreon: {
    clientID: '',
    clientSecret: ''
  },

  session: {
    secret: '',
    key: ''
  }
}

module.exports = {
  host: 'localhost:3000',
  protocol: 'http',

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
    clientSecret: ''
  },

  session: {
    secret: '',
    key: ''
  }
}

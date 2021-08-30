const {
  MONGO_INITDB_ROOT_USERNAME: MONGODB_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD: MONGODB_PASSWORD,
  MONGODB_DOCKER_NAME,
  MONGODB_DATABASE
} = process.env

const mongoLoginTag = (MONGODB_USERNAME && '@') || ''
const mongoPasswond = (MONGODB_PASSWORD && ':' + MONGODB_PASSWORD) || ''
const mongoDatabase = (MONGODB_DATABASE && '/' + MONGODB_DATABASE) || ''

module.exports = {
  host: 'localhost',
  port: 3000,
  protocol: 'http',

  rest_secret: '',

  ports: {
    socket: 3001,
    oauth: 3002
  },

  mongodb: {
    dbURI: `mongodb://${
      MONGODB_USERNAME || ''
    }${mongoPasswond}${mongoLoginTag}${
      MONGODB_DOCKER_NAME || '127.0.0.1'
    }:27017${mongoDatabase}`,
    secret: ''
  },

  google: {
    clientID: '',
    clientSecret: ''
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

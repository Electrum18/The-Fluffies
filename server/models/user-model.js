const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  ids: {
    google: String,
    twitter: String,
    vk: String,
    patreon: String
  },

  level: Number,
  levelGiven: Boolean,

  current: {
    avatar: String,
    lang: String
  },

  name: String,

  avatars: {
    google: String,
    twitter: String,
    vk: String,
    patreon: String
  },

  emails: {
    google: String,
    twitter: String,
    vk: String,
    patreon: String
  },

  mailing: Boolean,

  saves: [
    {
      frame: Number,
      globals: Object,
      color: Object
    }
  ],

  date: {
    first: Number,
    last: Number,
    lastChecked: Number,
    levelTimeout: Number
  },

  badges: Array
})

const User = mongoose.model('user', userSchema)

module.exports = User

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
      booleans: Object,
      names: Object,
      colors: Object
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

module.exports = mongoose.models.user || mongoose.model('user', userSchema)

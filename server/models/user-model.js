const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  ids: {
    google: String,
    twitter: String,
    vk: String
  },

  level: Number,
  levelGiven: Boolean,

  current: {
    avatar: String
  },

  name: String,

  avatars: {
    google: String,
    twitter: String,
    vk: String
  },

  emails: {
    google: String,
    twitter: String,
    vk: String
  },

  mailing: Boolean,

  saves: [
    {
      globals: Object,
      color: Object
    }
  ],

  date: {
    first: Number,
    last: Number,
    levelTimeout: Number
  },

  badges: Array
})

const User = mongoose.model('user', userSchema)

module.exports = User

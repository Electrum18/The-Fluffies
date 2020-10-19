const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  name: String,
  avatar: String,
  level: Number,
  text: String,
  patron: String
})

const Message = mongoose.model('message', messageSchema)

module.exports = Message

/* eslint-disable no-console */

const fs = require('fs')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const nodemailer = require('nodemailer')
const patreon = require('patreon')

let io = require('socket.io')

const User = require('./models/user-model')

const keys = require('./config/keys')

const initSocket = require('./modules/socket')
const initOAuth = require('./modules/api')

const Email = {
  title: {
    en: 'Your level has reached zero!',
    ru: 'Ваш уровень достиг нуля!'
  },

  body: {
    en: '',
    ru: ''
  }
}

fs.readFile('./server/misc/email/en.html', 'utf8', (err, data) => {
  if (err) throw err

  Email.body.en = data
})

fs.readFile('./server/misc/email/ru.html', 'utf8', (err, data) => {
  if (err) throw err

  Email.body.ru = data
})

io = io.listen(keys.ports.socket)

const patreonOAuthClient = patreon.oauth(keys.patreon.clientID, keys.patreon.clientSecret)

const tokens = {
  access_token: undefined,
  refresh_token: keys.patreon.refreshToken
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: keys.google.email.user,
    pass: keys.google.email.pass
  }
})

const patreonInfo = {
  pledges: {},
  patrons: []
}

function pledgeType(cents) {
  if (cents >= 300 && cents < 700) {
    return 'Basic supporter'
  } else if (cents >= 700) {
    return 'Huge supporter'
  } else {
    return 'Little supporter'
  }
}

async function getPatrons() {
  let response = await patreonOAuthClient.refreshToken(tokens.refresh_token)

  tokens.access_token = response.access_token
  tokens.refresh_token = response.refresh_token

  const patreonAPIClient = patreon.patreon(tokens.access_token)

  response = await patreonAPIClient(`/campaigns/${keys.patreon.campaignID}/pledges`)

  const pledges = response.store.graph.pledge
  const pledgeKeys = Object.keys(pledges)

  patreonInfo.pledges = {}
  patreonInfo.patrons = []

  for (let i = 0; i < pledgeKeys.length; i++) {
    const pledge = pledges[pledgeKeys[i]]
    const patron = pledge.patron

    if (pledge.declined_since !== null) continue

    patreonInfo.pledges[patron.id] = pledgeType(pledge.amount_cents)
    patreonInfo.patrons.push({
      name: patron.full_name.trim(),
      avatar: patron.thumb_url,
      type: pledgeType(pledge.amount_cents)
    })
  }
}

function deleteCallback(name) {
  return () => console.log('User: ' + name + ' was deleted!')
}

async function updateUsers() {
  for await (const doc of User.find()) {
    const now = Date.now()
    const day = 24 * 60 * 60 * 1000

    if (
      doc.date.last + day < now &&
      doc.ids.google === '' &&
      doc.ids.twitter === '' &&
      doc.ids.vk === '' &&
      doc.ids.patreon === ''
    ) {
      User.deleteOne({ _id: doc.id }, deleteCallback(doc.name))
    }

    if (doc.date.last < now && doc.level > 0) {
      doc.level -= Math.floor((now - doc.date.last) / day)
      doc.date.lastChecked = now + day

      if (doc.level < 0) doc.level = 0
      if (doc.level === 0 && doc.mailing) {
        const emails = doc.emails
        const emailsArr = []

        if (emails.google) {
          emailsArr.push(emails.google)
        }

        if (emails.twitter && emails.twitter !== emails.google) {
          emailsArr.push(emails.twitter)
        }

        if (emails.vk && emails.vk !== emails.google && emails.vk !== emails.twitter) {
          emailsArr.push(emails.vk)
        }

        if (
          emails.patreon &&
          emails.patreon !== emails.vk &&
          emails.patreon !== emails.google &&
          emails.patreon !== emails.twitter
        ) {
          emailsArr.push(emails.patreon)
        }

        for (let j = 0; j < emailsArr.length; j++) {
          await transporter.sendMail({
            from: keys.google.email.user,
            to: emailsArr[j],
            subject: Email.title[doc.current.lang],
            html: Email.body[doc.current.lang]
          })
        }
      }

      doc.save()
    }
  }
}

mongoose.connect(
  keys.mongodb.dbURI,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },

  () => {
    console.log('Connected to MongoDB')
  }
)

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  secret: keys.mongodb.secret
})

const users = {}
const usersPublic = []
const alias = []

function serverCycle() {
  getPatrons()
  updateUsers()
}

serverCycle()

setInterval(serverCycle, 30 * 60 * 1000)

initOAuth(keys.ports.oauth, session, sessionStore, io, usersPublic, alias, patreonInfo)
initSocket(io, sessionStore, users, usersPublic, alias, patreonInfo)

console.log('Socket service launched on port: ' + keys.ports.socket)

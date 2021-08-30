import mongoose from 'mongoose'

const {
  MONGODB_ENABLED,
  MONGO_INITDB_ROOT_USERNAME: MONGODB_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD: MONGODB_PASSWORD,
  MONGODB_DOCKER_NAME,
  MONGODB_DATABASE
} = process.env

if (!MONGODB_ENABLED) {
  console.error('MongoDB is not enabled, skipping...')
}

console.log('ENV SETTED')

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!MONGODB_ENABLED) return

  console.log('DB CONNECTING...')

  if (!cached.promise) {
    const mongoLoginTag = (MONGODB_USERNAME && '@') || ''
    const mongoPasswond = (MONGODB_PASSWORD && ':' + MONGODB_PASSWORD) || ''
    const mongoDatabase = (MONGODB_DATABASE && '/' + MONGODB_DATABASE) || ''

    const connectionString = `mongodb://${
      MONGODB_USERNAME || ''
    }${mongoPasswond}${mongoLoginTag}${
      MONGODB_DOCKER_NAME || '127.0.0.1'
    }:27017${mongoDatabase}`

    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true
    }

    console.log('LOGIN DB |', connectionString)

    cached.promise = mongoose
      .connect(connectionString, opts)
      .then(mongoose => mongoose)
  }

  cached.conn = await cached.promise

  return cached.conn
}

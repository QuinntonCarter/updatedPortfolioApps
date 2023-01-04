import mongoose from 'mongoose';

let SERVER;
if (process.env.environment == 'dev' && process.env.MONGODB_DEV) {
  SERVER = process.env.MONGODB_DEV;
}
if (process.env.environment == 'prod' && process.env.MONGODB_PROD) {
  SERVER = process.env.MONGODB_PROD;
} else {
  throw new Error('Server variable not found');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(SERVER, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

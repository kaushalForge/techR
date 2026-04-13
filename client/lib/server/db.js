import mongoose from "mongoose";

const MONGODB_URI = process.env.URI;

const globalForMongoose = globalThis;

const cached = globalForMongoose._mongooseCache || {
  conn: null,
  promise: null,
};

globalForMongoose._mongooseCache = cached;

export default async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define URI in the client environment.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

import mongoose from "mongoose";

// Vercel Functions can reuse a warm instance between invocations, so we
// cache the connection on `globalThis` to avoid opening a new connection
// (and exhausting MongoDB Atlas's connection limit) on every request.
let cached = globalThis.__energyAdviceMongoose;
if (!cached) {
  cached = globalThis.__energyAdviceMongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI не задан в переменных окружения");
    }
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(uri).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

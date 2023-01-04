import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.MONGODB_NAME || "";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .set({ debug: true, strictQuery: false })
      .connect(`${DB_URI}/${DB_NAME}`, {
        authSource: "admin",
        user: "test",
        pass: "test",
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

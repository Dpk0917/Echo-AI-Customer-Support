import mongoose from "mongoose";

const mongo_Url = process.env.MONGO_URL;

if (!mongo_Url) {
  console.log("MONGO_URL is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongo_Url!).then((m) => m.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectDb;
import mongoose from "mongoose";

const { DB_CONNECT_URL } = process.env;

export const connect = async () => {
  await mongoose.connect(DB_CONNECT_URL);
};

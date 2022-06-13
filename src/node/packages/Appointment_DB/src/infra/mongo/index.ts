import mongoose from "mongoose";

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const connect = async () => {
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.h2lxe.mongodb.net/?retryWrites=true&w=majority`
  );
};

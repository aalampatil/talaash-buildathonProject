import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log();
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log(`connected to mongoDb, 200`);
  } catch (error) {
    console.log("db.js catch mongodb connection error", error);
    process.exit(1);
  }
};

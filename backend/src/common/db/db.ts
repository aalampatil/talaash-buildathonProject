import mongoose from "mongoose";
import { env } from "../../env.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${env.MONGODB_URI}`);
    console.log(`connected to db !!! ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("db connection failed", error);
  }
};

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );
    console.log(`connected to db !!! ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("db connection failed", error);
  }
};

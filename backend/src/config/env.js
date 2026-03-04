import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
export const isProduction = process.env.NODE_ENV === "production";
console.log("env var loaded");
console.log("current environment is -", process.env.NODE_ENV);

import "dotenv/config";
import { env } from "./env.js";
import { createServerApplication } from "./app/index.js";
import { connectDB } from "./common/db/db.js";
export const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || "5000";

if (!isProduction) {
  console.log("check 00");
}

async function main() {
  try {
    await connectDB();
    const app = createServerApplication();
    const PORT: number = env.PORT ? +env.PORT : 8080;
    app.listen(PORT, () => {
      console.log(
        `server listening on ${PORT} in ${process.env.NODE_ENV} mode`,
      );
    });
  } catch (error) {
    throw Error;
  }
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

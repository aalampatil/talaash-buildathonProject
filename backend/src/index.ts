import "dotenv/config";
import { env } from "./env.js";
import { createServerApplication } from "./app.js";
import { connectDB } from "./common/db/db.js";

async function main() {
  try {
    await connectDB();
    const app = createServerApplication();
    const PORT: number = env.PORT ? +env.PORT : 8080;
    app.listen(PORT, () => {
      console.log(`server listening on ${PORT}`);
    });
  } catch (error) {
    throw error;
  }
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

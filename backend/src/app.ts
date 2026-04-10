import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import type { Response } from "express";
import tenantRouter from "./module/tenant/tenant.routes.js";

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        process.env.CLIENT as string,
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );

  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(clerkMiddleware());

  app.get("/", (_, res: Response) => {
    res.send("OK 200, check");
  });

  app.use("/api/tenant", tenantRouter);

  return app;
}

export default createApp;

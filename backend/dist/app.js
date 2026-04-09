import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
function createApp() {
    const app = express();
    // app.set("trust proxy", 1);
    app.use(cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            process.env.CLIENT,
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }));
    app.use(express.json({ limit: "5mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(clerkMiddleware());
    app.get("/", (_, res) => {
        res.send("OK 200, check");
    });
    return app;
}
export default createApp;
//# sourceMappingURL=app.js.map
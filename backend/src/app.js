import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.CLIENT,
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//routes declarations
import {
  userRouter,
  tenantRouter,
  landlordRouter,
  propertyRouter,
} from "./routes/routes.js";

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tenant", tenantRouter);
app.use("/api/v1/landlord", landlordRouter);
app.use("/api/v1/property", propertyRouter);

app.get("/", (req, res) => {
  res.send("Ok 200");
});

export default app;

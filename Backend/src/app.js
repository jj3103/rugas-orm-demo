import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

import userRouter from "./routes/userRoutes.js";
import customerRoute from "./routes/customerRoutes.js";
import dashboardRoute from "./routes/dashboardRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import productRoute from "./routes/productRoutes.js";

app.use("/api/users", userRouter);
app.use("/api/customer", customerRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/order", orderRoute);
app.use("/api/product", productRoute);

export default app;

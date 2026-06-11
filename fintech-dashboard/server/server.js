import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import transactionRoutes from "./routes/transactions.js";
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fintech-dashboard";

// --------------- Middleware ---------------

// CORS — allow Vite dev server + production frontend URL
const allowedOrigins = [
  "http://localhost:5173",
  "https://finflow-eight-zeta.vercel.app",
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// --------------- Routes ---------------
app.use("/api/transactions", transactionRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Fintech Dashboard API is running" });
});

// --------------- Production Static Serving ---------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  );
}

// 404 handler for unknown API routes (only fires in dev, or for /api/* in prod)
if (process.env.NODE_ENV !== "production") {
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  });
}

// Global error handler (must be last)
app.use(errorHandler);

// --------------- Database & Server ---------------
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();

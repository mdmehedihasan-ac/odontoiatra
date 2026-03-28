import express from "express";
import cors from "cors";
import helmet from "helmet";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import contentRouter from "./routes/content.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

const app = express();

// ─── Security headers ────────────────────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5176",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow no-origin requests (curl, Postman) and any localhost port
      if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS policy: origin '${origin}' not allowed`));
    },
    methods: ["GET"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api", contentRouter);

// Health check
app.get("/api/ping", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Backend running → http://localhost:${PORT}`);
  console.log(`   GET /api/content  — full site data`);
  console.log(`   GET /api/ping     — health check`);
});

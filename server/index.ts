import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getServices } from "./routes/services";
import { getProducts } from "./routes/products";
import { getNews } from "./routes/news";
import { register, login } from "./routes/auth";
import { submitContact } from "./routes/contact";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Rural platform API routes
  app.get("/api/services", getServices);
  app.get("/api/products", getProducts);
  app.get("/api/news", getNews);
  app.post("/api/register", register);
  app.post("/api/login", login);
  app.post("/api/contact", submitContact);

  return app;
}

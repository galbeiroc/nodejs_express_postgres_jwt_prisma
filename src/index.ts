import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { connectDB } from "./config/db";

// Import routes
import movieRoutes from "./routes/movieRoutes";
import authRoutes from "./routes/auth";

config();
connectDB();

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

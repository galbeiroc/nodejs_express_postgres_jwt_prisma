import express from "express";
import cors from "cors";

// Import routes
import movieRoutes from "./routes/movieRoutes";

const app = express();
const PORT = 5001;

app.use(cors());

// API routes
app.use("/movies", movieRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

import express from "express";
import cors from "cors";

const app = express();
const PORT = 5001;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

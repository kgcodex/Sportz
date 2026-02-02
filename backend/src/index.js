import express from "express";
import { PORT } from "./env.js";

const app = express();
const port = PORT || 8080;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

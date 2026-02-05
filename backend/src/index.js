import express from "express";
import { PORT } from "./env.js";
import { matchRouter } from "./routes/match.route.js";

const app = express();
const port = PORT || 8080;

app.use(express.json());

app.use("/match", matchRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

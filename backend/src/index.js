import express from "express";
import { HOST, PORT } from "./env.js";
import { matchRouter } from "./routes/match.route.js";
import http from "http";
import { attachWebSocketServer } from "./ws/server.js";

const port = PORT || 8000;
const host = HOST || "0.0.0.0";

const app = express();
const server = http.createServer(app);
const { broadcastMatchCreated } = attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

app.use(express.json());

app.use("/match", matchRouter);

server.listen(port, host, () => {
  const baseUrl =
    HOST === "0.0.0.0" ? `http://localhost:${port}` : `http//${host}:${port}`;
  console.log(`Server is running at ${baseUrl}`);
  console.log(
    `WebSocket Server is running at ${baseUrl.replace("http", "ws")}/ws`,
  );
});

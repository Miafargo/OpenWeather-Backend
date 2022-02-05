import Http from "http";
import { app } from "./app.js";

// const http = require("http");
// const app = require("./app");
const port = process.env.PORT || 3000;

const server = Http.createServer(app);

server.listen(port);

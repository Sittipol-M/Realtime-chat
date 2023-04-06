import express from "express";
import http from "http";
import * as dotenv from "dotenv";
import morgan from "morgan";
import routes from "./routes/routes.js";
import bodyParser from "body-parser";
import handleErrors from "../others/middlewares/handleErrors.js";
import { connectMongoDB } from "../configs/database.js";
import cors from "cors";

const createWebService = () => {
  const app = express();
  const server = http.createServer(app);

  app.use(cors());

  dotenv.config();

  let port;
  const NODE_ENV = process.env.NODE_ENV;
  switch (NODE_ENV) {
    case "PRODUCTION":
      port = process.env.PORT_PROD;
      process.env.MONGO_URL = process.env.MONGO_URL_PROD;
      break;
    case "DEVELOPMENT":
      port = process.env.PORT_DEV;
      process.env.MONGO_URL = process.env.MONGO_URL_DEV;
      break;
    case "TEST":
      port = process.env.PORT_TEST;
      process.env.MONGO_URL = process.env.MONGO_URL_TEST;
      break;
  }

  connectMongoDB();
  app.use(bodyParser.json());
  app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
  app.use(routes);
  app.use(handleErrors);

  server.listen(port, () => {
    NODE_ENV !== "TEST" ? console.log(`This server is listening to port ${port}`) : null;
  });

  return server;
};

export default createWebService;

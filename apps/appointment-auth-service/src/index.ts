import * as dotenv from "dotenv";
import * as express from "express";
import * as cors from "cors";
import * as session from "express-session";

import { errorHandling } from "@monobox/infra";

import { AuthorizationController } from "./app/authorization/controller";

dotenv.config();

const bootstrap = async (app: express.Express) => {
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "PUT", "POST", "DELETE"],
      allowedHeaders: ["Accept", "Content-Type"],
    })
  );

  const { SESSION_SECRET } = process.env;

  const sessionConfig: session.SessionOptions = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  };

  app.use(session(sessionConfig));

  app.use(express.json());

  app.use("/authorization", new AuthorizationController().process());

  app.use(errorHandling);

  const { PORT } = process.env;

  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
};

bootstrap(express());

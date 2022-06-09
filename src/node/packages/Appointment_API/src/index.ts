import * as dotenv from "dotenv";
import * as express from "express";

import { queryParser } from "express-query-parser";

import { InMemoryStore } from "./adapters/in-memory-store";
import { errorHandlingMiddleware } from "./middlewares/error-handling";
import { AppointmentController } from "./app/appointment/controller";

dotenv.config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  })
);

app.use("/appointment", new AppointmentController(InMemoryStore).process());

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

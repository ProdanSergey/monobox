import * as dotenv from "dotenv";
import * as express from "express";
import * as mongoose from "mongoose";

dotenv.config();

import { appointments } from "./app/appointment/appointment.controller";
import { doctors } from "./app/doctor/doctor.controller";
import { facilities } from "./app/facility/facility.controller";
import { userMiddleware } from "./middlewares/user.middleware";
import { errorHandlingMiddleware } from "./middlewares/error-handling.middleware";

const app = express();

const PORT = process.env.PORT;

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connect = async () => {
	await mongoose.connect(
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.h2lxe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
	);
};

connect().catch(console.log);

app.use(express.json());
app.use(userMiddleware);

app.use("/facilities/:facilityId/doctors/:doctorId/appointments", appointments);
app.use("/facilities/:facilityId/doctors", doctors);
app.use("/facilities", facilities);

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

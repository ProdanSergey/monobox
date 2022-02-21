import * as dotenv from "dotenv";
import * as express from "express";

dotenv.config();

import { appointments } from "./app/appointment/appointment.controller";
import { doctors } from "./app/doctor/doctor.controller";
import { facilities } from "./app/facility/facility.controller";
import { userMiddleware } from "./middlewares/user.middleware";
import { errorHandlingMiddleware } from "./middlewares/error-handling.middleware";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(userMiddleware);

app.use("/facilities/:facilityId/doctors/:doctorId/appointments", appointments);
app.use("/facilities/:facilityId/doctors", doctors);
app.use("/facilities", facilities);

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

import * as express from "express";
import type { Request, Response} from "express";
import { DoctorService } from "./doctor.service";
import { DoctorCreateDTO, DoctorCreateParams } from "./doctor.definition";

const doctors = express.Router({ mergeParams: true });

const doctorService = new DoctorService(); 

doctors.post('/', function (req: Request<DoctorCreateParams, {}, DoctorCreateDTO>, res: Response) {
	const { facilityId } = req.params;
	const { firstName, lastName, specialty } = req.body;

	const response = doctorService.create(firstName, lastName, specialty, facilityId);
	
  res.json(response);
})

doctors.put('/:id', function (req: Request, res: Response) {
  res.send(`update ${req.params.id} doctor`)
})

doctors.delete('/:id', function (req: Request, res: Response) {
  res.send(`delete ${req.params.id} doctor`)
})

doctors.get('/:id', function (req: Request, res: Response) {
	res.send(`get ${req.params.id} doctor`)
})

doctors.get('/', function (_req: Request, res: Response) {
	res.send('all doctors')
})

export { doctors };
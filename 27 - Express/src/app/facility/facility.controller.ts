import * as express from "express";
import type { Request, Response} from "express";
import { FacilityCreateDTO } from "./facility.definition";
import { FacilityService } from "./facility.service";

const facilities = express.Router();

const facilityService = new FacilityService();

facilities.post('/', function (req: Request<{}, any, FacilityCreateDTO>, res: Response) {
	const { name } = req.body;
	
	const response = facilityService.create(name);

  res.json(response);
})

facilities.put('/:id', function (req: Request, res: Response) {
  res.send(`update ${req.params.id} facility`)
})

facilities.delete('/:id', function (req: Request, res: Response) {
  res.send(`delete ${req.params.id} facility`)
})

facilities.get('/:id', function (req: Request, res: Response) {
	res.send(`get ${req.params.id} facility`)
})

facilities.get('/', function (_req: Request, res: Response) {
	res.send('all facilities')
})

export { facilities };
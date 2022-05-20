import * as express from "express";
import type { Request } from "express";
import { FacilityCreateDTO } from "./facility.definition";
import { FacilityService } from "./facility.service";
import { withErrorHandler } from "../../decorators/error-handler.decorator";

const facilities = express.Router();

const facilityService = new FacilityService();

facilities.post(
  "/",
  withErrorHandler<Request<unknown, unknown, FacilityCreateDTO>>(async (req, res) => {
    const { name } = req.body;

    const response = await facilityService.create(name);

    res.json(response);
  })
);

export { facilities };

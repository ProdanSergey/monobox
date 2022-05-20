import { Facility } from "../entities/facility.entity";
import { Repository } from "../services/repository.service";

export class FacilityRepository extends Repository<Facility> {
  constructor() {
    super("facilities");
  }
}

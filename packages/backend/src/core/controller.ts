import { Router } from "express";

export class ExpressController {
  router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
  }

  process() {
    return this.router;
  }
}

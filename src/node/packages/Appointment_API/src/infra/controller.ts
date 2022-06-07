import { Router } from "express";

export class BaseController {
  constructor(protected readonly router: Router) {}

  listen() {
    return this.router;
  }
}

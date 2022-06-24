import uniqId from "uniqid";
import { Position, Waypoint } from "../domain/waypoint";

export class WaypointBuilder {
  private record: Waypoint;

  constructor(position: Position) {
    const waypoint: Waypoint = {
      id: uniqId(),
      title: "Waypoint",
      position,
    };

    this.record = waypoint;
  }

  build() {
    return this.record;
  }
}

import uniqId from "uniqid";
import randomWords from "random-words";
import { Position, Waypoint } from "../domain/waypoint";

export class WaypointBuilder {
  private record: Waypoint;

  constructor(position: Position) {
    const waypoint: Waypoint = {
      id: uniqId(),
      title: randomWords(1)[0],
      position,
    };

    this.record = waypoint;
  }

  withTitle(title: string): this {
    this.record.title = title;
    return this;
  }

  build() {
    return this.record;
  }
}

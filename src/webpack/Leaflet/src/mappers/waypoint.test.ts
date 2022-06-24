import { WaypointBuilder } from "../shared/builders/waypoint";
import { Point, Position, Waypoint } from "../shared/domain/waypoint";
import { mapWaypointToGeoPoint, mapWaypointToPosition } from "./waypoint";

describe("Waypoint To Geo Point Mapper", () => {
  type TestCase = {
    waypoint: Waypoint;
    geopoint: Point;
  };

  it.each<TestCase>([
    {
      waypoint: new WaypointBuilder({ lat: 1, lng: 1 }).build(),
      geopoint: [1, 1],
    },
    {
      waypoint: new WaypointBuilder({ lat: 2, lng: 2 }).build(),
      geopoint: [2, 2],
    },
    {
      waypoint: new WaypointBuilder({ lat: 3, lng: 3 }).build(),
      geopoint: [3, 3],
    },
  ])("should map waypoint to the geo point", ({ waypoint, geopoint }) => {
    expect(mapWaypointToGeoPoint(waypoint)).toEqual(geopoint);
  });
});

describe("Waypoint To Position Mapper", () => {
  type TestCase = {
    waypoint: Waypoint;
    position: Position;
  };

  it.each<TestCase>([
    {
      waypoint: new WaypointBuilder({ lat: 1, lng: 1 }).build(),
      position: { lat: 1, lng: 1 },
    },
    {
      waypoint: new WaypointBuilder({ lat: 2, lng: 2 }).build(),
      position: { lat: 2, lng: 2 },
    },
    {
      waypoint: new WaypointBuilder({ lat: 3, lng: 3 }).build(),
      position: { lat: 3, lng: 3 },
    },
  ])("should map waypoint to the geo point", ({ waypoint, position }) => {
    expect(mapWaypointToPosition(waypoint)).toEqual(position);
  });
});

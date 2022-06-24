import { Point, Position, Waypoint } from "../shared/domain/waypoint";

export const mapWaypointToGeoPoint = ({ position }: Waypoint): Point => {
  return [position.lat, position.lng];
};

export const mapWaypointToPosition = ({ position }: Waypoint): Position => {
  return position;
};

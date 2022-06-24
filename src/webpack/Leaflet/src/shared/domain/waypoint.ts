export type Lat = number;
export type Lng = number;

export type Point = [Lat, Lng];

export type Position = {
  lat: Lat;
  lng: Lng;
};

export interface Waypoint {
  id: string;
  title: string;
  position: Position;
}

import { FunctionComponent, useEffect } from "react";
import leaflet from "leaflet";
import { Position } from "../../shared/domain/waypoint";

export type PolylineProps = {
  map: leaflet.Map;
  points: Position[];
  color?: string;
};

export const Polyline: FunctionComponent<PolylineProps> = ({ map, points, color }) => {
  useEffect(() => {
    const polyline = leaflet.polyline(points, { color }).addTo(map);

    return () => {
      polyline.remove();
    };
  }, [map, points]);

  return null;
};

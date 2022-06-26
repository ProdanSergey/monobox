import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import leaflet, { LeafletMouseEventHandlerFn } from "leaflet";
import { Waypoint } from "../../shared/domain/waypoint";

import { StyledMap } from "./map.styled";

export type MapProps = {
  center?: [number, number];
  zoom?: number;
  children?: (map: leaflet.Map) => ReactNode;
  onClick?: (position: Waypoint["position"]) => void;
};

export const Map: FunctionComponent<MapProps> = ({ zoom, center, children, onClick }) => {
  const [map, setMap] = useState<leaflet.Map>();

  useEffect(() => {
    const map = leaflet.map("map", {
      center,
      zoom,
    });

    setMap(map);

    return () => {
      map.remove();
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!map) return;

    const handleClick: LeafletMouseEventHandlerFn = ({ latlng: { lat, lng } }) => {
      onClick?.({ lat, lng });
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [map, onClick]);

  return (
    <StyledMap data-test-id="map" id="map">
      {map && children && children(map)}
    </StyledMap>
  );
};

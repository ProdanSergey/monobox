import React, { FunctionComponent, useEffect, useRef } from "react";
import leaflet from "leaflet";

import { StyledMap } from "./map.styled";

export const Map: FunctionComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = leaflet.map(ref.current, {
      center: [49.8419, 24.0315],
      zoom: 16,
    });

    const layer = leaflet.tileLayer("http://topo.wanderreitkarte.de/topo/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });

    map.addLayer(layer);
  }, []);

  return <StyledMap data-test-id="map" ref={ref} />;
};

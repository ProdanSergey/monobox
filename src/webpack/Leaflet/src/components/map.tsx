import React, { FunctionComponent, useEffect, useRef } from "react";
import leaflet from "leaflet";

import { StyledMap } from "./map.styled";

type Marker = leaflet.Marker | leaflet.CircleMarker;

type MapProps = {
  center?: leaflet.LatLngExpression;
  zoom?: number;
  tileLayer: leaflet.TileLayer;
  markers?: Marker[];
  renderPolyline?: (latlng: leaflet.LatLng[]) => leaflet.Polyline;
  onClick?: (latlng: leaflet.LatLng) => void;
};

export const Map: FunctionComponent<MapProps> = ({
  tileLayer,
  zoom,
  center,
  markers = [],
  renderPolyline,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const map = useRef<leaflet.Map | null>(null);

  const setMarkers = (markers: Marker[]): void => {
    const { current: leafletMap } = map;

    if (!leafletMap) return;

    markers.forEach((marker) => marker.addTo(leafletMap));
  };

  const setPolyline = (polyline: leaflet.Polyline): void => {
    const { current: leafletMap } = map;

    if (!leafletMap) return;

    polyline.addTo(leafletMap);
  };

  useEffect(() => {
    if (!ref.current) return;

    const leafletMap = leaflet.map(ref.current, {
      center,
      zoom,
    });

    const handleClick: leaflet.LeafletMouseEventHandlerFn = ({ latlng }) => {
      onClick?.(latlng);
    };

    map.current = leafletMap.addLayer(tileLayer).on("click", handleClick);

    return () => {
      leafletMap.off("click", handleClick);
    };
  }, []);

  useEffect(() => {
    setMarkers(markers);

    if (renderPolyline && markers.length > 1) {
      const polyline = renderPolyline(markers.map((m) => m.getLatLng()));

      setPolyline(polyline);

      return () => {
        polyline.remove();
      };
    }

    return undefined;
  }, [markers, renderPolyline]);

  return <StyledMap data-test-id="map" ref={ref} />;
};

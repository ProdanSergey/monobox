import { FunctionComponent, useEffect } from "react";
import leaflet from "leaflet";

export type TileProps = {
  map: leaflet.Map;
  url: string;
  options?: leaflet.TileLayerOptions;
};

export const Tile: FunctionComponent<TileProps> = ({ map, url, options }) => {
  useEffect(() => {
    const tile = leaflet.tileLayer(url, options).addTo(map);

    return () => {
      tile.remove();
    };
  }, [map, url, options]);

  return null;
};

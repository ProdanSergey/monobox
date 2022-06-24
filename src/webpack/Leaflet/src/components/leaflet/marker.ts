import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import leaflet from "leaflet";
import { Waypoint } from "../../shared/domain/waypoint";

export type MarkerProps = PropsWithChildren<
  {
    map: leaflet.Map;
    position: Waypoint["position"];
  } & IconProps
>;

type IconProps = {
  size?: number;
  text?: string;
  color?: string;
};

const createIcon = ({ size = 40, text, color = "black" }: IconProps): leaflet.DivIcon => {
  const createText = (text: string) => {
    return `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10rem" fill="white">${text}</text>`;
  };

  return leaflet.divIcon({
    html: `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
					<g>
						<circle fill="${color}" cx="250" cy="250" r="250">
						</circle>
						${text ? createText(text) : ""}
					</g>
			</svg>
		`,
    className: "circle-with-text",
    iconSize: [size, size],
  });
};

export const Marker: FunctionComponent<MarkerProps> = ({ map, position, text, size, color }) => {
  useEffect(() => {
    const { lat, lng } = position;

    const icon = createIcon({ size, text, color });

    const marker = leaflet.marker([lat, lng]).setIcon(icon).addTo(map);

    return () => {
      marker.remove();
    };
  }, [map, position, text, size, color]);

  return null;
};

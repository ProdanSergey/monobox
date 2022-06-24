import React, { FunctionComponent } from "react";
import leaflet from "leaflet";
import togpx from "togpx";
import { StyledButton } from "./download-track-button.styled";
import { Position } from "../shared/domain/waypoint";

export const BUTTON_TEXT = "Download your Route";

type DownloadTrackButtonProps = {
  points: Position[];
};

export const download = (gpx: string): void => {
  const filename = "track.gpx";
  const pom = document.createElement("a");
  const blob = new Blob([gpx], { type: "text/plain" });

  const href = URL.createObjectURL(blob);
  pom.setAttribute("href", href);
  pom.setAttribute("download", filename);

  pom.click();

  queueMicrotask(() => {
    URL.revokeObjectURL(href);
  });
};

export const DownloadTrackButton: FunctionComponent<DownloadTrackButtonProps> = ({ points }) => {
  const handleClick = () => {
    const markers = points.map(({ lat, lng }) => leaflet.marker([lat, lng]));
    const group = leaflet.featureGroup(markers);
    const json = group.toGeoJSON();
    const gpx = togpx(json);
    download(gpx);
  };

  return <StyledButton onClick={handleClick}>{BUTTON_TEXT}</StyledButton>;
};

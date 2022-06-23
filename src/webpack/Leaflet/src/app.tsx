import React, { FunctionComponent, useState } from "react";
import leaflet from "leaflet";
import { Content } from "./templates/content/content";
import { Sidebar } from "./templates/sidebar/sidebar";
import { Map } from "./components/map";
import { DownloadTrackButton } from "./components/download-track-button";

import { StyledGrid, StyledSidebarContainer } from "./app.styled";
import { TrackBreakdown, TrackWaypoint } from "./components/track-breakdown";

const tileLayer = leaflet.tileLayer("http://topo.wanderreitkarte.de/topo/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
});

const createMarker = ({ lat, lng }: leaflet.LatLng) => {
  return leaflet.circleMarker([lat, lng], {
    radius: 12,
    stroke: false,
    fill: true,
    fillColor: "var(--color-secondary)",
    fillOpacity: 1,
  });
};

const createPolyline = (latlng: leaflet.LatLng[]) => {
  return leaflet.polyline(latlng, { color: "var(--color-secondary)" });
};

export const App: FunctionComponent = () => {
  const [markers, setMarkers] = useState<leaflet.CircleMarker[]>([]);

  const handleMarkerAdd = (latlng: leaflet.LatLng) => {
    setMarkers((markers) => [...markers, createMarker(latlng)]);
  };

  const handleMarketRemove = (marker: leaflet.Layer) => {
    setMarkers((markers) => markers.filter((m) => m !== marker));
  };

  return (
    <StyledGrid>
      <Sidebar title="Route Builder">
        <StyledSidebarContainer>
          <TrackBreakdown>
            {markers.map((marker, index) => (
              <TrackWaypoint key={index} onRemove={() => handleMarketRemove(marker.remove())}>
                Waypoint {index + 1}
              </TrackWaypoint>
            ))}
          </TrackBreakdown>
          <DownloadTrackButton markers={markers} />
        </StyledSidebarContainer>
      </Sidebar>
      <Content>
        <Map
          center={[48.713, 23.2149]}
          zoom={9}
          tileLayer={tileLayer}
          markers={markers}
          renderPolyline={createPolyline}
          onClick={handleMarkerAdd}
        ></Map>
      </Content>
    </StyledGrid>
  );
};

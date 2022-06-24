import React, { FunctionComponent, useCallback, useState } from "react";
import uniqid from "uniqid";
import { Waypoint } from "./shared/domain/waypoint";
import { Content } from "./templates/content/content";
import { Sidebar } from "./templates/sidebar/sidebar";
import { DownloadTrackButton } from "./components/download-track-button";
import { TrackBreakdown, TrackWaypoint } from "./components/track-breakdown";
import { Map } from "./components/leaflet/map";
import { Tile } from "./components/leaflet/tile";
import { Marker } from "./components/leaflet/marker";
import { Polyline } from "./components/leaflet/polyline";

import { StyledGrid, StyledSidebarContainer } from "./app.styled";
import { mapWaypointToPosition } from "./mappers/waypoint";

const TILE_URL = "http://topo.wanderreitkarte.de/topo/{z}/{x}/{y}.png";
const TILE_OPTIONS = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

const MAP_CENTER: [number, number] = [48.713, 23.2149];

export const App: FunctionComponent = () => {
  const [markers, setMarkers] = useState<Waypoint[]>([]);

  const handleMarkerAdd = useCallback(({ lat, lng }: Waypoint["position"]) => {
    setMarkers((markers) => [
      ...markers,
      {
        id: uniqid(),
        title: `Waypoint`,
        position: { lat, lng },
      },
    ]);
  }, []);

  const handleMarketRemove = (id: string) => {
    setMarkers((markers) => markers.filter((marker) => marker.id !== id));
  };

  return (
    <StyledGrid>
      <Sidebar title="Route Builder">
        <StyledSidebarContainer>
          <TrackBreakdown>
            {markers.map(({ id, title }, index) => (
              <TrackWaypoint key={id} onRemove={() => handleMarketRemove(id)}>
                {title} {index + 1}
              </TrackWaypoint>
            ))}
          </TrackBreakdown>
          <DownloadTrackButton points={markers.map(mapWaypointToPosition)} />
        </StyledSidebarContainer>
      </Sidebar>
      <Content>
        <Map center={MAP_CENTER} zoom={9} onClick={handleMarkerAdd}>
          {(map) => (
            <>
              <Tile map={map} url={TILE_URL} options={TILE_OPTIONS} />
              {markers.map(({ id, position }, index) => (
                <Marker
                  key={id}
                  map={map}
                  position={position}
                  text={String(index + 1)}
                  color="var(--color-secondary)"
                />
              ))}
              <Polyline map={map} points={markers.map(mapWaypointToPosition)} color="var(--color-secondary)" />
            </>
          )}
        </Map>
      </Content>
    </StyledGrid>
  );
};

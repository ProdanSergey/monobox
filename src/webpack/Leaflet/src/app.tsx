import React, { FunctionComponent, useCallback, useState } from "react";
import uniqid from "uniqid";
import randomWords from "random-words";
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
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  const handleMarkerAdd = useCallback(({ lat, lng }: Waypoint["position"]) => {
    setWaypoints((markers) => [
      ...markers,
      {
        id: uniqid(),
        title: randomWords(1)[0],
        position: { lat, lng },
      },
    ]);
  }, []);

  const handleMarkerRemove = (id: string) => {
    setWaypoints((markers) => markers.filter((marker) => marker.id !== id));
  };

  const handleMarkerSort = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = waypoints[dragIndex];
      const hoverItem = waypoints[hoverIndex];
      setWaypoints((markers) => {
        const sorted = [...markers];
        sorted[dragIndex] = hoverItem;
        sorted[hoverIndex] = dragItem;
        return sorted;
      });
    },
    [waypoints]
  );

  return (
    <StyledGrid>
      <Sidebar title="Route Builder">
        <StyledSidebarContainer>
          <TrackBreakdown>
            {waypoints.map(({ id, title }, index) => (
              <TrackWaypoint key={id} index={index} onRemove={() => handleMarkerRemove(id)} onDrop={handleMarkerSort}>
                {title}
              </TrackWaypoint>
            ))}
          </TrackBreakdown>
          <DownloadTrackButton points={waypoints.map(mapWaypointToPosition)} />
        </StyledSidebarContainer>
      </Sidebar>
      <Content>
        <Map center={MAP_CENTER} zoom={9} onClick={handleMarkerAdd}>
          {(map) => (
            <>
              <Tile map={map} url={TILE_URL} options={TILE_OPTIONS} />
              {waypoints.map(({ id, position }, index) => (
                <Marker
                  key={id}
                  map={map}
                  position={position}
                  text={String(index + 1)}
                  color="var(--color-secondary)"
                />
              ))}
              <Polyline map={map} points={waypoints.map(mapWaypointToPosition)} color="var(--color-secondary)" />
            </>
          )}
        </Map>
      </Content>
    </StyledGrid>
  );
};

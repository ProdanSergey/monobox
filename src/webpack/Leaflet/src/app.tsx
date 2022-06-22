import React, { FunctionComponent } from "react";
import { Content } from "./templates/content/content";
import { Sidebar } from "./templates/sidebar/sidebar";
import { Map } from "./components/map";
import { DownloadTrackButton } from "./components/download-track-button";

import { StyledGrid, StyledSidebarContainer } from "./app.styled";
import { TrackBreakdown, TrackWaypoint } from "./components/track-breakdown";
import { Waypoint } from "./shared/domain/waypoint";

const mockedWaypoints: Waypoint[] = [{ title: "Waypoint 1" }, { title: "Waypoint 2" }];

export const App: FunctionComponent = () => {
  return (
    <StyledGrid>
      <Sidebar title="Route Builder">
        <StyledSidebarContainer>
          <TrackBreakdown>
            {mockedWaypoints.map(({ title }, index) => (
              <TrackWaypoint key={index}>{title}</TrackWaypoint>
            ))}
          </TrackBreakdown>
          <DownloadTrackButton />
        </StyledSidebarContainer>
      </Sidebar>
      <Content>
        <Map />
      </Content>
    </StyledGrid>
  );
};

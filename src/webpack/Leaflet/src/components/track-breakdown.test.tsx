import { render, RenderResult, within } from "@testing-library/react";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WaypointBuilder } from "../shared/builders/waypoint";
import { Waypoint } from "../shared/domain/waypoint";
import { TrackBreakdown, TrackWaypoint, TRACK_WAYPOINT_REMOVE_TEXT, TRACK_WAYPOINT_TEST_ID } from "./track-breakdown";

describe("Track Breakdown", () => {
  let queries: RenderResult;

  const mockedWaypoints: Waypoint[] = [
    new WaypointBuilder({ lat: 1, lng: 2 }).build(),
    new WaypointBuilder({ lat: 3, lng: 4 }).build(),
  ];

  const renderComponent = () => {
    queries = render(
      <TrackBreakdown>
        {mockedWaypoints.map(({ title }, index) => (
          <TrackWaypoint key={index} index={index}>
            {title}
          </TrackWaypoint>
        ))}
      </TrackBreakdown>
    );
  };

  const getBreakdown = () => {
    return queries.container.querySelector("ul");
  };

  it("should render a tack breakdown", () => {
    renderComponent();

    expect(getBreakdown()).toBeInTheDocument();
  });

  it("should render waypoints into the breakdown", () => {
    renderComponent();

    const breakdown = getBreakdown();

    for (const { title } of mockedWaypoints) {
      expect(within(breakdown as HTMLElement).getByText(title)).toBeInTheDocument();
    }
  });
});

describe("Track Waypoint", () => {
  let queries: RenderResult;

  const mockedWaypoint: { title: string } = { title: "Waypoint 1" };

  const renderComponent = () => {
    queries = render(
      <DndProvider backend={HTML5Backend}>
        <TrackWaypoint index={1}>{mockedWaypoint.title}</TrackWaypoint>
      </DndProvider>
    );
  };

  it("should render a waypoint title", () => {
    renderComponent();

    expect(queries.getByText(mockedWaypoint.title)).toBeInTheDocument();
  });

  it("should render a waypoint order icon", () => {
    renderComponent();

    expect(queries.getByTestId(TRACK_WAYPOINT_TEST_ID)).toBeInTheDocument();
  });

  it("should render a waypoint remove icon", () => {
    renderComponent();

    expect(
      queries.getByRole("button", {
        name: TRACK_WAYPOINT_REMOVE_TEXT,
      })
    ).toBeInTheDocument();
  });
});

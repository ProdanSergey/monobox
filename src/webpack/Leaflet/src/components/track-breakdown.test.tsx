import { render, RenderResult, within } from "@testing-library/react";
import React from "react";
import { TrackBreakdown, TrackWaypoint, TRACK_WAYPOINT_REMOVE_TEXT, TRACK_WAYPOINT_TEST_ID } from "./track-breakdown";

describe("Track Breakdown", () => {
  let queries: RenderResult;

  const mockedWaypoints: { title: string }[] = [{ title: "Waypoint 1" }, { title: "Waypoint 2" }];

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
    queries = render(<TrackWaypoint index={1}>{mockedWaypoint.title}</TrackWaypoint>);
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

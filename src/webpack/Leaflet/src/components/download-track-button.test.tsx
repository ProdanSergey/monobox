import React from "react";
import { render, RenderResult } from "@testing-library/react";

import * as componentModule from "./download-track-button";
import { Position } from "../shared/domain/waypoint";

jest.spyOn(componentModule, "download");

Object.defineProperty(window, "URL", {
  value: {
    revokeObjectURL: jest.fn(),
    createObjectURL: jest.fn(),
  },
});

const { DownloadTrackButton, download } = componentModule;

describe("Download Track Button", () => {
  let queries: RenderResult;

  const mockedMarkers: Position[] = [
    { lat: 1, lng: 1 },
    { lat: 2, lng: 2 },
  ];

  const renderComponent = () => {
    queries = render(<DownloadTrackButton points={mockedMarkers} />);
  };

  it("should render a download track button", () => {
    renderComponent();

    expect(queries.getByRole("button")).toBeVisible();
  });

  it("should download gpx file when user clicks on button", () => {
    renderComponent();

    const button = queries.getByRole("button");
    button.click();

    expect(download).toHaveBeenCalledTimes(1);
  });
});

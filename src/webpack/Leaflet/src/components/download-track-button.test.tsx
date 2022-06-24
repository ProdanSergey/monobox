import React from "react";
import { render, RenderResult } from "@testing-library/react";
import leaflet from "leaflet";

import * as componentModule from "./download-track-button";

jest.spyOn(componentModule, "download");

Object.defineProperty(window, "URL", {
  value: {
    revokeObjectURL: jest.fn(),
    createObjectURL: jest.fn(),
  },
});

const { DownloadTrackButton, download } = componentModule;

const createMockedMarker = ({ lat, lng }: { lat: number; lng: number }): leaflet.CircleMarker => {
  return leaflet.circleMarker([lat, lng]);
};

describe("Download Track Button", () => {
  let queries: RenderResult;

  const mockedMarkers: leaflet.CircleMarker[] = [
    createMockedMarker({ lat: 1, lng: 1 }),
    createMockedMarker({ lat: 1, lng: 1 }),
  ];

  const renderComponent = () => {
    queries = render(<DownloadTrackButton markers={mockedMarkers} />);
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

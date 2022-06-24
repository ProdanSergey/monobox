import React from "react";
import { mock, mockClear } from "jest-mock-extended";
import { render, RenderResult } from "@testing-library/react";
import leaflet from "leaflet";

const mockedMap = mock<leaflet.Map>({
  addLayer: jest.fn().mockReturnThis(),
  on: jest.fn().mockReturnThis(),
  off: jest.fn().mockReturnThis(),
});

jest.mock("leaflet", () => {
  return {
    map: jest.fn().mockImplementation(() => mockedMap),
  };
});

import { Map, MapProps } from "./map";

const mockedTileLayer = mock<leaflet.TileLayer>();

describe("Download Track Button", () => {
  let queries: RenderResult;

  const renderComponent = (props: Partial<MapProps> = {}) => {
    queries = render(<Map tileLayer={mockedTileLayer} {...props} />);
  };

  beforeEach(() => {
    mockClear(mockedMap);
  });

  it("should render a map with a tile layer", () => {
    renderComponent();

    expect(queries.getByTestId("map")).toBeInTheDocument();
  });

  it("should render a map with a tile layer and 2 markers", () => {
    const mockedMarkers: leaflet.CircleMarker[] = [mock<leaflet.CircleMarker>(), mock<leaflet.CircleMarker>()];

    renderComponent({ markers: mockedMarkers });

    expect(mockedMap.addLayer).toHaveBeenCalledTimes(3);
  });

  it("should render a map with a tile layer 2 markers and polyline", () => {
    const mockedMarkers: leaflet.CircleMarker[] = [mock<leaflet.CircleMarker>(), mock<leaflet.CircleMarker>()];
    const renderPolyline = () => mock<leaflet.Polyline>();

    renderComponent({ markers: mockedMarkers, renderPolyline });

    expect(mockedMap.addLayer).toHaveBeenCalledTimes(4);
  });
});

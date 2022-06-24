import React from "react";
import { render, waitFor } from "@testing-library/react";
import { mock, mockClear } from "jest-mock-extended";
import leaflet from "leaflet";

const mockedPolyline = mock<leaflet.Polyline>({
  addTo: jest.fn().mockReturnThis(),
});
const polylineSpy = jest.spyOn(leaflet, "polyline").mockImplementation(() => mockedPolyline);

import { Polyline, PolylineProps } from "./polyline";

const createMap = (): leaflet.Map => {
  const div = document.createElement("div");

  return leaflet.map(div);
};

describe("Download Track Button", () => {
  const mockedPoints = [
    { lat: 1, lng: 1 },
    { lat: 2, lng: 2 },
  ];

  const renderComponent = (map: leaflet.Map, props?: Partial<PolylineProps>) => {
    render(<Polyline map={map} points={mockedPoints} {...props} />);
  };

  beforeEach(() => {
    mockClear(mockedPolyline);
    mockClear(polylineSpy);
  });

  it("should create a polyline and add it to the map", async () => {
    const map = createMap();

    renderComponent(map);

    await waitFor(() => {
      expect(mockedPolyline.addTo).toHaveBeenCalledTimes(1);
      expect(mockedPolyline.addTo).toHaveBeenCalledWith(map);
    });
  });

  it("should set an icon color to the marker", async () => {
    const map = createMap();

    renderComponent(map, { color: "pink" });

    await waitFor(() => {
      expect(polylineSpy).toHaveBeenCalledWith(mockedPoints, { color: "pink" });
    });
  });
});

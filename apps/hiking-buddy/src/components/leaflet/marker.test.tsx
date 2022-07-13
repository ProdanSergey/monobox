import React from "react";
import { render, waitFor } from "@testing-library/react";
import { mock, mockClear } from "jest-mock-extended";
import leaflet from "leaflet";

const mockedMarker = mock<leaflet.Marker>({
  setIcon: jest.fn().mockReturnThis(),
  addTo: jest.fn().mockReturnThis(),
});
jest.spyOn(leaflet, "marker").mockImplementation(() => mockedMarker);

import { Marker, MarkerProps } from "./marker";

const createMap = (): leaflet.Map => {
  const div = document.createElement("div");

  return leaflet.map(div);
};

const mockedPoint = { lat: 1, lng: 1 };

describe("Download Track Button", () => {
  const renderComponent = (map: leaflet.Map, props?: Partial<MarkerProps>) => {
    render(<Marker map={map} position={mockedPoint} {...props} />);
  };

  beforeEach(() => {
    mockClear(mockedMarker);
  });

  it("should create a marker", async () => {
    const map = createMap();

    renderComponent(map);

    await waitFor(() => {
      expect(mockedMarker.addTo).toHaveBeenCalledTimes(1);
      expect(mockedMarker.addTo).toHaveBeenCalledWith(map);
    });
  });

  it("should set an icon to the marker", async () => {
    const map = createMap();

    renderComponent(map);

    await waitFor(() => {
      expect(mockedMarker.setIcon).toHaveBeenCalledTimes(1);
      expect(mockedMarker.setIcon).toHaveBeenCalledWith(expect.any(leaflet.DivIcon));
    });
  });

  it("should set an icon with text to the marker", async () => {
    const map = createMap();

    renderComponent(map, { text: "test-text" });

    await waitFor(() => {
      const icon = mockedMarker.setIcon.mock.calls[0][0] as leaflet.DivIcon;
      expect(icon.options.html?.toString().includes("test-text"));
    });
  });

  it("should set an icon size to the marker", async () => {
    const map = createMap();

    renderComponent(map, { size: 20 });

    await waitFor(() => {
      expect(mockedMarker.setIcon.mock.calls[0][0].options.iconSize).toEqual([20, 20]);
    });
  });

  it("should set an icon color to the marker", async () => {
    const map = createMap();

    renderComponent(map, { size: 20, color: "pink" });

    await waitFor(() => {
      const icon = mockedMarker.setIcon.mock.calls[0][0] as leaflet.DivIcon;
      expect(icon.options.html?.toString().includes('fill="pink"'));
    });
  });
});

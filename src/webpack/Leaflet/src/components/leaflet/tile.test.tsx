import React from "react";
import { render, waitFor } from "@testing-library/react";
import { mock, mockClear } from "jest-mock-extended";
import leaflet from "leaflet";

const mockedTile = mock<leaflet.TileLayer>({
  addTo: jest.fn().mockReturnThis(),
});
const tileSpy = jest.spyOn(leaflet, "tileLayer").mockImplementation(() => mockedTile);

import { Tile, TileProps } from "./tile";

const createMap = (): leaflet.Map => {
  const div = document.createElement("div");

  return leaflet.map(div);
};

describe("Download Track Button", () => {
  const mockedURL = "mocked-url-template";

  const renderComponent = (map: leaflet.Map, props?: Partial<TileProps>) => {
    render(<Tile map={map} url={mockedURL} {...props} />);
  };

  beforeEach(() => {
    mockClear(mockedTile);
    mockClear(tileSpy);
  });

  it("should create a polyline and add it to the map", async () => {
    const map = createMap();

    renderComponent(map);

    await waitFor(() => {
      expect(mockedTile.addTo).toHaveBeenCalledTimes(1);
      expect(mockedTile.addTo).toHaveBeenCalledWith(map);
    });
  });
});

import React from "react";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { mock, mockClear } from "jest-mock-extended";
import leaflet from "leaflet";

const mockedMap = mock<leaflet.Map>({
  on: jest.fn().mockReturnThis(),
  off: jest.fn().mockReturnThis(),
  remove: jest.fn().mockReturnThis(),
});
jest.spyOn(leaflet, "map").mockImplementation(() => mockedMap);

import { Map, MapProps } from "./map";

describe("Download Track Button", () => {
  let queries: RenderResult;

  const renderComponent = (props: Partial<MapProps> = {}) => {
    queries = render(<Map {...props} />);
  };

  beforeEach(() => {
    mockClear(mockedMap);
  });

  it("should render a map with", () => {
    renderComponent();

    expect(queries.getByTestId("map")).toBeInTheDocument();
  });

  it("should render a map with children", () => {
    const mockedChildren = jest.fn().mockReturnValue(null);

    renderComponent({ children: mockedChildren });

    expect(mockedChildren).toHaveBeenCalledWith(mockedMap);
  });

  it("should handle the click on map", async () => {
    const mockedClick = jest.fn();

    renderComponent({ onClick: mockedClick });

    mockedMap.fire("click");

    await waitFor(() => {
      expect(mockedMap.on).toHaveBeenCalledTimes(1);
    });
  });
});

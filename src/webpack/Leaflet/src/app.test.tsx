import { render, RenderResult, within } from "@testing-library/react";
import React from "react";
import { mock, mockClear } from "jest-mock-extended";
import leaflet from "leaflet";

const mockedMap = mock<leaflet.Map>({
  on: jest.fn().mockReturnThis(),
  off: jest.fn().mockReturnThis(),
  remove: jest.fn().mockReturnThis(),
});
jest.spyOn(leaflet, "map").mockImplementation(() => mockedMap);

import { App } from "./app";
import { BUTTON_TEXT } from "./components/download-track-button";
import { TRACK_BREAKDOWN_TEST_ID } from "./components/track-breakdown";

describe("Application", () => {
  let queries: RenderResult;

  const renderComponent = () => {
    queries = render(<App />);
  };

  const getSidebarArea = () => {
    return queries.container.querySelector("aside");
  };

  const getContentArea = () => {
    return queries.container.querySelector("main");
  };

  beforeEach(() => {
    mockClear(mockedMap);
  });

  describe("SideBar Area", () => {
    it("should render sidebar area", () => {
      renderComponent();

      expect(getSidebarArea()).toBeInTheDocument();
    });

    it("should render download track button into the sidebar", () => {
      renderComponent();

      const sidebar = getSidebarArea();

      expect(
        within(sidebar as HTMLElement).getByRole("button", {
          name: BUTTON_TEXT,
        })
      );
    });

    it("should render track breakdown into the sidebar", () => {
      renderComponent();

      const sidebar = getSidebarArea();

      expect(within(sidebar as HTMLElement).getByTestId(TRACK_BREAKDOWN_TEST_ID)).toBeInTheDocument();
    });
  });

  describe("Content Area", () => {
    it("should render content area", () => {
      renderComponent();

      expect(getContentArea()).toBeInTheDocument();
    });

    it("should render map component into the content area", () => {
      renderComponent();

      const content = getContentArea();

      expect(within(content as HTMLElement).getByTestId("map")).toBeInTheDocument();
    });
  });
});

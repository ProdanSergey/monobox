import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { Sidebar } from "./sidebar";

describe("SideBar Template", () => {
  let queries: RenderResult;

  const mockedTitle = "Application Title";

  const renderComponent = () => {
    queries = render(<Sidebar title={mockedTitle} />);
  };

  it("should render an application title into the sidebar", () => {
    renderComponent();

    expect(
      queries.getByRole("heading", {
        level: 1,
        name: mockedTitle,
      })
    ).toBeInTheDocument();
  });
});

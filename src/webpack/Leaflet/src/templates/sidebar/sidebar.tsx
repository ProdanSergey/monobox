import React, { FunctionComponent, PropsWithChildren } from "react";
import { StyledHeader, StyledHeadline, StyledSidebar, StyledContent } from "./sidebar.styled";

type SidebarProps = PropsWithChildren<{
  title: string;
}>;

export const Sidebar: FunctionComponent<SidebarProps> = ({ title, children }) => {
  return (
    <StyledSidebar>
      <StyledHeader>
        <StyledHeadline>{title}</StyledHeadline>
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
    </StyledSidebar>
  );
};

import React, { FunctionComponent, PropsWithChildren } from "react";
import { StyledContent } from "./content.styled";

type ContentProps = PropsWithChildren<unknown>;

export const Content: FunctionComponent<ContentProps> = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};

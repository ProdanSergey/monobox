import React, { FunctionComponent } from "react";
import { StyledButton } from "./download-track-button.styled";

export const BUTTON_TEXT = "Download your Route";

export const DownloadTrackButton: FunctionComponent = () => {
  return <StyledButton>{BUTTON_TEXT}</StyledButton>;
};

import React, { useState, PointerEventHandler } from "react";
import { FunctionComponent } from "react";

import { Appointment } from "@monobox/appointment-contract";

import { StyledWrapper, StyledNavigationLink, StyledCopiedBadge, StyledCopyButton, StyledUri } from "./output.styled";

export type AppointmentOutputProps = {
  appointment: Appointment;
};

export const AppointmentOutput: FunctionComponent<AppointmentOutputProps> = ({ appointment: { id } }) => {
  const [copied, setCopied] = useState(false);

  const uri = `${window.location.origin}/${id}`;

  const handleCopy: PointerEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(uri);
    setCopied(true);
  };

  return (
    <StyledWrapper>
      {copied ? (
        <StyledCopiedBadge>Copied</StyledCopiedBadge>
      ) : (
        <StyledCopyButton onClick={handleCopy}>Copy</StyledCopyButton>
      )}
      <StyledNavigationLink to={id}>Navigate</StyledNavigationLink>
      <StyledUri>{uri}</StyledUri>
    </StyledWrapper>
  );
};

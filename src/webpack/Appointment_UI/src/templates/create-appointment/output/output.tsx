import React, { useState, PointerEventHandler } from "react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Appointment } from "../../../shared/domain/appointment";
import { StyledWrapper, StyledButton, StyledCopiedBadge, StyledUriText } from "./output.styled";

export type AppointmentOutputProps = {
  appointment: Appointment;
};

export const AppointmentOutput: FunctionComponent<AppointmentOutputProps> = ({ appointment }) => {
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const { id } = appointment;

  const uri = `${window.location.origin}/${id}`;

  const handleCopy: PointerEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(uri);
    setCopied(true);
  };

  const handleNavigate: PointerEventHandler<HTMLButtonElement> = () => {
    navigate(id);
  };

  return (
    <StyledWrapper>
      {copied ? <StyledCopiedBadge>Copied</StyledCopiedBadge> : <StyledButton onClick={handleCopy}>Copy</StyledButton>}
      <StyledButton onClick={handleNavigate}>Navigate</StyledButton>
      <StyledUriText>{uri}</StyledUriText>
    </StyledWrapper>
  );
};

import React from "react";
import { FunctionComponent } from "react";
import { Appointment } from "../../../shared/domain/appointment";
import { StyledWrapper, StyledButton } from "./output.styled";

export type CreateAppointmentOutputProps = {
  appointment: Appointment;
};

export const CreateAppointmentOutput: FunctionComponent<CreateAppointmentOutputProps> = ({ appointment }) => {
  return (
    <StyledWrapper>
      <StyledButton>Copy</StyledButton>
      <StyledButton>Navigate</StyledButton>
      <span>
        {window.location.origin}/{appointment._id}
      </span>
    </StyledWrapper>
  );
};

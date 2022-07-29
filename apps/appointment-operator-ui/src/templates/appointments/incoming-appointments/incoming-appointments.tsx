import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

import { Appointment } from "@monobox/appointment-contract";
import { ApiError, StyledAlert, StyledButton, useDataHandler } from "@monobox/appointment-library";

import { AppointmentCard } from "../../../components/appointment-card";
import { pickAppointment } from "../../../shared/api/appointment";
import { StyledItem, StyledList, StyledCardContainer } from "./incoming-appointments.styled";

export type IncomingAppointmentsProps = {
  appointments: Appointment[];
};

type IncomingAppointmentProps = {
  appointment: Appointment;
};

const IncomingAppointment: FunctionComponent<IncomingAppointmentProps> = ({ appointment }) => {
  const { data, error, isLoading, dataHandler } = useDataHandler<undefined, ApiError>(async () => {
    return pickAppointment({
      id: appointment.id,
    });
  });

  if (data !== null) {
    return <Navigate to={appointment.id} />;
  }

  return (
    <StyledItem>
      <StyledCardContainer>
        <AppointmentCard appointment={appointment} />
        <StyledButton disabled={isLoading} onClick={() => dataHandler()}>
          Pick
        </StyledButton>
      </StyledCardContainer>
      {error && <StyledAlert size="s">{error.message}</StyledAlert>}
    </StyledItem>
  );
};

export const IncomingAppointments: FunctionComponent<IncomingAppointmentsProps> = ({ appointments }) => {
  return (
    <>
      <header>
        <h2>Available appointments:</h2>
        <p>
          <em>Press &quot;Pick&quot; to process one</em>
        </p>
      </header>
      <StyledList>
        {appointments.map((appointment) => (
          <IncomingAppointment key={appointment.id} appointment={appointment} />
        ))}
      </StyledList>
    </>
  );
};

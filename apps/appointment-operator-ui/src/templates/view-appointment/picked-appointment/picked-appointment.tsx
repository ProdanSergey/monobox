import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

import { Appointment } from "@monobox/appointment-contract";
import { AppointmentNetworkClientError, StyledAlert, StyledButton, useDataHandler } from "@monobox/appointment-library";

import { AppointmentCard } from "../../../components/appointment-card";
import { completeAppointment } from "../../../shared/api/appointment";

export type PickedAppointmentProps = {
  appointment: Appointment;
};

export const PickedAppointment: FunctionComponent<PickedAppointmentProps> = ({ appointment }) => {
  const { data, error, isLoading, dataHandler } = useDataHandler<undefined, AppointmentNetworkClientError>(() => {
    return completeAppointment({ id: appointment.id });
  });

  if (data !== null) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <h2>You are currently working with:</h2>
      </header>
      <AppointmentCard appointment={appointment} />
      <StyledButton disabled={isLoading} onClick={() => dataHandler()}>
        Complete
      </StyledButton>
      {error && <StyledAlert size="m">{error.message}</StyledAlert>}
      <p>
        <em>Don&apos;t forget to complete current appointment when finished</em>
      </p>
    </>
  );
};

import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { completeAppointment } from "../../../shared/api/appointment";
import { Appointment } from "../../../shared/domain/appointment";
import { StyledAlert } from "../../../shared/elements/alert.styled";
import { StyledButton } from "../../../shared/elements/button.styled";
import { useDataHandler } from "../../../shared/hooks/use-data-handler";
import { AppointmentCard } from "../../../components/appointment-card";

export type PickedAppointmentProps = {
  appointment: Appointment;
};

export const PickedAppointment: FunctionComponent<PickedAppointmentProps> = ({ appointment }) => {
  const { data, error, isLoading, dataHandler } = useDataHandler<undefined, Error>(() => {
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
      <StyledButton disabled={isLoading} onClick={dataHandler}>
        Complete
      </StyledButton>
      {error && <StyledAlert size="m">{error.message}</StyledAlert>}
      <p>
        <em>Don&apos;t forget to complete current appointment when finished</em>
      </p>
    </>
  );
};

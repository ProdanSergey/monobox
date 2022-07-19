import React, { FunctionComponent, useContext } from "react";
import { Navigate } from "react-router-dom";

import { StyledAlert, StyledButton } from "@monobox/appointment-library";

import { AppointmentCard } from "../../../components/appointment-card";
import { UserContext } from "../../../context/user";
import { pickAppointment } from "../../../shared/api/appointment";
import { Appointment } from "../../../shared/domain/appointment";
import { useDataHandler } from "../../../shared/hooks/use-data-handler";
import { StyledItem, StyledList, StyledCardContainer } from "./incoming-appointments.styled";

export type IncomingAppointmentsProps = {
  appointments: Appointment[];
};

type IncomingAppointmentProps = {
  appointment: Appointment;
};

const IncomingAppointment: FunctionComponent<IncomingAppointmentProps> = ({ appointment }) => {
  const { user } = useContext(UserContext);

  const { data, error, isLoading, dataHandler } = useDataHandler<undefined, Error>(async () => {
    if (!user) {
      throw new Error("Not Authorized");
    }

    return pickAppointment(
      {
        id: appointment.id,
      },
      user
    );
  });

  if (data !== null) {
    return <Navigate to={appointment.id} />;
  }

  return (
    <StyledItem>
      <StyledCardContainer>
        <AppointmentCard appointment={appointment} />
        <StyledButton disabled={isLoading} onClick={dataHandler}>
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

import React, { FunctionComponent, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { Appointment } from "@monobox/appointment-contract";
import {
  AppointmentNetworkClientError,
  StyledAlert,
  StyledContainer,
  StyledSection,
  useDataPuller,
} from "@monobox/appointment-frontend";

import { getAppointment } from "../shared/api/appointment";
import { QueuedAppointment } from "../templates/view-appointment/queued-appointment/queued-appointment";
import { PickedAppointment } from "../templates/view-appointment/picked-appointment/picked-appointment";
import { CompletedAppointment } from "../templates/view-appointment/completed-appointment/completed-appointment";

const mapAppointmentOverview = (appointment: Appointment): React.ReactNode => {
  if (appointment.completed) {
    return <CompletedAppointment appointment={appointment} />;
  }

  if (appointment.operator) {
    return <PickedAppointment appointment={appointment} />;
  }

  return <QueuedAppointment appointment={appointment} />;
};

type PageParams = {
  appointmentId: string;
};

export const ViewAppointmentPage: FunctionComponent = () => {
  const { appointmentId } = useParams<PageParams>();
  const [search] = useSearchParams();

  const pullAppointment = useCallback(async () => {
    if (!appointmentId) {
      throw new AppointmentNetworkClientError("Id is not provided");
    }

    const token = search.get("token");

    if (!token) {
      throw new AppointmentNetworkClientError("Token is not provided");
    }

    const appointment = await getAppointment({ id: appointmentId }, token);

    return {
      data: appointment,
      completed: appointment.completed,
      timeout: 15 * 1000,
    };
  }, [appointmentId, search]);

  const { error, data } = useDataPuller<Appointment, Error>(pullAppointment);

  return (
    <StyledContainer>
      {error && (
        <StyledSection>
          <StyledAlert size="m">{error.message}</StyledAlert>;
        </StyledSection>
      )}

      {data && <StyledSection>{mapAppointmentOverview(data)}</StyledSection>}
    </StyledContainer>
  );
};

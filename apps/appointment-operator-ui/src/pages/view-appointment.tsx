import React, { FunctionComponent, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Appointment, AppointmentGetResponseData } from "@monobox/appointment-contract";
import {
  AppointmentNetworkClientError,
  StyledAlert,
  StyledContainer,
  StyledSection,
  useData,
} from "@monobox/appointment-frontend";

import { getAppointment } from "../shared/api/appointment";
import { PickedAppointment } from "../templates/view-appointment/picked-appointment/picked-appointment";
import { CompletedAppointment } from "../templates/view-appointment/completed-appointment/completed-appointment";

const mapAppointmentOverview = (appointment: Appointment): React.ReactNode => {
  if (appointment.completed) {
    return <CompletedAppointment appointment={appointment} />;
  }

  return <PickedAppointment appointment={appointment} />;
};

type PageParams = {
  appointmentId: string;
};

export const ViewAppointmentPage: FunctionComponent = () => {
  const { appointmentId } = useParams<PageParams>();

  const fetchAppointment = useCallback(() => {
    if (!appointmentId) {
      throw new AppointmentNetworkClientError("Id is not available");
    }
    return getAppointment({ id: appointmentId });
  }, [appointmentId]);

  const { data, error } = useData<AppointmentGetResponseData, AppointmentNetworkClientError>(fetchAppointment);

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

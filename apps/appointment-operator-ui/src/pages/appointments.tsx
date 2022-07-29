import React, { FunctionComponent, useCallback } from "react";

import { AppointmentListResponseData } from "@monobox/appointment-contract";
import { ApiError, StyledAlert, StyledContainer, StyledSection, useDataPuller } from "@monobox/appointment-library";

import { getAppointments } from "../shared/api/appointment";
import { IncomingAppointments } from "../templates/appointments/incoming-appointments/incoming-appointments";

export const AppointmentsPage: FunctionComponent = () => {
  const pullAppointments = useCallback(async () => {
    const data = await getAppointments({ completed: false });

    return {
      data,
      completed: false,
    };
  }, []);

  const { data, error } = useDataPuller<AppointmentListResponseData, ApiError>(pullAppointments);

  return (
    <StyledContainer>
      {error && (
        <>
          <StyledSection>
            <StyledAlert size="m">{error.message}</StyledAlert>
          </StyledSection>
        </>
      )}

      {data && (
        <StyledSection>
          <IncomingAppointments appointments={data} />
        </StyledSection>
      )}
    </StyledContainer>
  );
};

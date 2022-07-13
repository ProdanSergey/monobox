import React, { FunctionComponent, useCallback } from "react";
import { Appointment } from "../shared/domain/appointment";
import { getAppointments } from "../shared/api/appointment";
import { StyledContainer, StyledSection } from "../shared/elements/layout.styled";
import { StyledAlert } from "../shared/elements/alert.styled";
import { useDataPuller } from "../shared/hooks/use-data-puller";
import { IncomingAppointments } from "../templates/appointments/incoming-appointments/incoming-appointments";

export const AppointmentsPage: FunctionComponent = () => {
  const pullAppointments = useCallback(async () => {
    const data = await getAppointments({ completed: false });

    return {
      data,
      completed: false,
    };
  }, []);

  const { data, error } = useDataPuller<Appointment[], Error>(pullAppointments);

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

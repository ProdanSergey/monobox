import React, { FunctionComponent } from "react";
import { Appointment } from "../shared/domain/appointment";
import { createAppointment, CreateAppointmentBody } from "../shared/api/appointment";
import { StyledSection, StyledContainer } from "../shared/elements/layout.styled";
import { StyledSpacer } from "../shared/elements/spacer.styled";
import { StyledAlert } from "../shared/elements/alert.styled";
import { useAsyncHandler } from "../shared/hooks/use-async-handler";
import { AppointmentForm } from "../templates/create-appointment/form/form";
import { AppointmentOutput } from "../templates/create-appointment/output/output";

export const CreateAppointmentPage: FunctionComponent = () => {
  const { data, error, isLoading, asyncHandler } = useAsyncHandler<Appointment, Error, CreateAppointmentBody>(
    ({ fullName, email }) => {
      return createAppointment({ fullName, email });
    }
  );

  return (
    <StyledContainer>
      <StyledSection>
        <AppointmentForm isLoading={isLoading} onSubmit={({ fullName, email }) => asyncHandler({ fullName, email })} />
      </StyledSection>

      {error && (
        <>
          <StyledSpacer size="m" />
          <StyledSection>
            <StyledAlert size="m">{error.message}</StyledAlert>
          </StyledSection>
        </>
      )}

      {data && (
        <>
          <StyledSpacer size="m" />
          <StyledSection>
            <AppointmentOutput appointment={data} />
          </StyledSection>
        </>
      )}
    </StyledContainer>
  );
};

import React, { FunctionComponent } from "react";

import { AppointmentCreateBody, AppointmentCreateResponseData } from "@monobox/appointment-contract";
import {
  ApiError,
  StyledAlert,
  StyledContainer,
  StyledSection,
  StyledSpacer,
  useDataHandler,
} from "@monobox/appointment-library";

import { createAppointment } from "../shared/api/appointment";
import { AppointmentForm } from "../templates/create-appointment/form/form";
import { AppointmentOutput } from "../templates/create-appointment/output/output";

export const CreateAppointmentPage: FunctionComponent = () => {
  const { data, error, isLoading, dataHandler } = useDataHandler<
    AppointmentCreateResponseData,
    ApiError,
    AppointmentCreateBody
  >(({ fullName, email }) => {
    return createAppointment({ fullName, email });
  });

  return (
    <StyledContainer>
      <StyledSection>
        <AppointmentForm isLoading={isLoading} onSubmit={({ fullName, email }) => dataHandler({ fullName, email })} />
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

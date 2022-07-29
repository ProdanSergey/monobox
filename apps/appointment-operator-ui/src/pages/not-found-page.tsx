import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import { StyledAlert, StyledContainer, StyledSection } from "@monobox/appointment-library";

export const NotFoundPage: FunctionComponent = () => {
  return (
    <StyledContainer>
      <StyledSection>
        <StyledAlert type="info" size="m">
          Page is not found. Go to <Link to="/">home page</Link>.
        </StyledAlert>
      </StyledSection>
    </StyledContainer>
  );
};

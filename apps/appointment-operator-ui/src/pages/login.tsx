import React, { FunctionComponent, useContext } from "react";
import { Navigate } from "react-router-dom";

import { StyledContainer, StyledSection } from "@monobox/appointment-library";

import { UserContext } from "../context/user";
import { UserForm } from "../templates/login/form/form";

export const LoginPage: FunctionComponent = () => {
  const { user, setUser } = useContext(UserContext);

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <StyledContainer>
      <StyledSection>
        <UserForm onSubmit={({ fullName, email }) => setUser({ fullName, email })} />
      </StyledSection>
    </StyledContainer>
  );
};

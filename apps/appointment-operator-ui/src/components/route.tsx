import React, { FunctionComponent, PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user";

export const AuthorizedRoute: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/sign-up" replace={true} />;
  }

  return <>{children}</>;
};

type DeAuthorizedRouteProps = PropsWithChildren<{
  to?: string;
}>;

export const DeAuthorizedRoute: FunctionComponent<DeAuthorizedRouteProps> = ({ children, to = "/" }) => {
  const { user } = useContext(UserContext);

  if (user) {
    return <Navigate to={to} replace={true} />;
  }

  return <>{children}</>;
};

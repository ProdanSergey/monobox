import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { capitalize } from "@monobox/utils";

import { AuthorizedRoute, DeAuthorizedRoute } from "./components/route";
import { UserContext } from "./context/user";
import { AppointmentsPage } from "./pages/appointments";
import { ViewAppointmentPage } from "./pages/view-appointment";
import { SignUpPage } from "./pages/sign-up";
import { SignInPage } from "./pages/sign-in";
import { SignInVerifyPage } from "./pages/sign-in-verify";
import { NotFoundPage } from "./pages/not-found-page";

const AppComponent = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <header>
        <h1>Hello, {user ? capitalize(user.fullName) : "Guest"}!</h1>
      </header>
      <main>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <AuthorizedRoute>
                  <AppointmentsPage />
                </AuthorizedRoute>
              }
            />
            <Route
              path=":appointmentId"
              element={
                <AuthorizedRoute>
                  <ViewAppointmentPage />
                </AuthorizedRoute>
              }
            />
          </Route>
          <Route
            path="/sign-up"
            element={
              <DeAuthorizedRoute>
                <SignUpPage />
              </DeAuthorizedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <DeAuthorizedRoute>
                <SignInPage />
              </DeAuthorizedRoute>
            }
          />
          <Route
            path="/sign-in/verify"
            element={
              <DeAuthorizedRoute>
                <SignInVerifyPage />
              </DeAuthorizedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};

export const App = React.memo(AppComponent);
App.displayName = "App";

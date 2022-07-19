import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppointmentsPage } from "./pages/appointments";
import { ViewAppointmentPage } from "./pages/view-appointment";
import { LoginPage } from "./pages/login";
import { AuthorizedRoute, DeAuthorizedRoute } from "./components/route";
import { UserContext } from "./context/user";
import { capitalize } from "./shared/helpers/string.capitalize";

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
            path="/login"
            element={
              <DeAuthorizedRoute>
                <LoginPage />
              </DeAuthorizedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export const App = React.memo(AppComponent);
App.displayName = "App";

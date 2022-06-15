import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateAppointmentPage } from "./pages/create-appointment";
import { ViewAppointmentPage } from "./pages/view-appointment";

export const App = () => {
  return (
    <>
      <header>
        <h1>You are welcome here!</h1>
      </header>
      <main>
        <Routes>
          <Route path="/">
            <Route index element={<CreateAppointmentPage />} />
            <Route path=":appointmentId" element={<ViewAppointmentPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

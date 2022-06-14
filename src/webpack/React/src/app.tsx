import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateAppointmentPage } from "./pages/create-appointment";

export const App = () => {
  return (
    <>
      <header>
        <h1>Your are welcome here!</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<CreateAppointmentPage />} />
        </Routes>
      </main>
    </>
  );
};

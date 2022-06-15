import React, { FunctionComponent } from "react";
import { Appointment } from "../../../shared/domain/appointment";

export type PickedAppointmentProps = {
  appointment: Appointment;
};

export const PickedAppointment: FunctionComponent<PickedAppointmentProps> = ({ appointment }) => {
  return (
    <div>
      <span>
        Your appointment is picked up by: <strong>{appointment.operator?.fullName}</strong>
      </span>
    </div>
  );
};

import React, { FunctionComponent } from "react";
import dayjs from "dayjs";

import { Appointment } from "@monobox/appointment-contract";

const formatMoment = (finish: string) => {
  return `${dayjs(finish).format("DD/MM/YYYY")} at ${dayjs(finish).format("HH:mm:ss")}`;
};

const formatOperator = (operator: Appointment["operator"]) => {
  if (!operator) return "";
  return `${operator.fullName}`;
};

export type CompletedAppointmentProps = {
  appointment: Appointment;
};

export const CompletedAppointment: FunctionComponent<CompletedAppointmentProps> = ({ appointment }) => {
  const { updated_at, operator } = appointment;

  return (
    <div>
      <span>This appointment was completed</span> <time dateTime={updated_at}>{formatMoment(updated_at)}</time>{" "}
      <span>
        by <strong>{formatOperator(operator)}</strong>
      </span>
    </div>
  );
};

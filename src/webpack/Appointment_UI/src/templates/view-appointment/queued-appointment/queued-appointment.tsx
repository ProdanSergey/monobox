import React, { useState, FunctionComponent, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { Appointment } from "../../../shared/domain/appointment";
import { StyledCountdown, StyledLabel, StyledOutput } from "./queued-appointment.styled";

const formatMoment = (start: string, moment: dayjs.Dayjs): string => {
  return dayjs(start).from(moment);
};

type QueueTimerProps = {
  start: string;
};

const QueueTimer: FunctionComponent<QueueTimerProps> = ({ start }) => {
  const [moment, setMoment] = useState(dayjs());

  useEffect(() => {
    const timerId = setInterval(() => {
      setMoment(dayjs());
    }, 15 * 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [start]);

  return (
    <div>
      <span>Queued:</span> <StyledCountdown dateTime={start}>{formatMoment(start, moment)}</StyledCountdown>
    </div>
  );
};

export type QueuedAppointmentProps = {
  appointment: Appointment;
};

export const QueuedAppointment: FunctionComponent<QueuedAppointmentProps> = ({ appointment }) => {
  const { ticket, created_at } = appointment;

  return (
    <div>
      <StyledLabel>Your ticket:</StyledLabel>
      <StyledOutput>{ticket}</StyledOutput>
      <QueueTimer start={created_at} />
    </div>
  );
};

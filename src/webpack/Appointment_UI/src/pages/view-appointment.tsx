import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointment } from "../shared/api/appointment";
import { Appointment } from "../shared/domain/appointment";

type PageParams = {
  appointmentId: string;
};

export const ViewAppointmentPage: FunctionComponent = () => {
  const { appointmentId } = useParams<PageParams>();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const request = async (id: string) => {
    try {
      const response = await getAppointment({ id });

      if (!appointment || response.completed) {
        setAppointment(response);
      }

      if (!response.completed) {
        timerRef.current = setTimeout(request, 15 * 1000, id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!appointmentId) return undefined;

    request(appointmentId);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [appointmentId]);

  if (!appointment) {
    return null;
  }

  if (appointment.completed) {
    return (
      <section>
        <span>Your appointment completed</span>
      </section>
    );
  }

  return (
    <section>
      <ul>
        <li>{appointment._id}</li>
        <li>{appointment.assignee.fullName}</li>
        <li>{appointment.created_at}</li>
      </ul>
    </section>
  );
};

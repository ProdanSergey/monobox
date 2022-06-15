import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointment } from "../shared/api/appointment";
import { Appointment } from "../shared/domain/appointment";
import { StyledBlock, StyledWrapper } from "../shared/layout/layout.styled";
import { QueuedAppointment } from "../templates/view-appointment/queued-appointment/queued-appointment";
import { PickedAppointment } from "../templates/view-appointment/picked-appointment/picked-appointment";
import { CompletedAppointment } from "../templates/view-appointment/completed-appointment/completed-appointment";

const mapAppointmentOverview = (appointment: Appointment): React.ReactNode => {
  if (appointment.completed) {
    return <CompletedAppointment appointment={appointment} />;
  }

  if (appointment.operator) {
    return <PickedAppointment appointment={appointment} />;
  }

  return <QueuedAppointment appointment={appointment} />;
};

type PageParams = {
  appointmentId: string;
};

export const ViewAppointmentPage: FunctionComponent = () => {
  const { appointmentId } = useParams<PageParams>();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const request = async (id: Appointment["id"]) => {
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

  return (
    <StyledWrapper>
      <StyledBlock>{mapAppointmentOverview(appointment)}</StyledBlock>
    </StyledWrapper>
  );
};

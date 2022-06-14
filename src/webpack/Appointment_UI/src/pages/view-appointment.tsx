import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

type PageParams = {
  appointmentId: string;
};

export const ViewAppointmentPage: FunctionComponent = () => {
  const { appointmentId } = useParams<PageParams>();

  return <section>{appointmentId}</section>;
};

import React, { FunctionComponent } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Appointment } from "@monobox/appointment-contract";

import { StyledItem, StyledList } from "./appointment-card.styled";

export type AppointmentCardProps = {
  appointment: Appointment;
};

const formatDate = (timestamp: string): string => {
  return dayjs(timestamp).fromNow();
};

export const AppointmentCard: FunctionComponent<AppointmentCardProps> = ({ appointment }) => {
  const { assignee, created_at, updated_at, operator } = appointment;

  return (
    <article>
      <section>
        <StyledList>
          <StyledItem>
            <strong>FullName</strong>: {assignee.fullName}
          </StyledItem>
          <StyledItem>
            <strong>Email</strong>: {assignee.email}
          </StyledItem>
          <StyledItem>
            <strong>Created</strong>: <time dateTime={created_at}>{formatDate(created_at)}</time>
          </StyledItem>
          {operator && (
            <StyledItem>
              <strong>Picked</strong>: <time dateTime={updated_at}>{formatDate(updated_at)}</time>
            </StyledItem>
          )}
        </StyledList>
      </section>
    </article>
  );
};

type AppointmentBaseParams = {
  id: string;
};

export type AppointmentGetParams = AppointmentBaseParams;

export type AppointmentUpdateParams = AppointmentBaseParams;
export type AppointmentUpdateBody = { completed: boolean };

export type AppointmentDeleteParams = AppointmentBaseParams;

export type AppointmentListQuery = Partial<{ completed: boolean; limit: number }>;

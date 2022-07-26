type AppointmentBaseParams = {
  id: string;
};

export type AppointmentCreateBody = { fullName: string; email: string };

export type AppointmentGetParams = AppointmentBaseParams;

export type AppointmentDeleteParams = AppointmentBaseParams;

export type AppointmentListQuery = Partial<{ completed: boolean; limit: number }>;

export type AppointmentPickParams = AppointmentBaseParams;

export type AppointmentCompleteParams = AppointmentBaseParams;

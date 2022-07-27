type Appointment = {
  id: string;
  ticket: string;
  assignee: {
    fullName: string;
    email: string;
  };
  operator?: {
    fullName: string;
    email: string;
  };
  resolution?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type AppointmentCreateResponse = Appointment;
export type AppointmentGetResponse = Appointment;
export type AppointmentListResponse = Appointment[];

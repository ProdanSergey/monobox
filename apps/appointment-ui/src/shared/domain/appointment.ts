export type Appointment = {
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
  completed: boolean;
  created_at: string;
  updated_at: string;
};

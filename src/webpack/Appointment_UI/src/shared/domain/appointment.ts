export type Appointment = {
  _id: string;
  assignee: {
    fullName: string;
    email: string;
  };
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export interface AppointmentsParams {
	facilityId: string;
	doctorId: string;
}

export interface AppointmentParams extends AppointmentsParams {
	appointmentId: string;
}

export interface AppointmentDTO {
	startAt: string;
}

export interface AppointmentUpdateDTO {
	startAt: string;
}

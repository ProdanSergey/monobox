import { Appointment } from "../../entities/appointment.entity";
import { AppointmentRepository } from "../../repositories/appointment.repository";
import { DoctorRepository } from "../../repositories/doctor.repository";

export class AppointmentService {
	constructor(
		private readonly appointmentRepository = new AppointmentRepository(),
		private readonly doctorRepository = new DoctorRepository()
	) {}

	create(userId: string, facilityId: string, doctorId: string, startAt: string): Appointment {
		const doctor = this.doctorRepository.findOneOrFail({ id: doctorId, facility: { id: facilityId } });

		const appointment = new Appointment();

		appointment.userId = userId;
		appointment.startAt = startAt;
		appointment.doctor = doctor;

		return this.appointmentRepository.insert(appointment);
	}

	find(userId: string, facilityId: string, doctorId: string, appointmentId: string): Appointment {
		return this.appointmentRepository.findOneOrFail({ id: appointmentId, userId, doctor: { id: doctorId, facility: { id: facilityId} } });
	}

	update(userId: string, facilityId: string, doctorId: string, appointmentId: string, startAt: string): Appointment {
		this.find(userId, facilityId, doctorId, appointmentId);

		return this.appointmentRepository.update({ startAt }, appointmentId);
	}

	delete(userId: string, facilityId: string, doctorId: string, appointmentId: string): Appointment {
		this.find(userId, facilityId, doctorId, appointmentId);

		return this.appointmentRepository.delete(appointmentId);
	}

	list(userId: string, facilityId: string, doctorId: string): Appointment[] {
		return this.appointmentRepository.findMany({ userId, doctor: { id: doctorId, facility: { id: facilityId} } });
	}
};
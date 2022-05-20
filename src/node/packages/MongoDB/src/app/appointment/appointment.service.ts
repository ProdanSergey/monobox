import { NotFoundError } from "../../definitions/error.definition";
import { IAppointment, Appointment } from "../../models/appointment.model";
import { Doctor } from "../../models/doctor.model";

export class AppointmentService {
  async create(userId: string, facilityId: string, doctorId: string, startAt: string): Promise<IAppointment> {
    const doctor = await Doctor.findOne({
      _id: doctorId,
      facility: facilityId,
    }).exec();

    if (!doctor) {
      throw new NotFoundError();
    }

    const appointment = new Appointment({
      userId,
      startAt,
      doctor,
    });

    return appointment.save();
  }

  async find(userId: string, facilityId: string, doctorId: string, appointmentId: string): Promise<IAppointment> {
    const doctor = await Doctor.findOne({
      _id: doctorId,
      facility: facilityId,
    }).exec();

    if (!doctor) {
      throw new NotFoundError();
    }

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      userId,
      doctor: doctor.id,
    }).exec();

    if (!appointment) {
      throw new NotFoundError();
    }

    return appointment;
  }

  async update(
    userId: string,
    facilityId: string,
    doctorId: string,
    appointmentId: string,
    startAt: string
  ): Promise<IAppointment> {
    await this.find(userId, facilityId, doctorId, appointmentId);

    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { startAt }, { new: true }).exec();

    if (!appointment) {
      throw new NotFoundError();
    }

    return appointment;
  }

  async delete(userId: string, facilityId: string, doctorId: string, appointmentId: string): Promise<void> {
    await this.find(userId, facilityId, doctorId, appointmentId);

    await Appointment.findByIdAndDelete(appointmentId).exec();
  }

  async list(userId: string, facilityId: string, doctorId: string): Promise<IAppointment[]> {
    const doctor = await Doctor.findOne({
      _id: doctorId,
      facility: facilityId,
    }).exec();

    if (!doctor) {
      throw new NotFoundError();
    }

    return Appointment.find({ userId, doctor: doctor.id }).exec();
  }
}

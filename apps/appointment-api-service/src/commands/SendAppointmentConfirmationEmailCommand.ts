import { Mailer } from "@monobox/appointment-core";

type SendAppointmentConfirmationEmailCommandParams = {
  email: string;
  token: string;
};

export class SendAppointmentConfirmationEmailCommand {
  constructor(private readonly mailer: Mailer) {}

  execute({ email, token }: SendAppointmentConfirmationEmailCommandParams): void {
    this.mailer.send({
      address: email,
      subject: "USER TOKEN",
      body: token,
    });
  }
}

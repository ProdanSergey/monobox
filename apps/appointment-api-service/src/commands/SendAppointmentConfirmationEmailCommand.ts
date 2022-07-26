type SendAppointmentConfirmationEmailCommandParams = {
  token: string;
};

export class SendAppointmentConfirmationEmailCommand {
  execute({ token }: SendAppointmentConfirmationEmailCommandParams): void {
    console.log("USER TOKEN:", token);
  }
}

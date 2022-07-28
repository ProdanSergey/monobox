import { Logger } from "../ports/logger";
import { Mailer, MailerConfig } from "../ports/mailer";

export class FakeMailer implements Mailer {
  constructor(private readonly logger: Logger) {}

  send({ subject, address, body }: MailerConfig): void | Promise<void> {
    this.logger.print(`To: ${address}, Subject: ${subject}, Body: ${body}`);
  }
}

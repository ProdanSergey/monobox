export type MailerConfig = {
  subject: string;
  address: string;
  body?: string;
};

export interface Mailer {
  send(config: MailerConfig): void | Promise<void>;
}

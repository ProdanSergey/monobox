export class Logger {
	constructor() {}

	notify(...messages: unknown[]): void {
		console.log('>>>', `[${new Date().toISOString()}]`, ...messages)
	}

	throw({ message }: Error): void {
		this.notify(message);
	}
}
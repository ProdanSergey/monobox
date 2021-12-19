import { log } from './utils/log';

class Timer {
	current = 0;

	start() {
		setInterval(() => {
			log(`you spend here ${this.current += 1} sec`)
		}, 1000);
	}
}

new Timer().start();
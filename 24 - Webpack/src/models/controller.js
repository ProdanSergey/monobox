import { log } from '../utils/log';

export class Controller {
	constructor(route) {
		this.route = route;
	}

	handle() {
		log(this.route);
	}
}
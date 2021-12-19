import dayjs from 'dayjs';

export const log = (message = '') => {
	const date = dayjs().format('YYYY-MM-DD:HH-MM-ss');
	console.log(date, message);
};
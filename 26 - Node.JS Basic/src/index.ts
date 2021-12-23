import { App } from './app';

const [ argv ] = process.argv.slice(2);

new App().listen(argv);
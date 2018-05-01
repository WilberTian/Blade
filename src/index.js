import 'babel-polyfill';

import updateNotifier from 'update-notifier';
import pkg from '../package.json';
import initBladeCommands from './commands'
import { createConfigIfNotExist } from './config/configManager'

const main = async () => {
	updateNotifier({ pkg }).notify();

	await createConfigIfNotExist();
	initBladeCommands();
};

main().catch((ex) => {
    throw ex;
});;

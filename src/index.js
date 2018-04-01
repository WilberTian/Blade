import 'babel-polyfill';

import initBladeCommands from './commands'
import { createConfigIfNotExist } from './config/configManager'

const main = async () => {
	await createConfigIfNotExist();
	initBladeCommands();
};

main().catch((ex) => {
    throw ex;
});;

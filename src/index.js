import 'babel-polyfill';

import initBladeCommands from './commands'

import { createTplConfigIfNotExist } from './tpl/tplManager'

var main = async() => {
	await createTplConfigIfNotExist();
	
	initBladeCommands();
};

main();

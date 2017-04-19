import chalk from 'chalk';


import { readTplConfig } from '../tpl/tplManager';

export const displayConfigList = async(callback) => {
	let configList = readTplConfig()['list'];
	let configNameList = [];

	for(let [idx, config] of configList.entries()) {
		configNameList.push(config['name']);
		console.log(chalk.blue.bold((idx + 1) + '. ') + chalk.green(config.name));
	}

	await callback(configList);
};


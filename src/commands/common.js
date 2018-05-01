import chalk from 'chalk';

import { loadConfig } from '../config/configManager';

export const displayConfigList = (configList) => {
    if(configList.length === 0) {
		console.log(chalk.yellow('No available boilerplate'));
		return fasle;
	} else {
		configList.forEach((configItem, idx) => {
			console.log(chalk.blue.bold((idx + 1) + '. ') + chalk.green(`${configItem.name} (${configItem.branch})`));
		});
	}

	return true;
};
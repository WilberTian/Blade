import inquirer from 'inquirer';
import chalk from 'chalk';

import { loadConfig } from '../config/configManager';
import { displayConfigList } from './common';

const listCommand = async () => {

	const configList = loadConfig()['list'];

	const hasAvailableConfigs = displayConfigList(configList);
	if (!hasAvailableConfigs) {
		return;
	}

	while(true) {
		let selected = await inquirer.prompt([
			{
				type: 'input',
				message: 'Show detail of (quit with invalid idx) => ',
				name: 'idx'
			}
		]);

		let selectedIdx = parseInt(selected.idx);
		if (!isNaN(selectedIdx) && selectedIdx >=1 && selectedIdx <= configList.length) {
			console.log(chalk.magenta(JSON.stringify(configList[selectedIdx - 1], null, '  ')));
		} else {
			console.log(chalk.red('Quit with invalid idx!'));
			break;
		}
	}
};

export default listCommand;
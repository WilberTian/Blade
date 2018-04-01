import inquirer from 'inquirer';
import chalk from 'chalk';

import { loadConfig, deleteConfigItem } from '../config/configManager';
import { displayConfigList } from './common'

const deleteCommand = async () => {	

	const configList = loadConfig()['list'];

	displayConfigList(configList);

	let selected = await inquirer.prompt([
		{
			type: 'input',
			message: 'Delete item (quit with invalid idx) => ',
			name: 'idx'
		}
	]);

	let selectedIdx = parseInt(selected.idx);
	if (!isNaN(selectedIdx) && selectedIdx >=1 && selectedIdx <= configList.length) {
		const deletedConfigItemName = await deleteConfigItem(selectedIdx - 1);
		console.log(chalk.green('Success!') + ' - ' + chalk.white.bgRed.bold(`${configItem.name} (${configItem.branch})`) + ' was deleted!');
	} else {
		console.log(chalk.red('Quit with invalid idx!'));
	}
};

export default deleteCommand;
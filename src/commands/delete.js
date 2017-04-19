import inquirer from 'inquirer';
import chalk from 'chalk';

import { deleteTplConfigItem } from '../tpl/tplManager';
import { displayConfigList } from './common'

const deleteCommand = async() => {	
	const callback = async(configList) => {
		if(configList.length === 0) {
			console.log(chalk.yellow('No available boilerplate'));
			return;
		}
		
		let selected = await inquirer.prompt([
		    {
		        type: 'input',
		        message: 'Delete item (quit with invalid idx) => ',
		        name: 'idx'
		    }
		]);

		let selectedIdx = parseInt(selected.idx);
		if (!isNaN(selectedIdx) && selectedIdx >=1 && selectedIdx <= configList.length) {
			await deleteTplConfigItem(selectedIdx - 1);
			console.log(chalk.green('Success!') + ' - ' + chalk.black.bgRed.bold(configList[selectedIdx - 1].name) + ' was deleted!');
		} else {
			console.log(chalk.red('Quit with invalid idx!'));
		}
		
	};

	await displayConfigList(callback);
};

export default deleteCommand;
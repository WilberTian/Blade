import inquirer from 'inquirer';
import chalk from 'chalk';

import { addTplConfigItem } from '../tpl/tplManager';


const addCommand = async() => {
	const questions = [
	    {
	        type: 'input',
	        name: 'name',
	        message: 'Boilerplate name => ',
	        validate: function (value) {
	            var pass = value.match(/\w+/);
	            if (pass) {
	                return true;
	            }

	            return 'The Boilerplate name should NOT be empty';
	        }
	    },
	    {
	        type: 'input',
	        name: 'repo',
	        message: 'Boilerplate repo address => '
	    },
	    {
	        type: 'input',
	        name: 'branch',
	        message: 'Boilerplate branch => ',
	        default: () => 'master'
	    }
	];

	const configItem = await inquirer.prompt(questions);

	await addTplConfigItem(configItem);

	console.log(chalk.green('Success!') + ' - ' + chalk.black.bgGreen.bold(configItem.name) + ' was added!');
};

export default addCommand;
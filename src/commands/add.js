import inquirer from 'inquirer';
import chalk from 'chalk';

import { configItemExist, addConfigItem } from '../config/configManager';


const addCommand = async() => {
	const questions = [
	    {
	        type: 'input',
	        name: 'name',
	        message: 'Boilerplate name => ',
	        validate: (value) => {
	            var pass = value.match(/\w+/);
	            if (!pass) {
	                return 'The Boilerplate name should NOT be empty, please input!';
				}

				if (configItemExist(value)) {
					return "The Boilerplate with same name already exist!";
				}

	            return true;
	        }
	    },
	    {
	        type: 'input',
	        name: 'repo',
			message: 'Boilerplate repo address => ',
			validate: (value) => {
	            var pass = value.match(/((git|ssh|http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@:/\-~]+)(\.git)(\/)?/);
	            if (pass) {
	                return true;
				}
				
	            return 'Please input a valid repo url!';
	        }
	    },
	    {
	        type: 'input',
	        name: 'branch',
	        message: 'Boilerplate branch => ',
	        default: () => 'master'
	    }
	];

	const configItem = await inquirer.prompt(questions);

	await addConfigItem(configItem);

	console.log(chalk.green('Success!') + ' - ' + chalk.white.bgGreen.bold(`${configItem.name} (${configItem.branch})`) + ' was added!');
};

export default addCommand;
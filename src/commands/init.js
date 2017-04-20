import inquirer from 'inquirer';
import chalk from 'chalk';
import execa from 'execa';
import Listr from 'listr';
import path from 'path';

import dirExist from '../utils/file/dirExist';
import { readTplConfig } from '../tpl/tplManager';

const runInitTasks = async(name, repo, branch) => {
	const cwd = process.cwd();

	const tasks = new Listr([
		{
			title: 'Init boilerplate repo',
			task: () => {
				return new Listr([
					{
						title: 'Clone remote boilerplate repo',
						task: async(ctx, task) => {							
							if(!await dirExist(path.join(cwd, name))) {
								await execa('git', ['clone', repo]);
							} else {
								task.skip(repo + ' already exist!');
							}
						}
					},
					{
						title: 'Switch to special branch',
						task: async() => {
							process.chdir(name);
							await execa('git', ['checkout', branch]);
							process.chdir(cwd);
						}
					}
				]);
			}
		},
		{
			title: 'Install package dependencies with npm',
			task: async() => {
				process.chdir(name);
				await execa('npm', ['install']);
				process.chdir(cwd);
			}
		},
		{
			title: 'Run tests',
			task: async() => {
				process.chdir(name);
				await execa('npm', ['test']);
				process.chdir(cwd);
			}
		}
	]);

	await tasks.run().catch(err => {
		console.error(chalk.red(err));
	});

};

const initCommand = async() => {

	let configList = readTplConfig()['list'];
	let configNameList = configList.map((config) => config['name']);

	if(configList.length === 0) {
		console.log(chalk.yellow('No available boilerplate'));
		return;
	}

	const selectedName = await inquirer.prompt([
	    {
	        type: 'list',
	        name: 'name',
	        message: 'Select boilerplate to init project',
	        choices: configNameList
	    }
	]);

	const selectedConfig = configList.find((config) => config['name'] === selectedName['name']);
	const { name, repo, branch } = selectedConfig;

	runInitTasks(name, repo, branch);

};

export default initCommand;
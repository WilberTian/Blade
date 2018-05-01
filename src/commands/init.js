import inquirer from 'inquirer';
import chalk from 'chalk';
import execa from 'execa';
import Listr from 'listr';
import path from 'path';

import { fileExist, dirExist } from '../utils/file';
import { loadConfig } from '../config/configManager';
import { SHAMROCK_HOME, PROJECT_SHAMROCK_SCRIPT } from '../config/constants';

const cwd = process.cwd();

const gitCloneTask = async (ctx) => {
	const { name, repo, selectedBoilerplatePath } = ctx;

	process.chdir(SHAMROCK_HOME);

	await execa('git', ['clone', repo, selectedBoilerplatePath]);
	
	ctx.withClone = true;
};

const gitPullTask = async (ctx) => {
	const { selectedBoilerplatePath } = ctx;

	process.chdir(selectedBoilerplatePath);
	await execa('git', ['pull']);
};

const runInitTasks = async (name, repo, branch) => {
	const selectedBoilerplatePath = path.join(SHAMROCK_HOME, name);
	const selectedBladeFilePath = path.join(SHAMROCK_HOME, name, PROJECT_SHAMROCK_SCRIPT);

	let initTaskCtx = {
		name,
		repo,
		branch,
		selectedBoilerplatePath,
		selectedBladeFilePath,
		withClone: true,
		yarn: true
	};

	const gitTasks = new Listr([
		{
			title: 'Clone boilerplate',
			task: gitCloneTask,
			skip: async (ctx) => {
				if (await dirExist(ctx.selectedBoilerplatePath)) {
					return `${ctx.name} already exist!`
				}
			}
		},
		{
			title: 'Pull the latest code',
			enabled: (ctx) => ctx.withClone === false,
			task: gitPullTask
		},
		{
			title: 'Switch branch',
			task: async (ctx) => {
				process.chdir(ctx.selectedBoilerplatePath);
				await execa('git', ['checkout', branch]);
			}
		}
	]);

	const packageTasks = new Listr([
		{
			title: 'Install package dependencies with yarn',
			task: async(ctx, task) => {
				process.chdir(ctx.selectedBoilerplatePath);
				try {
					await execa('yarn');
				} catch(ex) {
					ctx.yarn = false;
					task.skip('yarn is not available');
				}
			},
			skip: async (ctx) => {
				if (!await fileExist(path.join(ctx.selectedBoilerplatePath, 'yarn.lock'))) {
					ctx.yarn = false;
					return 'yarn.lock is not exist';
				}
			}
		},
		{
			title: 'Install package dependencies with npm',
			enabled: ctx => ctx.yarn === false,
			task: async(ctx, task) => {
				process.chdir(ctx.selectedBoilerplatePath);
				await execa('npm', ['install']);
			}
		}
	]);

	try {
		initTaskCtx = await gitTasks.run(initTaskCtx);
		initTaskCtx = await packageTasks.run(initTaskCtx);

		if (await fileExist(selectedBladeFilePath)) {
			const shamrockTasks = new Listr([
				{
					title: 'Run shamrock.js',
					task: async () => {

					}
				}
			]);

			await shamrockTasks.run(initTaskCtx);
		}
	} catch (ex) {
		console.error(chalk.red(ex));
	}

};

const initCommand = async () => {

	const configList = loadConfig()['list'];
	const configObjectList = configList.map((configItme) => {
		return {
			name: `${configItme.name} (${configItme.branch})`,
			value: configItme.name
		};
	});

	if(configList.length === 0) {
		console.log(chalk.yellow('No available boilerplate'));
		return;
	}

	const selectedConfig = await inquirer.prompt([
	    {
	        type: 'list',
	        name: 'name',
	        message: 'Select boilerplate to init project',
	        choices: configObjectList
	    }
	]);

	const selectedConfigItem = configList.find((configItme) => configItme.name === selectedConfig.name);
	const { name, repo, branch } = selectedConfigItem;

	runInitTasks(name, repo, branch);

};

export default initCommand;
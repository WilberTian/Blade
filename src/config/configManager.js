import path from 'path';
import fse from 'fs-extra';

import { fileExist, dirExist } from '../utils/file'
import { BLADE_HOME, CONFIG_FILE_NAME, DEFAULT_CONFIGS } from './constants';

const configFilePath = path.join(BLADE_HOME, CONFIG_FILE_NAME);

export const createConfigIfNotExist = async () => {
	if(!await fileExist(configFilePath)) {
		await fse.ensureFile(configFilePath);
		await saveConfig(DEFAULT_CONFIGS);
	}
};

export const loadConfig = () => {
	return require(configFilePath);
};

export const saveConfig = async (json) => {
	await fse.outputJson(configFilePath, json, { spaces: 4 });
};

export const configItemExist = (configName) => {
	const configObject = loadConfig();

	const found = configObject['list'].find((configItem) => {
		return configItem.name === configName;
	});

	return found ? true : false;
};

export const addConfigItem = async (configItem) => {
	const configObject = loadConfig();
	configObject['list'].push(configItem);

	await saveConfig(configObject);
};

export const deleteConfigItem = async (idx) => {
	const configObject = loadConfig();
	const deletedConfigItemName = configObject.list[idx].name;
	configObject['list'].splice(idx, 1);

	await saveConfig(configObject);

	return deletedConfigItemName;
};

import path from 'path';
import fs from 'fs';
import fsp from 'fs-promise';

import fileExist from '../utils/file/fileExist'
import { TPL_CONFIG_HOME, TPL_CONFIG_STORE, DEFAULT_CONFIG } from './tplConfig';

const tplConfigStore = path.join(TPL_CONFIG_HOME, TPL_CONFIG_STORE);


export const readTplConfig = () => {
	return JSON.parse(fs.readFileSync(tplConfigStore));
};

export const createTplConfigIfNotExist = async() => {
	if(!await fileExist(tplConfigStore)) {
		await fsp.ensureFile(tplConfigStore);
		await writeTplConfig(DEFAULT_CONFIG);
	}
};

export const writeTplConfig = async(json) => {
	await fsp.writeJson(tplConfigStore, json);
};

export const addTplConfigItem = async(tplItem) => {
	let configObject = readTplConfig();
	configObject['list'].push(tplItem);

	await writeTplConfig(configObject);
};

export const deleteTplConfigItem = async(idx) => {
	let configObject = readTplConfig();
	configObject['list'].splice(idx, 1);

	await writeTplConfig(configObject);
};

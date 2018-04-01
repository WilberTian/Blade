import fs from 'fs';
import fse from 'fs-extra';

export const fileExist = async (file) => {
	return await new Promise((resolve) => {
		fs.access(file, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
	})
};

export const dirExist = async (path) => {
    return await new Promise((resolve) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            } else {
                resolve(stats.isDirectory());
            }
        });
    });
};
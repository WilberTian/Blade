import fs from 'fs'

export default async(file) => {
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
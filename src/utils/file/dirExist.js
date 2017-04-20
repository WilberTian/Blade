import fs from 'fs';

export default async(filename) => {
    return await new Promise((resolve) => {
        fs.stat(filename, (err, stats) => {
            if (err) {
                resolve(false);
            } else {
                resolve(stats.isDirectory());
            }
        });
    });
};

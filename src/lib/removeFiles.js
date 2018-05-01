import path from 'path';
import fse from 'fs-extra';

export default (destPath) => {
    return async (files) => {
        await Promise.all(files.map((file) => {
            return fse.remove(path.join(destPath, file));
        }));
    };
};

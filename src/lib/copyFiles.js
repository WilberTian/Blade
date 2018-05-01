import path from 'path';
import fse from 'fs-extra';

export default (sourcePath, destPath) => {
    return async (files) => {
        await Promise.all(files.map((file) => {
            return fse.copy(path.join(sourcePath, file), path.join(destPath, file));
        }));
    };
};
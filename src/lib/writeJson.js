import path from 'path';
import fse from 'fs-extra';

export default (destPath) => {
    return async(fileName, data) => {
        const destFilename = path.join(destPath, fileName);

        await fse.outputJson(destFilename, date, { space: 2 });
    };
};

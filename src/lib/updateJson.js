import path from 'path';
import fse from 'fs-extra';

export default (sourcePath, destPath) => {
    return async (fileName, updator) => {
        const sourceFilename = path.join(sourcePath, fileName);
        const destFilename = path.join(destPath, fileName);

        const sourceData = await fse.readJson(sourceFilename);
        const destData = updator(sourceData);
        await fse.outputJson(destFilename, destData, { spaces: 2 });
    };
};
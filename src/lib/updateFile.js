import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

export default (sourcePath, destPath) => {
    return async (fileName, updator) => {
        const sourceFilename = path.join(sourcePath, fileName);
        const destFilename = path.join(destPath, fileName);

        const sourceData = fs.readFileSync(sourceFilename, 'utf8');
        const destData = updator(sourceData);
        await fse.outputFile(destFilename, destData);
    };
};

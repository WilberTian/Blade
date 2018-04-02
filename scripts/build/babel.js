import path from 'path';
import glob from 'glob-promise';
import fse from 'fs-extra';
import { transformFile } from 'babel-core';

import { SOURCE_PATH, BUILD_PATH } from '../config';

export default async () => {
    const sourceFilePattern = path.join(SOURCE_PATH, '**', '*.js');
    const sourceFiles = await glob(sourceFilePattern);

    const transformJobs = sourceFiles.map((file) => {
        return new Promise((resolve, reject) => {
            transformFile(file, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const relativeFilename = path.relative(SOURCE_PATH, file);
                    resolve({
                        relativeFilename,
                        ...result,
                    });
                }
            });
        });
    });

    const results = await Promise.all(transformJobs);

    const writeJobs = results.map(({ relativeFilename, code }) => {
        const outputFilename = path.join(BUILD_PATH, relativeFilename);
        return fse.outputFile(outputFilename, code);
    });

    return await Promise.all(writeJobs);
}
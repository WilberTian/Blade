import execa from 'execa';

export const getFirstLineFromShell = async (file, args) => {
    const {
        code,
        stdout,
    } = await execa(file, args);
    if (code === 0) {
        return stdout.split(`\n`)[0];
    }
    return null;
};

export const getLinesFromShell = async (file, args) => {
    const {
        code,
        stdout,
    } = await execa(file, args);
    if (code === 0) {
        return stdout.split(`\n`);
    }
    return null;
};

export const execWithLog = (file, args) => {
    const promise = execa(file, args);
    promise.stdout.pipe(process.stdout);
    promise.stderr.pipe(process.stderr);
    return promise;
};
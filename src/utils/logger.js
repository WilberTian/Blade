import chalk from 'chalk';

export const info = (message, isBold = false) => {
    if (isBold) {
        console.log(chalk.blue.bold(message));
    } else {
        console.log(chalk.blue(message));
    }
};

export const success = (message, isBold = false) => {
    if (isBold) {
        console.log(chalk.green.bold(message));
    } else {
        console.log(chalk.green(message));
    }
};

export const error = (message, isBold = false) => {
    if (isBold) {
        console.log(chalk.yellow.bold(message));
    } else {
        console.log(chalk.yellow(message));
    }
};

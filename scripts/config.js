import path from 'path';

export const SOURCE_FOLDER_NAME = 'src';
export const BUILD_FOLDER_NAME = 'build';

export const PROJECT_BASE_PATH = path.join(__dirname, '..');
export const SOURCE_PATH = path.join(PROJECT_BASE_PATH, SOURCE_FOLDER_NAME);
export const BUILD_PATH = path.join(PROJECT_BASE_PATH, BUILD_FOLDER_NAME);

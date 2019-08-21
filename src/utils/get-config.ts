import { join, parse } from 'path';
import { IConfig } from '../types/config';
import { constants } from '../constants';
import { existsSync, readFileSync } from 'fs';
const log = require('errorlog')({ logger: process.stdout, category: 'MISSING', level: 200 });;

export function getConfig(configFolder = constants.CONFIG_FOLDER) {
    const getRootDirectory = () => parse(process.cwd()).root;
    const path = join(getRootDirectory(), configFolder);
    const directoryExist = existsSync(path);
    if (!directoryExist) {
        log.error(constants.ERROR_ON_DIRECTORY_MISSING);
        process.exit();
    }
    const configFileName = constants.CONFIG_FILE;
    const configFileFullPath = join(path, configFileName);
    const fileExist = existsSync(configFileFullPath);
    if (!fileExist) {
        log.error(constants.ERROR_ON_COFIG_FILE_MISSING);
        process.exit();
    }
    const text = readFileSync(join(path, configFileName), constants.UTF8_ENCODING);
    return JSON.parse(text.toString()) as IConfig;
}
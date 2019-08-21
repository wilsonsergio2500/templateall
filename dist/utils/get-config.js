"use strict";
exports.__esModule = true;
var path_1 = require("path");
var constants_1 = require("../constants");
var fs_1 = require("fs");
var log = require('errorlog')({ logger: process.stdout, category: 'MISSING', level: 200 });
;
function getConfig(configFolder) {
    if (configFolder === void 0) { configFolder = constants_1.constants.CONFIG_FOLDER; }
    var getRootDirectory = function () { return path_1.parse(process.cwd()).root; };
    var path = path_1.join(getRootDirectory(), configFolder);
    var directoryExist = fs_1.existsSync(path);
    if (!directoryExist) {
        log.error(constants_1.constants.ERROR_ON_DIRECTORY_MISSING);
        process.exit();
    }
    var configFileName = constants_1.constants.CONFIG_FILE;
    var configFileFullPath = path_1.join(path, configFileName);
    var fileExist = fs_1.existsSync(configFileFullPath);
    if (!fileExist) {
        log.error(constants_1.constants.ERROR_ON_COFIG_FILE_MISSING);
        process.exit();
    }
    var text = fs_1.readFileSync(path_1.join(path, configFileName), constants_1.constants.UTF8_ENCODING);
    return JSON.parse(text.toString());
}
exports.getConfig = getConfig;

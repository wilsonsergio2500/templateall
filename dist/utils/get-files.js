"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
/**
* @name getFiles
* @description get files inside folder recursively
* @param {array} args
*/
function getFiles(dir, files_) {
    if (files_ === void 0) { files_ = []; }
    if (dir === undefined || !fs_1.existsSync(dir.toLowerCase())) {
        return [];
    }
    files_ = files_ || [];
    var files = fs_1.readdirSync(dir);
    for (var i in files) {
        var name = dir + path_1.sep + files[i];
        if (fs_1.statSync(name).isDirectory()) {
            getFiles(name, files_);
        }
        else {
            files_.push(name);
        }
    }
    return files_;
}
exports.getFiles = getFiles;

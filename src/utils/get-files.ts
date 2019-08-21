import { existsSync, readdirSync, statSync } from 'fs';
import { sep } from 'path';

/**
* @name getFiles
* @description get files inside folder recursively
* @param {array} args
*/
export function getFiles(dir : string, files_ : any[] = []) {
    if (dir === undefined || !existsSync(dir.toLowerCase())) {
        return [];
    }

    files_ = files_ || [];
    const files = readdirSync(dir);

    for (var i in files) {
        var name = dir + sep + files[i];
        if (statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;

}
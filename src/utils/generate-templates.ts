import { resolve, sep } from 'path';
import { readFileSync, writeFile, writeFileSync } from 'fs';
import * as format from 'string-template'
//import format = require('string-template');
import { IGenrateMeta } from "../types/generate-meta";
import { IConfig } from '../types/config';
import { js_beautify } from 'js-beautify'
import { constants } from '../constants';
//import mkdirpPromise from 'mkdirp-promise'
const mkdirpPromise = require('mkdirp-promise');

/**
* @name generateTemplate
* @description generate file template
* @param {file} template
*/
export function generateTemplatesAsync(templatePath: string, meta: IGenrateMeta, config: IConfig) {

    return new Promise((promres, promrej) => {
        const absoluteTemplatePath = resolve(templatePath);
        const dest = './' + sep + meta.Name_file + sep;
        const content = readFileSync(absoluteTemplatePath, constants.UTF8_ENCODING);
        const FileTypeReplace = (str: string) => {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        }
        const replacedRegex = new RegExp(FileTypeReplace(`{${meta.Type}}`));
        const templateFilename = absoluteTemplatePath.replace(meta.path + sep, '');
        const templatePathWithoutFileName = templateFilename.substring(0, templateFilename.lastIndexOf(sep)).replace(replacedRegex, meta.Name_file);

        mkdirpPromise(dest + templatePathWithoutFileName).then(() => {
            let injectData = { ...meta };
            if (!!config.Data) {
                injectData = { ...injectData, ...config.Data }
            }
            let formattedData = format(content.toString(), injectData);
            if (config.autoIndent === true) {
                formattedData = js_beautify(formattedData);
            }
            writeFileSync(dest + templateFilename.replace(replacedRegex, meta.Name_file), formattedData);
            console.log('\x1b[32m%s\x1b[0m: ', "Created: " + (dest + templateFilename.replace(replacedRegex, meta.Name_file)).replace('./', ''));
            promres();
        });

    })
    
}
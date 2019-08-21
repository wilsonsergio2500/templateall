"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var format = require("string-template");
var mustache_1 = require("mustache");
var js_beautify_1 = require("js-beautify");
var constants_1 = require("../constants");
var mkdirpPromise = require('mkdirp-promise');
/**
* @name generateTemplate
* @description generate file template
* @param {file} template
*/
function generateTemplatesAsync(templatePath, meta, config) {
    return new Promise(function (promres, promrej) {
        var absoluteTemplatePath = path_1.resolve(templatePath);
        var dest = './' + path_1.sep + meta.Name_file + path_1.sep;
        var content = fs_1.readFileSync(absoluteTemplatePath, constants_1.constants.UTF8_ENCODING);
        var FileTypeReplace = function (str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        };
        var replacedRegex = new RegExp(FileTypeReplace("{" + meta.Type + "}"));
        var templateFilename = absoluteTemplatePath.replace(meta.path + path_1.sep, '');
        var templatePathWithoutFileName = templateFilename.substring(0, templateFilename.lastIndexOf(path_1.sep)).replace(replacedRegex, meta.Name_file);
        mkdirpPromise(dest + templatePathWithoutFileName).then(function () {
            var injectData = __assign({}, meta);
            if (!!config.Data) {
                injectData = __assign({}, injectData, config.Data);
            }
            var formattedData = format(content.toString(), injectData);
            if (!!config.Data) {
                formattedData = mustache_1.render(formattedData, injectData, null, ['{!', '!}']);
            }
            if (config.autoIndent === true) {
                formattedData = js_beautify_1.js_beautify(formattedData);
            }
            fs_1.writeFileSync(dest + templateFilename.replace(replacedRegex, meta.Name_file), formattedData);
            console.log('\x1b[32m%s\x1b[0m: ', "Created: " + (dest + templateFilename.replace(replacedRegex, meta.Name_file)).replace('./', ''));
            promres();
        });
    });
}
exports.generateTemplatesAsync = generateTemplatesAsync;

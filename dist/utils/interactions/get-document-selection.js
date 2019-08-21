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
var inquirer_1 = require("inquirer");
var path_1 = require("path");
var constants_1 = require("./constants");
function getDocumentSelectionAsync(config) {
    return new Promise(function (resolve, reject) {
        var q = __assign({}, constants_1.INTERACTIONS.DOCUMENT_SELECTION, { choices: Object.keys(config.types) });
        var prmt = inquirer_1.prompt([q]);
        prmt.then(function (answ) {
            var type = config.types[answ.type];
            var path = path_1.join(config.templates, type);
            resolve({ path: path, type: type });
        });
    });
}
exports.getDocumentSelectionAsync = getDocumentSelectionAsync;

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
var underscore_string_1 = require("underscore.string");
var constants_1 = require("./constants");
function getDocumentTypesAsync() {
    return new Promise(function (resolve, reject) {
        var q = __assign({}, constants_1.INTERACTIONS.DOCUMENT_TYPES);
        var prmt = inquirer_1.prompt([q]);
        prmt.then(function (answ) {
            if (answ && answ.document) {
                var Name_original = answ.document;
                var Name_file = Name_original.replace(/\.?([A-Z])/g, function (x, y) { return "-" + y.toLocaleLowerCase(); }).replace(/^_/, "");
                var Name_titlelized = Name_original.charAt(0).toUpperCase() + Name_original.replace(/\.?([A-Z])/g, function (x, y) { return " " + y.toLocaleUpperCase(); }).replace(/^_/, "").slice(1);
                var Name_camelized = underscore_string_1.camelize(Name_original);
                var Name_pascalized = Name_original.charAt(0).toUpperCase() + Name_original.slice(1);
                resolve({ Name_original: Name_original, Name_file: Name_file, Name_titlelized: Name_titlelized, Name_pascalized: Name_pascalized, Name_camelized: Name_camelized });
            }
        });
    });
}
exports.getDocumentTypesAsync = getDocumentTypesAsync;

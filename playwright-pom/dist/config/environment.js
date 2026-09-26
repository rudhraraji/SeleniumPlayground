"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appUrl = exports.baseUrl = void 0;
const defaultBaseUrl = 'https://www.testmuai.com';
exports.baseUrl = ((_a = process.env.BASE_URL) !== null && _a !== void 0 ? _a : defaultBaseUrl).replace(/\/+$/, '');
function appUrl(path) {
    return `${exports.baseUrl}/${path.replace(/^\/+/, '')}`;
}
exports.appUrl = appUrl;

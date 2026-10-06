"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const BasePage_1 = __importDefault(require("./BasePage"));
const environment_1 = require("../config/environment");
class JqueryDownloadProgressBarPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/jquery-download-progress-bar-demo/');
        this.heading = page.getByRole('heading', {
            name: /Jquery Download Progress-Bar Demo/i,
        });
        this.startDownloadButton = page.locator('#downloadButton');
        this.progressDialog = page.getByRole('dialog');
        this.dialogTitle = this.progressDialog.locator('.ui-dialog-title');
        this.downloadStatus = this.progressDialog.locator('.progress-label');
        this.progressBar = this.progressDialog.getByRole('progressbar');
        this.cancelDownloadButton = this.progressDialog.getByRole('button', { name: 'Cancel Download', exact: true });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
        });
    }
    startDownload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startDownloadButton.click();
            yield (0, test_1.expect)(this.progressDialog).toBeVisible();
        });
    }
    cancelDownload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cancelDownloadButton.click();
            yield (0, test_1.expect)(this.progressDialog).toBeHidden();
        });
    }
}
exports.default = JqueryDownloadProgressBarPage;

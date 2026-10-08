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
        this.progressDialog = page.locator('#dialog');
        this.downloadStatus = this.progressDialog.locator('.progress-label');
        this.progressBar = this.progressDialog.locator('#progressbar');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
            yield (0, test_1.expect)(this.startDownloadButton).toBeVisible();
            yield (0, test_1.expect)(this.startDownloadButton).toBeEnabled();
        });
    }
    startDownload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startDownloadButton.click();
            yield (0, test_1.expect)(this.progressDialog).toBeVisible({ timeout: 15000 });
            yield (0, test_1.expect)(this.downloadStatus).toContainText('Starting download...', { timeout: 15000 });
        });
    }
}
exports.default = JqueryDownloadProgressBarPage;

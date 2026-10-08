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
class BootstrapProgressBarDialogPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/bootstrap-progress-bar-dialog-demo/');
        this.heading = page.getByRole('heading', {
            name: 'Bootstrap Progress Bar Dialog Demo',
            exact: true,
        });
        this.twoSecondDialogButton = page.getByRole('button', {
            name: 'Show dialog (Autoclose after 2 seconds)',
            exact: true,
        });
        this.threeSecondDialogButton = page.getByRole('button', {
            name: 'Show dialog (Autoclose after 3 seconds)',
            exact: true,
        });
        this.fiveSecondDialogButton = page.getByRole('button', {
            name: 'Show dialog (Autoclose after 5 seconds)',
            exact: true,
        });
        this.dialogButtons = page.getByRole('button', {
            name: /Show dialog \(Autoclose after \d seconds\)/,
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
            yield (0, test_1.expect)(this.dialogButtons).toHaveCount(3);
            yield (0, test_1.expect)(this.twoSecondDialogButton).toBeVisible();
            yield (0, test_1.expect)(this.threeSecondDialogButton).toBeVisible();
            yield (0, test_1.expect)(this.fiveSecondDialogButton).toBeVisible();
            yield (0, test_1.expect)(this.twoSecondDialogButton).toBeEnabled();
            yield (0, test_1.expect)(this.threeSecondDialogButton).toBeEnabled();
            yield (0, test_1.expect)(this.fiveSecondDialogButton).toBeEnabled();
        });
    }
}
exports.default = BootstrapProgressBarDialogPage;

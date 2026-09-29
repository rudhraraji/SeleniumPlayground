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
class BootstrapAlertMessagesPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/bootstrap-alert-messages-demo/');
        this.heading = page.getByRole('heading', { name: 'Bootstrap Alert Messages', exact: true });
        this.autoSuccessButton = page.getByRole('button', { name: 'Autoclosable Success Message', exact: true });
        this.normalSuccessButton = page.getByRole('button', { name: 'Normal Success Message', exact: true });
        this.autoInfoButton = page.getByRole('button', { name: 'Autoclosable Info Message', exact: true });
        this.normalInfoButton = page.getByRole('button', { name: 'Normal Info Message', exact: true });
        this.autoWarningButton = page.getByRole('button', { name: 'Autoclosable Warning Message', exact: true });
        this.normalWarningButton = page.getByRole('button', { name: 'Normal Warning Message', exact: true });
        this.autoDangerButton = page.getByRole('button', { name: 'Autoclosable Danger Message', exact: true });
        this.normalDangerButton = page.getByRole('button', { name: 'Normal Danger Message', exact: true });
        this.alerts = page.locator('.alert');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
            yield this.page.waitForLoadState('networkidle');
            yield (0, test_1.expect)(this.heading).toBeVisible();
        });
    }
}
exports.default = BootstrapAlertMessagesPage;

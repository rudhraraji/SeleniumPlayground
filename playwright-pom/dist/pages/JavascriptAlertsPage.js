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
class JavascriptAlertsPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/javascript-alert-box-demo/');
        this.heading = page.getByRole('heading', {
            name: 'Javascript Alert Box Demo',
            exact: true,
        });
        const buttons = page.locator('main button', { hasText: 'Click Me' });
        this.alertButton = buttons.nth(0);
        this.confirmButton = buttons.nth(1);
        this.promptButton = buttons.nth(2);
        this.result = page.locator('main').getByText(/You pressed|You have entered/);
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
            yield this.page.waitForLoadState('networkidle');
            yield (0, test_1.expect)(this.heading).toBeVisible();
        });
    }
    triggerAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogPromise = this.page.waitForEvent('dialog');
            const clickPromise = this.alertButton.click();
            const dialog = yield dialogPromise;
            (0, test_1.expect)(dialog.type()).toBe('alert');
            (0, test_1.expect)(dialog.message()).toBe('I am an alert box!');
            yield dialog.accept();
            yield clickPromise;
        });
    }
    acceptConfirm() {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogPromise = this.page.waitForEvent('dialog');
            const clickPromise = this.confirmButton.click();
            const dialog = yield dialogPromise;
            (0, test_1.expect)(dialog.type()).toBe('confirm');
            (0, test_1.expect)(dialog.message()).toBe('Press a button!');
            yield dialog.accept();
            yield clickPromise;
            yield (0, test_1.expect)(this.result).toHaveText('You pressed OK!');
        });
    }
    enterPrompt(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogPromise = this.page.waitForEvent('dialog');
            const clickPromise = this.promptButton.click();
            const dialog = yield dialogPromise;
            (0, test_1.expect)(dialog.type()).toBe('prompt');
            (0, test_1.expect)(dialog.message()).toBe('Please enter your name');
            yield dialog.accept(value);
            yield clickPromise;
            yield (0, test_1.expect)(this.result).toHaveText(`You have entered '${value}' !`);
        });
    }
}
exports.default = JavascriptAlertsPage;

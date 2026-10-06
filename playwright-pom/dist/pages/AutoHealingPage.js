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
const BasePage_1 = __importDefault(require("./BasePage"));
const environment_1 = require("../config/environment");
class AutoHealingPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/auto-healing/');
        this.heading = page.getByRole('heading', { name: 'Auto Healing', exact: true });
        this.usernameInput = page.locator('#username');
        this.healedUsernameInput = page.locator('#lambdatest');
        this.usernameField = page.locator('form .form-group')
            .filter({ has: page.getByText('Username*', { exact: true }) })
            .locator('input');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitButton = page.getByRole('button', { name: 'Submit', exact: true });
        this.submissionResult = page.getByText('Login Successful', { exact: true });
        this.changeDomId = page.locator('main p.cursor-pointer').filter({
            hasText: 'Change DOM ID',
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
        });
    }
}
exports.default = AutoHealingPage;

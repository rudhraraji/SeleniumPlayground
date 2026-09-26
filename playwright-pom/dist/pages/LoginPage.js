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
class LoginPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('login');
        this.usernameInput = this.page.locator('input[type="email"], input[name="email"], input[name="username"]');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.passwordInput = this.page.locator('input[type="password"], input[name="password"]');
        this.loginButton = this.page.getByRole('button', { name: /login|sign in/i });
        this.forgotPasswordLink = this.page.locator('a:has-text("Forgot")');
        // Invalid email address error messages before password field is visible
        this.invalidEmailErrorMsgBeforePass = this.page.getByText('Please enter a valid email'); // Please enter a valid email address
        // Both email and password are incorrect
        this.emailPasswordError = this.page.getByText('Please enter a correct email'); //Please enter a correct email address and password. Note that the password is case-sensitive
        // Empty email and password error messages
        this.emptyEmailErrorMsg = this.page.getByText('Please enter your email'); //Please enter your email address
        this.emptyPasswordErrorMsg = this.page.getByText('Please enter a desired'); //Please enter a desired password
        // Email address without @ and . error message
        this.invalidEmailErrorMsg = this.page.getByText('Invalid email address'); //Invalid email address
        // Password length should be at least 8 characters error message
        this.passwordLengthErrorMsg = this.page.getByText('Password should be at least 8'); //Password should be at least 8 characters long
        // Example link selectors using the locator patterns you mentioned
        this.playgroundLink = this.page.locator('[data-testid="playground-link"]');
        this.playgroundRoleLink = this.page.getByRole('link', { name: 'Selenium Playground' });
        this.playgroundTextLink = this.page.locator('a:has-text("Playground")');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
        });
    }
    enterUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Entering username: ${username}`);
            yield this.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
            yield this.usernameInput.click();
            yield this.usernameInput.fill(username);
            yield this.usernameInput.press('Enter');
        });
    }
    clickDisabledContinue() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.continueButton.click({ force: true });
        });
    }
    enterPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Entering password: ${password}`);
            yield this.passwordInput.fill(password);
        });
    }
    submitLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loginButton.waitFor({ state: 'visible' });
            yield this.loginButton.click();
        });
    }
    loginUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Logging in with username: ${username}`);
            yield this.enterUsername(username);
            yield this.page.keyboard.press('Tab');
        });
    }
    loginPass(password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Logging in with password: ${password}`);
            yield this.enterPassword(password);
            yield this.page.keyboard.press('Tab');
            yield this.submitLogin();
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Logging in with username: ${username} and password: ${password}`);
            const loginUrl = new URL('https://accounts.lambdatest.com/login');
            loginUrl.searchParams.set('email', username);
            yield this.page.goto(loginUrl.toString(), { waitUntil: 'domcontentloaded' });
            yield this.passwordInput.waitFor({ state: 'visible', timeout: 20000 });
            yield this.enterPassword(password);
            yield this.submitLogin();
        });
    }
    clickForgotPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.forgotPasswordLink.click();
        });
    }
    // Invalid email address error messages before password field is visible
    verifyInvalidEmailErrorMessageBeforePassword() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.invalidEmailErrorMsgBeforePass).toContainText('Please enter a valid email address');
        });
    }
    // Both email and password are incorrect
    verifyEmailErrorMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.emailPasswordError).toContainText('Please enter a correct email address and password. Note that the password is case-sensitive');
        });
    }
    // Empty email and password error messages
    verifyEmptyEmailErrorMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.emptyEmailErrorMsg).toContainText('Please enter your email address');
        });
    }
    verifyEmptyPasswordErrorMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.emptyPasswordErrorMsg).toContainText('Please enter a desired password');
        });
    }
    // Email address without @ and . error message
    verifyInvalidEmailErrorMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.invalidEmailErrorMsg).toContainText('Invalid email address');
        });
    }
    // Password length should be at least 8 characters error message
    verifyPasswordLengthErrorMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.passwordLengthErrorMsg).toContainText('Password should be at least 8 characters long');
        });
    }
}
exports.default = LoginPage;

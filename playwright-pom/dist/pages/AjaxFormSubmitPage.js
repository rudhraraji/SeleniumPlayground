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
class AjaxFormSubmitPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/ajax-form-submit-demo/');
        this.heading = page.getByRole('heading', { name: 'Form Submit Demo' });
        this.lblName = page.getByText('Name:');
        this.txtName = page.locator('#title');
        this.lblMessage = page.getByText('Message:');
        this.txtMessage = page.locator('#description');
        this.btnSubmit = page.getByRole('button', { name: 'submit' });
        this.requiredName = page.getByText('*Name:');
        //page.locator('.title-validation.validation-error');
        //page.getByText('*Name:')
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
        });
    }
    waitForPageToLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForURL('**/ajax-form-submit-demo/');
        });
    }
    validatePageHeading() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.heading).toContainText('Form Submit Demo');
        });
    }
    validateNameText() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.txtName).toBeEmpty();
        });
    }
    validateMessageText() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.txtMessage).toBeEmpty();
        });
    }
    validateRequiredName() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.page.locator('label:has-text("Name")').first()).toContainText('Name');
        });
    }
    validateTextBorder() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.txtName).toBeVisible();
            const borderColor = yield this.txtName.evaluate(el => getComputedStyle(el).borderColor);
            (0, test_1.expect)(['rgb(221, 221, 221)', 'rgb(255, 0, 0)']).toContain(borderColor);
        });
    }
    waitForTextboxToLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForElement('#title');
        });
    }
    clickSubmitBtn() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.btnSubmit.scrollIntoViewIfNeeded();
            yield this.btnSubmit.click({ force: true });
        });
    }
}
exports.default = AjaxFormSubmitPage;

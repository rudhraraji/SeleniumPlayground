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
class InputFormDemoPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/input-form-demo/');
        this.heading = page.getByRole('heading', { name: 'Form Demo', exact: true });
        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#inputEmail4');
        this.passwordInput = page.locator('#inputPassword4');
        this.companyInput = page.locator('#company');
        this.websiteInput = page.locator('#websitename');
        this.countrySelect = page.locator('select[name="country"]');
        this.cityInput = page.locator('#inputCity');
        this.addressLine1Input = page.locator('#inputAddress1');
        this.addressLine2Input = page.locator('#inputAddress2');
        this.stateInput = page.locator('#inputState');
        this.zipInput = page.locator('#inputZip');
        this.submitButton = page.getByRole('button', { name: 'Submit', exact: true });
        this.successMessage = page.getByText('Thanks for contacting us, we will get back to you shortly.', {
            exact: true,
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
            yield this.page.waitForLoadState('networkidle');
            yield (0, test_1.expect)(this.heading).toBeVisible();
        });
    }
    fillForm(details) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nameInput.fill(details.name);
            yield this.emailInput.fill(details.email);
            yield this.passwordInput.fill(details.password);
            yield this.companyInput.fill(details.company);
            yield this.websiteInput.fill(details.website);
            yield this.countrySelect.selectOption({ label: details.country });
            yield this.cityInput.fill(details.city);
            yield this.addressLine1Input.fill(details.addressLine1);
            yield this.addressLine2Input.fill(details.addressLine2);
            yield this.stateInput.fill(details.state);
            yield this.zipInput.fill(details.zip);
        });
    }
    submitForm() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.submitButton.click();
            yield (0, test_1.expect)(this.successMessage).toBeVisible();
        });
    }
}
exports.default = InputFormDemoPage;

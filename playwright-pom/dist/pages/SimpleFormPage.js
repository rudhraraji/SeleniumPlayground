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
class SimpleFormPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/simple-form-demo/');
        this.heading = page.getByRole('heading', { name: 'Simple Form Demo', exact: true });
        this.messageInput = page.locator('input#user-message');
        this.showMessageButton = page.locator('#showInput');
        this.messageResult = page.locator('#message');
        this.firstNumberInput = page.locator('#sum1');
        this.secondNumberInput = page.locator('#sum2');
        this.sumButton = page.getByRole('button', { name: 'Get Sum', exact: true });
        this.sumResult = page.locator('#addmessage');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
            yield (0, test_1.expect)(this.messageInput).toBeVisible();
            yield (0, test_1.expect)(this.messageInput).toBeEditable();
            yield (0, test_1.expect)(this.showMessageButton).toBeEnabled();
            yield (0, test_1.expect)(this.firstNumberInput).toBeEditable();
            yield (0, test_1.expect)(this.secondNumberInput).toBeEditable();
            yield (0, test_1.expect)(this.sumButton).toBeEnabled();
        });
    }
    echoMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.messageInput.fill(message);
            yield this.showMessageButton.click();
        });
    }
    calculateSum(firstNumber, secondNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.firstNumberInput.fill(String(firstNumber));
            yield this.secondNumberInput.fill(String(secondNumber));
            yield this.sumButton.click();
        });
    }
}
exports.default = SimpleFormPage;

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
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
class BasePage {
    constructor(page) {
        this.page = page;
    }
    navigateTo(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto(url, { waitUntil: 'domcontentloaded' });
        });
    }
    click(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield locator.scrollIntoViewIfNeeded();
            yield locator.click();
        });
    }
    getTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.title();
        });
    }
    waitForPageLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForLoadState('networkidle');
        });
    }
    waitForElement(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator(selector).waitFor({ state: 'visible' });
        });
    }
    fill(selector, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator(selector).fill(value);
        });
    }
    getText(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.locator(selector).textContent();
        });
    }
    goto(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(url);
        });
    }
    type(locator, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(locator).toBeVisible();
            yield locator.fill(value);
        });
    }
    shouldBeVisible(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(locator).toBeVisible();
        });
    }
    shouldContainText(locator, text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(locator).toContainText(text);
        });
    }
    shouldHaveCSS(locator, property, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(locator).toHaveCSS(property, value);
        });
    }
}
exports.default = BasePage;

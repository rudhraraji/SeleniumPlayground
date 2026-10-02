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
    openPage(url, readyLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(url);
            yield this.page.waitForLoadState('load');
            yield this.page.waitForLoadState('networkidle');
            yield (0, test_1.expect)(readyLocator).toBeVisible();
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
    waitForElement(locator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield locator.waitFor({ state: 'visible' });
        });
    }
}
exports.default = BasePage;

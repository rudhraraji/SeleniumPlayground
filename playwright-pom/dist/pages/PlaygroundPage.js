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
class PlaygroundPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/');
        this.canonicalLink = page.locator('link[rel="canonical"]');
        this.heading = page.getByRole('heading', { name: 'Selenium Playground' });
        this.AjaxFormSubmit = this.page.getByRole('link', { name: 'Ajax Form Submit' });
        this.BootstrapListBox = this.page.getByRole('link', { name: 'Bootstrap List Box' });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
        });
    }
    validatePageURL(expectedPageURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const href = yield this.canonicalLink.getAttribute('href');
            if (!href)
                throw new Error('Canonical link href attribute not found');
            (0, test_1.expect)(href.startsWith(this.url)).toBe(true);
            const actualPageURL = href.replace(this.url, '').replace(/\/$/, '');
            (0, test_1.expect)(actualPageURL).toBe(expectedPageURL);
        });
    }
    validateHeading() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.heading).toContainText('Selenium Playground');
        });
    }
    clickLink(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = this.page.getByRole('link', { name, exact: true });
            yield this.click(link);
        });
    }
    // Validate that the target page address matches our expected end subpath
    validatePageURLs(expectedPath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.page).toHaveURL(new RegExp(expectedPath + '$'));
        });
    }
    getTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.title();
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.close();
        });
    }
}
exports.default = PlaygroundPage;

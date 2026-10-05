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
class HoverPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/hover-demo/');
        this.heading = page.getByRole('heading', { name: 'Mouse Hover', exact: true });
        this.buttonSectionHeadings = page.getByRole('heading', {
            name: 'CSS Hover Effects on Button',
            exact: true,
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
            yield (0, test_1.expect)(this.heading).toBeVisible();
        });
    }
    movePointerAway() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.evaluate(() => window.scrollTo(0, 0));
            yield this.page.mouse.move(0, 0);
        });
    }
    buttonTargets(sectionIndex) {
        return this.buttonSectionHeadings
            .nth(sectionIndex)
            .locator('xpath=following-sibling::div[1]')
            .locator(':scope > div');
    }
    imageEffectSection(name) {
        return this.page
            .getByRole('heading', { name, exact: true })
            .locator('xpath=following-sibling::*[1]');
    }
    image(name) {
        return this.imageEffectSection(name).locator('img');
    }
    imageFigure(name) {
        return this.imageEffectSection(name).locator('figure');
    }
}
exports.default = HoverPage;

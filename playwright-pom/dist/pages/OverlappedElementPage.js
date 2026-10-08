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
class OverlappedElementPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/overlapped-element/');
        this.heading = page.getByRole('heading', { name: 'Overlapped Element', exact: true });
        this.scrollableFields = page.locator('div.h-100.overflow-y-scroll');
        this.idInput = page.locator('#id');
        this.nameInput = page.locator('#name');
        this.subjectInput = page.locator('#subject');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
            yield (0, test_1.expect)(this.idInput).toBeVisible();
            yield (0, test_1.expect)(this.idInput).toBeEditable();
            yield (0, test_1.expect)(this.scrollableFields).toBeVisible();
            yield (0, test_1.expect)(this.nameInput).toBeVisible();
            yield (0, test_1.expect)(this.subjectInput).toBeVisible();
        });
    }
    scrollFieldsToBottom() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.scrollableFields.evaluate((element) => __awaiter(this, void 0, void 0, function* () {
                element.scrollTop = element.scrollHeight;
                yield new Promise(resolve => requestAnimationFrame(() => resolve()));
            }));
            yield (0, test_1.expect)(this.subjectInput).toBeInViewport();
        });
    }
    enterFieldValues(values) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.idInput.fill(values.id);
            yield this.scrollFieldsToBottom();
            yield this.nameInput.fill(values.name);
            yield this.subjectInput.fill(values.subject);
        });
    }
}
exports.default = OverlappedElementPage;

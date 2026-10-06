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
class IframeDemoPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/iframe-demo/');
        this.heading = page.getByRole('heading', { name: 'Simple iframe', exact: true });
        this.editorFrame = page.frameLocator('#iFrame1');
        this.webpageFrame = page.frameLocator('#iFrame2');
        this.editor = this.editorFrame.locator('[contenteditable="true"]');
        this.editorBody = this.editorFrame.locator('body');
        this.webpageBody = this.webpageFrame.locator('body');
        this.boldButton = this.editorFrame.getByTitle('Bold');
        this.italicButton = this.editorFrame.getByTitle('Italic');
        this.alignCenterButton = this.editorFrame.getByTitle('Align center');
        this.strikeThroughButton = this.editorFrame.getByTitle('Strike through');
        this.underlineButton = this.editorFrame.getByTitle('Underline');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
        });
    }
    assertEditorContains(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.editor).toContainText(text);
        });
    }
    assertEditorText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.editor).toHaveText(text);
        });
    }
    editEditor(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.editor).toBeVisible();
            yield this.editor.fill(text);
            yield (0, test_1.expect)(this.editor).toHaveText(text);
        });
    }
    assertSecondFrameVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.webpageBody).toBeVisible();
        });
    }
}
exports.default = IframeDemoPage;

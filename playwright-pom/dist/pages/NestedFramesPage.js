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
class NestedFramesPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/nested-frames/');
        this.topFrame = page.frameLocator('frame[name="frame-top"]');
        this.bottomFrame = page.frameLocator('frame[name="frame-bottom"]');
        this.leftNestedFrame = this.bottomFrame.frameLocator('frame[name="frame-left"]');
        this.middleNestedFrame = this.bottomFrame.frameLocator('frame[name="frame-middle"]');
        this.rightNestedFrame = this.bottomFrame.frameLocator('frame[name="frame-right"]');
        this.topFrameContent = this.topFrame.locator('body');
        this.leftFrameContent = this.leftNestedFrame.locator('body');
        this.middleFrameContent = this.middleNestedFrame.locator('body');
        this.rightFrameContent = this.rightNestedFrame.locator('body');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
            yield (0, test_1.expect)(this.topFrameContent).toContainText('Top');
        });
    }
}
exports.default = NestedFramesPage;

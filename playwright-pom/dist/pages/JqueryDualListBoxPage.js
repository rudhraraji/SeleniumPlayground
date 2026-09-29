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
class JqueryDualListBoxPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/jquery-dual-list-box-demo/');
        this.heading = page.getByRole('heading', { name: 'JQuery Dual List Box', exact: true });
        this.availableItems = page.locator('main select').nth(0);
        this.selectedItems = page.locator('main select').nth(1);
        this.addButton = page.getByRole('button', { name: 'Add', exact: true });
        this.addAllButton = page.getByRole('button', { name: 'Add All', exact: true });
        this.removeButton = page.getByRole('button', { name: 'Remove', exact: true });
        this.removeAllButton = page.getByRole('button', { name: 'Remove All', exact: true });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
            yield (0, test_1.expect)(this.heading).toBeVisible();
        });
    }
}
exports.default = JqueryDualListBoxPage;

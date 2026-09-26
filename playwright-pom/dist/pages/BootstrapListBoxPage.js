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
class BootstrapListBoxPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/bootstrap-dual-list-box-demo/');
        this.headingBootstrapDualList = page.getByRole('heading', { name: 'Bootstrap Dual List Demo' });
        // Left Panel
        this.txtLeftSearch = page.getByRole('textbox', { name: 'search' }).first();
        this.btnLeftAllItems = page.getByText('All').nth(4);
        this.lstLeftItems = page.getByText('AllKedungjenarDanvilleMynamaki');
        this.btnMoveToRight = page.locator('button.move-right');
        // Right Panel
        this.txtRightSearch = page.getByRole('textbox', { name: 'search' }).nth(1);
        this.btnRightAllItems = page.getByText('All').nth(5);
        this.lstRightItems = page.getByText('AllMilanNgodoGrange');
        this.btnMoveToLeft = page.locator('button.move-left');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
        });
    }
    waitForPageToLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForURL('**/bootstrap-dual-list-box-demo/');
        });
    }
    validatePageHeading() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.headingBootstrapDualList).toContainText('Bootstrap Dual List Demo');
        });
    }
    enterSearchLeftItem(leftSearch) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Entering Search item: ${leftSearch}`);
            yield this.txtLeftSearch.click();
            yield this.txtLeftSearch.type(leftSearch, { delay: 50 });
            yield this.txtLeftSearch.press('Enter');
        });
    }
    enterSearchRightItem(rightSearch) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Entering Search item: ${rightSearch}`);
            yield this.txtRightSearch.click();
            yield this.txtRightSearch.type(rightSearch, { delay: 50 });
            yield this.txtRightSearch.press('Enter');
        });
    }
    selectSearchedItem(searchedItem) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Searched Item: ${searchedItem}`);
            yield this.page.getByText(searchedItem).click();
        });
    }
    clickRandomLeftItem() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.lstLeftItems.count();
            const randomIndex = Math.floor(Math.random() * count);
            const randomItem = this.lstLeftItems.nth(randomIndex);
            const itemText = yield randomItem.textContent();
            console.log(`Selected item: ${itemText}`);
            yield randomItem.click();
        });
    }
    lastLeftItem() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const lastItem = this.page.locator('.list-left li').last();
            yield (0, test_1.expect)(lastItem).toBeVisible();
            return ((_a = (yield lastItem.textContent())) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            console.log(`lastitem: ${lastItem}`);
        });
    }
    lastRightItem() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const lastItem = this.page.locator('.list-right li').last();
            yield (0, test_1.expect)(lastItem).toBeVisible();
            return ((_a = (yield lastItem.textContent())) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            console.log(`lastitem: ${lastItem}`);
        });
    }
    moveItemLeftToRight(itemName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Move Item Left to Right: ${itemName}`);
            const item = this.page.locator('.list-left li').filter({
                hasText: itemName,
            });
            yield item.click();
            yield this.btnMoveToRight.click();
        });
    }
    moveItemRightToLeft(itemName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Move Item Right to Left: ${itemName}`);
            const item = this.page.locator('.list-right li').filter({
                hasText: itemName,
            });
            yield item.click();
            yield this.btnMoveToLeft.click();
        });
    }
    moveAllItemsLeftToRight() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.page.locator('.list-left li');
            const count = yield items.count();
            for (let i = 0; i < count; i++) {
                yield items.nth(i).click();
            }
            yield this.btnMoveToRight.click();
        });
    }
    moveAllItemsRightToLeft() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.page.locator('.list-right li');
            const count = yield items.count();
            for (let i = 0; i < count; i++) {
                yield items.nth(i).click();
            }
            yield this.btnRightAllItems.click();
        });
    }
    moveItem(itemName, direction) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = direction === 'leftToRight'
                ? this.page.locator('.list-left li').filter({ hasText: itemName })
                : this.page.locator('.list-right li').filter({ hasText: itemName });
            yield item.click();
            if (direction === 'leftToRight') {
                yield this.btnMoveToRight.click();
            }
            else {
                yield this.btnMoveToLeft.click();
            }
            console.log(`lastitem: ${itemName}`);
        });
    }
}
exports.default = BootstrapListBoxPage;

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
class TableFilterPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/table-records-filter-demo/');
        this.heading = page.getByRole('heading', { name: 'Table Filter Demo', exact: true }).first();
        this.filterButtons = page.locator('button.btn-filter');
        this.allFilterButton = this.filterButtons.filter({ hasText: 'All' });
        this.tableRows = page.locator('table tbody tr');
        this.visibleTableRows = page.locator('table tbody tr:visible');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
            yield (0, test_1.expect)(this.filterButtons).toHaveCount(4);
            yield (0, test_1.expect)(this.allFilterButton).toBeVisible();
            yield (0, test_1.expect)(this.tableRows).toHaveCount(5);
        });
    }
    filterBy(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterButton = this.filterButtons.filter({ hasText: category });
            yield (0, test_1.expect)(filterButton).toBeVisible();
            yield filterButton.click();
        });
    }
    showAllRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.allFilterButton.click();
        });
    }
}
exports.default = TableFilterPage;

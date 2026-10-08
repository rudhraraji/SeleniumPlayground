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
class TableDataDownloadPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/table-data-download-demo/');
        this.heading = page.getByRole('heading', { name: 'Table Data Download', exact: true });
        this.table = page.locator('#example');
        this.tableHeaders = this.table.locator('thead th');
        this.tableRows = this.table.locator('tbody tr');
        this.searchInput = page.locator('#example_filter input[type="search"]');
        this.csvExportButton = page.locator('a.buttons-csv');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
            yield (0, test_1.expect)(this.table).toBeVisible();
            yield (0, test_1.expect)(this.tableHeaders).toHaveCount(6);
            yield (0, test_1.expect)(this.tableRows.first()).toBeVisible();
            yield (0, test_1.expect)(this.searchInput).toBeVisible();
            yield (0, test_1.expect)(this.csvExportButton).toBeVisible();
        });
    }
    searchRows(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.searchInput.fill(query);
        });
    }
    exportCsv() {
        return __awaiter(this, void 0, void 0, function* () {
            const downloadPromise = this.page.waitForEvent('download');
            yield this.csvExportButton.click();
            const download = yield downloadPromise;
            return download.suggestedFilename();
        });
    }
}
exports.default = TableDataDownloadPage;

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
class TableSearchFilterPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/table-search-filter-demo/');
        this.heading = page.getByRole('heading', { name: 'Table Search filter', exact: true });
        this.taskFilter = page.getByPlaceholder('Filter by Task / Assignee / Status');
        this.taskTable = page.locator('#task-table');
        this.taskHeaders = this.taskTable.locator('thead th');
        this.taskRows = this.taskTable.locator('tbody tr');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
            yield (0, test_1.expect)(this.taskFilter).toBeVisible();
            yield (0, test_1.expect)(this.taskFilter).toBeEditable();
            yield (0, test_1.expect)(this.taskTable).toBeVisible();
            yield (0, test_1.expect)(this.taskHeaders).toHaveCount(4);
            yield (0, test_1.expect)(this.taskRows).toHaveCount(7);
        });
    }
    filterTasks(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskFilter.fill(query);
        });
    }
    clearTaskFilter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskFilter.clear();
        });
    }
}
exports.default = TableSearchFilterPage;

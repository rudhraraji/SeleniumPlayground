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
class JqueryDropdownSearchPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/jquery-dropdown-search-demo/');
        this.heading = page.getByRole('heading', {
            name: 'Jquery Dropdown Search Demo',
            exact: true,
        });
        this.countryDropdown = page.locator('#country + .select2 .select2-selection');
        this.statesDropdown = page.locator('.js-example-basic-multiple + .select2 .select2-selection');
        this.country = page.locator('#country');
        this.disabledCountryOptions = page.locator('.js-example-disabled-results option:disabled');
        this.multipleStates = page.locator('.js-example-basic-multiple');
        this.fileCategory = page.locator('#files');
        this.searchField = page.locator('.select2-container--open .select2-search__field');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
            yield (0, test_1.expect)(this.countryDropdown).toBeVisible();
            yield (0, test_1.expect)(this.statesDropdown).toBeVisible();
            yield (0, test_1.expect)(this.fileCategory).toBeVisible();
        });
    }
    selectCountry(country) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.countryDropdown.click();
            yield this.searchField.fill(country);
            yield this.page.getByRole('treeitem', { name: country, exact: true }).click();
        });
    }
    selectStates(states) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const state of states) {
                yield this.statesDropdown.click();
                yield this.searchField.fill(state);
                yield this.page.getByRole('treeitem', { name: state, exact: true }).click();
            }
        });
    }
}
exports.default = JqueryDropdownSearchPage;

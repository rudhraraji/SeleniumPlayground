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
class JqueryDatePickerPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/jquery-date-picker-demo/');
        this.heading = page.getByRole('heading', { name: 'JQuery Date Picker Demo', exact: true });
        this.fromDateInput = page.locator('input#from');
        this.toDateInput = page.locator('input#to');
        this.datePickerWidget = page.locator('#ui-datepicker-div');
        this.monthSelector = this.datePickerWidget.locator('.ui-datepicker-month');
        this.yearLabel = this.datePickerWidget.locator('.ui-datepicker-year');
        this.previousMonthButton = this.datePickerWidget.locator('.ui-datepicker-prev');
        this.nextMonthButton = this.datePickerWidget.locator('.ui-datepicker-next');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
            yield this.waitForPageLoad();
            yield (0, test_1.expect)(this.heading).toBeVisible();
        });
    }
    openCalendarFor(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(input).toBeVisible();
            yield input.click();
            yield (0, test_1.expect)(this.datePickerWidget).toBeVisible();
        });
    }
    selectCalendarDate(input, dateValue) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const [monthPart, dayPart, yearPart] = dateValue.split('/');
            const targetMonthIndex = Number(monthPart) - 1;
            const targetDay = Number(dayPart);
            const targetYear = Number(yearPart);
            yield this.openCalendarFor(input);
            let currentMonth = Number(yield this.monthSelector.inputValue());
            let currentYear = Number((_b = (_a = (yield this.yearLabel.textContent())) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '0');
            while (currentYear < targetYear || (currentYear === targetYear && currentMonth < targetMonthIndex)) {
                yield this.nextMonthButton.click();
                currentMonth = Number(yield this.monthSelector.inputValue());
                currentYear = Number((_d = (_c = (yield this.yearLabel.textContent())) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : '0');
            }
            while (currentYear > targetYear || (currentYear === targetYear && currentMonth > targetMonthIndex)) {
                yield this.previousMonthButton.click();
                currentMonth = Number(yield this.monthSelector.inputValue());
                currentYear = Number((_f = (_e = (yield this.yearLabel.textContent())) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : '0');
            }
            const dateCell = this.datePickerWidget
                .locator(`td[data-month="${targetMonthIndex}"][data-year="${targetYear}"] a.ui-state-default`)
                .filter({ hasText: String(targetDay) });
            yield (0, test_1.expect)(dateCell).toBeVisible();
            yield dateCell.click();
            yield (0, test_1.expect)(input).toHaveValue(dateValue);
        });
    }
}
exports.default = JqueryDatePickerPage;

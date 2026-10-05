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
class DragDropRangeSlidersPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/drag-drop-range-sliders-demo/');
        this.heading = page.getByRole('heading', { name: 'Slider Demo', exact: true });
        this.sliders = page.locator('input[type="range"]');
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(this.url);
            yield (0, test_1.expect)(this.heading).toBeVisible();
        });
    }
    setSliderValue(index, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const slider = this.sliders.nth(index);
            const min = Number(yield slider.getAttribute('min'));
            const max = Number(yield slider.getAttribute('max'));
            if (value < min || value > max) {
                throw new Error(`Slider value ${value} is outside the supported range ${min}-${max}`);
            }
            const currentValue = Number(yield slider.inputValue());
            const step = Number(yield slider.getAttribute('step')) || 1;
            const key = value > currentValue ? 'ArrowRight' : 'ArrowLeft';
            const steps = Math.abs(value - currentValue) / step;
            if (!Number.isInteger(steps)) {
                throw new Error(`Slider value ${value} cannot be reached with step ${step}`);
            }
            yield slider.focus();
            for (let currentStep = 0; currentStep < steps; currentStep += 1) {
                yield slider.press(key);
            }
            const output = slider.locator('xpath=..').locator('output');
            yield (0, test_1.expect)(slider).toHaveValue(String(value));
            yield (0, test_1.expect)(output).toHaveText(String(value));
        });
    }
}
exports.default = DragDropRangeSlidersPage;

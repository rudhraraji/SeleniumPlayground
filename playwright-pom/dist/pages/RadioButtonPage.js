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
const BasePage_1 = __importDefault(require("./BasePage"));
const environment_1 = require("../config/environment");
class RadioButtonPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.url = (0, environment_1.appUrl)('selenium-playground/radiobutton-demo/');
        this.heading = page.getByRole('heading', { name: 'Radio button Demo', exact: true });
        this.basicRadioButtons = page.locator('input[name="optradio"]');
        this.basicValueButton = page.locator('#buttoncheck');
        this.disabledRadioButton = page.locator('input[name="prop"][disabled]');
        this.genderRadioButtons = page.locator('input[name="gender"]');
        this.ageRadioButtons = page.locator('input[name="ageGroup"]');
        this.getValuesButton = page.getByRole('button', { name: 'Get values', exact: true });
        this.results = page.locator('main').getByText(/Gender :|Age :/);
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openPage(this.url, this.heading);
        });
    }
}
exports.default = RadioButtonPage;

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
class DashboardPage extends BasePage_1.default {
    constructor(page) {
        super(page);
        this.userEmail = page.locator('[data-testid="user-email"]');
        this.accountSummary = page.locator('[data-testid="account-summary"]');
    }
    waitForDashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            yield test_1.expect.poll(() => __awaiter(this, void 0, void 0, function* () { return this.page.url(); }), { timeout: 30000 }).toContain('/dashboard');
        });
    }
    validateHomeHeading() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.page.getByRole('heading', { name: /^Home$/i })).toBeVisible();
        });
    }
    validateUserIdentity() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.page.getByRole('button', { name: /RR|profile/i })).toBeVisible();
        });
    }
    validateUserEmail(expectedEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, test_1.expect)(this.userEmail).toContainText(expectedEmail);
        });
    }
}
exports.default = DashboardPage;

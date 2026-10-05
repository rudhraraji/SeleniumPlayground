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
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
const test_1 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_1.expect; } });
const allure_playwright_1 = require("allure-playwright");
const jira_1 = require("../config/jira");
exports.test = test_1.test.extend({
    jiraIssue: [
        ({}, use) => __awaiter(void 0, void 0, void 0, function* () {
            if (jira_1.jiraIssueKey && jira_1.jiraIssueUrl) {
                yield allure_playwright_1.allure.issue(jira_1.jiraIssueKey, jira_1.jiraIssueUrl);
            }
            yield use(undefined);
        }),
        { auto: true },
    ],
});

"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.jiraIssueUrl = exports.jiraIssueKey = void 0;
const env = (_b = (_a = globalThis.process) === null || _a === void 0 ? void 0 : _a.env) !== null && _b !== void 0 ? _b : {};
const jiraBaseUrl = ((_c = env.JIRA_BASE_URL) !== null && _c !== void 0 ? _c : 'https://gr8testing.atlassian.net').replace(/\/+$/, '');
const rawIssueKey = (_d = env.JIRA_TC_KEY) === null || _d === void 0 ? void 0 : _d.trim();
exports.jiraIssueKey = rawIssueKey === null || rawIssueKey === void 0 ? void 0 : rawIssueKey.toUpperCase();
exports.jiraIssueUrl = exports.jiraIssueKey ? `${jiraBaseUrl}/browse/${exports.jiraIssueKey}` : undefined;

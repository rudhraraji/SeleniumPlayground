import { expect, test as base } from '@playwright/test';
import { allure } from 'allure-playwright';
import { jiraIssueKey, jiraIssueUrl } from '../config/jira';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<Pages & { jiraIssue: undefined }>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  jiraIssue: [
    async ({}, use) => {
      if (jiraIssueKey && jiraIssueUrl) {
        await allure.issue(jiraIssueKey, jiraIssueUrl);
      }
      await use(undefined);
    },
    { auto: true },
  ],
});
export { expect };

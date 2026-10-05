import { expect, test as base } from '@playwright/test';
import { allure } from 'allure-playwright';
import { jiraIssueKey, jiraIssueUrl } from '../config/jira';

export const test = base.extend<{ jiraIssue: undefined }>({
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

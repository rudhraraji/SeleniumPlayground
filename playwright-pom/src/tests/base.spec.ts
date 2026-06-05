import { test as base } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

// Declare the types of your fixtures
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

// Extend the base test to include your custom POM fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect } from '@playwright/test';
import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import DashboardPage from '../../pages/DashboardPage';
import credentials from '../../test-data/users.json';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.open();

  await loginPage.login(
    credentials.username,
    credentials.password
  );

  await dashboardPage.waitForDashboard();

  await expect(page).toHaveTitle(/Welcome/i);
});
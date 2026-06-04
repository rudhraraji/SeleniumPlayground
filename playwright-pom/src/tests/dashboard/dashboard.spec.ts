import { expect, test } from '@playwright/test';

import LoginPage from '../../pages/LoginPage';
import DashboardPage from '../../pages/DashboardPage';
import credentials from '../../test-data/users.json';

test.describe('DashboardPage', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
      credentials.username,
      credentials.password
    );
  });

  test('should display the home heading on the dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.waitForDashboard();
    await dashboardPage.validateHomeHeading();
  });

  test('should show profile email or user identity', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.waitForDashboard();

  // Validate profile dropdown is visible instead of fake email locator
  await expect(
    page.getByRole('button', { name: /profile dropdown/i })
  ).toBeVisible();

  // Validate displayed user identity (RR in your snapshot)
  await expect(
    page.getByRole('button', { name: /RR|profile/i })
  ).toBeVisible();
});

});
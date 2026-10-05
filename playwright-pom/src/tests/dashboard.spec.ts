import { expect, test } from '../fixtures/test';

import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import credentials from '../data/users.json';

test.describe('DashboardPage', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
      credentials[0].username,
      credentials[0].password
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

  // Validate the user profile control is visible on the dashboard.
  await expect(
    page.getByRole('button', { name: /RR|profile/i })
  ).toBeVisible();
});

});
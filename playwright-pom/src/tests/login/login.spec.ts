import { test, expect } from '../../fixtures/baseTest';
import credentials from '../../test-data/users.json';

test('Login with valid credentials', async ({
  page,
  loginPage,
  dashboardPage
}) => {
  await loginPage.open();

  await loginPage.login(
    credentials.username,
    credentials.password
  );

  await dashboardPage.waitForDashboard();

  await expect(page).toHaveTitle(/LambdaTest/i);
});
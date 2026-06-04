import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { users } from '../../fixtures/users';

test.describe('Login Tests', () => {
  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users[0].username, users[0].password);
    await expect(page).not.toHaveURL(loginPage.url);
  });

  test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'wrongpass');

    // Prefer an explicit error selector if your app exposes one.
    const errorLocator = page.locator('.error, .toast, [role="alert"], .login-error');
    if (await errorLocator.count() > 0) {
      await expect(errorLocator.first()).toBeVisible();
    } else {
      // fallback: compare normalized pathnames to ignore trailing slash differences
      const currentPath = new URL(page.url()).pathname.replace(/\/$/, '');
      const expectedPath = new URL(loginPage.url).pathname.replace(/\/$/, '');
      expect(currentPath).toBe(expectedPath);
    }
  });
});
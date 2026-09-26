import { expect, test } from '@playwright/test';
import AutoHealingPage from '../pages/AutoHealingPage';

test.describe('Auto Healing Demo', () => {
  test('updates the username field DOM id without losing the control', async ({ page }) => {
    const autoHealingPage = new AutoHealingPage(page);
    await autoHealingPage.open();

    await expect(autoHealingPage.usernameInput).toHaveAttribute('id', 'username');
    await autoHealingPage.changeDomId.click();
    await expect(autoHealingPage.usernameInput).toHaveAttribute('id', 'lambdatest');

    await autoHealingPage.usernameInput.fill('Playwright User');
    await expect(autoHealingPage.usernameInput).toHaveValue('Playwright User');
  });
});

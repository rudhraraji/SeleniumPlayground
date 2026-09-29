import { expect, test } from '@playwright/test';
import AutoHealingPage from '../pages/AutoHealingPage';

test.describe('Auto Healing Demo', () => {
  test('submits the form while the username field has its original id', async ({ page }) => {
    const autoHealingPage = new AutoHealingPage(page);
    await autoHealingPage.open();

    await expect(autoHealingPage.usernameInput).toHaveAttribute('id', 'username');
    await autoHealingPage.usernameInput.fill('Playwright User');
    await autoHealingPage.passwordInput.fill('Playwright123');
    await autoHealingPage.submitButton.click();

    await expect(autoHealingPage.submissionResult).toBeVisible();
  });

  test('re-resolves and submits after the username id changes', async ({ page }) => {
    const autoHealingPage = new AutoHealingPage(page);
    await autoHealingPage.open();

    await expect(autoHealingPage.usernameInput).toHaveAttribute('id', 'username');
    const visualAttributes = {
      type: await autoHealingPage.usernameInput.getAttribute('type'),
      name: await autoHealingPage.usernameInput.getAttribute('name'),
      placeholder: await autoHealingPage.usernameInput.getAttribute('placeholder'),
      class: await autoHealingPage.usernameInput.getAttribute('class'),
    };

    await autoHealingPage.changeDomId.click();
    await expect(autoHealingPage.usernameInput).toHaveCount(0);
    await expect(autoHealingPage.healedUsernameInput).toBeVisible();
    await expect(autoHealingPage.healedUsernameInput).toBeEditable();

    await expect(autoHealingPage.usernameField).toHaveAttribute('id', 'lambdatest');
    await expect(autoHealingPage.usernameField).toHaveAttribute('type', visualAttributes.type!);
    await expect(autoHealingPage.usernameField).toHaveAttribute('name', visualAttributes.name!);
    await expect(autoHealingPage.usernameField).toHaveAttribute('placeholder', visualAttributes.placeholder!);
    await expect(autoHealingPage.usernameField).toHaveAttribute('class', visualAttributes.class!);

    await autoHealingPage.usernameField.fill('Playwright User');
    await autoHealingPage.passwordInput.fill('Playwright123');
    await autoHealingPage.submitButton.click();
    await expect(autoHealingPage.submissionResult).toBeVisible();
  });
});

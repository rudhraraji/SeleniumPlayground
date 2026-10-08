import { expect, test } from '../fixtures/test';
import JavascriptAlertsPage from '../pages/JavascriptAlertsPage';

test.describe('JavaScript Alert Box Demo', () => {
  let alertsPage: JavascriptAlertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new JavascriptAlertsPage(page);
    await alertsPage.open();
  });

  test('opens the JavaScript alert box demo', async ({ page }) => {
    await expect(page).toHaveURL(/\/selenium-playground\/javascript-alert-box-demo\/?$/);
    await expect(alertsPage.heading).toBeVisible();
    await expect(alertsPage.alertButton).toBeVisible();
    await expect(alertsPage.confirmButton).toBeVisible();
    await expect(alertsPage.promptButton).toBeVisible();
  });

  test('shows the alert message', async () => {
    await alertsPage.triggerAlert();
  });

  test('displays the confirmation result when accepted', async () => {
    await alertsPage.acceptConfirm();
  });

  test('displays the entered prompt value', async () => {
    await alertsPage.enterPrompt('Playwright test');
  });
});

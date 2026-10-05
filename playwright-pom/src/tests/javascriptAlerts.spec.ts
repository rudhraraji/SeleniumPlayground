import { test } from '../fixtures/test';
import JavascriptAlertsPage from '../pages/JavascriptAlertsPage';

test.describe('JavaScript Alert Box Demo', () => {
  let alertsPage: JavascriptAlertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new JavascriptAlertsPage(page);
    await alertsPage.open();
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
